import { Column } from "@tanstack/react-table";
import { DebouncedInput } from "../DebouncedInput";
import { Grid } from "@mui/material";
import { useCallback } from "react";

type MinMax = [number | undefined, number | undefined];

type Props<TData> = {
  column: Column<TData, unknown>;
};

export const RangeFilterInput = <TData,>({ column }: Props<TData>) => {
  const columnFilterValue = column.getFilterValue();
  const minmaxValue = column.getFacetedMinMaxValues();

  const handleMinChange = useCallback(
    (value: string | number) => {
      column.setFilterValue((old: MinMax) => [value, old?.[1]]);
    },
    [column]
  );

  const handleMaxChange = useCallback(
    (value: string | number) => {
      column.setFilterValue((old: MinMax) => [old?.[0], value]);
    },
    [column]
  );

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      flexWrap="nowrap"
      width="100%"
      gap={1}
    >
      <Grid item>
        <DebouncedInput
          type="number"
          value={(columnFilterValue as MinMax)?.[0] ?? ""}
          onChange={handleMinChange}
          placeholder={`Min ${minmaxValue?.[0] ? `(${minmaxValue?.[0]})` : ""}`}
        />
      </Grid>
      <Grid item>
        <DebouncedInput
          type="number"
          value={(columnFilterValue as MinMax)?.[1] ?? ""}
          onChange={handleMaxChange}
          placeholder={`Max ${minmaxValue?.[1] ? `(${minmaxValue?.[1]})` : ""}`}
        />
      </Grid>
    </Grid>
  );
};
