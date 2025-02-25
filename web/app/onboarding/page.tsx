"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function OnboardingPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    kindleEmail: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user || !user.email) {
        throw new Error("User not authenticated or email missing");
      }

      // Check if user already exists in the database
      const { data: existingUser, error: fetchError } = await supabase
        .from("users")
        .select("id")
        .eq("email", user.email)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        throw fetchError;
      }

      if (existingUser) {
        // Update existing user
        const { error } = await supabase
          .from("users")
          .update({
            name: formData.name,
            kindle_email: formData.kindleEmail || null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existingUser.id);

        if (error) throw error;
      } else {
        // Insert new user
        const { error } = await supabase.from("users").insert({
          id: user.id,
          email: user.email,
          name: formData.name,
          kindle_email: formData.kindleEmail || null,
          updated_at: new Date().toISOString(),
          notification_prefs: {},
        });

        if (error) throw error;
      }

      setSuccess("Profile updated successfully!");

      // Redirect to home page
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 1500);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex items-center justify-center py-12">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Welcome to Read Zenith</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Complete your profile to get started
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kindleEmail">Kindle Email (Optional)</Label>
              <Input
                id="kindleEmail"
                name="kindleEmail"
                type="email"
                placeholder="your-kindle@kindle.com"
                value={formData.kindleEmail}
                onChange={handleChange}
              />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                This is used to send articles to your Kindle device
              </p>
            </div>

            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-100 rounded-md dark:bg-red-900 dark:text-red-200">
                {error}
              </div>
            )}

            {success && (
              <div className="p-3 text-sm text-green-500 bg-green-100 rounded-md dark:bg-green-900 dark:text-green-200">
                {success}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Saving..." : "Complete Profile"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
