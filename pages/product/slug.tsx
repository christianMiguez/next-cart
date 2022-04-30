import { Box, Button, Chip, Grid, Typography } from "@mui/material"
import { ShopLayout } from "../../components/layouts/ShopLayout"
import ProductSlideshow from "../../components/products/ProductSlideshow"
import SizeSelector from "../../components/products/SizeSelector"
import ItemCounter from "../../components/ui/ItemCounter"
import { initialData } from "../../database/products"

const product = initialData.products[0]

const ProductPage = () => {
  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
  
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={product.images}/>
          
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>
            <Typography variant='h1' component='h1'>{product.title}</Typography>
            <Typography variant='subtitle1' component='h2'>${product.price}</Typography>

            <Box sx={{my: 2}}>
            <Typography variant='subtitle2'>Talle</Typography>
              <SizeSelector 
                selectedSize={product.sizes[3]}
                sizes={product.sizes}
              />
              <Typography variant='subtitle2' sx={{mt:3}}>Cantidad</Typography>
              <ItemCounter />
              
            </Box>

            <Button color="secondary" className="circular-btn">
               Agregar al carrito
            </Button>

            <Chip label="No hay disponibles" color="error" variant="outlined" sx={{mt: 1}}/>

            <Box sx={{mt: 3}}>
              <Typography variant='subtitle2'>Descripción</Typography>
              <Typography variant='body2'>{product.description}</Typography>
            </Box>
          </Box>
          
        </Grid>
  
      </Grid>
    </ShopLayout>
  )
}

export default ProductPage