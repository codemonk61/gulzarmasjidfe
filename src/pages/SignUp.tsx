import React, { useState } from "react";
import { TextField, Button, Container, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "@toolpad/core";
import MasjidIcon from "../components/MasjidIcon";

const Signup: React.FC = () => {
    const [name, setName] = useState("");
    const [emailId, setEmailId] = useState("");
    const [securityCode, setSecurityCode] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            const response = await fetch("https://travifunds.onrender.com/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, emailId, securityCode, password }),
            });

            const data = await response.json();
            if (data.success) {
                alert("Signup successful! Please log in.");
                navigate("/login");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Signup Error:", error);
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
                }}
                >
                 <div style={{display: 'flex', justifyContent: "center", alignItems: 'center', height: "100vh"}}><MasjidIcon fill="white" height="300px"/></div>
                </Grid>
                <Grid xs={0} sm={0} md={6} lg={6} xl={6}>
                    <Container maxWidth="xs">
                        <Typography variant="h5">Signup</Typography>
                        <TextField label="Name" color="success" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
                        <TextField label="Email" color="success" fullWidth margin="normal" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
                        <TextField label="Security Code" color="success" fullWidth margin="normal" value={securityCode} onChange={(e) => setSecurityCode(e.target.value)} />
                        <TextField label="Password" color="success" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
                       <Typography sx={{margin: "8px 0px" , textAlign: "right", cursor: "pointer"}} variant="body1" onClick={()=>navigate('/login')}>login?</Typography>
                        <Button variant="contained" color="success" fullWidth onClick={handleSignup}>
                            Signup
                        </Button>
                    </Container>
                </Grid>
            </Grid>
 
    );
};

export default Signup;
