import { ExtendedConversation } from "@/types/types";
import { useSession } from "next-auth/react";

const useOtherUser = (conversation: ExtendedConversation) => {
  const session = useSession();
  const currentUserEmail = session?.data?.user?.email;
  const otherUser = conversation?.users?.filter(
    (user) => user.email !== currentUserEmail
  );
  return otherUser ? otherUser[0] : null;
};

export default useOtherUser;
