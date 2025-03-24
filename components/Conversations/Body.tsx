"use client";
import { ExtendedMessage } from "@/types/types";
import React, { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";
import useConversation from "@/hooks/useConversation";
import { pusherClient } from "@/lib/pusher";
import { find } from "lodash";

const Body = ({ messages }: { messages: ExtendedMessage[] }) => {
  const [pusherMessages, setPusherMessages] = useState(messages);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId as string);
    const messageHandler = (message: ExtendedMessage) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

      setPusherMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }

        return [...current, message];
      });

      bottomRef?.current?.scrollIntoView();
    };
    const updateMessageHandler = (newMessage: ExtendedMessage) => {
      setPusherMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) {
            return newMessage;
          }

          return currentMessage;
        })
      );
    };
    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("message:update", updateMessageHandler);
    bottomRef?.current?.scrollIntoView();
    return () => {
      pusherClient.unsubscribe(conversationId as string);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("message:update", updateMessageHandler);
    };
  }, [conversationId]);
  return (
    <div className="flex-1 overflow-y-auto">
      {" "}
      {pusherMessages.map((message, i) => (
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
