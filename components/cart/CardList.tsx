import { FC, useContext } from "react"
import NextLink from 'next/link'
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material"
import ItemCounter from "../ui/ItemCounter"
import { CartContext } from "../../context"
import { ICartProduct } from "../../interfaces"

interface Props {
    editable: boolean
}

export const CardList:FC<Props> = ({editable}) => {

    const {cart, updateCartQuantity, removeProductFromCart} = useContext(CartContext)

    const onNewsCartQuantityValue = (product: ICartProduct, newQuantityValue: number) => {
        product.quantity = newQuantityValue
        updateCartQuantity(product)
    }

  return (
    <>
        {
            cart.map(product => (
                <Grid container spacing={2} key={product.slug + product.size} sx={{mt: 2}}>
                    <Grid item xs={3}>
                        <NextLink href={`/product/${product.slug}/`} passHref>
                            <Link>
                                <CardActionArea>
                                    <CardMedia
                                        image={`/products/${product.image}`}
                                        component='img'
                                        sx={{borderRadius: '5px'}}
                                    >
                                    </CardMedia>
                                </CardActionArea>
                            </Link>
                        </NextLink>
                    </Grid>

                    <Grid item xs={7}>
                        <Box display="flex" flexDirection="column">
                            <Typography fontWeight={500}>{product.title}</Typography>
                            <Typography variant="body1">Talle: <strong>{product.size}</strong></Typography>

                            {
                                editable 
                                ? (
                                    <ItemCounter 
                                        currentValue={product.quantity}
                                        maxValue={10}
                                        updatedQuantity={(value) => onNewsCartQuantityValue(product, value )}
                                    />
                                    )
                                : <Typography variant="body1">Cantidad: <strong>{product.quantity} {product.quantity > 1 ? 'Productos' : 'Producto'}</strong></Typography>
                            }
                        </Box>
                    </Grid>

                    <Grid item xs={2} display="flex" alignItems="center" flexDirection="column">
                        <Typography variant="subtitle1">$ {product.price}</Typography>
                        {
                            editable &&
                            <Button variant="text" color="secondary" onClick={() => removeProductFromCart(product)}>
                                Eliminar
                            </Button>
                        }
                    </Grid>
                </Grid>
            ))
        }
    </>
  )
}
