
import { Box, Typography } from "@mui/material"
import { ShopLayout } from "../components/layouts/ShopLayout"

export const NotFound404 = () => {
  return (
    <ShopLayout title='Contenido no encontrado' pageDescription="Nada que mostrar aqui">
        <Box display='flex' justifyContent='center' alignItems='center' height='calc(100vh - 200px)'>
            <Typography variant='h2' component='h2'>Ups, no se encontró esta URL 🤕 </Typography>
        </Box>
    </ShopLayout>
  )
}

export default NotFound404