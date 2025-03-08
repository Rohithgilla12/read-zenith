"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { createId } from "@paralleldrive/cuid2";
import { redirect } from "next/navigation";

const createBookmarkSchema = z.object({
  title: z.string().optional(),
  url: z.string().min(1),
  tags: z.array(z.string()),
});

export default function CreateBookmarkPage() {
  const form = useForm<z.infer<typeof createBookmarkSchema>>({
    resolver: zodResolver(createBookmarkSchema),
    defaultValues: {
      title: "",
      tags: [],
    },
  });

  const supabase = createClient();

  const onSubmit = async (data: z.infer<typeof createBookmarkSchema>) => {
    const { data: user } = await supabase.auth.getUser();

    const metadata = await fetch(`https://api.dub.co/metatags?url=${data.url}`);

    const metadataJson = await metadata.json();

    console.log(metadataJson);
    //  Add this bookmark to the database

    const { error } = await supabase.from("saved_items").insert({
      id: createId(),
      title: metadataJson.title,
      url: data.url,
      image_url: metadataJson.image,
      user_id: user.user!.id,
      type: "BOOKMARK",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    if (error) {
      console.error(error);
    }

    redirect("/app/bookmarks");
  };

  return (
    <div className="flex-1 w-full flex flex-col gap-8 mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Create Bookmark</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL</FormLabel>
                <Input {...field} />
              </FormItem>
            )}
          />

          <Button type="submit">Create</Button>
        </form>
      </Form>
    </div>
  );
}
