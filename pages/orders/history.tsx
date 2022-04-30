import { Chip, Grid, Link, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { ShopLayout } from '../../components/layouts/ShopLayout'
import NextLink from 'next/link'

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullname', headerName: 'Nombre completo', width: 300},
    {
        field: 'paid',
        headerName: 'Pagado',
        description: 'Muestra info si esta pada la orden o no',
        width: 200,
        renderCell: (params: GridValueGetterParams) => {
            return (
                params.row.paid
                ? <Chip label="Pagado" color="success" variant="outlined"/>
                : <Chip label="Pendiente" color="error" variant="outlined"/>
                )
        }

    },
    { 
        field: 'orden', 
        headerName: 'Ver orden', 
        width: 150,
        renderCell: (params: GridValueGetterParams) => {
            return (
                <NextLink href={`/orders/${params.row.id}`} passHref>
                    <Link underline='always'>Ver orden</Link>
                </NextLink>
            )
        }
    },
]

const rows = [
    { id: 1, paid: true, fullname: 'Juan Perez' },
    { id: 2, paid: false, fullname: 'Hernando Vallejo Flores' },
    { id: 3, paid: true, fullname: 'Gabriela Faera' },
    { id: 4, paid: true, fullname: 'Pepe Sarmiento Ceballos' },
]


const HistoryPage = () => {
  return (
    <ShopLayout title="Historial de compras" pageDescription='Todas las ordenes del cliente'>
        <Typography variant="h1" component='h1'>Historial de compras</Typography>

        <Grid container>
            <Grid item xs={12} sx={{ height: 650, width: '100%'}}>
                <DataGrid 
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                />
            </Grid>
        </Grid>

        
    </ShopLayout>
  )
}

export default HistoryPage