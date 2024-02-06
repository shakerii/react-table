import { compareItems, rankItem } from "@tanstack/match-sorter-utils";
import { FilterMeta, Row, sortingFns } from "@tanstack/react-table";

export const fuzzyFilter = <TData>(
  row: Row<TData>,
  columnId: string,
  value: string,
  addMeta: (meta: FilterMeta) => void
) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({ itemRank });
  return itemRank.passed;
};

export const fuzzySort = <TData>(
  rowA: Row<TData>,
  rowB: Row<TData>,
  columnId: string
) => {
  let dir = 0;

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank,
      rowB.columnFiltersMeta[columnId]?.itemRank
    );
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};
