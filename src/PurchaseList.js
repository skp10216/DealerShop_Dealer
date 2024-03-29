import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemButton,
  ListItemIcon,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CommonLayout from './CommonLayout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import ListIcon from '@mui/icons-material/List';
import PurchaseListTable from './PurchaseListTable';

export default function PurchaseList() {
  const navigate = useNavigate();

  return (
    <div>
      <CommonLayout
        title="수거대상목록"
        icon={<ArrowBackIcon onClick={() => navigate(-1)} />}
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
