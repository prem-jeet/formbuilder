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
        revalidate: 300,
      },
    });
    const res = await rsp.json();
    return { success: true, data: res.items };
  } catch {
    return { success: false, msg: "Some unexpected error occured!" };
  }
};
