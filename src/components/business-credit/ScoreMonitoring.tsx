import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";
import {
  Plus,
  Trash2,
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart3,
} from "lucide-react";

interface CreditScore {
  id: string;
  bureau: string;
  score: number | null;
  score_date: string;
  notes: string | null;
  created_at: string;
}

const BUREAUS = [
  { value: "duns", label: "D&B PAYDEX", maxScore: 100, goodScore: 80 },
  { value: "experian", label: "Experian Business", maxScore: 100, goodScore: 76 },
  { value: "equifax", label: "Equifax Business", maxScore: 100, goodScore: 75 },
  { value: "nav", label: "Nav Credit Score", maxScore: 100, goodScore: 70 },
];

interface Props {
  userId: string;
}

export default function ScoreMonitoring({ userId }: Props) {
  const [scores, setScores] = useState<CreditScore[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    bureau: "duns",
    score: "",
    score_date: new Date().toISOString().split("T")[0],
    notes: "",
  });

  useEffect(() => {
    loadScores();
  }, [userId]);

  const loadScores = async () => {
    if (!userId) return;
    
    try {
      const { data, error } = await supabase
        .from("credit_scores")
        .select("*")
        .eq("user_id", userId)
        .order("score_date", { ascending: false });

      if (error) throw error;
      setScores(data || []);
    } catch (error) {
      console.error("Error loading scores:", error);
      toast.error("Failed to load credit scores");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    try {
      const { error } = await supabase
        .from("credit_scores")
        .insert({
          user_id: userId,
          bureau: formData.bureau,
          score: formData.score ? parseInt(formData.score) : null,
          score_date: formData.score_date,
          notes: formData.notes || null,
        });

      if (error) throw error;
      toast.success("Score recorded!");
      setIsDialogOpen(false);
      resetForm();
      loadScores();
    } catch (error) {
      console.error("Error saving score:", error);
      toast.error("Failed to save score");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this score entry?")) return;

    try {
      const { error } = await supabase
        .from("credit_scores")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Score deleted");
      loadScores();
    } catch (error) {
      console.error("Error deleting score:", error);
      toast.error("Failed to delete score");
    }
  };

  const resetForm = () => {
    setFormData({
      bureau: "duns",
      score: "",
      score_date: new Date().toISOString().split("T")[0],
      notes: "",
    });
  };

  // Get latest score for each bureau
  const latestScores = BUREAUS.map(bureau => {
    const bureauScores = scores.filter(s => s.bureau === bureau.value);
    const latest = bureauScores[0];
    const previous = bureauScores[1];
    
    let trend: "up" | "down" | "same" | null = null;
    if (latest?.score && previous?.score) {
      if (latest.score > previous.score) trend = "up";
      else if (latest.score < previous.score) trend = "down";
      else trend = "same";
    }
    
    return {
      ...bureau,
      latestScore: latest?.score,
      latestDate: latest?.score_date,
      trend,
      change: latest?.score && previous?.score ? latest.score - previous.score : null,
    };
  });

  // Get score color
  const getScoreColor = (score: number | null | undefined, goodScore: number) => {
    if (!score) return "text-muted-foreground";
    if (score >= goodScore) return "text-green-500";
    if (score >= goodScore - 15) return "text-yellow-500";
    return "text-red-500";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="animate-pulse text-muted-foreground">Loading scores...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Score Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {latestScores.map((bureau) => (
          <div
            key={bureau.value}
            className="bg-card border border-border rounded-xl p-4"
          >
            <p className="text-sm text-muted-foreground mb-2">{bureau.label}</p>
            {bureau.latestScore ? (
              <>
                <div className="flex items-end gap-2">
                  <span className={`text-3xl font-bold ${getScoreColor(bureau.latestScore, bureau.goodScore)}`}>
                    {bureau.latestScore}
                  </span>
                  <span className="text-sm text-muted-foreground mb-1">
                    / {bureau.maxScore}
                  </span>
                </div>
                {bureau.trend && (
                  <div className="flex items-center gap-1 mt-2">
                    {bureau.trend === "up" && (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    )}
                    {bureau.trend === "down" && (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    {bureau.trend === "same" && (
                      <Minus className="h-4 w-4 text-muted-foreground" />
                    )}
                    {bureau.change !== null && (
                      <span className={`text-sm ${
                        bureau.change > 0 ? "text-green-500" : 
                        bureau.change < 0 ? "text-red-500" : "text-muted-foreground"
                      }`}>
                        {bureau.change > 0 ? "+" : ""}{bureau.change} pts
                      </span>
                    )}
                  </div>
                )}
                {bureau.latestDate && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Updated {format(new Date(bureau.latestDate), "MMM d, yyyy")}
                  </p>
                )}
              </>
            ) : (
              <p className="text-sm text-muted-foreground italic">No score recorded</p>
            )}
          </div>
        ))}
      </div>

      {/* Add Score Button */}
      <div className="flex justify-end">
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Record Score
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Record Credit Score</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="bureau">Credit Bureau *</Label>
                <select
                  id="bureau"
                  value={formData.bureau}
                  onChange={(e) => setFormData(prev => ({ ...prev, bureau: e.target.value }))}
                  className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground"
                >
                  {BUREAUS.map((bureau) => (
                    <option key={bureau.value} value={bureau.value}>{bureau.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="score">Score</Label>
                <Input
                  id="score"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.score}
                  onChange={(e) => setFormData(prev => ({ ...prev, score: e.target.value }))}
                  placeholder="80"
                />
              </div>

              <div>
                <Label htmlFor="score_date">Date *</Label>
                <Input
                  id="score_date"
                  type="date"
                  value={formData.score_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, score_date: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Any observations or context..."
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  Save Score
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Score History */}
      <div className="bg-card border border-border rounded-xl">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Score History
          </h3>
        </div>
        
        {scores.length === 0 ? (
          <div className="p-8 text-center">
            <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">No scores recorded</h3>
            <p className="text-muted-foreground text-sm">
              Start tracking your business credit scores to monitor your progress over time.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {scores.map((score) => {
              const bureauInfo = BUREAUS.find(b => b.value === score.bureau);
              return (
                <div
                  key={score.id}
                  className="flex items-center justify-between p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="min-w-[120px]">
                      <p className="font-medium text-foreground">{bureauInfo?.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(score.score_date), "MMM d, yyyy")}
                      </p>
                    </div>
                    <div>
                      <span className={`text-xl font-bold ${getScoreColor(score.score, bureauInfo?.goodScore || 75)}`}>
                        {score.score ?? "—"}
                      </span>
                      <span className="text-sm text-muted-foreground"> / {bureauInfo?.maxScore}</span>
                    </div>
                    {score.notes && (
                      <p className="text-sm text-muted-foreground max-w-[200px] truncate">
                        {score.notes}
                      </p>
                    )}
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(score.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Tips Section */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
        <h3 className="font-semibold text-foreground mb-4">📊 Score Monitoring Tips</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• <strong>D&B PAYDEX:</strong> 80+ is excellent. Based on payment history to vendors.</li>
          <li>• <strong>Experian Business:</strong> 76-100 is low risk. Factors include payment trends and credit utilization.</li>
          <li>• <strong>Equifax Business:</strong> 75-100 is low risk. Reviews your company's financial health.</li>
          <li>• <strong>Check monthly:</strong> Regular monitoring helps catch issues early.</li>
          <li>• <strong>Dispute errors:</strong> Incorrect information can significantly impact your scores.</li>
        </ul>
      </div>
    </div>
  );
}
