import NextLink from 'next/link'
import { Box, Link, Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material"
import { CardList } from "../../components/cart/CardList"
import OrderSummary from "../../components/cart/OrderSummary"
import { ShopLayout } from "../../components/layouts/ShopLayout"

const SummaryPage = () => {
  return (
    <ShopLayout title="Resumen de la orden" pageDescription="Resumen del pedido">
        <Typography variant="h1" component='h1'>Resumen de la orden</Typography>

        <Grid container>
            <Grid item xs={12} sm={7}>
                {/* Cart list */}
                <CardList editable={false}/>
                
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
                            <Button color="secondary" className="circular-btn" fullWidth>
                                Confirmar orden
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default SummaryPage