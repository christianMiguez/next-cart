import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import { ShopLayout } from '../components/layouts/ShopLayout'
import { ProductList } from '../components/products/ProductList'

import { initialData } from '../database/products'

const HomePage: NextPage = () => {
  return (
  <ShopLayout title='Serendipia Boutique - Tienda' pageDescription='Espacio para de mujeres emprendedoras'>
    <Typography variant='h1' component='h1'>Tienda</Typography>
    <Typography variant='h2' sx={{ mb: 1 }}>Todos los productos</Typography>

    <ProductList products={initialData.products as any} />
    
  </ShopLayout>
  )
}

export default HomePage
