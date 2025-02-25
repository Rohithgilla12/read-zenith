import { createClient } from "@/utils/supabase/client";

export async function checkUserNeedsOnboarding() {
    const supabase = createClient();

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !user.email) {
        return { needsOnboarding: false }; // Not logged in or email missing
    }

    // Check if user exists in the database
    const { data, error } = await supabase
        .from("users")
        .select("id, name, kindle_email")
        .eq("email", user.email)
        .single();

    if (error || !data || !data.name) {
        return { needsOnboarding: true };
    }

    return { needsOnboarding: false, user: data };
}

export async function getUserProfile() {
    const supabase = createClient();

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !user.email) {
        return null; // Not logged in or email missing
    }

    // Get user profile from database
    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", user.email)
        .single();

    if (error) {
        console.error("Error fetching user profile:", error);
        return null;
    }

    return data;
}
