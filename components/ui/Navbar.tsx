import { useContext, useState } from 'react';
import NextLink from 'next/link';

import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography, Input, InputAdornment} from "@mui/material"
import {ClearOutlined, SearchOutlined, ShoppingCart} from '@mui/icons-material';
import { useRouter } from 'next/router';
import { UIContext, CartContext } from '../../context';

export const Navbar = () => {

    const { asPath, push }   = useRouter()
    const { toggleSideMenu } = useContext(UIContext)
    const {numberOfItems}    = useContext(CartContext)

    const [searchTerm, setSearchTerm] = useState("")
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    const onSearchTerm = () => {
        if (searchTerm.trim().length === 0 ) return
        push(`/search/${searchTerm}`)
    }

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
                display: isSearchOpen ? 'none' : {xs: 'none', sm: 'block'}
            }} className="fadeIn">
                <NextLink href='/category/men' passHref>
                    <Link>
                        <Button color={asPath === '/category/men' ? 'primary' : 'info'} >Hombres</Button>
                    </Link>
                </NextLink>

                <NextLink href='/category/women' passHref>
                    <Link>
                        <Button color={asPath === '/category/women' ? 'primary' : 'info'} >Woman</Button>
                    </Link>
                </NextLink>

                <NextLink href='/category/kids' passHref>
                    <Link>
                        <Button color={asPath === '/category/kids' ? 'primary' : 'info'} >Niños</Button>
                    </Link>
                </NextLink>
            </Box>

            <Box flex={ 1 }/>


            {
                isSearchOpen ? (
                    <Input
                    sx={{display: {xs: 'none', sm: 'flex'}}}
                        autoFocus
                        type='text'
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        placeholder="Buscar..."
                        onKeyPress={e => e.key === 'Enter' ? onSearchTerm() : null}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                onClick={() => setIsSearchOpen(false)}
                                >
                                    <ClearOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                ) : (
                    <IconButton
                    sx={{display: {xs: 'none', sm: 'flex'}}}
                    onClick={() => setIsSearchOpen(true)}
                    className="fadeIn">
                        <SearchOutlined />
                    </IconButton>
                )
            }

            {/* Pantallas pequeñas */}
            <IconButton 
                sx={{ display: {xs: 'block', sm: 'none'}}}
                onClick={toggleSideMenu}
            >
                
                <SearchOutlined />
            </IconButton>

            <NextLink href="/cart" passHref>
                <Link>
                    <IconButton>
                    <Badge badgeContent={numberOfItems} color='secondary'>
                        <ShoppingCart />
                    </Badge>
                    </IconButton>
                </Link>
            </NextLink>

            <Button onClick={toggleSideMenu}>
                Menú 
            </Button>

        </Toolbar>
    </AppBar>
  )
}
