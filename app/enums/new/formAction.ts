"use server";

import { EnumFormSchema } from "@/validationSchemas/validationSchemas";
import { revalidatePath } from "next/cache";

const API_ENDPOINT = process.env.API_ENDPOINT;

export type Enum = {
  name: string;
  label: string;
  options: string[];
  id: string;
  created: string;
  updated: string;
};

export type Error = {
  success: false;
  msg: string;
};

export type Success = {
  success: true;
  data: Enum;
};

export type ApiResponse = Error | Success;

export const createEnum = async (
  newEnum: Omit<Enum, "id" | "updated" | "created">
): Promise<ApiResponse> => {
  const validate = EnumFormSchema.safeParse(newEnum);
  if (!validate.success) {
    return { success: false, msg: "validation error" };
  }

  try {
    if (API_ENDPOINT) {
      const rsp = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEnum),
        cache: "no-store",
      });
      const res = await rsp.json();

      if (res.message) {
        const error = res.data as { [key: string]: { message: string } };
        return {
          success: false,
          msg: Object.entries(error).reduce(
            (acc, entry) => acc + `${entry[0]}  ${entry[1].message}\n`,
            ""
          ),
        };
      } else {
        revalidatePath("/emums", "page");
        return { data: { ...res }, success: true };
      }
    } else {
      throw new Error("");
    }
  } catch (e) {
    return { success: false, msg: "some unexpected error occured!" };
  }
};
