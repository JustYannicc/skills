import path from "node:path";

import { z } from "zod";

export const skillNameSchema = z
  .string()
  .trim()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/u);

export const relativePathSchema = z
  .string()
  .trim()
  .min(1)
  .refine(
    (value) =>
      !path.posix.isAbsolute(value) &&
      !path.win32.isAbsolute(value) &&
      !value.split(/[\\/]/u).includes(".."),
    "Path must stay relative to its declared root."
  );
