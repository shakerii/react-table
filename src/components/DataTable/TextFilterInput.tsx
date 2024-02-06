import { Column } from "@tanstack/react-table";
import { DebouncedInput } from "../DebouncedInput";
import { useCallback } from "react";

type Props<TData> = {
  column: Column<TData, unknown>;
};

export const TextFilterInput = <TData,>({ column }: Props<TData>) => {
  const columnFilterValue = column.getFilterValue();

  const handleChange = useCallback(
    (value: string | number) => column.setFilterValue(value),
    [column]
  );

  return (
    <DebouncedInput
      type="text"
      value={(columnFilterValue ?? "") as string}
      onChange={handleChange}
      placeholder={`Search...`}
      className="w-36 border shadow rounded"
    />
  );
};
