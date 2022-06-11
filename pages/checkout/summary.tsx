import { useContext, useEffect, useState } from 'react'
import NextLink from 'next/link'
import { Box, Link, Button, Card, CardContent, Divider, Grid, Typography, Chip } from "@mui/material"
import { CartList, OrderSummary } from "../../components/cart"
import { ShopLayout } from "../../components/layouts/ShopLayout"
import { CartContext } from '../../context'
import { countries } from '../../utils'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

const SummaryPage = () => {

    const router = useRouter()
    const [isPosting, setIsPosting] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const { shippingAddress, numberOfItems, createOrder } = useContext(CartContext)

    useEffect(() => {
        if (!Cookies.get('firstName')) {
            router.push('/checkout/address')
        }

    }, [router])

    const onCreateOrder = async () => {
        setIsPosting(true)

        const { hasError, message } = await createOrder() //todo

        if (hasError) {
            setErrorMessage(message)
            setIsPosting(false)
            return
        }

        router.replace(`/orders/${message}`)



        // setIsPosting(false)
    }

    if (!shippingAddress) {
        return <></>;
    }

    const { firstName, lastName, address, address2 = '', zip, city, country, phone } = shippingAddress

    return (
        <ShopLayout title="Resumen de la orden" pageDescription="Resumen del pedido">
            <Typography variant="h1" component='h1'>Resumen de la orden</Typography>

            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>Resumen ({numberOfItems} {numberOfItems === 1 ? 'producto' : 'productos'})</Typography>
                            <Divider sx={{ my: 1 }} />

                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant='subtitle1'>Dirección de entrega</Typography>
                                <NextLink href='/checkout/address' passHref>
                                    <Link underline='always'>
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>


                            <Typography>{firstName} {lastName}</Typography>
                            <Typography>{address}{address2 ? `, ${address2}` : ''} </Typography>
                            <Typography>{city}, {zip}</Typography>
                            <Typography>{countries.find(c => c.code === country)?.name}</Typography>
                            <Typography>{phone}</Typography>

                            <Divider sx={{ my: 1 }} />

                            <Box display='flex' justifyContent='end'>
                                <NextLink href='/cart' passHref>
                                    <Link underline='always'>
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>

                            <OrderSummary />

                            <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
                                <Button disabled={isPosting} color="secondary" className='circular-btn' fullWidth onClick={onCreateOrder}>
                                    Confirmar Orden
                                </Button>
                            </Box>

                            <Chip
                                color="error"
                                label={errorMessage}
                                sx={{ display: errorMessage ? 'flex' : 'none', mt: 1 }}

                            />

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default SummaryPage