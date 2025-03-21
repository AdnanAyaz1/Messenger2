"use client";

import { useSession } from "next-auth/react";
import { format } from "date-fns";
import Image from "next/image";
import { useState } from "react";
import { ExtendedMessage } from "@/types/types";
import Avatar from "../Avatar";

interface MessageBoxProps {
  data: ExtendedMessage;
  isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast }) => {
  const session = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const isOwn = session?.data?.user?.email === data?.sender?.email;

  return (
    <div className={`flex gap-3 p-4 ${isOwn ? "justify-end" : ""}`}>
      <div className={isOwn ? "order-2" : ""}>
        <Avatar user={data.sender} />
      </div>
      <div className={`flex flex-col gap-2 ${isOwn ? "items-end" : ""}`}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">{data.sender?.username}</div>
          <div className="text-xs text-gray-400">
            {format(new Date(data.createdAt), "p")}
          </div>
        </div>
        <div
          className={`text-sm w-fit overflow-hidden ${
            isOwn ? "bg-sky-500 text-white" : "bg-gray-100"
          } ${data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"}`}
        >
          {/* <ImageModal
            src={data.image}
            isOpen={imageModalOpen}
            onClose={() => setImageModalOpen(false)}
          /> */}
          {data.image ? (
            <Image
              onClick={() => setImageModalOpen(true)}
              alt="Image"
              height="288"
              width="288"
              src={data.image}
              className="object-cover cursor-pointer hover:scale-110 transition"
            />
          ) : (
            <div>{data.body}</div>
          )}
        </div>
        {/* {isLast && isOwn && seenList.length > 0 && (
          <div className="text-xs font-light text-gray-500">
            {`Seen by ${seenList}`}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default MessageBox;
