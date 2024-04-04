import React, { useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';
import CommonLayout from './CommonLayout';
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Box,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

export default function DealerListPage() {
  const navigate = useNavigate();
  const { authData } = useAuth(); 
  
  // 대리점 목록을 저장할 상태
  const [dealers, setDealers] = useState([]);

  // 대리점 목록을 불러오는 함수
  useEffect(() => {
    const fetchDealers = async () => {
      const url = `http://127.0.0.1:8000/shops/user/${authData.UserID}`;
      const response = await fetch(url);
      
      const data = await response.json();
      setDealers(data); // 불러온 데이터로 상태 업데이트
      console.log("result data" + data);
    };

    fetchDealers();
  }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시에만 실행

  const handleCreateNewDealer = () => {
    navigate('/DealerShopCreatePage');
  };

  const handleEditClick = (shopId) => {
    navigate(`/DealerShopUpdatePage/${shopId}`);
  };

  const handleSettingsClick = () => {
    // DealerListPage에서의 환경설정 기능
  };

  return (
    <CommonLayout
      title="대리점 목록"
      icon={<ArrowBackIcon onClick={() => navigate(-1)} />}
      onSettingsClick={handleSettingsClick}
    >
      <div>
        <List>
          {dealers.map((dealer) => (
            <React.Fragment key={dealer.ShopID}>
              <ListItem>
                <ListItemText primary={dealer.ShopName} />
                <ListItemSecondaryAction>
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
          ))}
        </List>
        <Box position="fixed" bottom={0} left={0} right={0}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            onClick={handleCreateNewDealer}
          >
            신규 대리점 등록
          </Button>
        </Box>
      </div>
    </CommonLayout>
  );
}
