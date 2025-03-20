"use client";

import axios from "axios";

import { useRouter } from "next/navigation";

import Avatar from "../Avatar";
import { ExtendedConversation, ExtendedUser } from "@/types/types";
import useOtherUser from "@/hooks/useOtherUser";
import { useSession } from "next-auth/react";
import { format } from "date-fns";

interface UserBoxProps {
  data: ExtendedUser | ExtendedConversation;
  route: string;
}

const UserBox = ({ data, route }: UserBoxProps) => {
  const router = useRouter();
  const session = useSession();
  const otherUser = useOtherUser(data as ExtendedConversation);
  const handleClick = async () => {
    try {
      const res = await axios.post("/api/conversations", {
        userId: otherUser ? otherUser.id : data.id,
      });
      if (res.data?.success) {
        router.push(`/conversations/${res.data.data.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const userdata =
    route === "/"
      ? (data as ExtendedUser)
      : useOtherUser(data as ExtendedConversation);

  const messages = (data as ExtendedConversation)?.messages || [];
  const lastMessage = messages
    ? messages[messages.length - 1]
    : { image: "", body: "", createdAt: "" };
  const userEmail = session.data?.user?.email;
  const lastMessageText = lastMessage?.image
    ? "Sent an image"
    : lastMessage?.body
      ? lastMessage.body
      : "Start a Conversation";
  const hasSeen = true;
  return (
    <>
      <div
        onClick={handleClick}
        className={`
          w-full
          flex
          items-center
          space-x-3
          bg-white
          p-3
          hover:bg-neutral-100
          rounded-lg
          transition
          cursor-pointer
        `}
      >
        <Avatar user={userdata as ExtendedUser} />
        <div className="flex flex-col flex-1">
          <div className="flex items-center justify-between flex-1">
            <p
              className="
                  text-sm
                  font-medium
                  text-gray-900
                "
            >
              {userdata?.username}
            </p>
            {lastMessage?.createdAt && (
              <p
                className="
                  text-xs
                  text-gray-400
                  font-light
                "
              >
                {format(new Date(lastMessage.createdAt), "p")}
              </p>
            )}
          </div>
          {data?.messages && (
            <p
              className={`
              truncate
              text-sm
               ${hasSeen} ? "text-gray-500" : "text-black font-medium"
            `}
            >
              {lastMessageText}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default UserBox;
