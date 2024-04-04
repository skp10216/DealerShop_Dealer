import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  Container,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import CommonLayout from './CommonLayout';
import { useAuth } from './contexts/AuthContext';

export default function MainPage() {
  const navigate = useNavigate();
  const { authData } = useAuth(); // Use the useAuth hook to access authentication data
  
  const handleDealerManagementClick = () => {
    navigate('/DealerShopListPage');
  };

  const handleSettingsClick = () => {
    console.log('Main Page Setting Click');
  };

  const handleDealerPurchaseClick = () => {
    navigate('/DealerShopPurchaseList');
  };

  const handleDealerDirectPurchaseClick = () => {
    navigate('/EnterIMEI');
  };

  const handleDealerPurchaseListClick = () => {
    navigate('/PurchaseList');
  };

  return (
    <div>
      <CommonLayout
        title="딜러마켓"
        icon={<HomeIcon />}
        onSettingsClick={handleSettingsClick}
      >
        <Container>
        {authData && (
            <Typography variant="h6" style={{ margin: '20px 0' }}>
              안녕하세요, {authData.Username}님! {/* Adjust according to your authData structure */}
            </Typography>
          )}
          
          {/* The rest of your component remains unchanged */}
          {/* 새로 추가된 영역 */}
          <Box display="flex" justifyContent="center" mt={2}>
            <Card
              style={{
                margin: '10px',
                borderRadius: '20px',
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                transition: 'transform 0.15s ease-in-out',
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = 'scale(1.05)')
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <CardContent>
                <Typography
                  variant="h4"
                  component="h2"
                  padding="20px"
                  style={{ color: '#fff', fontWeight: 'bold' }}
                >
                  홍대점
                </Typography>
                <Typography
                  color="textSecondary"
                  style={{ color: '#fff' }}
                  padding="5px"
                >
                  매입: 1건
                </Typography>
                <Typography
                  color="textSecondary"
                  style={{ color: '#fff' }}
                  padding="5px"
                >
                  미매입: 0건
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
          <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              style={{ marginBottom: '20px' }}
              onClick={handleDealerDirectPurchaseClick}
            >
              직접 매입하기
            </Button>
            {/* 기존 버튼 영역 */}
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              style={{ marginBottom: '20px' }}
              onClick={handleDealerPurchaseClick}
            >
              대리점 매입하기
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={handleDealerPurchaseListClick}
              style={{ marginBottom: '20px' }}
            >
              매입내역
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={handleDealerManagementClick}
            >
              대리점 관리
            </Button>
          </Box>
        </Container>
      </CommonLayout>
    </div>
  );
}
