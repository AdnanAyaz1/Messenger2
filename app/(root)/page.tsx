import EmptyState from "@/components/EmptyState";
import SidebarPanel from "@/components/Sidebar/SidebarPanel";

export default async function Home() {
  return (
    <div className="flex flex-1">
      <SidebarPanel route="/" />
      <EmptyState />
    </div>
  );
}
