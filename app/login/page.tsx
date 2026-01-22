"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Switch,
  Grid as Grid2,
} from "@mui/material";

// Dummy translation function and logo placeholders
const t = (key: string) => {
  const parts = key.split('.');
  return parts[parts.length - 1];
};
const moment = () => ({ year: () => new Date().getFullYear() });
const CtMLogo = "/ctm-01.png";
const CtMLoginImage = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "" });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validate = () => {
    let tempErrors = { email: "" };
    let isValid = true;

    if (!email) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        console.log("Logging in with:", email);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        localStorage.setItem("isLoggedIn", "true");
        router.push("/dashboard");
      } catch (error) {
        console.error("Login Error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Grid2
      container
      sx={{
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Left side with the login form */}
      <Grid2
        size={{ xs: 12, md: 6 }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        bgcolor="#f5f5f5"
        sx={{
          padding: "20px", // Add some padding to prevent content from touching edges
        }}
      >
        <img
          src={CtMLogo}
          alt="CTM"
          style={{ width: "120px", marginTop: "15px", marginBottom: "10px" }}
        />
        <Typography variant="subtitle2" gutterBottom>
          {t("global.Logintoyouraccount")}
        </Typography>

        <form onSubmit={handleSubmit} style={{ width: "75%" }}>
          <TextField
            type="email"
            label={t("global.EMailId")}
            variant="outlined"
            fullWidth
            margin="normal"
            id="email"
            name="email"
            placeholder="E-Mail Id"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: "" });
            }}
            error={Boolean(errors.email)}
            helperText={errors.email}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "#F9FAFB",
                "& fieldset": {
                  borderColor: "#E5E7EB",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#9CA3AF",
              },
            }}
          />

          <TextField
            label={t("global.Password")}
            variant="outlined"
            fullWidth
            margin="normal"
            id="password"
            name="password"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "#F9FAFB",
                "& fieldset": {
                  borderColor: "#E5E7EB",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#9CA3AF",
              },
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
            <Switch
              id="rememberMe"
              name="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: '#8B5CF6',
                  '& + .MuiSwitch-track': {
                    backgroundColor: '#8B5CF6',
                  },
                },
              }}
            />
            <Typography variant="body2" sx={{ color: "#374151", marginLeft: "8px" }}>
              {t("global.Rememberme")}
            </Typography>
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              marginTop: "3px",
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 600,
              height: "48px",
              backgroundColor: "#8B5CF6",
              "&:hover": {
                backgroundColor: "#7C3AED",
              },
            }}
            disabled={loading}
          >
            {loading ? "Logging in..." : t("global.LogIn")}
          </Button>
        </form>

        <Typography variant="body2" sx={{ marginTop: 10, color: "#000000" }}>
          Copyright © {moment().year()},{" "}
          Alai Labs Pte Ltd. All rights reserved
        </Typography>
      </Grid2>

      {/* Right side with the background image */}
      <Grid2
        size={{ xs: 12, md: 6 }}
        display="flex"
        // justifyContent="center"
        // alignItems="center"
        sx={{
          height: "100%", // Ensure the image section takes full height of the screen
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={CtMLoginImage}
          alt="Login Background"
          sx={{
            width: "100%",
            height: "100vh",
            objectFit: "cover", // Ensure the image covers the entire Grid2 without cropping
          }}
        />

        {/* <Box
          component="div" // Explicitly add component="div" here
          position="absolute"
          bottom={0} // Ensure it's at the very bottom
          sx={{
            //backgroundColor: "transparent",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            color: "white",
            textAlign: "center",
            fontSize: { xs: "24px", md: "36px" }, // Responsive font size
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
          }}
        >
          <Typography variant="h6" component="h2">
            &quot;{t("global.NOCODELOWCODE")}&quot;
          </Typography>
          <Typography variant="body1">
            {t("global.NoCodeLowCodeDesp")}
          </Typography>
        </Box> */}
      </Grid2>
    </Grid2>
  );
};

export default LoginPage;