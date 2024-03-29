import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Divider,
  Box,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import CommonLayout from './CommonLayout';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import Checkbox from '@mui/material/Checkbox';

export default function DealerShopPurchaseList() {
  const navigate = useNavigate();
  const [dealers, setDealers] = useState([]);

  useEffect(() => {
    const fetchDealers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/shops/');
        const data = await response.json();
        setDealers(data);
      } catch (error) {
        console.error('Failed to fetch dealers:', error);
      }
    };

    fetchDealers();
  }, []);

  const handleEditClick = (shopID) => {
    navigate(`/DealerShopPurchaseTargetList`);
  };

  return (
    <CommonLayout
      title="수거대상 대리점 선택"
      icon={<ArrowBackIcon onClick={() => navigate(-1)} />}
    >
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <nav aria-label="main mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <StoreMallDirectoryIcon color="primary" fontSize="large" />
                </ListItemIcon>
                <ListItemText primary="대리점 목록" />
                <Checkbox />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
        <Divider />
      </Box>

      <List>
        {dealers.length > 0 ? (
          dealers.map((dealer) => (
            <React.Fragment key={dealer.id}>
              <ListItem>
                <ListItemText primary={dealer.ShopName} />
                <ListItemSecondaryAction>
                  <Chip label="1건" color="primary" />
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => handleEditClick(dealer.ShopID)}
                  >
                    <EditIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))
        ) : (
          <Typography sx={{ margin: 2 }}>대리점이 없습니다.</Typography>
        )}
      </List>
    </CommonLayout>
  );
}
