import { User, Message, Conversation } from "@prisma/client";
import { Label } from "@radix-ui/react-label";
import { string } from "zod";

// User Type with Optional Relations
export type ExtendedUser = User & {
  conversations?: ExtendedConversation[]; // Optional
  messages?: ExtendedMessage[]; // Optional
  seenMessages?: ExtendedMessage[]; // Optional
};

// Conversation Type with Optional Relations
export type ExtendedConversation = Conversation & {
  messages?: ExtendedMessage[]; // Optional
  users?: ExtendedUser[]; // Optional
};

// Message Type with Optional Relations
export type ExtendedMessage = Message & {
  sender?: ExtendedUser; // Optional
  conversation?: ExtendedConversation; // Optional
  seen?: ExtendedUser[]; // Optional
};

export interface MultiSelectInterface {
  label: string;
  value: string;
}
