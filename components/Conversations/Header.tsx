"use client";
import useOtherUser from "@/hooks/useOtherUser";
import { ExtendedConversation, ExtendedUser } from "@/types/types";
import React, { useMemo } from "react";
import Avatar from "../Avatar";
import Link from "next/link";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import AvatarGroup from "../AvatarGroup";

const Header = ({ conversation }: { conversation: ExtendedConversation }) => {
  const otherUser = useOtherUser(conversation);
  const isActive = true;
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users?.length} members`;
    }

    return isActive ? "Active" : "Offline";
  }, [conversation, isActive]);
  return (
    <div
      className="
          bg-white
          w-full
          flex
          border-b-[1px]
          border-gray-300
          sm:px-4
          py-3
          px-4
          lg:px-6
          justify-between
          items-center
          shadow-sm
        "
    >
      <div className="flex gap-3 items-center">
        <Link
          className="
              lg:hidden
              block
              text-sky-500
              hover:text-sky-600
              transition
              cursor-pointer
            "
          href="/conversations"
        >
          <HiChevronLeft size={32} />
        </Link>

        {conversation.isGroup ? (
          <AvatarGroup users={conversation.users} />
        ) : (
          <Avatar user={otherUser as ExtendedUser} />
        )}

        <div className="flex flex-col">
          <div>{conversation.name || otherUser?.username}</div>
          <div
            className="
                text-sm
                font-light
                text-neutral-500
              "
          >
            {statusText}
          </div>
        </div>
      </div>
      <HiEllipsisHorizontal
        size={32}
        className="
            text-sky-500
            cursor-pointer
            hover:text-sky-600
            transition
          "
      />
    </div>
  );
};

export default Header;
