"use client";
import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Image from "next/image";
import logo from "../../../public/logo.jpg";
import { useRouter } from "next/navigation";
const drawerWidth = 240;

const navItemsNew = [
  {
    url: "/",
    title: "Home",
  },
  {
    url: "/our-partners",
    title: "Our Partners",
  },
  {
    url: "/services",
    title: "Services",
  },
  {
    url: "/our-vision",
    title: "Our Vision",
  },
  {
    url: "/about-us",
    title: "About Us",
  },
  {
    url: "/contact-us",
    title: "Contact Us",
  },
];
const navItems = [
  "Home",
  "Our Partners",
  "Services",
  "Our Vision",
  "About Us",
  "Contact Us",
];

function Header(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [themeColor, setThemeColor] = React.useState("red");
  const router = useRouter();
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  //  for mobileView
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Image
        src={logo}
        alt="Dococare"
        title="Donocare.com"
        height={10}
        width={500}
        blurDataURL="blur"
      />
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  //  for mobileView

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: `${themeColor}` }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Image
              src={logo}
              alt="Dococare"
              title="Donocare.com"
              height={10}
              width={60}
              blurDataURL="blur"
            />
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItemsNew.map((item, index) => (
              <Button
                key={index}
                sx={{ color: "#fff" }}
                onClick={() => router.push(`${item.url}`)}
              >
                <span style={{ textTransform: "capitalize" }}>
                  {item.title}
                </span>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

Header.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Header;
