import { Grid, IconButton, TableCell } from "@mui/material";
import {
  Column,
  ColumnOrderState,
  Header,
  Table,
  flexRender,
} from "@tanstack/react-table";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { useDrag, useDrop } from "react-dnd";
import { Filter } from "./Filter";

type Props<TData> = {
  header: Header<TData, unknown>;
  table: Table<TData>;
};

const reorderColumn = (
  draggedColumnId: string,
  targetColumnId: string,
  columnOrder: string[]
): ColumnOrderState => {
  columnOrder.splice(
    columnOrder.indexOf(targetColumnId),
    0,
    columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0] as string
  );
  return [...columnOrder];
};

export const DraggableHeaderCell = <TData,>({
  header,
  table,
}: Props<TData>) => {
  const { getState, setColumnOrder } = table;
  const { columnOrder } = getState();
  const { column } = header;

  const [, dropRef] = useDrop({
    accept: "column",
    drop: (draggedColumn: Column<TData>) => {
      const newColumnOrder = reorderColumn(
        draggedColumn.id,
        column.id,
        columnOrder
      );
      setColumnOrder(newColumnOrder);
    },
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => column,
    type: "column",
  });

  return (
    <TableCell
      ref={dropRef}
      colSpan={header.colSpan}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        ref={previewRef}
        sx={
          header.column.getCanSort()
            ? { cursor: "pointer", userSelect: "none" }
            : undefined
        }
        onClick={header.column.getToggleSortingHandler()}
      >
        <Grid item>
          {header.isPlaceholder ? null : (
            <Grid>
              {flexRender(header.column.columnDef.header, header.getContext())}
              {{
                asc: " 🔼",
                desc: " 🔽",
              }[header.column.getIsSorted() as string] ?? null}
            </Grid>
          )}
        </Grid>
        <Grid item>
          <IconButton
            ref={dragRef}
            sx={{ cursor: isDragging ? "grabbing" : "grab" }}
          >
            <DragHandleIcon />
          </IconButton>
        </Grid>
      </Grid>
      {header.column.getCanFilter() && (
        <Filter
          type={
            header.column.columnDef.filterFn === "inNumberRange"
              ? "range"
              : "text"
          }
          column={header.column}
        />
      )}
    </TableCell>
  );
};
