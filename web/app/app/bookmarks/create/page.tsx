import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import CreateBookmarkForm from "./create-bookmark-form";

export default async function CreateBookmarkPage() {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();
  if (!user.data.user) {
    redirect("/sign-in");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-8 mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Create Bookmark</h1>
      <CreateBookmarkForm user={user.data.user} />
    </div>
  );
}
