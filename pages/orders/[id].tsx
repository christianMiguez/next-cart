import NextLink from 'next/link'
import { Box, Link, Button, Card, CardContent, Divider, Grid, Typography, Chip } from "@mui/material"
import { CartList } from "../../components/cart/CartList"
import OrderSummary from "../../components/cart/OrderSummary"
import { ShopLayout } from "../../components/layouts/ShopLayout"
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material'

const OrderPage = () => {
  return (
    <ShopLayout title="Resumen de la orden #5567989" pageDescription="Resumen del pedido">
        <Typography variant="h1" component='h1'>Orden: 5567989 </Typography>

        {/* <Chip
            sx={{my:2}}
            variant="outlined"
            color="error"
            label="Pendiente de pago"
            icon={<CreditCardOffOutlined/>}
        /> */}

        <Chip
            sx={{my:2}}
            variant="outlined"
            color="success"
            label="Pagada"
            icon={<CreditScoreOutlined/>}
        />

        <Grid container>
            <Grid item xs={12} sm={7}>
                {/* Cart list */}
                <CartList editable={false}/>
                
            </Grid>

            <Grid item xs={12} sm={5}>
                {/* Cart list */}
                <Card className="summary-card">
                    <CardContent>
                        <Typography variant="h6" component="h6">Resumen (3 productos)</Typography>

                        <Divider sx={{mt:1}}/>

                        <Box display="flex" justifyContent="end" sx={{mt:2}}>
                            <NextLink href="/checkout/address" passHref>
                                <Link underline='always'>
                                Editar dirección
                                </Link>
                            </NextLink>
                        </Box>

                        <Typography variant="subtitle1">Dirección de envío</Typography>
                        <Typography>Christian Miguez</Typography>
                        <Typography>Barcelona 1879 esq. Bogota</Typography>
                        <Typography>Montevideo, Villa del Cerro</Typography>
                        <Typography>Uruguay</Typography>
                        <Typography>092646464</Typography>

                        <Divider sx={{my:2}}/>

                        <Box display="flex" justifyContent="end" sx={{mt:2}}>
                            <NextLink href="/cart" passHref>
                                <Link underline='always'>
                                Editar
                                </Link>
                            </NextLink>
                        </Box>

                        <OrderSummary />

                        <Box sx={{mt:3}}>
                            { /* TODO:  */}
                            <Chip
                                sx={{my:2}}
                                variant="outlined"
                                color="success"
                                label="Pagada"
                                icon={<CreditScoreOutlined/>}
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default OrderPage