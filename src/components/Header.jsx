import React from "react";
import "./Header.css";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import AppsIcon from "@mui/icons-material/Apps";
import Avatar from "@mui/material/Avatar";

const Header = ({ photoURL, setIsSidebarOpen }) => {
  // Function to open the sidebar
  const openSidebar = () => setIsSidebarOpen(true);

  return (
    <div className="HeaderContainer">
      <div className="HeaderMenuIcon">
        <MenuIcon onClick={openSidebar} />
      </div>
      <div className="HeaderLogo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Drive_icon_%282020%29.svg/1024px-Google_Drive_icon_%282020%29.svg.png"
          alt="Google Drive"
        />
        <span>Drive</span>
      </div>
      <div className="HeaderSearch">
        <SearchIcon />
        <input type="text" placeholder="Search in Drive" />
        <FormatAlignCenterIcon />
      </div>
      <div className="HeaderIcons">
        <span>
          <HelpOutlineIcon />
          <SettingsIcon />
        </span>
        <span>
          <AppsIcon />
          <Avatar src={photoURL} />
        </span>
      </div>
    </div>
  );
};

export default Header;
