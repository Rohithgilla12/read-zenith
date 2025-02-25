import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Plus, BookOpen, Calendar, Clock, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data
const mockReadingLists = [
  {
    id: 1,
    title: "Tech Articles",
    count: 12,
    updated: "2 hours ago",
    tags: ["Technology", "AI"],
  },
  {
    id: 2,
    title: "Personal Development",
    count: 8,
    updated: "Yesterday",
    tags: ["Growth", "Productivity"],
  },
  {
    id: 3,
    title: "Weekend Reads",
    count: 5,
    updated: "3 days ago",
    tags: ["Entertainment", "Fiction"],
  },
];

const mockRecentBookmarks = [
  {
    id: 1,
    title: "The Future of AI in Content Curation",
    url: "https://example.com/ai-content",
    source: "TechCrunch",
    addedAt: "1 hour ago",
  },
  {
    id: 2,
    title: "How to Build Better Reading Habits",
    url: "https://example.com/reading-habits",
    source: "Medium",
    addedAt: "4 hours ago",
  },
  {
    id: 3,
    title: "The Science of Knowledge Retention",
    url: "https://example.com/knowledge-retention",
    source: "Scientific American",
    addedAt: "1 day ago",
  },
];

export default async function AppPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-8 max-w-7xl mx-auto px-4 py-8">
      {/* Welcome Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Welcome to ReadZenith</h1>
          <p className="text-muted-foreground mt-1">
            Your personal reading and knowledge hub
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          Add Bookmark
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-lg p-6 shadow-sm border">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-3 rounded-full">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Total Bookmarks</h3>
              <p className="text-3xl font-bold">147</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 shadow-sm border">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Reading Lists</h3>
              <p className="text-3xl font-bold">12</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 shadow-sm border">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-3 rounded-full">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Read Time Saved</h3>
              <p className="text-3xl font-bold">26 hrs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reading Lists */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Your Reading Lists</h2>
          <Button variant="outline" className="text-sm">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockReadingLists.map((list) => (
            <div
              key={list.id}
              className="bg-card rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold">{list.title}</h3>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-muted-foreground mt-2">
                {list.count} articles • Updated {list.updated}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {list.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Bookmarks */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Recent Bookmarks</h2>
          <Button variant="outline" className="text-sm">
            View All
          </Button>
        </div>
        <div className="bg-card rounded-lg shadow-sm border overflow-hidden">
          <div className="divide-y">
            {mockRecentBookmarks.map((bookmark) => (
              <div
                key={bookmark.id}
                className="p-4 hover:bg-accent/50 transition-colors"
              >
                <Link href={bookmark.url} className="block">
                  <h3 className="text-lg font-medium hover:text-primary transition-colors">
                    {bookmark.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-muted-foreground">
                      {bookmark.source}
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">
                      Added {bookmark.addedAt}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Digest */}
      <div className="mt-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 shadow-sm border">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Your Weekly Digest</h2>
            <p className="text-muted-foreground mt-1">
              Receive summarized articles directly to your inbox or Kindle
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">Configure</Button>
            <Button>Send Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
