import { Box, Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material"
import { CardList } from "../../components/cart/CardList"
import OrderSummary from "../../components/cart/OrderSummary"
import { ShopLayout } from "../../components/layouts/ShopLayout"

const CartPage = () => {
  return (
    <ShopLayout title="carrito" pageDescription="Carrito de compras de la tienda">
        <Typography variant="h1" component='h1'>Carrito</Typography>

        <Grid container>
            <Grid item xs={12} sm={7}>
                {/* Cart list */}
                <CardList editable={true}/>
                
            </Grid>

            <Grid item xs={12} sm={5}>
                {/* Cart list */}
                <Card className="summary-card">
                    <CardContent>
                        <Typography variant="h4" component="h4">Resumen</Typography>
                        <Divider sx={{mt:1}}/>

                        <OrderSummary />

                        <Box sx={{mt:3}}>
                            <Button color="secondary" className="circular-btn" fullWidth>
                                Checkout
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default CartPage