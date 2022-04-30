import { Grid, Typography } from "@mui/material"

const OrderSummary = () => {
  return (
    <Grid container>
        <Grid item xs={6}>
            <Typography>Resumen</Typography>
        </Grid>

        <Grid item xs={6} display='flex' justifyContent='end' sx={{mb:3}}>
            <Typography>3 items</Typography>
        </Grid>

        <Grid item xs={6}>
            <Typography variant="h6" component="h6">Subtotal</Typography>
        </Grid>

        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>${ 155.36 }</Typography>
        </Grid>

        <Grid item xs={6}>
            <Typography>Impuestos 15%</Typography>
        </Grid>

        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>${ 5.36 }</Typography>
        </Grid>

        <Grid item xs={6} sx={{mt:2}}>
            <Typography variant="subtitle1">Total</Typography>
        </Grid>

        <Grid item xs={6} sx={{mt:2}} display='flex' justifyContent='end'>
            <Typography variant="subtitle1">${ 200.82 }</Typography>
        </Grid>



    </Grid>
  )
}

export default OrderSummary