import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import {
  BookIcon,
  SendIcon,
  SettingsIcon,
  MailIcon,
  SmartphoneIcon,
  TabletIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Mock data for digests
const mockDigests = [
  {
    id: 1,
    title: "Weekly Tech Roundup",
    date: "Jun 15, 2024",
    articleCount: 8,
    readingTime: "25 min",
    status: "Sent",
    readingList: "Tech Articles",
  },
  {
    id: 2,
    title: "Personal Development Digest",
    date: "Jun 8, 2024",
    articleCount: 5,
    readingTime: "18 min",
    status: "Sent",
    readingList: "Personal Development",
  },
  {
    id: 3,
    title: "Weekend Reads Collection",
    date: "Jun 1, 2024",
    articleCount: 4,
    readingTime: "15 min",
    status: "Sent",
    readingList: "Weekend Reads",
  },
];

export default async function DigestsPage() {
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
            <BookIcon className="h-7 w-7" />
            Digests
          </h1>
          <p className="text-muted-foreground mt-1">
            Create and manage your article digests
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <SendIcon size={16} />
          Create Digest
        </Button>
      </div>

      {/* Digest Settings */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 shadow-sm border">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold">Digest Delivery Settings</h2>
            <p className="text-muted-foreground mt-1">
              Configure how and when you receive your digests
            </p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 bg-background rounded-lg border">
                <MailIcon className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-xs text-muted-foreground">
                    user@example.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-background rounded-lg border">
                <TabletIcon className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Kindle</p>
                  <p className="text-xs text-muted-foreground">
                    kindle@kindle.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-background rounded-lg border opacity-50">
                <SmartphoneIcon className="h-5 w-5" />
                <div>
                  <p className="font-medium">Mobile App</p>
                  <p className="text-xs text-muted-foreground">
                    Not configured
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <Button variant="outline" className="flex items-center gap-2">
              <SettingsIcon size={16} />
              Configure
            </Button>
          </div>
        </div>
      </div>

      {/* Recent Digests */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Recent Digests</h2>
        <div className="bg-card rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium">Title</th>
                  <th className="text-left p-4 font-medium">Date</th>
                  <th className="text-left p-4 font-medium">Articles</th>
                  <th className="text-left p-4 font-medium">Reading Time</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {mockDigests.map((digest) => (
                  <tr
                    key={digest.id}
                    className="hover:bg-accent/50 transition-colors"
                  >
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{digest.title}</p>
                        <p className="text-xs text-muted-foreground">
                          From: {digest.readingList}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 text-sm">{digest.date}</td>
                    <td className="p-4 text-sm">{digest.articleCount}</td>
                    <td className="p-4 text-sm">{digest.readingTime}</td>
                    <td className="p-4">
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        {digest.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                        <Button variant="ghost" size="sm">
                          Resend
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Digest Section */}
      <div className="bg-card rounded-lg p-6 shadow-sm border mt-4">
        <h2 className="text-xl font-bold">Create Custom Digest</h2>
        <p className="text-muted-foreground mt-1">
          Combine articles from your reading lists into a custom digest
        </p>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="font-medium mb-2">Select Reading Lists</p>
            <div className="space-y-2">
              <div className="flex items-center">
                <input type="checkbox" id="list1" className="mr-2" />
                <label htmlFor="list1">Tech Articles (12 articles)</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="list2" className="mr-2" />
                <label htmlFor="list2">Personal Development (8 articles)</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="list3" className="mr-2" />
                <label htmlFor="list3">Weekend Reads (5 articles)</label>
              </div>
            </div>
          </div>

          <div>
            <p className="font-medium mb-2">Delivery Options</p>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="delivery"
                  id="email"
                  className="mr-2"
                  checked
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="delivery"
                  id="kindle"
                  className="mr-2"
                />
                <label htmlFor="kindle">Kindle</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="delivery"
                  id="both"
                  className="mr-2"
                />
                <label htmlFor="both">Both</label>
              </div>
            </div>

            <div className="mt-4">
              <Button className="w-full md:w-auto">Create & Send Digest</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
