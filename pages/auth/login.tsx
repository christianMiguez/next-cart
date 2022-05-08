import React, { useContext, useState } from 'react'
import {AuthContext} from '../../context/auth/'

import NextLink from 'next/link'
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import AuthLayout from '../../components/layouts/AuthLayout'
import { validations } from '../../utils'
import tesloAPI from '../../api/tesloApi'
import { ErrorOutline } from '@mui/icons-material'
import { useRouter } from 'next/router'

type FormData = {
    email: string,
    password: string,
  };

const LoginPage = () => {

    const router = useRouter()
    const {loginUser} = useContext(AuthContext);
    const [showError, setShowError] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onLoginUser = async({email, password}: FormData) => {

        setShowError(false)

        const isValidLogin = await loginUser(email, password)
        
        if(! isValidLogin) {
            setShowError(true)
            setTimeout(() => {
                setShowError(false)
            }
            , 4000)
            return;
        }

        router.replace('/')

        
    }
    
  return (
    <AuthLayout title="Iniciar sesión">
        <form onSubmit={handleSubmit(onLoginUser)}>
            <Box sx={{width: 350, padding: '10px 20px'}}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h1" component='h1'>Iniciar sesión</Typography>
                    </Grid>

                    <Chip label="No reconocemos ese usuario / contraseña" color="error" icon={<ErrorOutline />} className="fadeIn" sx={{display: showError ? 'flex' : 'none' }}/>

                    <Grid item xs={12}>
                        <TextField 
                        label="Correo electrónico" 
                        variant="filled" 
                        type="email" 
                        fullWidth 
                        {...register('email', {
                            required: 'Este campo es requerido',
                            validate: validations.isEmail
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField label="Contraseña" type="password" variant="filled" fullWidth {...register('password', {
                            required: 'Este campo es requerido',
                            minLength: {value: 6, message: 'La contraseña debe tener al menos 6 caracteres'},
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button color="secondary" className="circular-btn" size="large" type="submit" fullWidth>
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
        </form>
        </AuthLayout>
  )
}

export default LoginPage
