import React, { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'

import NextLink from 'next/link'
import { Box, Button, Chip, Divider, Grid, Link, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import AuthLayout from '../../components/layouts/AuthLayout'
import { validations } from '../../utils'
import { ErrorOutline } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { getSession, signIn, getProviders } from 'next-auth/react'

type FormData = {
    email: string,
    password: string,
  };

const LoginPage = () => {

    const router = useRouter()
    // const {loginUser} = useContext(AuthContext);
    const [showError, setShowError] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const [providers, setProviders] = useState<any>({})

    useEffect(() => {
        getProviders().then(provider => {
        setProviders(provider)
        })
    }, [])

    const onLoginUser = async({email, password}: FormData) => {

        setShowError(false)

        // const isValidLogin = await loginUser(email, password)
        
        // if(! isValidLogin) {
        //     setShowError(true)
        //     setTimeout(() => {
        //         setShowError(false)
        //     }
        //     , 4000)
        //     return;
        // }

        // const destination = router.query.goto?.toString() || '/'
        // router.replace(destination)
        await signIn('credentials', {email, password})

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
                    <NextLink href={router.query.goto ? `/auth/register?goto=${router.query.goto}` : `/auth/register` } passHref>
                        <Link underline="always">
                            ¿No tienes cuenta?
                        </Link>
                    </NextLink>
                </Grid>

                <Grid item xs={12} display='flex' flexDirection='column' justifyContent='end'>
                    <Divider sx={{width: '100%',mb:2}} />
                    {

                        
                        Object.values(providers).map((provider: any) => {
                            console.log({provider})
                            if ( provider.id === 'credentials' ) return (<div key={provider.id}></div>);

                            return (
                                <Button key={provider.id} variant="outlined" fullWidth color="primary" className="circular-btn" sx={{mb: 1}} onClick={() => { signIn(provider.id) }}>
                                    {provider.name} 
                                </Button>
                            )
                        })

                    }

                </Grid>

            </Box>
        </form>
        </AuthLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({req, query}) => {

    const session = await getSession({req})

    const {goto = '/'} = query

    if (session) {
        return {
            redirect: {
                destination: goto.toString(),
                permanent: false,
            }
        }
    };

    return {
        props: {
            
        }
    }
}

export default LoginPage
