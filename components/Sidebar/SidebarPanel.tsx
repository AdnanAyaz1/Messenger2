import getAllUsers from "@/actions/getAllUsers";
import { UserPlus } from "lucide-react";
import React from "react";
import UserBox from "../User/UserBox";
import getConversations from "@/actions/getConversations";
import CreateGroupChat from "../Buttons/CreateGroupChat";
import { ExtendedConversation, ExtendedUser } from "@/types/types";
import LoadingModal from "../LoadingModal";

const SidebarPanel = async ({
  route,
  conversationId,
}: {
  route: string;
  conversationId?: string;
}) => {
  const Heading = route === "/" ? "People" : "Conversations";
  const allUsers = await getAllUsers();
  const allConversations = await getConversations();
  const data =
    route === "/"
      ? (allUsers as ExtendedUser[])
      : (allConversations as ExtendedConversation[]);
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
              {route !== "/" ? <CreateGroupChat allUsers={allUsers} /> : null}
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
