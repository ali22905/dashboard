// settings
import { useEffect, useState } from 'react';
import { ColorModeContext, colorModeContext, useMode } from './themes'
import { Routes, Route } from 'react-router-dom'
// CssBaseline reset our css to default, themeprovider will pass the themes to mui
import { CssBaseline, ThemeProvider } from '@mui/material';
// components
import Topbar from './pages/global/Topbar'
import Sidebar from './pages/global/Sidebar'
import Dashboard from './pages/dashboard/Index'
import Team from './pages/team'
import Contacts from './pages/contacts'
import Invoices from './pages/invoices'
import Form from './pages/form'
import Calendar from './pages/calendar' 
import FAQ from './pages/faq' 
import Bar from './pages/bar'
import Pie from './pages/pie' 
import Line from './pages/line' 
import Geography from './pages/geography' 
import ProfilePage from './pages/profile' 
// redux
import { updateToken, logout } from './store/authenticationSlice';
import { useDispatch, useSelector } from 'react-redux';



function App() {
  const [theme, colorMode] = useMode();
  const [loading, setLoading] = useState(true);
  // redux
  const { authTokens, current_user } = useSelector(state => state.authentication)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUpdateToken = async() => {
      let response = await fetch('https://dashboard-api-lnux.onrender.com/api/token/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // we are passing the refresh token to the url every 5 min to get a new access token and blacklist the old one (madetory for security)
      body: JSON.stringify({'refresh': authTokens?.refresh})
      }).catch(err => console.log(`error from login:   ${err}`));
      let data = await response.json()
      if (response.status ===  200) {
        dispatch(updateToken({data: data}))
      }else {
        // logout the user if any problem happened
        logout()
      }
      if (loading) {
        setLoading(false)
      }
    }
    if(loading) {
      fetchUpdateToken()
    }

    let refreshTokenTime = 1000 * 60 * 9
    let rotateRefreshInterval = setInterval(() => {
      // if there is a user (Tokens) make a new access token
      if (authTokens) {
        fetchUpdateToken()
      }
    }, refreshTokenTime);
    clearInterval(rotateRefreshInterval)
  }, [authTokens, loading]);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className='app'>
          <Sidebar />
          <main style={{width: '-webkit-fill-available', paddingInline: '25px'}} className='content'>
            <Topbar />
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/calendar" element={<Calendar />} /> 
              <Route path="/faq" element={<FAQ />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/profile/:id" element={<ProfilePage />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
