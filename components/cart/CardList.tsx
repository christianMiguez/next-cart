import { FC } from "react"
import NextLink from 'next/link'
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material"
import { initialData } from "../../database/products"
import ItemCounter from "../ui/ItemCounter"

interface Props {
    editable: boolean
}

const productsCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
]

export const CardList:FC<Props> = ({editable}) => {
  return (
    <>
        {
            productsCart.map(product => (
                <Grid container spacing={2} key={product.slug} sx={{mt: 2}}>
                    <Grid item xs={3}>
                        <NextLink href="/product/slug/" passHref>
                            <Link>
                                <CardActionArea>
                                    <CardMedia
                                        image={`/products/${product.images[0]}`}
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
                            <Typography variant="body1">Talle: <strong>M</strong></Typography>

                            {
                                editable 
                                ? <ItemCounter />
                                : <Typography variant="body1">Cantidad: <strong>1</strong></Typography>
                            }
                        </Box>
                    </Grid>

                    <Grid item xs={2} display="flex" alignItems="center" flexDirection="column">
                        <Typography variant="subtitle1">$ {product.price}</Typography>
                        {
                            editable &&
                            <Button variant="text" color="secondary">
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
