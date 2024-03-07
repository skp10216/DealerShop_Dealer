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
import { useData } from './contexts/DataContext';

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

  const handleEnterConfirm = () => {
    alert("수거가 완료되었습니다.");
    navigate('/');
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
                secondary={<Typography component="span" style={textStyle.secondary}>{`${data.manufacturer} ${data.series} ${data.model} ${data.size}`}</Typography>}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="검수 등급"
                secondary={<Typography component="span" style={textStyle.secondary}>{data.finalGrade}</Typography>}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="검수 등급 상세"
                secondary={<Typography component="span" style={textStyle.secondary}>{data.finalGradeDetails.join(', ')}</Typography>}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="금액"
                secondary={<Typography component="span" style={textStyle.secondary}>{data.totalPrice}</Typography>}
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
