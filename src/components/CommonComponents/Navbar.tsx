import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/Slice/authSlice';
import Logo from '../../Image/GsynergyLogo.svg';
const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <img src={Logo} alt="Company Logo" style={{ height: '40px' }} />
        </Typography>
        {isAuthenticated ? (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button color="inherit">Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
