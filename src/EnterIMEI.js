import React, { useState,useRef } from 'react';
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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import EditIcon from '@mui/icons-material/Edit';
import CommonLayout from './CommonLayout';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import ListIcon from '@mui/icons-material/List';
import DealerShopTableList from './DealerShopTableList';
import ScreenshotIcon from '@mui/icons-material/Screenshot';
import { useData } from './contexts/PurchaseDataContext'; // DataContext 훅 사용

export default function EnterIMEI() {
  const navigate = useNavigate();
  const { updateData } = useData(); // 전역 상태 업데이트 함수 사용
  const [imei, setIMEI] = useState('');
  const iemiInputRef = useRef(null);
  const [isError, setIsError] = useState(false); // 에러 상태 추가

  // 페이지 이동 핸들러 함수
  const handleEnterIMEI = () => {
    if (!imei){
      iemiInputRef.current && iemiInputRef.current.focus();
      setIsError(true); // 에러 상태를 true로 설정
      return
    } else {
      setIsError(false); // 에러 상태를 false 설정
    }
      
    updateData('imei', imei); // 전역 상태에 IMEI 번호 저장
    navigate('/EnterPhoneInfo'); // IMEI 입력 후 다음 페이지로 네비게이션
  };

  // IMEI 입력 핸들러 함수
  const handleIMEIChange = (event) => {
      const {value} = event.target;
      //영문과 숫자만 포함되어 있는지 검사하는 정규 표현식
      const regex = /^[a-zA-Z0-9]+$/;

      if (value === '' || regex.test(value)) {
        setIMEI(event.target.value);
        if (isError) setIsError(false); // 에러 상태 초기화
      }
  };

  return (
    <div>
      <CommonLayout
        title="IMEI 입력"
        icon={<ArrowBackIcon onClick={() => navigate(-1)} />}
      >
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ScreenshotIcon color="primary" fontSize="large" />
                </ListItemIcon>
                <ListItemText primary="IMEI 입력" />
                <TextField
                  label="IMEI"
                  value={imei}
                  inputRef={iemiInputRef}
                  onChange={handleIMEIChange}
                  error={isError} // 에러 상태에 따라 TextField 스타일 변경
                  helperText={isError ? "IMEI 번호를 입력해주세요." : ""} // 에러 메시지 표시
                />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </Box>
        <Box position="fixed" bottom={0} left={0} right={0}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            onClick={handleEnterIMEI}
          >
            IMEI 입력
          </Button>
        </Box>
      </CommonLayout>
    </div>
  );
}
