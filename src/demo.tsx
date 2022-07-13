import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ContMenu from "./MoreMenuButton";
import { Typography, Divider } from "@mui/material";

const columns = [
  {
    field: "first",
    headerName: "First",
    width: 140
  },
  {
    field: "last",
    headerName: "Last",
    width: 140
  }
];

const initialRows = [
  {
    id: 1,
    first: "Jane",
    last: "Carter"
  },
  {
    id: 2,
    first: "Jack",
    last: "Smith"
  },
  {
    id: 3,
    first: "Gill",
    last: "Martin"
  }
];

export default function RowContextMenu() {
  const [rows, setRows] = React.useState(initialRows);
  const [selectedRow, setSelectedRow] = React.useState<number>();

  const [contextMenu, setContextMenu] = React.useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setSelectedRow(Number(event.currentTarget.getAttribute("data-id")));
    setContextMenu(
      contextMenu === null
        ? { mouseX: event.clientX - 2, mouseY: event.clientY - 4 }
        : null
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const convertToUppercase = () => {
    const newRows = rows.map((row) => {
      if (row.id === selectedRow) {
        return {
          ...row,
          first: row.first.toUpperCase(),
          last: row.last.toUpperCase()
        };
      }
      return row;
    });
    setRows(newRows);
    handleClose();
  };

  const convertToLowercase = () => {
    const newRows = rows.map((row) => {
      if (row.id === selectedRow) {
        return {
          ...row,
          first: row.first.toLowerCase(),
          last: row.last.toLowerCase()
        };
      }
      return row;
    });
    setRows(newRows);
    handleClose();
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={rows}
        componentsProps={{
          row: {
            onContextMenu: handleContextMenu,
            style: { cursor: "context-menu", backgroundColor: "red" }
          }
        }}
        components={{
          Toolbar: GridToolbar
        }}
      />
      {/* <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
        componentsProps={{
          root: {
            onContextMenu: (e) => {
              e.preventDefault();
              handleClose();
            },
          },
        }}
      >
        <MenuItem onClick={convertToUppercase}>UPPERCASE</MenuItem>
        <MenuItem onClick={convertToLowercase}>lowercase</MenuItem>
      </Menu> */}
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
        componentsProps={{
          root: {
            onContextMenu: (e) => {
              e.preventDefault();
              handleClose();
            }
          }
        }}
      >
        <MenuItem onClick={() => console.log(`edit ${selectedRow}`)}>
          <Typography variant="body2" sx={{ ml: 2 }}>
            Editer
          </Typography>
        </MenuItem>

        <MenuItem>
          <Typography variant="body2" sx={{ ml: 2 }}>
            Archiver
          </Typography>
        </MenuItem>

        <Divider />
        <MenuItem sx={{ color: "error.main" }}>
          <Typography variant="body2" sx={{ ml: 2 }}>
            Supprimer
          </Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}
