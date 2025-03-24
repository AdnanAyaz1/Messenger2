"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { format } from "date-fns";

import Avatar from "../Avatar";
import AvatarGroup from "../AvatarGroup";
import { ExtendedConversation, ExtendedUser } from "@/types/types";
import useOtherUser from "@/hooks/useOtherUser";
import { useState } from "react";
import LoadingModal from "../LoadingModal";

interface UserBoxProps {
  data: ExtendedUser | ExtendedConversation;
}

const UserBox = ({ data }: UserBoxProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isConversation = "users" in data; // ✅ Check if data is a conversation
  const otherUser = isConversation ? useOtherUser(data) : null;

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/conversations", {
        userId: isConversation
          ? data.isGroup
            ? data.id
            : otherUser!.id
          : data.id,
      });
      console.log(res);
      if (res.data?.success) {
        router.push(`/conversations/${res.data.data.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const userdata = isConversation ? otherUser : (data as ExtendedUser);

  const messages = isConversation
    ? (data as ExtendedConversation).messages
    : [];
  const lastMessage =
    messages && messages.length > 0 ? messages[messages.length - 1] : null;

  const lastMessageText = lastMessage
    ? lastMessage.image
      ? "Sent an image"
      : lastMessage.body || "Start a Conversation"
    : "Start a Conversation";

  return (
    <>
      {isLoading && <LoadingModal />}
      <div
        onClick={handleClick}
        className="w-full flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer"
      >
        {isConversation && data.isGroup ? (
          <AvatarGroup users={data.users} />
        ) : (
          <Avatar user={userdata as ExtendedUser} />
        )}

        <div className="flex flex-col flex-1">
          <div className="flex items-center justify-between flex-1">
            <p className="text-sm font-medium text-gray-900">
              {isConversation && data.isGroup ? data.name : userdata?.username}
            </p>
            {lastMessage?.createdAt && (
              <p className="text-xs text-gray-400 font-light">
                {format(new Date(lastMessage.createdAt), "p")}
              </p>
            )}
          </div>
          {isConversation && (
            <p className="truncate text-sm text-gray-500">{lastMessageText}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default UserBox;
