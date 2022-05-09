import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, Logout, MaleOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"
import { useContext, useState } from "react"
import { AuthContext, UIContext } from "../../context"
import { useRouter } from "next/router"



export const SideMenu = () => {

    const router = useRouter()
    const {isLoggedIn, user, logout} = useContext(AuthContext)
    const {isMenuOpen, toggleSideMenu} = useContext(UIContext)

    const [searchTerm, setSearchTerm] = useState("")

    const onSearchTerm = () => {
        if (searchTerm.trim().length === 0 ) return

        navigateTo(`/search/${searchTerm}`)
    }

    const navigateTo = (url:string) => {
        toggleSideMenu()
        router.push(url)
    }

  return (
    <Drawer
        open={ isMenuOpen }
        onClose={ toggleSideMenu }
        anchor='right'
        sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }} 
    >
        <Box sx={{ width: 250, paddingTop: 5 }}>
            
            <List>

                <ListItem>
                    <Input
                        autoFocus
                        type='text'
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        placeholder="Buscar..."
                        onKeyPress={e => e.key === 'Enter' ? onSearchTerm() : null}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                onClick={onSearchTerm}
                                >
                                 <SearchOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </ListItem>

                {
                    isLoggedIn && (
                    <>
                        <ListItem button>
                            <ListItemIcon>
                                <AccountCircleOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Perfil'} />
                        </ListItem>

                        <ListItem button>
                            <ListItemIcon>
                                <ConfirmationNumberOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Mis Ordenes'} />
                        </ListItem>
                    </>
                    )
                }

                


                <ListItem button sx={{ display: { xs: '', sm: 'none' } }} onClick={ () => navigateTo('/category/men')}>
                    <ListItemIcon>
                        <MaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Hombres'} />
                </ListItem>

                <ListItem button sx={{ display: { xs: '', sm: 'none' } }}  onClick={ () => navigateTo('/category/women')}>
                    <ListItemIcon>
                        <FemaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Mujeres'} />
                </ListItem>

                <ListItem button sx={{ display: { xs: '', sm: 'none' } }}  onClick={ () => navigateTo('/category/kids')}>
                    <ListItemIcon>
                        <EscalatorWarningOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Niños'} />
                </ListItem>

                {
                    ! isLoggedIn ? (
                        <ListItem button onClick={() => navigateTo(`/auth/login?goto=${router.asPath}`)}>
                            <ListItemIcon>
                                <VpnKeyOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Ingresar'} />
                        </ListItem>
                    ) 
                    : (
                        <ListItem button onClick={ logout }>
                            <ListItemIcon>
                                <LoginOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Salir'} />
                        </ListItem>
                    )
                }

                {/* Admin */}
                {
                    user?.role === 'admin' && (
                    <>
                        <Divider />
                        <ListSubheader>Admin Panel</ListSubheader>

                        <ListItem button>
                            <ListItemIcon>
                                <CategoryOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Productos'} />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <ConfirmationNumberOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Ordenes'} />
                        </ListItem>

                        <ListItem button>
                            <ListItemIcon>
                                <AdminPanelSettings/>
                            </ListItemIcon>
                            <ListItemText primary={'Usuarios'} />
                        </ListItem>
                    </>
                    )
                }
            </List>
        </Box>
    </Drawer>
  )
}