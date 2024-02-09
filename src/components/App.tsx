import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { makeData } from "../utils/makeData";
import { DataTable, type Columns } from "./DataTable";
import { Person } from "../utils/types";
import { Grid } from "@mui/material";
import { capitalizeFirstLetter } from "../utils/strings";

const data = makeData(100_000);

const columns: Columns<Person> = [
  {
    id: "firstName",
    accessorKey: "firstName",
    header: "First Name",
    filterFn: "includesString",
  },
  {
    id: "lastName",
    accessorKey: "lastName",
    header: "Last Name",
    filterFn: "includesString",
  },
  {
    id: "progress",
    accessorKey: "progress",
    header: "Progress",
    aggregationFn: "mean",
    filterFn: "inNumberRange",
  },
  {
    id: "age",
    accessorKey: "age",
    header: "Age",
    filterFn: "inNumberRange",
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ cell }) => {
      const value = cell.getValue<string | undefined>();
      return value && capitalizeFirstLetter(value);
    },
    filterFn: "arrIncludes",
  },
  {
    id: "visits",
    accessorKey: "visits",
    header: "Visits",
    filterFn: "inNumberRange",
  },
];

export const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Grid my={3} mx={4}>
        <DataTable data={data} columns={columns} />
      </Grid>
    </DndProvider>
  );
};
