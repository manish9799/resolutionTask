import React, { useState } from 'react';
import { Grid, TextField, Button, Card, CardContent, Typography, Avatar, IconButton, Stack } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../configData';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
        dob: '',
        address: '',
        email: '',
        profilePicturePath: '',
    });
    const [errors, setErrors] = useState({
        userName: '',
        password: '',
        dob: '',
        address: '',
        email: '',
        profilePicturePath: '',
    });

    const uploadImg = (event) => {
        setFormData({ ...formData, profilePicturePath: URL.createObjectURL(event.target.files[0]) });
    };

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

    const submitData = async (formData) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/register`, formData);
            if (response.status === 201) {
                alert('You have registered successfully')
            }else{
                console.log("res",response);
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        } 
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const { password, email } = formData;
        const requiredFields = ['userName', 'password', 'dob', 'address', 'email', 'profilePicturePath'];
        let isValid = true;
        let newErrors = { ...errors };
        requiredFields.forEach(field => {
            if (!formData[field].trim()) {
                newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
                isValid = false;
            }
        });

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            newErrors.email = 'Invalid email address';
            isValid = false;
        }
        if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
            isValid = false;
        }
        if (!isValid) {
            setErrors(newErrors);
            return;
        }
        submitData(formData);
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100%', marginTop: '50px', marginBottom: '50px' }}>
            <Grid item xs={12} sm={8} md={6} lg={4.5}>
                <Card elevation={4} style={{ backgroundColor: '#333', color: '#fff', mb: 2 }}>

                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            Register
                        </Typography>

                        <form onSubmit={handleSubmit}>
                            <Stack direction={'row'} sx={{ position: 'relative' }}>
                                <Avatar
                                    sx={{
                                        width: 120,
                                        height: 120,
                                        margin: '0 auto 1rem',
                                        backgroundColor: 'transparent',
                                        border: '2px solid #fff',
                                    }}
                                    src={formData.profilePicturePath}
                                >
                                </Avatar>
                                <IconButton
                                    component="label"
                                    sx={{
                                        height: '35px',
                                        width: '35px',
                                        top: '115px',
                                        right: '10px',
                                        right: '45%',
                                        transform: 'translate(50%, -50%)',
                                        borderRadius: '50%',
                                    }}
                                >
                                    <AddCircleIcon style={{ color: '#fff', fontSize: 28, backgroundColor: 'black', borderRadius: '50%', border: 'none' }} />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={(e) => uploadImg(e)}
                                    />
                                </IconButton>
                            </Stack>
                            <TextField
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="userName"
                                placeholder='userName'
                                value={formData.userName}
                                onChange={handleChange}
                                error={Boolean(errors.userName)}
                                helperText={errors.userName}
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
                            <TextField
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="dob"
                                placeholder='DOB'
                                type="date"
                                value={formData.dob}
                                onChange={handleChange}
                                error={Boolean(errors.dob)}
                                helperText={errors.dob}
                                InputProps={{ style: { color: 'white', backgroundColor: 'black' } }}
                            />
                            <TextField
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="address"
                                placeholder='Address'
                                value={formData.address}
                                onChange={handleChange}
                                error={Boolean(errors.address)}
                                helperText={errors.address}
                                InputProps={{ style: { color: 'white', backgroundColor: 'black' } }}
                            />
                            <TextField
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="email"
                                placeholder='Email ID'
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                error={Boolean(errors.email)}
                                helperText={errors.email}
                                InputProps={{ style: { color: 'white', backgroundColor: 'black' } }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                size="large"
                                style={{ marginTop: '1rem', backgroundColor: '#2196f3', color: '#fff' }}
                            >
                                Register
                            </Button>
                        </form>
                        <Link to={'/'}   >
                            <Typography sx={{ mt: 1, textAlign: 'center', color: 'white', textDecoration: 'none' }}>Already have an account. Login Now</Typography>
                        </Link>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default RegisterPage;
