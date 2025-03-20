import EmptyState from "@/components/EmptyState";
import SidebarPanel from "@/components/Sidebar/SidebarPanel";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-1">
      <SidebarPanel route="/conversations" />
      <EmptyState />
    </div>
  );
};

export default page;
