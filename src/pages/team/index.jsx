import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { tokens } from "../../themes";

import { mockDataTeam } from "../../data/mockData"

import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";

import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from 'axios'



/*
{
  "id": 1,
  "firstname": "Obad",
  "lastname": "Wershana",
  "phone": 1027393406,
  "address1": "USA",
  "city": "Duplin",
  "access_level": "manager",
  "created": "2023-06-01T07:34:39.537412Z",
  "updated": "2023-06-01T09:03:09.591803Z",
  "user": 3
}

{
  "id": 3,
  "password": "pbkdf2_sha256$390000$Kypu0VIx8DRuNI6nzaZUL2$Rq6S3u4KAHPPBu7DJFhuRhzw+grK5hYJ8fMJj3EGn3M=",
  "last_login": "2023-06-01T07:34:49.613449Z",
  "is_superuser": true,
  "username": "ali",
  "first_name": "",
  "last_name": "",
  "email": "aly2292005@gmail.com",
  "is_staff": true,
  "is_active": true,
  "date_joined": "2023-06-01T07:34:39.365527Z",
  "groups": [],
  "user_permissions": []
}
*/ 



const Team = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)


  /*  make header name to display a title for a column and make the fields to assign the key on the data object that will be 
  displayed in the column  */
  
  const columns = [
    { headerName: 'ID', field: 'id'},
    { headerName: 'Name', field: 'name', flex: 1, cellClassName: "name-column--cell"},
    { headerName: 'Phone number', field: 'phone', flex: 1, },
    { headerName: 'Age', field: 'age', headerAlign: 'left', align: 'left', cellClassName: "name-column--cell"},
    { headerName: 'Email', field: 'email', flex: 1, },
    { 
    headerName: 'Access level', 
    field: 'access', 
    flex: 1,
    // {raw: {access}} ==> this will get the access key from the main data object 
    renderCell: ({ row: { access } }) => {
      return (
        <Box
          width="60%"
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="center"
          backgroundColor={
            access === "admin"
              ? colors.greenAccent[600]
              : access === "manager"
              ? colors.greenAccent[700]
              : colors.greenAccent[700]
          }
          borderRadius="4px"
        >
          {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
          {access === "manager" && <SecurityOutlinedIcon />}
          {access === "user" && <LockOpenOutlinedIcon />}
          <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
            {access}
          </Typography>
        </Box>
      );
    },
  },
  ]


  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} />
      </Box>
    </Box>
  )
}

export default Team