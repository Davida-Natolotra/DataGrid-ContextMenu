import { useRef, useState } from "react";
// components
import shareFill from "@iconify/icons-eva/share-fill";
import printerFill from "@iconify/icons-eva/printer-fill";
import archiveFill from "@iconify/icons-eva/archive-fill";
import downloadFill from "@iconify/icons-eva/download-fill";
import trash2Outline from "@iconify/icons-eva/trash-2-outline";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/IconButton";

type Props = {
  id: number;
};

export default function MoreMenuButton({ id }: Props) {
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Menu
        open={open}
        anchorEl={menuRef.current}
        onClose={handleClose}
        PaperProps={{
          sx: { width: 200, maxWidth: "100%" }
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={() => console.log(`Download id ${id}`)}>
          <Typography variant="body2" sx={{ ml: 2 }}>
            Download
          </Typography>
        </MenuItem>
        <MenuItem>
          <Typography variant="body2" sx={{ ml: 2 }}>
            Print
          </Typography>
        </MenuItem>
        <MenuItem>
          <Typography variant="body2" sx={{ ml: 2 }}>
            Share
          </Typography>
        </MenuItem>
        <MenuItem>
          <Typography variant="body2" sx={{ ml: 2 }}>
            Archive
          </Typography>
        </MenuItem>

        <Divider />
        <MenuItem sx={{ color: "error.main" }}>
          <Typography variant="body2" sx={{ ml: 2 }}>
            Delete
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
