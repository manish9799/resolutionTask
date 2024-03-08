import React from 'react';
import { Link } from 'react-router-dom';
import { navConfig } from './configData';
import { Stack, Typography } from '@mui/material';

const Navbar = () => {
    return (
        <>
            <div style={{ backgroundColor: 'black' }}>
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '3px', paddingBottom: '15px', position: 'relative' }}>
                    <Typography color={'white'}> UserManagement</Typography>
                    <Stack direction='row' width={'30%'}>
                        <ul style={{ display: 'flex', justifyContent: 'center', listStyleType: 'none', padding: 0 }}>
                            {navConfig?.map((item, i) => (
                                <li key={i} style={{ padding: '0px' }}>
                                    <Link to={`${item.path}`} style={{ color: 'white', textDecoration: 'none', padding: '10px' }}>
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Stack>
                </div>
            </div>
        </>
    );
};

export default Navbar;
