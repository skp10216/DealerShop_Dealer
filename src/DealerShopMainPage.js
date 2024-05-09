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
  useMediaQuery,
  useTheme
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import CommonLayout from './CommonLayout';
import { useAuth } from './contexts/AuthContext';

export default function MainPage() {
  const navigate = useNavigate();
  const { authData } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <CommonLayout title="딜러마켓" icon={<HomeIcon />} onSettingsClick={() => handleNavigation('/Settings')}>
      <Container maxWidth="md">
        {authData && (
          <Typography variant="h6" style={{ margin: '20px 0', color: '#333' }}>
            안녕하세요, {authData.Username}님!
          </Typography>
        )}
        <Box display="flex" justifyContent="center" mt={2}>
          <Card sx={{
            m: 1,
            borderRadius: 2,
            background: 'linear-gradient(to right, #2196F3, #21CBF3)',
            boxShadow: 3,
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: 6,
            },
            width: isMobile ? '100%' : 200  // 동적 너비 조정
          }}>
            <CardContent>
              <Typography variant="h4" sx={{ color: '#fff', fontWeight: 'bold', p: 2 }}>
                {authData.Username}
              </Typography>
              <Typography sx={{ color: '#fff', p: 1 }}>
                매입: 1건
              </Typography>
              <Typography sx={{ color: '#fff', p: 1 }}>
                미매입: 0건
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
          <Button variant="contained" size="large" fullWidth sx={{ mb: 2 }} onClick={() => handleNavigation('/EnterIMEI')}>
            직접 매입하기
          </Button>
          <Button variant="contained" size="large" fullWidth sx={{ mb: 2 }} onClick={() => handleNavigation('/DealerShopPurchaseList')}>
            대리점 매입하기
          </Button>
          <Button variant="contained" size="large" fullWidth sx={{ mb: 2 }} onClick={() => handleNavigation('/PurchaseList')}>
            매입내역
          </Button>
          <Button variant="contained" size="large" fullWidth onClick={() => handleNavigation('/DealerShopListPage')}>
            대리점 관리
          </Button>
        </Box>
      </Container>
    </CommonLayout>
  );
}
