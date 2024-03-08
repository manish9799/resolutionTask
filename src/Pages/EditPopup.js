import { Box, Button, Card, Grid, Modal, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../configData';

const EditPopup = ({editDataValue,editOpenModal,id}) => {

    const [editPopup,setEditPopup] = editOpenModal;
    const [editvalue,setEditValue] = editDataValue;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditValue({
            ...editvalue,
            [name]: value
        });
    };

    const Close =()=>{
        setEditValue({})
        setEditPopup(false)
    }

    const onSubmit = async (event)=> {
        event.preventDefault();
        try {
            const response = await axios.put(`${BASE_URL}/api/Users/${id}`, editvalue);
            if (response.status === 204) {
                alert('Data updated Successfully')
            }else{
                console.log("res",response);
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        } 

    }
  return (
    <Modal
    open={editPopup}
    onClose={Close}
    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
>
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Card sx={{ backgroundColor: '#ffff', pb: '10px', maxWidth:'80%', borderRadius: '20px' }}>
            <Typography sx={{ fontSize: '24px', textAlign: 'center', padding: '10px', fontWeight: '600' }}>Edit Data</Typography>
            <form onSubmit={onSubmit} >
                <Grid container spacing={2} sx={{mx:3}}  >
                <Grid item xs={10.5} sm={5.5} md={3.7} lg={3.7}>
                <TextField
                        fullWidth
                        margin="normal"
                        label="Username"
                        name="username"
                        value={editvalue.userName}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                       
                    />
                    </Grid>
                    <Grid item xs={10.5} sm={5.5} md={3.7} lg={3.7}>
                         <TextField
                        fullWidth
                        margin="normal"
                        label="Address"
                        name="address"
                        value={editvalue.address}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                       
                    />
                    </Grid>
                    <Grid item xs={10.5} sm={5.5} md={3.7} lg={3.7}>
                        <TextField
                        fullWidth
                        margin="normal"
                        label="DOB"
                        name="dob"
                        type="date"
                        value={editvalue.dob}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    
                    
                    </Grid>
                    <Box sx={{ width: '100%', m: 2, }}>
                        <Grid item xs={12}
                            md={9}>
                            <Stack direction={'row'} gap={3} sx={{ width: '50%' }}>
                                <Button fullWidth variant="contained" type='submit'> 'Update'</Button>
                                <Button fullWidth variant="contained" color='error' onClick={Close} > Cancel</Button>
                            </Stack>
                        </Grid>
                    </Box>
                </Grid>
            </form>
        </Card>
    </Box>
</Modal>
  )
}

export default EditPopup