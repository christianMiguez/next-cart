import { Typography, Box } from '@mui/material'
import type { NextPage, GetServerSideProps } from 'next'
import { ShopLayout } from '../../components/layouts/ShopLayout'
import { ProductList } from '../../components/products/ProductList'
import { dbProducts } from '../../database'
import { IProduct } from '../../interfaces'

interface Props {
  products: IProduct[],
  foundProducts: boolean,
  query: string
}

const SearchPage: NextPage<Props> = ({products, foundProducts, query}) => {

  return (
  <ShopLayout title='Serendipia Boutique - Busqueda' pageDescription='Espacio para de mujeres emprendedoras'>
    <Typography variant='h1' component='h1'>Buscar producto:</Typography>
    
    {
      foundProducts
      ? <Typography variant='h2' sx={{ mb: 1 }}>{query}</Typography>
      : (
        <Box>
          <Typography variant='h2' sx={{ mb: 1 }}>No se encontraron resultados para `{query}`</Typography>
          <Typography variant='subtitle1' sx={{ my: 2 }}>Quizá te pueda interesar:</Typography>
        </Box>
      )
    }

      <ProductList products={products} />
    
  </ShopLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const {query = 'string'} = params as {query: string}

  if (query.length === 0) {
    return {
      redirect: {
        destination: '/',
        permanent: true
      }
    }
  }

  let products = await dbProducts.getProductsByTerm(query)
  const foundProducts = products.length > 0

  // TODO: Retornar otros productos.
  if (! foundProducts) {
    products = await dbProducts.getAllProducts()
  }

  return {
    props: {
      products,
      foundProducts,
      query
    }
  }
}

export default SearchPage
