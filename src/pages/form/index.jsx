// system
import { useEffect, useState } from "react";
import { tokens } from "../../themes";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
// libraries
// formik and yup are a library to make forms easly
import { Formik } from "formik";
import * as yup from "yup";
//  custom and MUI components
import { Box, Button, TextField, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
// redux
import { login } from '../../store/authenticationSlice';
import { useDispatch, useSelector } from 'react-redux';




// form validation and schema
const phoneRegex = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;


// global schema
const userSchema = {
  username: yup.string().required("this field can't be empty"),
  password: yup.string().required("this field can't be empty"),
}
const userSchemaLogin = yup.object().shape(userSchema)
// schema for registeration
const userSchemaRegister = yup.object().shape({
  ...userSchema,
  email: yup.string().email("invalid email").required("this field can't be empty"),
})


// global intial values
const initialValues = {
  // if there is no imput it will pop this text in the required function
  username: yup.string().required("this field can't be empty"),
  password: yup.string().required("this field can't be empty"),
}
const initialValuesLogin = yup.object().shape(initialValues)
// intial values for registeration
const initialValuesRegister = yup.object().shape({
  ...initialValues,
  email: yup.string().email("invalid email").required("this field can't be empty"),
})







const Form = () => {
  const navigate = useNavigate();
  // states
  const [showInfo, setShowInfo] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState('Error');
  // styling
  const theme = useTheme();
  const colors = tokens(theme.palette.mode)
  const isNonMobile = useMediaQuery("(min-width:600px)")
  // redux
  const { authTokens, current_user } = useSelector(state => state.authentication)
  const dispatch = useDispatch()

  const handleFormSubmit = (values) => {
    if (isLogin) {
      dispatch(login(values))
      navigate('/')
    }else {
      let data = {
        email: values.email,
        username: values.username,
        password: values.password
      }
      axios.post('https://dashboard-api-lnux.onrender.com/api/add_user/', data)
        .then((res) => {
          if (res.status === 201) {
            setShowInfo(true)
          }else {
            setErrorMessage(res.data.error)
            setShowError(true);
          }
        })
        .catch((err) => `error when adding a user  ::   ${err.message}`)
    }
  }


  const handleInfoClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowInfo(false)
  }

  const handleErrorClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowError(false);
  };


  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />
      <Snackbar open={showInfo} autoHideDuration={6000} onClose={handleInfoClose}>
        <Alert onClose={handleInfoClose} severity="success" sx={{ width: '100%' }}>
          User created successfully! please login.
        </Alert>
      </Snackbar>
      <Snackbar open={showError} autoHideDuration={6000} onClose={handleErrorClose}>
        <Alert onClose={handleErrorClose} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <Box display="flex" justifyContent="start" mt="20px" mb="20px" >
        <Button 
        sx={{transition: '0.3s', backgroundColor: isLogin && `${colors.blueAccent[600]} !important`, color: isLogin && `${colors.grey[100]} !important`}} 
        type="submit" 
        color="secondary" 
        variant="contained" 
        onClick={() => setIsLogin(true)} >
          Login
        </Button>
        <Button 
        type="submit" 
        color = 'secondary'
        variant="contained" 
        sx={{marginLeft: "20px", transition: '0.3s', backgroundColor: !isLogin && `${colors.blueAccent[600]} !important`, color: !isLogin && `${colors.grey[100]} !important`}} 
        onClick={() => setIsLogin(false)} >
          Register
        </Button>
      </Box>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
        validationSchema={isLogin ? userSchemaLogin : userSchemaRegister}
      >
        {/* those values are already in the formik component above and we are getting them from it */}
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit, }) => (
          <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="username"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.username}
              name="username"
              // the error is the red line
              // touched => to make error on blur if the field is not accestable
              error={!!touched.username && !!errors.username}
              // the helperText is the text error
              helperText={touched.username && errors.username}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="password"
              label="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={!!touched.password && !!errors.password}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 2" }}
            />
            {!isLogin && (
              <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={!!touched.email && !!errors.email}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            )}
            {/* <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Contact Number"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.contact}
              name="contact"
              error={!!touched.contact && !!errors.contact}
              helperText={touched.contact && errors.contact}
              sx={{ gridColumn: "span 4" }}
            /> */}
            {/* <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Address 1"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.address1}
              name="address1"
              error={!!touched.address1 && !!errors.address1}
              helperText={touched.address1 && errors.address1}
              sx={{ gridColumn: "span 4" }}
            /> */}
            {/* <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Address 2"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.address2}
              name="address2"
              error={!!touched.address2 && !!errors.address2}
              helperText={touched.address2 && errors.address2}
              sx={{ gridColumn: "span 4" }}
            /> */}
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              {isLogin ? "Login" : "Create New User"}
            </Button>
          </Box>
        </form>
        )}
      </Formik>
    </Box>
  )
}

export default Form