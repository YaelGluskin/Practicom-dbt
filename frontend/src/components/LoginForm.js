// Import necessary dependencies
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Container, Grid, Typography, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import axios from 'axios';

const LoginForm = () => {
  const { handleSubmit, control, formState: { errors } } = useForm();
  const [isLoginMode, setIsLoginMode] = useState(true); // Initially set to login mode
  const [showPassword, setShowPassword] = useState(false); // Password visibility state

  const onSubmit = async(data) => {
    console.log(data);
   
      if(isLoginMode){
      // Send login request
      //const { username } = data;
      try {
        const response = await axios.post('http://localhost:5001/loguser/login', data);
        console.log(response.data);
        if (response.data.message === 'Login successful') {
            // Handle successful login
            console.log('User logged in:', response.data.user);
        }
    } catch (error) {
        if (error.response) {
            console.log(error.response.data.message);
        } else {
            console.error('Error:', error.message);
        }
    }
    
    } else {
      try{
      // Send register
      const response = await axios.post('http://localhost:5001/loguser', data)
      console.log(response)
      return(<div>you got register</div>)
    } catch(error)
    {// You can handle form submission logic here, e.g., API calls for login or registration
    console.error(error)
  }
    
  }
  };

  const switchMode = () => {
    setIsLoginMode(!isLoginMode); // Toggle between login and registration mode
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility state
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        {isLoginMode ? 'Login' : 'Register'} Form
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="username"
              control={control}
              defaultValue=""
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  variant={isLoginMode ? "outlined" : "filled"}
                  fullWidth
                  error={!!errors.username}
                  helperText={errors.username ? errors.username.message : ''}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="user_password"
              control={control}
              defaultValue=""
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  variant={isLoginMode ? "outlined" : "filled"}
                  fullWidth
                  error={!!errors.user_password}
                  helperText={errors.user_password ? errors.user_password.message : ''}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid>
          {!isLoginMode && (
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Enter a valid email address"
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    type="email"
                    variant="filled"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ''}
                  />
                )}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {isLoginMode ? 'Login' : 'Register'}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={switchMode} fullWidth>
              {isLoginMode ? 'Switch to Register' : 'Switch to Login'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default LoginForm;