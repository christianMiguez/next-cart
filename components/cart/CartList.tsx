import { FC, useContext } from "react"
import NextLink from 'next/link'
import { Box, Button, Card, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material"
import ItemCounter from "../ui/ItemCounter"
import { CartContext } from "../../context"
import { ICartProduct } from "../../interfaces"

interface Props {
    editable?: boolean
}

export const CartList:FC<Props> = ({editable = false}) => {

    const {cart, updateCartQuantity, removeProductFromCart} = useContext(CartContext)

    const onNewsCartQuantityValue = (product: ICartProduct, newQuantityValue: number) => {
        product.quantity = newQuantityValue
        updateCartQuantity(product)
    }

  return (
    <>
        {
            cart.map(product => (
                <Grid container spacing={2} key={product.slug + product.size} sx={{mt: 2}} component="div">
                    <Grid item xs={3} component="div">
                        <Box>
                            <NextLink href={`/product/${product.slug}/`} passHref>
                                <Link>
                                    <Card>
                                        <CardActionArea>
                                            <CardMedia
                                                image={`/products/${product.image}`}
                                                component='img'
                                                sx={{borderRadius: '5px'}}
                                            >
                                            </CardMedia>
                                        </CardActionArea>
                                    </Card>
                                </Link>
                            </NextLink>
                        </Box>
                    </Grid>

                    <Grid item xs={7} component="div">
                        <Box display="flex" flexDirection="column">
                            <Typography fontWeight={500}>{product.title}</Typography>
                            <Typography variant="body1">Talle: <strong>{product.size}</strong></Typography>

                            {
                                    editable 
                                    ? (
                                        <ItemCounter 
                                            currentValue={ product.quantity }
                                            maxValue={ 10 } 
                                            updatedQuantity={ ( value ) => onNewsCartQuantityValue(product, value )}
                                        />
                                    )
                                    : (
                                        <Typography variant='h5'>{ product.quantity } { product.quantity > 1 ? 'productos':'producto' }</Typography>
                                    )
                                }
                        </Box>
                    </Grid>

                    <Grid item xs={2} display="flex" alignItems="center" flexDirection="column" component="div">
                        <Box>
                            <Typography variant="subtitle1">$ {product.price}</Typography>
                            {
                                editable &&
                                <Button variant="text" color="secondary" onClick={() => removeProductFromCart(product)}>
                                    Eliminar
                                </Button>
                        }
                        </Box>
                    </Grid>
                </Grid>
            ))
        }
    </>
  )
}
