import React from 'react';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';

import Logo from '../../Image/GsynergyLogo.svg';

const categories = [
  {
    id: 'Main',
    children: [
      {
        id: 'Stores',
        icon: <LocalGroceryStoreOutlinedIcon />,
        path: '/StoreDashboard',
        active: true,
      },
      {
        id: 'SKUs',
        icon: <Inventory2OutlinedIcon />,
        path: '/SKUDashboard',
        active: true,
      },
      {
        id: 'Planning',
        icon: <EditCalendarOutlinedIcon />,
        path: '/PlanningDashboard',
        active: true,
      },
      {
        id: 'Chart',
        icon: <InsertChartOutlinedIcon />,
        path: '/ChartDashboard',
        active: true,
      },
    ],
  },
];

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

export default function Navigator(props: DrawerProps) {
  const { ...other } = props;
  const navigate = useNavigate();

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
          <img
            src={Logo} // Replace with your logo path
            alt="Logo"
            style={{ height: 50, width: 'auto' }} // Adjust size
          />
        </Box>
        {/* <ListItem
          sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}
        >
          Paperbase
        </ListItem> */}
        {/* <ListItem sx={{ ...item, ...itemCategory }}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>Project Overview</ListItemText>
        </ListItem> */}
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: '#101F33' }}>
            {/* <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
            </ListItem> */}
            {children.map(({ id: childId, icon, active, path }) => (
              <ListItem disablePadding key={childId}>
                <ListItemButton
                  selected={active}
                  sx={item}
                  onClick={() => navigate(path)}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{childId}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}
