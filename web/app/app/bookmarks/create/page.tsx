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
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

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

  const { mutate: createBookmark, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof createBookmarkSchema>) => {
      const { data: user } = await supabase.auth.getUser();

      const metadata = await fetch(
        `https://api.dub.co/metatags?url=${data.url}`
      );

      const metadataJson = await metadata.json();

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
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      toast.success("Bookmark created");

      setTimeout(() => {
        redirect("/app/bookmarks");
      }, 1000);
    },
    onError: (error) => {
      toast.error("Failed to create bookmark", {
        duration: 2000,
        description: error.message,
      });
    },
  });

  const onSubmit = (data: z.infer<typeof createBookmarkSchema>) => {
    createBookmark(data);
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
                <FormDescription>
                  Enter the URL of the bookmark you want to create.
                </FormDescription>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isPending} type="submit">
            {isPending ? "Creating..." : "Create"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
