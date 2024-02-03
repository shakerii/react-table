import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { makeData } from "../utils/makeData";
import { DataTable, type Columns } from "./DataTable";
import { Person } from "../utils/types";
import { Grid } from "@mui/material";
import { capitalizeFirstLetter } from "../utils/strings";

const data = makeData(1000);

const columns: Columns<Person> = [
  {
    id: "firstName",
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    id: "lastName",
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    id: "progress",
    accessorKey: "progress",
    header: "Progress",
  },
  {
    id: "age",
    accessorKey: "age",
    header: "Age",
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ cell }) => capitalizeFirstLetter(cell.getValue<string>()),
  },
  {
    id: "visits",
    accessorKey: "visits",
    header: "Visits",
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
