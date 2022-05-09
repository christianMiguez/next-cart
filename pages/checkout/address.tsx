import { useContext } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import Cookies from 'js-cookie'
import { ShopLayout } from '../../components/layouts/ShopLayout'
import {countries} from '../../utils'
import { CartContext } from '../../context'

type FormData = {
    firstName : string,
    lastName  : string,
    address   : string,
    address2  : string,
    zip       : string,
    city      : string,
    country   : string,
    phone     : string
}

const getAddressFromCookies = ():FormData => {
    return {
        firstName : Cookies.get('firstName') || '',
        lastName  : Cookies.get('lastName') || '',
        address   : Cookies.get('address') || '',
        address2  : Cookies.get('address2') || '',
        zip       : Cookies.get('zip') || '',
        city      : Cookies.get('city') || '',
        country   : Cookies.get('country') || '',
        phone     : Cookies.get('phone') || '',
    }
}

export const AddressPage = () => {

    const router = useRouter()
    const {updateAddress} = useContext(CartContext)

    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        defaultValues : getAddressFromCookies()

    })

    const onSubmitAddress = (data: FormData) => {
            updateAddress(data)
            router.push('/checkout/summary')
    }

  return (
    <ShopLayout title="Direcciones" pageDescription="Agregar direcciones de envío">
        <form onSubmit={handleSubmit(onSubmitAddress)}>
        <Typography variant="h1" component='h1'>Direcciones</Typography>

        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <TextField
                    label="Nombre"
                    variant="filled"
                    fullWidth
                    {
                        ...register('firstName', {
                            required: 'Campo requerido'
                        })
                    }
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    label="Apellido"
                    variant="filled"
                    fullWidth
                    {
                        ...register('lastName', {
                            required: 'Campo requerido'
                        })
                    }
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                />
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField
                    label="Dirección"
                    variant="filled"
                    fullWidth
                    {
                        ...register('address', {
                            required: 'Campo requerido'
                        })
                    }
                    error={!!errors.address}
                    helperText={errors.address?.message}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                label="Dirección 2 (opcional)" 
                variant="filled" 
                fullWidth
                {
                    ...register('address2', {
                    })
                }
                
                />
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField
                label="Código Postal" 
                variant="filled" 
                fullWidth 
                {
                    ...register('zip', {
                        required: 'Campo requerido'
                    })
                }
                error={!!errors.zip}
                helperText={errors.zip?.message}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    label="Ciudad"
                    variant="filled"
                    fullWidth
                    {
                        ...register('city', {
                            required: 'Campo requerido'
                        })
                    }
                    error={!!errors.city}
                    helperText={errors.city?.message}
                />
            </Grid>

            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <TextField
                        key={Cookies.get('country') || countries[0].code}
                        select
                        defaultValue={Cookies.get('country') || countries[0].code}
                        variant="filled"
                        label="pais"
                        {
                            ...register('country', {
                                required: 'Campo requerido'
                            })
                        }
                        error={!!errors.country}
                        >
                            {
                                countries.map( country => (
                                    <MenuItem 
                                        key={country.code} 
                                        value={country.code}>
                                            {country.name}
                                    </MenuItem>
                                ))
                            }
                        </TextField>
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField
                label="Teléfono"
                variant="filled"
                fullWidth
                {
                    ...register('phone', {
                        required: 'Campo requerido'
                    })
                }
                error={!!errors.phone}
                helperText={errors.phone?.message}
                />
            </Grid>
            
        </Grid>

        <Box display="flex" justifyContent="center">
            <Button type="submit" color="secondary" className="circular-btn" size='large' sx={{mt:3}} >
                Revisar pedido
            </Button>
        </Box>
        </form>
    </ShopLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

// MIDDLEWARE A MANO. Lo desestimamos porque next.js ya tiene un middleware para esto
// export const getServerSideProps: GetServerSideProps = async ({req}) => {

//     const { token = '' } = req.cookies
//     let isValidToken = false;

//     try {
//         await jwt.isValidToken(token)
//         isValidToken = true;
//     } catch (error) {
//         isValidToken = false;
//     }

//     if (!isValidToken) {
//         return {
//             redirect: {
//                 destination: '/auth/login?goto=/checkout/address',
//                 permanent: false
//             }
//         }
//     }

//     return {
//         props: {
            
//         }
//     }
// }

export default AddressPage