import React, { useState } from 'react';
import { Grid, TextField, Button, Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../configData';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        username: '',
        password: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: '',
        });
    };

    const login = async (formData)=>{
        try {
            const response = await axios.post(`${BASE_URL}/api/Users/login`, formData);
            if (response.status === 201) {
                alert('You have Logined successfully')
            }else{
                console.log("res",response);
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        } 
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const { username, password } = formData;

        if (!username.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                username: 'Username is required',
            }));
            return;
        }
        if (!password.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: 'Password is required',
            }));
            return;
        }
        login(formData)
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Card elevation={4} style={{ backgroundColor: '#333', color: '#fff' }}>
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            Login
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="username"
                                placeholder='Username'
                                value={formData.username}
                                onChange={handleChange}
                                error={Boolean(errors.username)}
                                helperText={errors.username}
                                InputProps={{ style: { color: 'white', backgroundColor: 'black' } }}
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="password"
                                placeholder='Password'
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                error={Boolean(errors.password)}
                                helperText={errors.password}
                                InputProps={{ style: { color: 'white', backgroundColor: 'black' } }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                size="large"
                                style={{ marginTop: '1rem' }}
                            >
                                Login
                            </Button>
                        </form>
                        <Link to={'/register'}   >
                            <Typography sx={{ mt: 1, textAlign: 'center', color: 'white', textDecoration: 'none' }}>Create new account</Typography>
                        </Link>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default LoginPage;
