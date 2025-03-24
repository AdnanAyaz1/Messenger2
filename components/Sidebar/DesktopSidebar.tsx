"use client";
import DesktopItem from "./DesktopItem";
import Avatar from "../Avatar";
import { ExtendedUser } from "@/types/types";
import useRoutes from "@/hooks/useRoutes";
import { useState } from "react";
import EditUserModal from "../Modals/Modal";
import EditUserForm from "../Forms/EditUserForm";

const DesktopSidebar = ({ user }: { user: ExtendedUser }) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false); // state for showing the update user modal
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
          border-gray-300
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

        <button onClick={() => setIsOpen(true)}>
          <Avatar user={user} />
        </button>
        {isOpen && (
          <EditUserModal
            onClose={() => setIsOpen(false)}
            heading="Edit Profile"
            description="Edit your profile and then click on the save button"
          >
            <EditUserForm user={user} onClose={() => setIsOpen(false)} />
          </EditUserModal>
        )}
      </nav>
    </div>
  );
};

export default DesktopSidebar;
