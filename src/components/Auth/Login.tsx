import React, { useState } from 'react';
import {
  Box,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Card,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/Slice/authSlice';
import { useNavigate } from 'react-router-dom';
export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Manual authentication logic
    if (email === 'demo@example.com' && password === 'password') {
      dispatch(login(email));
      navigate('/Dashboard');
    } else {
      setError('Invalid email or password');
    }
  };
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background:
          'linear-gradient(135deg, rgb(47, 138, 156), rgb(141, 142, 143))',
      }}
    >
      <CssBaseline />
      <Card
        sx={{
          padding: 4,
          width: '100%',
          maxWidth: 400,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: 'white',
        }}
      >
        <Typography variant="h4" textAlign="center" gutterBottom>
          Sign In
        </Typography>
        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          {error && <Typography color="error">{error}</Typography>}
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            fullWidth
          >
            Login
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
