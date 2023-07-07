// settings
import { useState } from "react";
import { tokens } from "../../themes";
import { Link } from "react-router-dom";
// prosidebar and mui components
import { ProSidebarProvider, Sidebar as ProSidebar, Menu, MenuItem, sidebarClasses } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
// mui icons
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
// redux
import { useDispatch, useSelector } from 'react-redux';



// item for every sidebar section
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <Link to={to}>
      <MenuItem 
        active={selected === title}
        style={{color: colors.grey[100]}} 
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
      </MenuItem>
    </Link>
  )
}



const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selected, setSelected] = useState('Dashboard');
  // redux
  const { authTokens, current_user } = useSelector(state => state.authentication)
  // styling
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  return (
    <Box
    // overide the css of the react pro gahz sidebar
    sx={{
        border: 'none',
        height: '109%',
        "& .ps-sidebar-root": {
          height: '109% !important',
          overflow: 'hidden',
          maxHeight: '100% !important'
        },
        // its like sass get the .pro-sidebar-inner from inside this box
        "& .ps-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .ps-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .ps-menu-button.ps-active": {
          color: `#868dfb !important`,
        },
        "& .ps-menu-button:hover": {
          color: `#868dfb !important`,
        },
        "& .ps-menu-button": {
          transition: '0.2s',
        },
        "& .ps-sidebar-container": {
          overflow: 'hidden'
        },
      }}
    >
      <ProSidebarProvider style={{height: '109% !important', overflow: 'hidden',}} collapsed={collapsed}>
        <ProSidebar 
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: `${colors.primary[400]}`,
            height: '100%',
          },
        }}      
        >
          <Menu iconShape="square"
              menuItemStyles={{
                button: ({ level, active, disabled, open }) => {
                  // only apply styles on first level elements of the tree
                  if (level === 0)
                    return {
                      color: open ? '#fff' : '#868dfb',
                      "&:hover": {
                        background: "transparent"
                      },
                    };
                },
              }}
          >
            {/* LOGO AND MENU ICON */}
            <MenuItem
              onClick={() => setCollapsed(!collapsed)}
              icon={collapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "10px 0 20px 0",
                color: colors.grey[100],
              }}
            >
              {!collapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <Typography variant="h3" color={colors.grey[100]}>
                    ADMINIS
                  </Typography>
                  <IconButton 
                  onClick={() => setCollapsed(!collapsed)}
                  >
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>

            {!collapsed && (
              <Box mb="25px">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                    alt="profile-user"
                    width="100px"
                    height="100px"
                    src={`../../assets/no-user.png`}
                    style={{ cursor: "pointer", borderRadius: "50%" }}
                  />
                </Box>
                <Box textAlign="center">
                  <Typography
                    variant="h2"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                  >
                    {current_user ? current_user.username : <Link style={{color: 'inherit', textDecoration: 'none'}} to='/form'>Login</Link>}
                  </Typography>
                  <Typography variant="h5" color={colors.greenAccent[500]}>
                    {current_user ? current_user.access_level : 'Unknown user'}
                  </Typography>
                </Box>
              </Box>
            )}
            <Box paddingLeft={collapsed ? undefined : "10%"}>
              <Item
                title="Home"
                to="/"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Data
              </Typography>
              <Item
                title="Manage Team"
                to="/team"
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Contacts Information"
                to="/contacts"
                icon={<ContactsOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Invoices Balances"
                to="/invoices"
                icon={<ReceiptOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Pages
              </Typography>
              <Item
                title="Profile Form"
                to="/form"
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Calendar"
                to="/calendar"
                icon={<CalendarTodayOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="FAQ Page"
                to="/faq"
                icon={<HelpOutlineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Charts
              </Typography>
              <Item
                title="Bar Chart"
                to="/bar"
                icon={<BarChartOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Pie Chart"
                to="/pie"
                icon={<PieChartOutlineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Line Chart"
                to="/line"
                icon={<TimelineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Geography Chart"
                to="/geography"
                icon={<MapOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          </Menu>
        </ProSidebar>
      </ProSidebarProvider>

    </Box>
  );
}

export default Sidebar;
