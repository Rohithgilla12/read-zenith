import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { BookmarkIcon, PlusIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for bookmarks
const mockBookmarks = [
  {
    id: 1,
    title: "The Future of AI in Content Curation",
    url: "https://example.com/ai-content",
    source: "TechCrunch",
    addedAt: "1 hour ago",
    tags: ["AI", "Technology"],
  },
  {
    id: 2,
    title: "How to Build Better Reading Habits",
    url: "https://example.com/reading-habits",
    source: "Medium",
    addedAt: "4 hours ago",
    tags: ["Productivity", "Self-improvement"],
  },
  {
    id: 3,
    title: "The Science of Knowledge Retention",
    url: "https://example.com/knowledge-retention",
    source: "Scientific American",
    addedAt: "1 day ago",
    tags: ["Science", "Learning"],
  },
  {
    id: 4,
    title: "10 Books That Changed My Life",
    url: "https://example.com/life-changing-books",
    source: "The New York Times",
    addedAt: "2 days ago",
    tags: ["Books", "Personal Development"],
  },
  {
    id: 5,
    title: "The Art of Note-Taking",
    url: "https://example.com/note-taking",
    source: "Harvard Business Review",
    addedAt: "3 days ago",
    tags: ["Productivity", "Learning"],
  },
];

export default async function BookmarksPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-8 max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BookmarkIcon className="h-7 w-7" />
            Bookmarks
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your saved articles
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <PlusIcon size={16} />
          Add Bookmark
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search bookmarks..."
            className="w-full pl-10 pr-4 py-2 border rounded-md bg-background"
          />
        </div>
        <div className="flex gap-2">
          <select className="px-4 py-2 bg-background border rounded-md">
            <option value="all">All Tags</option>
            <option value="ai">AI</option>
            <option value="technology">Technology</option>
            <option value="productivity">Productivity</option>
          </select>
          <select className="px-4 py-2 bg-background border rounded-md">
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="a-z">A-Z</option>
          </select>
        </div>
      </div>

      {/* Bookmarks List */}
      <div className="bg-card rounded-lg shadow-sm border overflow-hidden">
        <div className="divide-y">
          {mockBookmarks.map((bookmark) => (
            <div
              key={bookmark.id}
              className="p-4 hover:bg-accent/50 transition-colors"
            >
              <div>
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium hover:text-primary transition-colors"
                >
                  {bookmark.title}
                </a>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-muted-foreground">
                    {bookmark.source}
                  </span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">
                    Added {bookmark.addedAt}
                  </span>
                </div>
              </div>
              <div className="flex items-center mt-3 gap-2">
                {bookmark.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-accent px-2 py-1 rounded-full text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
