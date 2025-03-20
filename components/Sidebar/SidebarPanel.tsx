import getAllUsers from "@/actions/getAllUsers";
import { UserPlus } from "lucide-react";
import React from "react";
import UserBox from "../User/UserBox";
import getConversations from "@/actions/getConversations";

const SidebarPanel = async ({
  route,
  conversationId,
}: {
  route: string;
  conversationId: string;
}) => {
  const Heading = route === "/" ? "People" : "Conversations";
  const allUsers = await getAllUsers();
  const allConversations = await getConversations();
  const data = route === "/" ? allUsers : allConversations;
  return (
    <div
      className={`h-screen pb-20 lg:pb-0 lg:w-70  md:w-65 w-full overflow-y-auto border-r border-gray-200 ${conversationId ? "max-md:hidden" : ""}`}
    >
      <div className="px-5">
        <div className="flex-col">
          <div
            className="
            text-2xl
            font-bold
            text-neutral-800
            py-4
            flex
            items-center
            justify-between
          "
          >
            {Heading}
            {route !== "/" ? (
              <div className="p-2 rounded-full bg-gray-200 hover:bg-gray-100 cursor-pointer">
                <UserPlus size={15} />
              </div>
            ) : null}
          </div>
        </div>
        {data.map((item) => (
          <UserBox key={item.id} data={item} route={route} />
        ))}
      </div>
    </div>
  );
};

export default SidebarPanel;
