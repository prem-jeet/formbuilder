"use server";
import { Enum } from "./new/formAction";

const API_ENDPOINT = process.env.API_ENDPOINT || "";

export type Error = {
  success: false;
  msg: string;
};

export type Success = {
  success: true;
  data: Enum[];
};

export type ApiResponse = Error | Success;

export const fetchEnums = async (): Promise<ApiResponse> => {
  if (!API_ENDPOINT) {
    return {
      success: false,
      msg: "APi string undefined",
    };
  }
  try {
    const rsp = await fetch(API_ENDPOINT, {
      next: {
        tags: ["fetchEnums"],
      },
      cache: "no-store",
    });
    const res = await rsp.json();
    return { success: true, data: res.items };
  } catch {
    return { success: false, msg: "Some unexpected error occured!" };
  }
};

export const bulkDeleteEnums = async (
  ids: string[]
): Promise<Error | { success: true }> => {
  if (!API_ENDPOINT) {
    return {
      success: false,
      msg: "APi string undefined",
    };
  }
  try {
    const rsp = ids.map((id) =>
      fetch(`${API_ENDPOINT}/${id}`, { method: "DELETE" })
    );
    const res = await Promise.all(rsp);
    return {
      success: true,
    };
  } catch (e) {
    return {
      success: false,
      msg: "Unable to delete some records!",
    };
  }
};
