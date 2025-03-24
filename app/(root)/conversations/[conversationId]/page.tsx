import getConversationById from "@/actions/getConversationById";
import getMessages from "@/actions/getMessages";
import Body from "@/components/Conversations/Body";
import Header from "@/components/Conversations/Header";
import MessageForm from "@/components/Forms/MessageForm";
import SidebarPanel from "@/components/Sidebar/SidebarPanel";
import { ExtendedConversation } from "@/types/types";
import React from "react";

const page = async ({ params }: { params: { conversationId: string } }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);
  return (
    <div className="flex flex-1">
      <SidebarPanel
        route="/conversations"
        conversationId={params.conversationId}
      />
      <div className="flex flex-col flex-1 min-h-screen  max-h-screen">
        <Header conversation={conversation as ExtendedConversation} />
        <Body messages={messages} />
        <MessageForm />
      </div>
    </div>
  );
};

export default page;
