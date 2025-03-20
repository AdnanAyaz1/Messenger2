import { LogOutIcon, MessageCircleMoreIcon, User2Icon } from "lucide-react";
import { signOut } from "next-auth/react";

export const routes = [
  {
    label: "Chat",
    href: "/conversations",
    icon: MessageCircleMoreIcon,
  },
  {
    label: "Users",
    href: "/",
    icon: User2Icon,
  },
  {
    label: "Logout",
    href: "#",
    icon: LogOutIcon,
    onClick: () => signOut(),
  },
];
