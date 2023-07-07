// settings
import { useEffect, useState } from 'react';
import { tokens } from "../../themes";
import axios from "axios"
import { useNavigate } from 'react-router-dom';
// components
import { Box, useTheme, Button } from '@mui/material'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useParams } from 'react-router-dom';
// redux
import { logout } from '../../store/authenticationSlice';
import { useDispatch, useSelector } from 'react-redux';


const access_levels = ['user', 'manager', 'agent', 'admin']




const ProfilePage = ({ match }) => {
  const navigate = useNavigate();
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const { id } = useParams();
  const [deleteUserCheck, setDeleteUserCheck] = useState(false);
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    phone: '',
    address1: "",
    city: "",
    access_level: "user",
  });
  // redux
  const { authTokens, current_user } = useSelector(state => state.authentication)
  const dispatch = useDispatch()
  


  const deleteUser = (e) => {
    e.preventDefault()
    axios.delete(`https://dashboard-api-lnux.onrender.com/api/delete-user/${id}/`)
      .then((res) => {
        dispatch(logout())
        navigate('/')
      })
      .catch((err) => {console.log(`axios error in profile page POST request  ::   ${err.message}`)})
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`https://dashboard-api-lnux.onrender.com/api/update_profile/${id}/`, values)
      .then((res) => {
        setValues({
          firstname: res.data.serilzed_data.firstname,
          lastname: res.data.serilzed_data.lastname,
          phone: res.data.serilzed_data.dphone,
          address1: res.data.serilzed_data.address1,
          city: res.data.serilzed_data.city,
          access_level: res.data.serilzed_data.access_level
        })
      })
      .catch((err) => {console.log(`axios error in profile page POST request  ::   ${err.message}`)})
  }


  useEffect(() => { 
    axios.get(`https://dashboard-api-lnux.onrender.com/api/get_user/${id}/`).then((res) => {
      setValues({
        firstname: res.data.firstname,
        lastname: res.data.lastname,
        phone: res.data.phone,
        address1: res.data.address1,
        city: res.data.city,
        access_level: res.data.access_level
      })
    }).catch((err) => {console.log(`axios error in profile page GET request  ::   ${err.message}`)})
  }, []);

  return (
    <Box
    component="form"
    sx={{
      '& > :not(style)': { m: 1, width: '25ch' },
      display: 'flex',
      flexDirection: 'column',
      width: '50%',    
      paddingInline: '20px',
      marginTop: '50px',
    }}
    onSubmit={handleSubmit}
    // noValidate
    >
      <TextField
        id = {current_user && (current_user.user_id === parseInt(id) ? 'filled-basic' : 'standard-read-only-input')}
        InputProps={{
          readOnly: current_user && (current_user.user_id === parseInt(id) ? false : true),
        }}
        label="First name"
        name="firstname"
        variant="filled"
        value={values.firstname}
        onChange={(e) => setValues({ ...values, firstname: e.target.value })}
        sx={{
          width: '100%',
          '& .MuiInputBase-input': {
            width: '100%'
          },
          '& .MuiFormLabel-root': {
            color: colors.grey[200],
            '&.Mui-focused': {
              color: colors.grey[100]
            },
          },
          '& .MuiFilledInput-underline:before': {
            borderBottomColor: colors.blueAccent[700],
          },
          '& .MuiFilledInput-underline:after': {
            borderBottomColor: colors.blueAccent[400],
          },
        }}
      />
      <TextField
        id = {current_user && (current_user.user_id === parseInt(id) ? 'filled-basic' : 'standard-read-only-input')}
        InputProps={{
          readOnly: current_user && (current_user.user_id === parseInt(id) ? false : true),
        }}
        label="Lirst name"
        name="lastname"
        variant="filled"
        value={values.lastname}
        onChange={(e) => setValues({ ...values, lastname: e.target.value })}
        sx={{
          '& .MuiFormLabel-root': {
            color: colors.grey[200],
            '&.Mui-focused': {
              color: colors.grey[100]
            },
          },
          '& .MuiFilledInput-underline:before': {
            borderBottomColor: colors.blueAccent[700],
          },
          '& .MuiFilledInput-underline:after': {
            borderBottomColor: colors.blueAccent[400],
          },
        }}
      />
      <TextField
        id = {current_user && (current_user.user_id === parseInt(id) ? 'filled-basic' : 'standard-read-only-input')}
        InputProps={{
          readOnly: current_user && (current_user.user_id === parseInt(id) ? false : true),
        }}
        label="Phone number"
        name="phone"
        variant="filled"
        type='number'
        value={values.phone}
        onChange={(e) => setValues({ ...values, phone: e.target.value })}
        sx={{
          '& .MuiFormLabel-root': {
            color: colors.grey[200],
            '&.Mui-focused': {
              color: colors.grey[100]
            },
          },
          '& .MuiFilledInput-underline:before': {
            borderBottomColor: colors.blueAccent[700],
          },
          '& .MuiFilledInput-underline:after': {
            borderBottomColor: colors.blueAccent[400],
          },
        }}
      />
      <TextField
        id = {current_user && (current_user.user_id === parseInt(id) ? 'filled-basic' : 'standard-read-only-input')}
        InputProps={{
          readOnly: current_user && (current_user.user_id === parseInt(id) ? false : true),
        }}
        label="Address"
        name="address1"
        variant="filled"
        value={values.address1}
        onChange={(e) => setValues({ ...values, address1: e.target.value })}
        sx={{
          '& .MuiFormLabel-root': {
            color: colors.grey[200],
            '&.Mui-focused': {
              color: colors.grey[100]
            },
          },
          '& .MuiFilledInput-underline:before': {
            borderBottomColor: colors.blueAccent[700],
          },
          '& .MuiFilledInput-underline:after': {
            borderBottomColor: colors.blueAccent[400],
          },
        }}
      />
      <TextField
        id = {current_user && (current_user.user_id === parseInt(id) ? 'filled-basic' : 'standard-read-only-input')}
        InputProps={{
          readOnly: current_user && (current_user.user_id === parseInt(id) ? false : true),
        }}
        label="City"
        name="city"
        variant="filled"
        readonly
        value={values.city}
        onChange={(e) => setValues({ ...values, city: e.target.value })}
        sx={{
          '& .MuiFormLabel-root': {
            color: colors.grey[200],
            '&.Mui-focused': {
              color: colors.grey[100]
            },
          },
          '& .MuiFilledInput-underline:before': {
            borderBottomColor: colors.blueAccent[700],
          },
          '& .MuiFilledInput-underline:after': {
            borderBottomColor: colors.blueAccent[400],
          },
        }}
      />
      <TextField
          id = {current_user && (current_user.user_id === parseInt(id) ? 'outlined-select-currency' : 'standard-read-only-input')}
          InputProps={{
            readOnly: current_user && (current_user.user_id === parseInt(id) ? false : true),
          }}
          select
          label="Access level"
          name="access_level"
          onChange={(e) => setValues({ ...values, access_level: e.target.value })}
          sx={{
            '& .MuiFormLabel-root': {
              color: colors.grey[200],
              '&.Mui-focused': {
                color: colors.grey[100]
              },
            },
            '& .MuiFilledInput-underline:before': {
              borderBottomColor: colors.blueAccent[700],
            },
            '& .MuiFilledInput-underline:after': {
              borderBottomColor: colors.blueAccent[400],
            },
          }}
          value={values.access_level}
          helperText="Please your access level"
        >
          {access_levels.map((access_level) => (
            <MenuItem key={access_level} value={access_level}>
              {access_level}
            </MenuItem>
          ))}
      </TextField>
      {current_user && (current_user.user_id === parseInt(id) && (
        <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100% !important'}}>
          <Button sx={{fontSize: '14px', fontWeight: 'bold'}} type="submit" color="secondary" variant="contained">
              Save
          </Button>
            <Button sx={{
              backgroundColor: ' #cb0a0a', 
              color: colors.grey[100], 
              fontWeight: 'bold', 
              fontSize: '14px',
              transition: '0.3s',
              '&:hover': {
                backgroundColor: '#a90c0c !important',
              },
              }} color="red" variant="error" onClick={deleteUser}>
                DELETE user
            </Button>
        </Box>
      ))}
    </Box>
  )
}

export default ProfilePage