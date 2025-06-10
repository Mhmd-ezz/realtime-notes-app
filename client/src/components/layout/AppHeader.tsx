import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '@/features/theme/themeSlice';
import { useLogout } from '@/hooks/auth/useLogout';
import { useCurrentUser } from '@/hooks/auth/useCurrentUser';
import type { RootState } from '@/store/store';
import { useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Divider from '@mui/material/Divider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import LogoutIcon from '@mui/icons-material/Logout';

export default function HeaderAppBar() {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);
  const { mutate, isPending } = useLogout();
  const user = useCurrentUser();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            NotePad
          </Typography>

          <IconButton onClick={handleMenuOpen} color="inherit">
            <MoreVertIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            {user && (
              <>
                <MenuItem>
                  <AccountCircleIcon fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="subtitle2" noWrap>{user.name}</Typography>
                </MenuItem>
                <MenuItem>
                  <EmailIcon fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body2" noWrap>{user.email}</Typography>
                </MenuItem>
              </>
            )}

            <Divider />

            <MenuItem
              onClick={() => {
                dispatch(toggleTheme());
                handleMenuClose();
              }}
            >
              {mode === 'dark' ? (
                <>
                  <LightModeIcon fontSize="small" className="mr-2" sx={{ mr: 1 }} />
                  Light Mode
                </>
              ) : (
                <>
                  <DarkModeIcon fontSize="small" className="mr-2" sx={{ mr: 1 }} />
                  Dark Mode
                </>
              )}
            </MenuItem>

            <Divider />

            <MenuItem
              onClick={() => {
                mutate();
                handleMenuClose();
              }}
              disabled={isPending}
            >
              <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
              {isPending ? 'Logging out...' : 'Logout'}
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
