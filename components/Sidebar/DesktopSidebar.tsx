"use client";
import DesktopItem from "./DesktopItem";
import Avatar from "../Avatar";
import { ExtendedUser } from "@/types/types";
import useRoutes from "@/hooks/useRoutes";

const DesktopSidebar = ({ user }: { user: ExtendedUser }) => {
  const routes = useRoutes();
  return (
    <div
      className="
          hidden
          lg:sticky
          inset-y-0
          h-screen
          left-0
          z-40
          w-20
          xl:px-3
          overflow-y-auto
          bg-white
          border-r-[1px]
          pb-4
          lg:flex
          lg:flex-col
          justify-between
        "
    >
      <nav
        className="
            mt-4
            flex
            flex-col
            h-full
            justify-between
          "
      >
        <ul
          role="list"
          className="
              flex
              flex-col
              items-center
              space-y-1
            "
        >
          {routes.map((item) => (
            <DesktopItem
              key={item.label}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={item.active}
              onClick={item?.onClick}
            />
          ))}
        </ul>
        <Avatar user={user as ExtendedUser} />
      </nav>
    </div>
  );
};

export default DesktopSidebar;
