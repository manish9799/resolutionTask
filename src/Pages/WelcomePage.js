import { Avatar, Card, Typography } from '@mui/material'
import React from 'react'

const WelcomePage = () => {
    return (
        <Card sx={{ backgroundColor: 'black', pb: '10px', maxWidth: '50%', borderRadius: '20px', margin: '0 auto', mt: 5, minHeight: '80vh' }}>
            <Typography sx={{ fontSize: '24px', textAlign: 'center', padding: '10px', fontWeight: '600', color: 'white', p: 3 }}>Welcome User</Typography>
            <Avatar
                sx={{
                    width: 180,
                    height: 180,
                    margin: '0 auto 1rem',
                    backgroundColor: 'transparent',
                    border: '2px solid #fff',
                }}
                src={''}
            >
            </Avatar>
        </Card>
    )
}

export default WelcomePage