import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';

interface Bookmark {
  id: string;
  resource_id: string;
  created_at: string;
}

export function useBookmarks() {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = useCallback(async () => {
    if (!user) {
      setBookmarks([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('resource_bookmarks')
        .select('id, resource_id, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookmarks(data || []);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  const isBookmarked = useCallback(
    (resourceId: string) => {
      return bookmarks.some((b) => b.resource_id === resourceId);
    },
    [bookmarks]
  );

  const toggleBookmark = useCallback(
    async (resourceId: string) => {
      if (!user) {
        toast.error('Please sign in to bookmark resources');
        return;
      }

      const existing = bookmarks.find((b) => b.resource_id === resourceId);

      if (existing) {
        // Remove bookmark
        const { error } = await supabase
          .from('resource_bookmarks')
          .delete()
          .eq('id', existing.id);

        if (error) {
          toast.error('Failed to remove bookmark');
          return;
        }

        setBookmarks((prev) => prev.filter((b) => b.id !== existing.id));
        toast.success('Bookmark removed');
      } else {
        // Add bookmark
        const { data, error } = await supabase
          .from('resource_bookmarks')
          .insert({ user_id: user.id, resource_id: resourceId })
          .select('id, resource_id, created_at')
          .single();

        if (error) {
          toast.error('Failed to add bookmark');
          return;
        }

        setBookmarks((prev) => [data, ...prev]);
        toast.success('Resource bookmarked');
      }
    },
    [user, bookmarks]
  );

  const bookmarkedResourceIds = bookmarks.map((b) => b.resource_id);

  return {
    bookmarks,
    bookmarkedResourceIds,
    loading,
    isBookmarked,
    toggleBookmark,
    refetch: fetchBookmarks,
  };
}
