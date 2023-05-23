import {
  Drawer,
  List,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import SidebarItem from "./SidebarItem";

const Sidebar = ({ isSidebarOpen, setSidebarOpen, categories }) => {
  return (
    <Drawer
      anchor="left"
      open={isSidebarOpen}
      onClose={() => setSidebarOpen(false)}
    >
      <Box
        sx={{
          width: 350,
          height: "100%",
          backgroundColor: "#221F1F",
          color: "#FFFFFF",
          "& .MuiListItemIcon-root": {
            color: "#FFFFFF"
          },
          "& .MuiIconButton-root:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          }
        }}
        role="presentation"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px={2}
          pt={2}
        >
          <Typography
            variant="body1"
            component="h6"
          >
            Категорії
          </Typography>
          <IconButton onClick={() => setSidebarOpen(false)}>
            <Close sx={{ color: "#FFF" }} />
          </IconButton>
        </Box>
        <List>
          {categories.map(item => 
            <SidebarItem text={item.name} key={item.id} />)}
        </List>
      </Box>
    </Drawer>
  )
};

export default Sidebar;
