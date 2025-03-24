import { groupChatSchema } from "@/lib/zod-validation-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ExtendedUser, MultiSelectInterface } from "@/types/types";
import { z } from "zod";
import { MultiSelect } from "../multi-select";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

type GroupChatFormValues = z.infer<typeof groupChatSchema>;

const GroupChatForm = ({ users }: { users: ExtendedUser[] }) => {
  const router = useRouter();
  const session = useSession();
  const multiSelectUsers = users?.map((user) => {
    return session.data?.user?.name === user.username
      ? null
      : {
          label: user.username,
          value: user.id,
        };
  });

  const form = useForm<GroupChatFormValues>({
    resolver: zodResolver(groupChatSchema),
    defaultValues: {
      name: "",
      members: [], // Default value for members
    },
  });

  const { errors, isSubmitting, isValid } = form.formState;

  const onSubmit = async (data: GroupChatFormValues) => {
    const res = await axios.post("/api/conversations", {
      ...data,
      isGroup: true,
    });
    if (res.data.success) {
      router.push(`/conversations/${res.data.data.id}`);
      toast.success("Group chat created successfully");
    } else {
      toast.error("Failed to create group chat");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 space-y-6">
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-2.5">
              <FormLabel className="paragraph-medium">Name</FormLabel>
              <FormControl>
                <Input
                  required
                  type="text"
                  {...field}
                  className={`paragraph-regular w-full md:w-[300px] focus-visible:ring-0 focus-visible:border-2 outline-none min-h-10 rounded-1.5 border ${
                    errors.name
                      ? "border-destructive border-2 focus-visible:border-destructive"
                      : "focus-visible:border-blue-500"
                  }`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* MultiSelect Field */}
        <FormField
          name="members"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-2.5">
              <FormLabel className="paragraph-medium">Members</FormLabel>
              <FormControl>
                <MultiSelect
                  options={multiSelectUsers as MultiSelectInterface[]}
                  onValueChange={field.onChange}
                  value={field.value}
                  placeholder="Select members"
                  variant={"secondary"}
                  maxCount={3}
                  className={`paragraph-regular w-full ring-0 focus-visible:ring-0 focus-visible:border-2 outline-none min-h-10 rounded-1.5 border ${
                    errors.members
                      ? "border-destructive border-2 focus-visible:border-destructive"
                      : "focus-visible:border-blue-500"
                  }`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="default"
            disabled={isSubmitting}
            className="bg-blue-400 text-white cursor-pointer mt-4"
          >
            Create Group Chat
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default GroupChatForm;
