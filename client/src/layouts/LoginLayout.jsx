import React from "react";
import {
  Box,
  Button,
  Checkbox, Container,
  FormControlLabel,
  Grid,
  TextField, Typography
} from "@mui/material";
import {Link} from "react-router-dom";
import {loginUser, useToken} from "../service/auth";
import {toast} from "react-toastify";

const LoginLayout = () => {
  const { setToken } = useToken();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const res = await loginUser({
      "username": formData.get('username'),
      "password" :formData.get('password')
    });

    if(res.error) {
      toast.error(res.error.message, {
        position: "top-center",
        theme: 'dark'
      })
    } else {
      setToken(res.data);
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Email Address"
            name="username"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginLayout;