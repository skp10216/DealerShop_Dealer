import React from 'react';
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ScreenshotIcon from '@mui/icons-material/Screenshot';
import { useNavigate } from 'react-router-dom';
import CommonLayout from './CommonLayout';
import { useData } from './contexts/PurchaseDataContext';

export default function PurchaseConfirm() {
  const navigate = useNavigate();
  const { data } = useData();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const textStyle = {
    primary: {
      fontSize: matches ? '1.2rem' : '1rem', // Adjust font size based on screen size
    },
    secondary: {
      fontSize: matches ? '1.1rem' : '0.9rem',
      fontWeight: 'bold',
    },
  };

  const handleEnterConfirm = async () => {
    try {
      let purchasePriceWithoutCommas = data.purchasePrice.replace(/,/g, '');
      let purchasePrice = parseInt(purchasePriceWithoutCommas, 10);

      const phoneData = {
        IMEI: data.imei,
        Carrier: data.carrier,
        Model: data.model,
        Size: data.size,
      };
  
      const purchaseData = {
        UserID: 1,
        PhoneID: 0,
        PaymentStatus: "Pending",
        PurchaseGrade: data.purchaseGrade,
        PurchaseDetails: data.purchaseDetails.join(", "),
        PurchasePrice: purchasePrice
      };
  
      // fetch를 사용하여 서버에 데이터를 전송합니다.
    const response = await fetch('http://127.0.0.1:8000/phone-purchase/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone: phoneData, purchase: purchaseData }),
    });
  
      if (!response.ok) {
        throw new Error('Failed to confirm purchase. ' + response.statusText);
      }

    // 응답을 JSON 형태로 변환합니다.
    const result = await response.json(); // 이 부분이 추가되었습니다.

      // 처리 성공 후, 예를 들어 홈 화면으로 리디렉션
      alert("수거가 완료되었습니다.");
      console.log(result); // 성공 결과 로깅

      navigate('/main'); // 실제 사용 시 활성화
    } catch (error) {
      alert(`Error: ${error.message}`);
      console.error(error); // 에러 로깅
    }
  };

  return (
    <div>
      <CommonLayout
        title="수거 최종 확인"
        icon={<ArrowBackIcon onClick={() => navigate(-1)} />}
      >
        <Box sx={{ width: '100%', bgcolor: 'background.paper', p: 2, overflow: 'auto' }}>
          <List>
            <ListItem>
              <ListItemIcon>
                <ScreenshotIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="입력하신 정보가 맞는지 마지막으로 확인해주세요."
                primaryTypographyProps={{ style: textStyle.primary }}
              />
            </ListItem>
            <Divider />
            {/* 리스트 아이템들 구성 */}
            <ListItem>
              <ListItemText
                primary="IMEI"
                secondary={<Typography component="span" style={textStyle.secondary}>{data.imei}</Typography>}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="기기정보"
                secondary={<Typography component="span" style={textStyle.secondary}>{`${data.carrier} ${data.series} ${data.model} ${data.size}`}</Typography>}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="검수 등급"
                secondary={<Typography component="span" style={textStyle.secondary}>{data.purchaseGrade}</Typography>}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="검수 등급 상세"
                secondary={<Typography component="span" style={textStyle.secondary}>{data.purchaseDetails}</Typography>}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="금액"
                secondary={<Typography component="span" style={textStyle.secondary}>{data.purchasePrice}</Typography>}
              />
            </ListItem>
            <Divider />
          </List>
        </Box>
        <Box position="fixed" bottom={0} left={0} right={0}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            onClick={handleEnterConfirm}
          >
            수거 완료하기
          </Button>
        </Box>
      </CommonLayout>
    </div>
  );
}
