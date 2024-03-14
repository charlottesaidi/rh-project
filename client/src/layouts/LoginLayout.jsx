import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import { Link } from "react-router-dom";
import { loginUser, useToken } from "../service/auth";
import { toast } from "react-toastify";
import Modal from "../components/home/Modal";

const LoginLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buttonStyle, setButtonStyle] = useState({});
  const [moveCount, setMoveCount] = useState(0);
  const [initialPosition, setInitialPosition] = useState({ left: "50%", top: "50%" });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const { setToken } = useToken();

  useEffect(() => {
    // Récupérer la position initiale du champ de mot de passe lors du montage initial
    const handlePasswordInputMount = (element) => {
      if (element) {
        const rect = element.getBoundingClientRect();
        setInitialPosition({ left: `${rect.left}px`, top: `${rect.bottom + 20}px` });
      }
    };

    // Appeler handlePasswordInputMount
    const passwordInput = document.getElementById('password');
    handlePasswordInputMount(passwordInput);

  }, []); // [] pour exécuter une seule fois au montage initial

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const res = await loginUser({
      username: formData.get("username"),
      password: formData.get("password")
    });

    if (res.error) {
      toast.error(res.error.message, {
        position: "top-center",
        theme: "dark"
      });
    } else {
      setToken(res.data);
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    }
  };

  const handleMouseMove = (event) => {
    if (moveCount < 3) {
      const randomX = Math.random() * (window.innerWidth - 200); // 200 est la largeur du bouton
      const randomY = Math.random() * (window.innerHeight - 50); // 50 est la hauteur du bouton
      setButtonStyle({ left: `${randomX}px`, top: `${randomY}px` });
      setMoveCount(moveCount + 1);
    } else {
      setButtonStyle(initialPosition);
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
            sx={{ mb: 1 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              position: "absolute",
              ...buttonStyle,
              width: "200px", // Modifier la largeur du bouton selon votre préférence
              height: "50px" // Modifier la hauteur du bouton selon votre préférence
            }}
            onMouseMove={handleMouseMove}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link variant="body2" onClick={handleOpenModal}>
                Forgot password?
              </Link>
              <Modal isOpen={isModalOpen} onClose={handleCloseModal} text="Dommage" />
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
};

export default LoginLayout;
