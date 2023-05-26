import {
  ListItem,
  ListItemButton,
  ListItemText
} from "@mui/material"
import { Link } from "react-router-dom";

const SidebarItem = ({ text }) => {
  return (
    <ListItem sx={{ py: 0, px: 1 }}>
      <ListItemButton 
      component={Link}
      to={`search?categoryName=${text}&offset=0`}
      sx={{
        borderRadius: "10px",
        px: 1,
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.1)",
        }
      }}>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  )
};

export default SidebarItem;