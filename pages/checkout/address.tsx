import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React from 'react'
import { ShopLayout } from '../../components/layouts/ShopLayout'

export const AddressPage = () => {
  return (
    <ShopLayout title="Direcciones" pageDescription="Agregar direcciones de envío">
        <Typography variant="h1" component='h1'>Direcciones</Typography>

        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <TextField label="Nombre" variant="filled" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label="Apellido" variant="filled" fullWidth />
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField label="Dirección" variant="filled" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label="Dirección 2 (opcional)" variant="filled" fullWidth />
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField label="Código Postal" variant="filled" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label="Ciudad" variant="filled" fullWidth />
            </Grid>

            <Grid item xs={12} sm={6}>
                <FormControl  fullWidth>
                    <Select
                        variant="filled"
                        label="pais"
                        value={1}
                        >
                            <MenuItem value={1}>Uruguay</MenuItem>
                            <MenuItem value={2}>Costa Rica</MenuItem>
                            <MenuItem value={3}>Estados Unidos</MenuItem>
                        </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField label="Teléfono" variant="filled" fullWidth />
            </Grid>
            
        </Grid>

        <Box display="flex" justifyContent="center">
            <Button color="secondary" className="circular-btn" size='large' sx={{mt:3}} >
                Revisar pedido
            </Button>
        </Box>
    </ShopLayout>
  )
}

export default AddressPage