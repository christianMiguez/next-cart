import { useContext, useState } from "react"
import { CartContext } from "../../context"
import { NextPage, GetServerSideProps, GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import { Box, Button, Chip, Grid, Typography } from "@mui/material"

import { ShopLayout } from "../../components/layouts/ShopLayout"
import ProductSlideshow from "../../components/products/ProductSlideshow"
import SizeSelector from "../../components/products/SizeSelector"
import ItemCounter from "../../components/ui/ItemCounter"
import { dbProducts } from "../../database"
import { ICartProduct, IProduct, ISize } from "../../interfaces"

interface Props {
  product: IProduct
}

const ProductPage:NextPage<Props> = ({product}) => {

  const router = useRouter()
  const {addProductToCart} = useContext(CartContext);

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,

  })

  const selectedSize = (size: ISize) => {
    setTempCartProduct(currentProduct => ({
      ...currentProduct,
      size
    }))
  }
  const onUpdatedQuantity = (quantity: number) => {
    setTempCartProduct(currentProduct => ({
      ...currentProduct,
      quantity
    }))
  }

  const onAddProduct = () => {
    if (!tempCartProduct.size) {
      alert("Please select a size")
      return
    }

    addProductToCart(tempCartProduct)
    router.push("/cart")
    
  }

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
                selectedSize={tempCartProduct.size}
                sizes={product.sizes}
                onSelectedSize={selectedSize}
                // its the same
                // onSelectedSize={(size) => selectedSize(size)}
              />
              <Typography variant='subtitle2' sx={{mt:3}}>Cantidad</Typography>
              <ItemCounter 
                currentValue={tempCartProduct.quantity}
                updatedQuantity={(newValue) => onUpdatedQuantity(newValue)}
                maxValue={product.inStock > 10 ? 10 : product.inStock}
              />
              
            </Box>

            {
              product.inStock !== 0
              ? <Button color="secondary" className="circular-btn" onClick={() => onAddProduct()}>
                  {
                    tempCartProduct.size
                    ? 'Agregar al carrito'
                    : 'Seleccione talle'
                  }
                </Button>
              : <Chip label="No hay disponibles" color="error" variant="outlined" sx={{mt: 1}}/>
            }

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
// EXAMPLE 1 OF GET SERVER SIDE PROPS. Works but is not the best option, we can generate it static.
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
// export const getServerSideProps: GetServerSideProps = async ({params}) => {
//   const { slug } = params as { slug: string }
//   const product = await dbProducts.getProductBySlug(slug)

//   if (!product) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       }
//     }
//   }

//   return {
//     props: {
//       product
//     }
//   }
// }


// EXAMPLE 2: GET SERVER SIDE PROPS WITH STATIC DATA. Better option
// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const productSlugs = await dbProducts.getAllProductsSlugs();
  
  return {
    paths: productSlugs.map(({slug}) =>({
      params: {
        slug
      }
    })),
    fallback: "blocking"
  }
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
export const getStaticProps: GetStaticProps = async ({params}) => {

  const {slug = ''} = params as { slug: string }
  const product = await dbProducts.getProductBySlug(slug);


  if (!product) {
    return {
      redirect: {
        destination: '/',
        // puede ser que mañana tengamos el prod, entonces que Google Bots vuelva a renderizar esto.
        permanent: false,
      }
    }
  }

  return {
    props: {
      product
    }, 
    // revalidate after 24 hours
    revalidate: 86400
  }
}

export default ProductPage