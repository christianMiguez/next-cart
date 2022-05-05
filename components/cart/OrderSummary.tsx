import { Grid, Typography } from "@mui/material"
import { useContext } from "react"
import { CartContext } from "../../context"
import {currency} from '../../utils'

const OrderSummary = () => {

    const {numberOfItems, subTotal, total, tax} = useContext(CartContext)    


  return (
    <Grid container>
        <Grid item xs={6}>
            <Typography>Resumen</Typography>
        </Grid>

        <Grid item xs={6} display='flex' justifyContent='end' sx={{mb:3}}>
            <Typography>{numberOfItems} {numberOfItems > 1 ? 'items' : 'item'}</Typography>
        </Grid>

        <Grid item xs={6}>
            <Typography variant="h6" component="h6">Subtotal</Typography>
        </Grid>

        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{ currency.format((subTotal)) }</Typography>
        </Grid>

        <Grid item xs={6}>
            <Typography>IVA ({100 * Number(process.env.NEXT_PUBLIC_TAX_RATE)})%</Typography>
        </Grid>

        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{ currency.format(tax) }</Typography>
        </Grid>

        <Grid item xs={6} sx={{mt:2}}>
            <Typography variant="subtitle1">Total</Typography>
        </Grid>

        <Grid item xs={6} sx={{mt:2}} display='flex' justifyContent='end'>
            <Typography variant="subtitle1">{ currency.format(total) }</Typography>
        </Grid>



    </Grid>
  )
}

export default OrderSummary