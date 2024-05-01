import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button, Box, Container, List,
  ListItem, ListItemText, ListItemSecondaryAction, Divider, Chip, FormControlLabel,
  FormControl, FormLabel, Checkbox, ListItemButton, ListItemIcon } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CommonLayout from './CommonLayout';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import ListIcon from '@mui/icons-material/List';
import DealerShopTableList from './DealerShopTableList';

export default function DealerShopPurchaseTargetList() {
  const navigate = useNavigate();
  const { shopID,shopName  } = useParams();
  const [purchaseData, setPurchaseData] = useState([]);
  const decodedShopName = decodeURIComponent(shopName);  
  const [totalCount, setTotalCount] = useState(0);

  function updatePurchaseData(updatedData) {
    setPurchaseData(updatedData);
    setTotalCount(updatedData.length);
  }

  useEffect(() => {
    async function fetchPurchases() {
      if (!shopID) {
        console.error("ShopID is not provided.");
        return;
      }
      console.log("ShopID is ",shopID);
      const url = `http://127.0.0.1:8000/purchases/dealership/${shopID}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setPurchaseData(data);
        setTotalCount(data.length);
      } catch (error) {
        console.error('Failed to fetch purchases:', error);
      }
    }

    fetchPurchases();
  }, [shopID]);

  return (
    <CommonLayout title="수거대상목록" icon={<ArrowBackIcon onClick={() => navigate(-1)} />}>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <nav aria-label="main Purchase list">
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <StoreMallDirectoryIcon color="primary" fontSize="large" />
                </ListItemIcon>
                <ListItemText primary={decodedShopName} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ListIcon color="primary" fontSize="large" />
                </ListItemIcon>
                <ListItemText primary={`수거목록 (총 ${totalCount || 0}건)`} />
                <FilterAltIcon color="primary" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
        <Divider />
        <DealerShopTableList data={purchaseData} updateData = {updatePurchaseData} />
      </Box>
    </CommonLayout>
  );
}
