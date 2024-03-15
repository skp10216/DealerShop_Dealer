import React, { useState, useRef } from 'react';
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
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import EditIcon from '@mui/icons-material/Edit';
import CommonLayout from './CommonLayout';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import ListIcon from '@mui/icons-material/List';
import DealerShopTableList from './DealerShopTableList';
import ScreenshotIcon from '@mui/icons-material/Screenshot';
import { useData } from './contexts/PurchaseDataContext'; // DataContext 훅 사용

export default function EnterPirce() {
  const navigate = useNavigate();
  const { updateData } = useData(); // 전역 상태 업데이트 함수 사용
  const [price, setPrice] = useState('');
  const priceInputRef = useRef(null); // 금액 입력 필드에 대한 참조
  const [isError, setIsError] = useState(false); // 에러 상태 추가
  const [openModal, setOpenModal] = useState(false);
  

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSettingsClick = () => {
    // MainPage에서의 환경설정 기능
    console.log('Main Page Setting Click');
  };
  const handleEnterPrice = () => {
    if (price === '' || price === 0) {
      // 금액이 입력되지 않았거나 0인 경우 포커스 설정
      priceInputRef.current && priceInputRef.current.focus();
      setIsError(true); // 에러 상태를 true로 설정
    } else {
      setIsError(false); // 에러 상태를 false로 설정
      setOpenModal(true);
    }
  };

  const handleConfirm = () => {
    updateData('purchasePrice', price); // 전역 상태에 price 번호 저장
    handleCloseModal(); // 모달 닫기
    navigate('/PurchaseConfirm'); // PurchaseConfirm 경로로 이동
  };

  // 숫자를 쉼표가 있는 문자열로 포매팅하는 함수
  const formatNumber = (num) => {
    // 정수 부분과 소수점 부분을 분리
    const parts = num.split('.');
    // 정수 부분에 쉼표 추가
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    // 합쳐서 반환
    return parts.join('.');
  };

  const handlePriceChange = (event) => {
    const value = event.target.value;
    const unformattedNumber = value.replace(/,/g, '');

    // 숫자만 입력되도록 검사
    if (unformattedNumber === '' || /^[0-9\b]+$/.test(unformattedNumber)) {
      setPrice(formatNumber(unformattedNumber));
    }
  };

  return (
    <div>
      <CommonLayout
        title="금액입력"
        icon={<ArrowBackIcon onClick={() => navigate(-1)} />}
        onSettingsClick={handleSettingsClick}
      >
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <nav aria-label="main Purchase list">
            <List>
              <ListItem>
                <ListItemIcon>
                  <ScreenshotIcon color="primary" fontSize="large" />
                </ListItemIcon>
                <ListItemText primary="고객에게 입금하실 최종 판매금액을 입력해주세요." />
              </ListItem>
              <ListItem>
                <TextField
                  label="금액 입력"
                  placeholder="'-'없이 숫자만 입력"
                  value={price}
                  onChange={handlePriceChange}
                  fullWidth // 전체 너비를 사용하도록 설정
                  inputRef={priceInputRef} // 참조 설정
                  error={isError} // 에러 상태에 따라 TextField 스타일 변경
                />
              </ListItem>
            </List>
          </nav>
          <Divider />
        </Box>
        <Box position="fixed" bottom={0} left={0} right={0}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            onClick={handleEnterPrice}
          >
            금액 입력하기
          </Button>
        </Box>
      </CommonLayout>
      {/* 모달 컴포넌트 */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>입력한 금액 확인</DialogTitle>
        <DialogContent>
          <Typography
            variant="h5"
            style={{
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#1976D2',
            }}
          >
            {price}원
          </Typography>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
          <Button
            onClick={handleCloseModal}
            variant="outlined"
            color="error"
            style={{ margin: '8px' }}
          >
            취소
          </Button>
          <Button
            onClick={handleConfirm}
            variant="outlined"
            color="primary"
            style={{ margin: '8px' }}
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
