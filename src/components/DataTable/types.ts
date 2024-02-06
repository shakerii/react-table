import { RankingInfo } from "@tanstack/match-sorter-utils";
import { ColumnDef, FilterFn } from "@tanstack/react-table";

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

export type Columns<TData> = ColumnDef<TData>[];
