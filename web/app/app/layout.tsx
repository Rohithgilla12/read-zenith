import Link from "next/link";
import {
  BookmarkIcon,
  ListIcon,
  BookIcon,
  CogIcon,
  HomeIcon,
  PlusIcon,
  LogOutIcon,
} from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const signOut = async () => {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    return redirect("/sign-in");
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen">
        <Sidebar className="fixed left-0 top-0 h-screen z-20">
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2 py-3">
              <BookIcon className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold">ReadZenith</span>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <Link href="/app" passHref legacyBehavior>
                      <SidebarMenuButton isActive tooltip="Dashboard">
                        <HomeIcon />
                        <span>Dashboard</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <Link href="/app/bookmarks" passHref legacyBehavior>
                      <SidebarMenuButton tooltip="Bookmarks">
                        <BookmarkIcon />
                        <span>Bookmarks</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <Link href="/app/reading-lists" passHref legacyBehavior>
                      <SidebarMenuButton tooltip="Reading Lists">
                        <ListIcon />
                        <span>Reading Lists</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <Link href="/app/digests" passHref legacyBehavior>
                      <SidebarMenuButton tooltip="Digests">
                        <BookIcon />
                        <span>Digests</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Actions</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Add Bookmark">
                      <PlusIcon />
                      <span>Add Bookmark</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <Link href="/app/settings" passHref legacyBehavior>
                      <SidebarMenuButton tooltip="Settings">
                        <CogIcon />
                        <span>Settings</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <form action={signOut}>
                      <SidebarMenuButton tooltip="Sign Out" type="submit">
                        <LogOutIcon />
                        <span>Sign out</span>
                      </SidebarMenuButton>
                    </form>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <div className="flex items-center justify-between p-4 text-xs text-muted-foreground">
              <span>© 2024 ReadZenith</span>
              <ThemeSwitcher />
            </div>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex flex-col min-h-screen">
          <header className="sticky top-0 flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] z-10">
            <SidebarTrigger className="lg:hidden" />
            <div className="ml-auto flex items-center gap-2">
              <ThemeSwitcher />
            </div>
          </header>

          <main className="flex-1 overflow-auto p-4">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
