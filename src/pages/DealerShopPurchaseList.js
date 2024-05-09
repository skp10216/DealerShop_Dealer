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
  Checkbox,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import CommonLayout from './CommonLayout';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import { useAuth } from '../contexts/AuthContext';

export default function DealerShopPurchaseList() {
  const navigate = useNavigate();
  const [dealers, setDealers] = useState([]);
  const [purchaseCounts, setPurchaseCounts] = useState([]);
  const [filterActive, setFilterActive] = useState(false);  // 체크박스 상태 관리
  const { authData } = useAuth(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dealersResponse = await fetch(`http://127.0.0.1:8000/shops/user/${authData.UserID}`);
        const dealersData = await dealersResponse.json();
        setDealers(dealersData);

        const purchasesResponse = await fetch(`http://127.0.0.1:8000/purchases/shops/${authData.UserID}/counts`);
        const purchasesData = await purchasesResponse.json();

        console.log('purchasesData', purchasesData);
        setPurchaseCounts(purchasesData);
      } catch (error) {
        console.error('Failed to fetch data:', error); 
      }
    };

    fetchData();
  }, [authData.UserID]);

  const handleEditClick = (shopID, shopName) => {
    const encodedShopName = encodeURIComponent(shopName);
    navigate(`/DealerShopPurchaseTargetList/${shopID}/${encodedShopName}`);
  };

  const getPurchaseCount = (shopID) => {
    const shop = purchaseCounts.find(p => p.shop_id === shopID);
    return shop ? `${shop.purchase_count} 건` : "0 건";
  };

  const handleCheckboxChange = () => {
    setFilterActive(!filterActive);
  };

  return (
    <CommonLayout
      title="매입대상 대리점 선택"
      icon={<ArrowBackIcon onClick={() => navigate(-1)} />}
    >
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <StoreMallDirectoryIcon color="primary" fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="대리점 목록" />
              매입 대리점 목록<Checkbox
                checked={filterActive}
                onChange={handleCheckboxChange}
              />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Box>

      <List>
        {dealers.filter(dealer => !filterActive || (filterActive && getPurchaseCount(dealer.ShopID) !== "0 건")).map((dealer) => (
          <React.Fragment key={dealer.id}>
            <ListItem>
              <ListItemText primary={dealer.ShopName} />
              <ListItemSecondaryAction>
                <Chip label={getPurchaseCount(dealer.ShopID)} color="primary" />
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => handleEditClick(dealer.ShopID, dealer.ShopName)}
                >
                  <EditIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
        {dealers.length === 0 && <Typography sx={{ margin: 2 }}>대리점이 없습니다.</Typography>}
      </List>
    </CommonLayout>
  );
}
