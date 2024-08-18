export interface BookmarksJson {
  checksum: string;
  roots: Roots;
  sync_metadata: string;
  version: number;
}

export interface Roots {
  [key: string]: Root;
}

export interface Root {
  /** Defined only when type is 'folder' */
  children?: Root[];
  date_added: string;
  date_last_used: string;
  /** Defined only when type is 'folder' */
  date_modified?: string;
  guid: string;
  id: string;
  name: string;
  type: string;
  meta_info?: MetaInfo;
  /** undefined when type is 'folder' */
  url?: string;
}

export interface MetaInfo {
  power_bookmark_meta: string;
}
