export interface Hero {
    id: number;
    name: string;
    short_name: string;
    alt_name: string | null;
    role: string;
    new_role: string;
    type: string;
    release_date: string;
    rework_date: string | null;
    last_change_patch_version: string;
    attribute_id: string;
    build_copy_name: string;
    last_updated: string;
    translations: string[];
  }