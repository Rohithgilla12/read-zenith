import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ListIcon, PlusIcon, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// Mock data for reading lists
const mockReadingLists = [
  {
    id: 1,
    title: "Tech Articles",
    description: "Latest in technology and AI developments",
    count: 12,
    updated: "2 hours ago",
    tags: ["Technology", "AI"],
    progress: 75,
  },
  {
    id: 2,
    title: "Personal Development",
    description: "Articles about self-improvement and productivity",
    count: 8,
    updated: "Yesterday",
    tags: ["Growth", "Productivity"],
    progress: 45,
  },
  {
    id: 3,
    title: "Weekend Reads",
    description: "Interesting articles to read during weekend",
    count: 5,
    updated: "3 days ago",
    tags: ["Entertainment", "Fiction"],
    progress: 20,
  },
  {
    id: 4,
    title: "Work Research",
    description: "Articles related to current work projects",
    count: 15,
    updated: "1 week ago",
    tags: ["Research", "Work"],
    progress: 60,
  },
  {
    id: 5,
    title: "Must Read",
    description: "Priority reading materials",
    count: 7,
    updated: "5 days ago",
    tags: ["Important", "Priority"],
    progress: 30,
  },
  {
    id: 6,
    title: "Learning Resources",
    description: "Educational content for skill development",
    count: 9,
    updated: "2 weeks ago",
    tags: ["Education", "Learning"],
    progress: 85,
  },
];

export default async function ReadingListsPage() {
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
            <ListIcon className="h-7 w-7" />
            Reading Lists
          </h1>
          <p className="text-muted-foreground mt-1">
            Organize your articles into curated collections
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <PlusIcon size={16} />
          New Reading List
        </Button>
      </div>

      {/* Reading Lists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockReadingLists.map((list) => (
          <div
            key={list.id}
            className="bg-card rounded-lg p-5 shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <Link href={`/app/reading-lists/${list.id}`}>
                <h3 className="text-xl font-semibold hover:text-primary transition-colors">
                  {list.title}
                </h3>
              </Link>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>

            <p className="text-muted-foreground mt-1 line-clamp-2">
              {list.description}
            </p>

            <div className="flex items-center gap-2 mt-3">
              <span className="text-sm text-muted-foreground">
                {list.count} articles
              </span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">
                Updated {list.updated}
              </span>
            </div>

            {/* Progress bar */}
            <div className="mt-4 h-1.5 w-full bg-accent/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: `${list.progress}%` }}
              ></div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
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
  );
}
