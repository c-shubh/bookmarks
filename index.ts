import fs from "fs/promises";
import { argv, exit } from "process";
import { BookmarksJson, Root } from "./types";

const EXIT_FAILURE = 1;

async function readBookmarksFile(filePath: string): Promise<BookmarksJson> {
  try {
    const data = await fs.readFile(filePath, { encoding: "utf-8" });
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading bookmarks file: ${filePath}`);
    console.error((error as Error).message);
    exit(EXIT_FAILURE);
  }
}

function printRow(data: Omit<Root, "children">, lineage: string[]) {
  const row: string[] = [
    data.id,
    data.name,
    data.type,
    data.url || "",
    data.date_added,
    data.date_last_used,
    data.date_modified || "",
    lineage.join(" > "),
    data.guid,
  ];

  console.log(row.join(";"));
}

function processRoot(root: Root, lineage: string[]) {
  printRow(root, lineage);
  if (root.type !== "folder") return;
  for (const child of root.children!) {
    lineage.push(root.name);
    processRoot(child, lineage);
    lineage.pop();
  }
}

async function main() {
  if (argv.length !== 3) {
    console.error("Invalid arguments");
    exit(EXIT_FAILURE);
  }
  const bookmarksPath = argv[2];
  const bookmarks = await readBookmarksFile(bookmarksPath);
  for (const root in bookmarks.roots) {
    processRoot(bookmarks.roots[root], []);
  }
}

void main();
