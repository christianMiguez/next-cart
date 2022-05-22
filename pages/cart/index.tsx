import { useContext, useEffect } from "react"
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material"
import { useRouter } from "next/router"
import {OrderSummary, CartList} from "../../components/cart"
import { ShopLayout } from "../../components/layouts/ShopLayout"
import { CartContext } from "../../context"

const CartPage = () => {

    const {isLoaded,  cart} = useContext(CartContext)
    const router = useRouter()

    useEffect(() => {
        if (!isLoaded && cart.length === 0) {
            router.replace("/cart/empty")
        }
    }, [isLoaded, cart, router])

    if (!isLoaded || cart.length === 0) {
        return (<></>)
    }

  return (
    <ShopLayout title="carrito" pageDescription="Carrito de compras de la tienda">
        <Typography variant="h1" component='h1'>Carrito</Typography>

        <Grid container>
            <Grid item xs={12} sm={7}>
                {/* Cart list */}
                <CartList editable={true}/>
                
            </Grid>

            <Grid item xs={12} sm={5}>
                {/* Cart list */}
                <Card className="summary-card">
                    <CardContent>
                        <Typography variant="h4" component="h4">Resumen</Typography>
                        <Divider sx={{mt:1}}/>

                        <OrderSummary />

                        <Box sx={{mt:3}}>
                            <Button 
                                color="secondary" 
                                className="circular-btn" 
                                fullWidth
                                href="/checkout/address"
                                >
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