import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import { GripVertical, X, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface DraggableWidgetProps {
  id: string;
  children: ReactNode;
  isEditing: boolean;
  onHide?: () => void;
  className?: string;
}

export default function DraggableWidget({
  id,
  children,
  isEditing,
  onHide,
  className,
}: DraggableWidgetProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative group",
        isDragging && "z-50 opacity-90",
        className
      )}
    >
      {/* Edit mode overlay */}
      {isEditing && (
        <div className="absolute inset-0 z-10 rounded-2xl border-2 border-dashed border-primary/40 bg-primary/5 pointer-events-none" />
      )}

      {/* Drag handle and controls */}
      {isEditing && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1">
          <button
            {...attributes}
            {...listeners}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-card border border-border shadow-md cursor-grab active:cursor-grabbing hover:bg-muted transition-colors"
            aria-label="Drag to reorder widget"
          >
            <GripVertical className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">Drag</span>
          </button>
          
          {onHide && (
            <button
              onClick={onHide}
              className="p-1.5 rounded-full bg-card border border-border shadow-md hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-colors"
              aria-label="Hide this widget"
            >
              <EyeOff className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Widget content */}
      <motion.div
        layout
        initial={false}
        animate={{ scale: isDragging ? 1.02 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </div>
  );
}