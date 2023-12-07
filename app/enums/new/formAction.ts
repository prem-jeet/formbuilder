"use server";

import { EnumFormSchema } from "@/validationSchemas/validationSchemas";

const API_EndPOINT = "http://127.0.0.1:8090/api/collections/enums/records";

interface Enum {
  name: string;
  label: string;
  options: string[];
}

export const createEnum = async (newEnum: Enum) => {
  const validate = EnumFormSchema.safeParse(newEnum);
  if (!validate.success) {
    return { error: true, msg: "validation error" };
  }

  try {
    const rsp = await fetch(API_EndPOINT, {
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
        error: true,
        msg: Object.entries(error).reduce(
          (acc, entry) => acc + `${entry[0]}  ${entry[1].message}\n`,
          ""
        ),
      };
    } else {
      return { ...res, error: false, msg: "" } as Enum & {
        error: boolean;
        msg: string;
      };
    }
  } catch (e) {
    return { error: true, msg: "some unexpected error occured!" };
  }
};
