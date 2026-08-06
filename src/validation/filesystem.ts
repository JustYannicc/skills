import { readdir, stat } from "node:fs/promises";
import path from "node:path";

interface ListFilesOptions {
  excludeDirectories?: ReadonlySet<string>;
  suffix?: string;
}

export const pathExists = async (filePath: string): Promise<boolean> => {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
};

export const listFiles = async (
  root: string,
  options: ListFilesOptions = {}
): Promise<string[]> => {
  const entries = await readdir(root, { withFileTypes: true }).catch(() => []);
  const nested = await Promise.all(
    entries.map((entry): string[] | Promise<string[]> => {
      if (
        entry.isDirectory() &&
        options.excludeDirectories?.has(entry.name) === true
      ) {
        return [];
      }
      const entryPath = path.join(root, entry.name);
      if (entry.isDirectory()) {
        return listFiles(entryPath, options);
      }
      const matchesSuffix =
        options.suffix === undefined || entry.name.endsWith(options.suffix);
      return entry.isFile() && matchesSuffix ? [entryPath] : [];
    })
  );
  return nested.flat().toSorted();
};
