"use client";
import React from "react";
import { Path, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { ExtendedUser } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { editUserSchema } from "@/lib/zod-validation-schemas";
import { Button } from "../ui/button";
import UsernameCheck from "../UsernameCheck";
import { z } from "zod";
import Image from "next/image";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const EditUserForm = ({
  user,
  onClose,
}: {
  user: ExtendedUser;
  onClose: () => void;
}) => {
  const router = useRouter();

  const defaultValues = {
    username: user?.username,
    image: user?.image || "/images/placeholder.jpg",
  };

  const form = useForm<z.infer<typeof editUserSchema>>({
    resolver: zodResolver(editUserSchema),
    defaultValues,
  });

  const { errors, isSubmitting, isValid } = form.formState;

  const onSubmit = async (data: z.infer<typeof editUserSchema>) => {
    const res = await axios.post("/api/user/edit", { ...data, id: user.id });
    if (res.data.success) {
      toast.success("User Profile Updated");
      onClose();
      router.refresh();
    } else {
      toast.error(`${res.data.message}`);
    }
  };

  const handleUpload = async (results: CloudinaryUploadWidgetResults) => {
    if (
      results.event === "success" &&
      typeof results.info === "object" &&
      results.info !== null
    ) {
      form.setValue("image", results.info.secure_url);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 space-y-6">
        {Object.keys(defaultValues).map((field) => (
          <FormField
            key={field}
            control={form.control}
            name={field as Path<z.infer<typeof editUserSchema>>}
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2.5">
                <FormLabel className="paragraph-medium">
                  {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                </FormLabel>
                <FormControl>
                  {field.name === "username" ? (
                    <div className="relative">
                      <Input
                        required
                        type={"text"}
                        {...field}
                        className={`paragraph-regular w-full md:w-[300px] focus-visible:ring-0 focus-visible:border-2 outline-none min-h-12 rounded-1.5 border ${
                          errors[field.name]
                            ? "border-destructive border-2 focus-visible:border-destructive"
                            : "focus-visible:border-blue-500"
                        }`}
                      />
                      {/* Show Username Availability Indicator */}
                      {field.name === "username" &&
                        field.value !== user.username && (
                          <UsernameCheck form={form} />
                        )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <Image
                        src={field.value as string}
                        alt="User Image"
                        width={45}
                        height={45}
                        className="rounded-full object-cover  object-top  w-[45px] h-[45px]"
                      />
                      <CldUploadWidget
                        uploadPreset="DevFlow"
                        onSuccessAction={handleUpload}
                      >
                        {({ open }) => {
                          return (
                            <Button
                              variant={"default"}
                              type="button"
                              className="bg-gray-200 text-black"
                              onClick={() => open()}
                            >
                              Change
                            </Button>
                          );
                        }}
                      </CldUploadWidget>
                    </div>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <div className="flex justify-end">
          <Button
            type="submit"
            variant={"default"}
            disabled={isSubmitting || !isValid}
            className="bg-blue-400 text-white cursor-pointer mt-4"
          >
            Save changes
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditUserForm;
