import NextLink from 'next/link'

import { Box, Link, Typography } from '@mui/material'
import React from 'react'
import { ShopLayout } from '../../components/layouts/ShopLayout'

const EmptyPage = () => {
  return (
    <ShopLayout title="Carrito vacío" pageDescription='Agrega productos a tu carrito!'>
       <Box display='flex' flexDirection="column" justifyContent='center' alignItems='center' height='calc(100vh - 200px)'>
            <Typography variant='h2' component='h2'>No hay nada en tu carrito 🛒 </Typography>
            
            <NextLink href="/" passHref>
                <Link color='orange'>
                    Regresar a la tienda
                </Link>
            </NextLink>    
            
        </Box> 
    </ShopLayout>
  )
}

export default EmptyPage