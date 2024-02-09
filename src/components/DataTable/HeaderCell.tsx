import {
  Grid,
  Menu,
  MenuItem,
  IconButton,
  TableCell,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Column,
  ColumnOrderState,
  Header,
  Table,
  flexRender,
} from "@tanstack/react-table";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import { useDrag, useDrop } from "react-dnd";
import { Filter } from "./Filter";
import { useState } from "react";

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

export const HeaderCell = <TData,>({ header, table }: Props<TData>) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { getState, setColumnOrder, setGrouping } = table;
  const { columnOrder } = getState();
  const { column } = header;

  setGrouping(["", ""]);

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
      >
        <Grid item>
          {header.isPlaceholder ? null : (
            <Grid p={1}>
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
            id="x"
            ref={dragRef}
            onClick={handleClick}
            sx={{ cursor: isDragging ? "grabbing" : "grab" }}
          >
            <DragHandleIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
          >
            <MenuItem
              selected={header.column.getIsSorted() === "asc"}
              onClick={() => header.column.toggleSorting(false, false)}
            >
              <ListItemIcon>
                <ArrowDownwardIcon />
              </ListItemIcon>
              <ListItemText>Sort Ascending</ListItemText>
            </MenuItem>
            <MenuItem
              selected={header.column.getIsSorted() === "desc"}
              onClick={() => header.column.toggleSorting(true, false)}
            >
              <ListItemIcon>
                <ArrowUpwardIcon />
              </ListItemIcon>
              <ListItemText>Sort Descending</ListItemText>
            </MenuItem>
            <MenuItem onClick={header.column.getToggleGroupingHandler()}>
              <ListItemIcon>
                <FeaturedPlayListIcon />
              </ListItemIcon>
              <ListItemText>Toggle Group</ListItemText>
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
      <Grid>
        {header.column.getCanFilter() && (
          <Filter
            type={header.column.columnDef.filterFn}
            column={header.column}
          />
        )}
      </Grid>
    </TableCell>
  );
};
