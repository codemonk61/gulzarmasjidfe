import React, { useState, useContext } from "react";
import { TextField, Button, Container, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import MasjidIcon from "../components/MasjidIcon";

const Login: React.FC = () => {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch("https://travifunds.onrender.com/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ emailId, password }),
            });

            const data = await response.json();
            if (data.success) {
                auth?.login(data.token);
                navigate("/");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Login Error:", error);
        }
    };

    return (
        <Grid container alignItems={"center"}>
            <Grid xs={0} sm={0} md={6} lg={6} xl={6}
                sx={{
                    height: '100vh',
                    background: "#2f7d32",
                    display: { xs: "none", sm: "none", md: "flex", xl: "flex", lg: "flex" }, // Hides on mobile
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <div style={{ display: 'flex', justifyContent: "center", alignItems: 'center', height: "100vh" }}><MasjidIcon fill="white" height="300px" /></div>
            </Grid>
            <Grid xs={0} sm={0} md={6} lg={6} xl={6}>
                <Container maxWidth="xs">
                    <Typography variant="h5">Login</Typography>
                    <TextField color="success" label="Email" fullWidth margin="normal" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
                    <TextField color="success" label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <Typography sx={{ margin: "8px 0px", textAlign: "right", cursor: "pointer" }} variant="body1" onClick={() => navigate('/signup')}>Signup?</Typography>

                    <Button variant="contained" color="success" fullWidth onClick={handleLogin}>
                        Login
                    </Button>


                </Container>
            </Grid>
        </Grid>
    );
};

export default Login;
