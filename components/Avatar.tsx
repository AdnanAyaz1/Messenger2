"use client";
import { ExtendedUser } from "@/types/types";
import Image from "next/image";

interface AvatarProps {
  user?: ExtendedUser;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  // const { members } = useActiveList();
  // const isActive = members.indexOf(user?.email!) !== -1;

  return (
    <div className="relative  w-fit rounded-full ">
      <Image
        alt="Avatar"
        src={user?.image || "/images/placeholder.jpg"}
        width={36}
        height={36}
        className="
          rounded-full
          object-cover
          h-9
          w-9
          md:h-11
          md:w-11
          cursor-pointer
          hover:opacity-80
          transition-opacity
          "
      />
      <span
        className="
            absolute
            rounded-full
            bg-green-500
            ring-2
            ring-white
            top-0
            right-0
            h-2
            w-2
            md:h-3
            md:w-3
          "
      />
    </div>
  );
};

export default Avatar;
