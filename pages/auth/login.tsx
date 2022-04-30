import React from 'react'
import NextLink from 'next/link'
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material'
import AuthLayout from '../../components/layouts/AuthLayout'

const LoginPage = () => {
  return (
    <AuthLayout title="Iniciar sesión">
        <Box sx={{width: 350, padding: '10px 20px'}}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h1" component='h1'>Iniciar sesión</Typography>
                </Grid>

                <Grid item xs={12}>
                    <TextField label="Correo electrónico" variant="filled" fullWidth />
                </Grid>

                <Grid item xs={12}>
                    <TextField label="Contraseña" type="password" variant="filled" fullWidth />
                </Grid>

                <Grid item xs={12}>
                    <Button color="secondary" className="circular-btn" size="large" fullWidth>
                        Iniciar sesión
                    </Button>
                </Grid>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="end">
                <NextLink href="/auth/register" passHref>
                    <Link underline="always">
                        ¿No tienes cuenta?
                    </Link>
                </NextLink>
            </Grid>

        </Box>
        </AuthLayout>
  )
}

export default LoginPage