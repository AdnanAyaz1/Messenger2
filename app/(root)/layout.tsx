import { getUser } from "@/actions/getUser";
import DesktopSidebar from "@/components/Sidebar/DesktopSidebar";
import MobileFooter from "@/components/Sidebar/MobileFooter";
import { ExtendedUser } from "@/types/types";
import React, { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  const user = await getUser({ protectedRoute: true });
  return (
    <div className="flex w-full">
      <DesktopSidebar user={user as ExtendedUser} />
      <MobileFooter />
      {children}
    </div>
  );
};

export default layout;
