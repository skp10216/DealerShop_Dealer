import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Chip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import CommonLayout from './CommonLayout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import EditIcon from '@mui/icons-material/Edit';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import ListIcon from '@mui/icons-material/List';
import PurchaseListTable from './PurchaseListTable';

export default function PurchaseList() {
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    // MainPage에서의 환경설정 기능
    console.log('Main Page Setting Click');
  };

  return (
    <div>
      <CommonLayout
        title="수거대상목록"
        icon={<ArrowBackIcon onClick={() => navigate(-1)} />}
        onSettingsClick={handleSettingsClick}
      >
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <nav aria-label="main Purchase list">
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <StoreMallDirectoryIcon color="primary" fontSize="large" />
                  </ListItemIcon>
                  <ListItemText primary="홍대점" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <ListIcon color="primary" fontSize="large" />
                  </ListItemIcon>
                  <ListItemText primary="수거목록 (총 1건)" />
                  <FilterAltIcon color="primary" />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
          <Divider />
          <PurchaseListTable />
        </Box>
      </CommonLayout>
    </div>
  );
}
