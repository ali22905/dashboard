import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../themes";
import { Link } from "react-router-dom";
// the icons in the topbar
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from '@mui/icons-material/Logout';
// redux
import { logout } from '../../store/authenticationSlice';
import { useDispatch, useSelector } from 'react-redux';


const Topbar = () => {
  // this allows you to have access to the theme provided in the app.js
  const theme = useTheme()
  // this will change the colors weight in mui according to the theme
  const colors = tokens(theme.palette.mode) // grey[500]
  const colorMode = useContext(ColorModeContext)
  // redux
  const { authTokens, current_user } = useSelector(state => state.authentication)
  const dispatch = useDispatch()



  const handleLogout = () => {
    dispatch(logout())
  }


  return (
    // the box is same as div
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        {current_user && (
          <IconButton onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        )}
        <IconButton>
          <Link style={{color: 'inherit', textDecoration: 'none'}} to={current_user ? `/profile/${current_user.user_id}/` : 'form'} > <PersonOutlinedIcon /></Link>
        </IconButton>
      </Box>
    </Box>
  );
}

export default Topbar;
