import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from "../../themes";

import { mockDataContacts } from "../../data/mockData" 

import Header from "../../components/Header";


const Contacts = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  /*  make header name to display a title for a column and make the fields to assign the key on the data object that will be 
  displayed in the column  */
  
  const columns = [
    { headerName: 'ID', field: 'id', flex: 0.5},
    { headerName: 'Registrar ID', field: 'registrarId', flex: 0.5},
    { headerName: 'Name', field: 'name', flex: 1, cellClassName: "name-column--cell"},
    { headerName: 'Age', field: 'age', headerAlign: 'left', align: 'left', cellClassName: "name-column--cell"},
    { headerName: 'Phone number', field: 'phone', flex: 1, },
    { headerName: 'Email', field: 'email', flex: 1, },
    { headerName: 'Address', field: 'address', flex: 1, },
    { headerName: 'City', field: 'city', flex: 1, },
    { headerName: 'Zip Code', field: 'zipCode', flex: 1, },
  ]


  return (
    <Box m="20px">
      <Header title="CONTACTS" subtitle="The list of Contacts for future refrence" />
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid components={{Toolbar: GridToolbar}} checkboxSelection rows={mockDataContacts} columns={columns} />
      </Box>
    </Box>
  );
}

export default Contacts