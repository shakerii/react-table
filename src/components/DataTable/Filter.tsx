import { Column } from "@tanstack/react-table";
import { TextFilterInput } from "./TextFilterInput";
import { RangeFilterInput } from "./RangeFilterInput";
import { useEffect } from "react";

const inputs = {
  text: TextFilterInput,
  range: RangeFilterInput,
};

type Props<TData> = {
  type: keyof typeof inputs;
  column: Column<TData, unknown>;
};

export const Filter = <TData,>({ type, column }: Props<TData>) => {
  const Input = inputs[type];

  useEffect(() => console.log("Rerendering FILTER"), [column, type]);

  return <Input column={column} />;
};
