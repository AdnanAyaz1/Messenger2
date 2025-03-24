"use client";
import { ExtendedMessage } from "@/types/types";
import React, { useEffect, useRef } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";
import useConversation from "@/hooks/useConversation";

const Body = ({ messages }: { messages: ExtendedMessage[] }) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const { conversationId } = useConversation();
  useEffect(() => {
    bottomRef?.current?.scrollIntoView();
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, []);
  return (
    <div className="flex-1 overflow-y-auto">
      {" "}
      {messages.map((message, i) => (
        <MessageBox
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div ref={bottomRef} className="pt-24" />
    </div>
  );
};

export default Body;
