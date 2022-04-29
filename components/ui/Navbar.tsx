import NextLink from 'next/link';

import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from "@mui/material"
import {SearchOutlined, ShoppingCart} from '@mui/icons-material';
export const Navbar = () => {
  return (
    <AppBar>
        <Toolbar>
            <NextLink href="/" passHref>
                <Link display='flex' alignItems='center'>
                <Typography variant="h6">Serendipia </Typography>
                <Typography sx={{
                    ml: 0.9
                }}>Boutique</Typography>
                </Link>
            </NextLink>

            <Box flex={ 1 }/>

            <Box sx={{
                display: {xs: 'none', sm: 'block'}
            }}>
                <NextLink href='/category/men' passHref>
                    <Link>
                        <Button>Hombres</Button>
                    </Link>
                </NextLink>

                <NextLink href='/category/woman' passHref>
                    <Link>
                        <Button>Woman</Button>
                    </Link>
                </NextLink>

                <NextLink href='/category/kids' passHref>
                    <Link>
                        <Button>Niños</Button>
                    </Link>
                </NextLink>
            </Box>

            <Box flex={ 1 }/>

            <IconButton>
                <SearchOutlined />
            </IconButton>

            <NextLink href="/cart" passHref>
                <Link>
                    <IconButton>
                    <Badge badgeContent={3} color='secondary'>
                        <ShoppingCart />
                    </Badge>
                    </IconButton>
                </Link>
            </NextLink>

            <Button>
                Menú 
            </Button>

        </Toolbar>
    </AppBar>
  )
}
