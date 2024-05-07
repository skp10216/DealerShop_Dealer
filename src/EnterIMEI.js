import React, { useState, useRef, useEffect } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Button, Box, Container,
  List, ListItem, ListItemText, ListItemSecondaryAction, Divider,
  Chip, TextField, Checkbox, FormControlLabel, MenuItem, FormControl, Select, InputLabel
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CommonLayout from './CommonLayout';
import { useAuth } from './contexts/AuthContext';
import { useData } from './contexts/PurchaseDataContext';

export default function EnterIMEI() {
  const navigate = useNavigate();
  const { authData } = useAuth();
  const { updateData } = useData();  // useData에서 updateData 함수 가져오기
  const [imei, setIMEI] = useState('');
  const imeiInputRef = useRef(null);
  const [isError, setIsError] = useState(false);
  const [isDealership, setIsDealership] = useState(false);
  const [dealers, setDealers] = useState([]);
  const [selectedDealer, setSelectedDealer] = useState('');

  const fetchDealers = async () => {
    const url = `http://127.0.0.1:8000/shops/user/${authData.UserID}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setDealers(data || []); // 불러온 데이터로 상태 업데이트
      console.log("Fetched dealers data: ", data);
    } catch (error) {
      console.error("Failed to fetch dealers", error);
    }
  };

  const handleEnterIMEI = () => {
    if (!imei) {
      imeiInputRef.current.focus();
      setIsError(true);
      return;
    }
    setIsError(false);
    navigate('/EnterPhoneInfo');
  };

  const handleIMEIChange = (event) => {
    const regex = /^[a-zA-Z0-9]+$/;
    const { value } = event.target;
    if (value === '' || regex.test(value)) {
      setIMEI(value);
      updateData('imei', value);  
      setIsError(false);
    }
  };

  const handleCheckboxChange = (event) => {
    setIsDealership(event.target.checked);
    if (event.target.checked) {
      fetchDealers();
    } else {
      setDealers([]);
      setSelectedDealer('');
      updateData('dealershipID', null);  // 체크박스 해제 시 dealershipID를 NULL로 초기화
    }
  };

  const handleDealerChange = (event) => {
    console.log("Selected dealer ID:", event.target.value);  // 로그로 선택된 값 확인
    const ShopId = event.target.value;
    setSelectedDealer(ShopId);
    updateData('dealershipID', ShopId);  // 선택된 dealershipID를 업데이트
  };

  useEffect(() => {
    if (imeiInputRef.current) {
      imeiInputRef.current.focus();
    }
  }, []);

  return (
    <CommonLayout title="IMEI 입력" icon={<ArrowBackIcon onClick={() => navigate(-1)} />}>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <List>
          <ListItem disablePadding>
            <TextField
              label="IMEI"
              fullWidth
              value={imei}
              inputRef={imeiInputRef}
              onChange={handleIMEIChange}
              error={isError}
              helperText={isError ? "IMEI 번호를 입력해주세요." : ""}
            />
          </ListItem>
          <ListItem>
            <FormControlLabel
              control={<Checkbox checked={isDealership} onChange={handleCheckboxChange} />}
              label="대리점으로 매입"
            />
          </ListItem>
          {isDealership && (
            <ListItem>
              <FormControl fullWidth>
                <InputLabel id="dealer-select-label">대리점 선택</InputLabel>
                <Select
                  labelId="dealer-select-label"
                  id="dealer-select"
                  value={selectedDealer}
                  label="대리점 선택"
                  onChange={handleDealerChange}
                >
                  {dealers.map((dealer) => (
                    <MenuItem key={dealer.ShopID} value={dealer.ShopID}>{`ID: ${dealer.ShopID}, 이름: ${dealer.ShopName}`}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </ListItem>
          )}
        </List>
      </Box>
      <Box position="fixed" bottom={0} left={0} right={0}>
        <Button variant="contained" color="primary" size="large" fullWidth onClick={handleEnterIMEI}>
          IMEI 입력
        </Button>
      </Box>
    </CommonLayout>
  );
}
