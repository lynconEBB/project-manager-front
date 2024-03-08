import {
    AppBar,
    Toolbar,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    ListItemIcon,
    IconButton
} from "@mui/material";
import GroupsIcon from '@mui/icons-material/Groups';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import { Box } from "@mui/system";
import {Link, NavLink, Navigate, Outlet, useLocation, useNavigate} from "react-router-dom";
import { ShoppingBasket } from "@mui/icons-material";


const Navigation = () => {

    const location =  useLocation();
    const navigate = useNavigate();

    if (location.pathname == "/")
        return <Navigate to="/projetos"/>;

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar position="fixed" open={true} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar sx={{display:"flex", justifyContent:"space-between"}}>
                    <Typography variant="h6" noWrap component="div">
                        Project Manager
                    </Typography>
                    <Box sx={{display: "flex", justifyContent:"center", alignItems:"center"}}>
                        <IconButton sx={{color:"white"}} onClick={() => {signout(); navigate("/login");}}>
                            <ExitToAppIcon/>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: 240,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 240,
                        boxSizing: 'border-box'
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        <ListItem key={3} disablePadding>
                            <ListItemButton onClick={() => navigate("/projetos")} selected={location.pathname == "/projetos"}>
                                <ListItemIcon>
                                    <DeveloperBoardIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"Projetos"} />
                            </ListItemButton>
                        </ListItem> 
                        <ListItem key={4} disablePadding>
                            <ListItemButton onClick={() => navigate("/times")} selected={location.pathname == "/times"}>
                                <ListItemIcon>
                                    <GroupsIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Times" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem key={5} disablePadding>
                            <ListItemButton onClick={() => navigate("/profissionais")} selected={location.pathname == "/profissionais"} >
                                <ListItemIcon>
                                    <PersonIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Profissionais" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Outlet/>
            </Box>
        </Box>
    )
}

export default Navigation;