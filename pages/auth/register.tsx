import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material'
import AuthLayout from '../../components/layouts/AuthLayout'
import { useForm } from 'react-hook-form'
import { tesloAPI } from '../../api'
import { ErrorOutline } from '@mui/icons-material'
import { validations } from '../../utils'
import { AuthContext } from '../../context/auth'

type FormData = {
    name     : string,
    email    : string,
    password : string
}

const RegisterPage = () => {

    const router = useRouter()
    const {registerUser} = useContext(AuthContext);
    
     const [showError, setShowError] = useState(false)
     const [errorMessage, setErrorMessage] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onRegisterForm = async({email, name, password}: FormData) => {

            setShowError(false)
            const resp = await registerUser(email, name, password);

            if (resp.hasError) {
                setShowError(true)
                setErrorMessage(resp.message || 'Error al registrarse')
                setTimeout(() => {
                    setShowError(false)
                }, 4000)
                return
            }


            
            router.replace('/')
           
            // OTRA ALTERNATIVA:
            // try {
            //     const {data} = await tesloAPI.post('/user/register', {name, email, password});
            //     const {token, user} = data;
            //     console.log({token, user});
            // } catch (error) {
            //     console.log(error);
            //     setShowError(true)
            //     setTimeout(() => {
            //         setShowError(false)
            //     }, 4000)
            // }
    }

    return (
        <AuthLayout title="Crear cuenta">
            <form onSubmit={handleSubmit(onRegisterForm)}>
                <Box sx={{width: 350, padding: '10px 20px'}}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h1" component='h1'>Crear cuenta</Typography>
                        </Grid>

                        <Chip label="Errores en el formulario" color="error" icon={<ErrorOutline />} className="fadeIn" sx={{display: showError ? 'flex' : 'none' }}/>


                        <Grid item xs={12}>
                            <TextField label="Nombre" variant="filled" fullWidth 
                            {...register('name', {
                                required: 'Este campo es requerido',
                                minLength: {value: 3, message: 'El nombre debe tener al menos 3 caracteres'}
                            })}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField label="Correo electrónico" variant="filled" fullWidth
                            {...register('email', {
                                required: 'Este campo es requerido',
                                validate: validations.isEmail
                            })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField label="Contraseña" type="password" variant="filled" fullWidth 
                            
                            {...register('password', {
                                required: 'Este campo es requerido',
                            })}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button type="submit" color="secondary" className="circular-btn" size="large" fullWidth>
                                Registrarme
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} display="flex" justifyContent="end">
                        <NextLink href="/auth/login" passHref>
                            <Link underline="always">
                                ¿Ya tienes una cuenta?
                            </Link>
                        </NextLink>
                    </Grid>

                </Box>
            </form>
        </AuthLayout>
    )
}

export default RegisterPage