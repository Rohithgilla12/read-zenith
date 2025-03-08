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
import HeaderAuth from "@/components/header-auth";

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
      <div className="flex min-h-screen w-full">
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
            <div className="flex items-center gap-2">
              <SidebarTrigger className="lg" />
              <h1 className="text-xl font-bold">ReadZenith</h1>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <HeaderAuth />
            </div>
          </header>

          <main className="flex-1 overflow-auto p-4">{children}</main>
          <footer className="sticky bottom-0 w-full flex items-center justify-center border-t bg-background z-10 py-4">
            <div className="max-w-5xl w-full mx-auto text-center text-xs flex justify-between px-5">
              <p>
                Powered by{" "}
                <a
                  href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                  target="_blank"
                  className="font-bold hover:underline"
                  rel="noreferrer"
                >
                  Supabase
                </a>
              </p>
            </div>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
