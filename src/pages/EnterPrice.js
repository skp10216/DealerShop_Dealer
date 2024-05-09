import React, { useState, useEffect, useRef } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Button, Box, Container, List, ListItem,
  ListItemText, Divider, TextField, FormControl, InputLabel, Select, MenuItem,
  FormLabel, RadioGroup, FormControlLabel, Radio,ListItemIcon 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useNavigate } from 'react-router-dom';
import CommonLayout from './CommonLayout';
import { useData } from '../contexts/PurchaseDataContext';
import { useAuth } from '../contexts/AuthContext';
import { handleNumericInput } from '../utils/dateUtils';

export default function EnterPrice() {
  const navigate = useNavigate();
  const { updateData } = useData();
  const [price, setPrice] = useState('');
  const priceInputRef = useRef(null);
  const [isError, setIsError] = useState(false);
  const [accountType, setAccountType] = useState('내 계좌');
  const { authData } = useAuth();
  const [bankInfo, setBankInfo] = useState({
    bank: '',
    accountHolder: '',
    accountNumber: '',
    phoneNumber: ''
  });

  useEffect(() => {
    console.log('authData:', authData);
    priceInputRef.current.focus();

    if (accountType === '내 계좌' && authData) {
      setBankInfo({
        bank: authData.Bank || '',
        accountHolder: authData.AccountHolder || '',
        accountNumber: authData.AccountNumber || '',
        phoneNumber: authData.PhoneNumber || ''
      });
    }
  }, [accountType, authData]);

  const handleAccountTypeChange = (event) => {
    const selectedAccountType = event.target.value;
    setAccountType(selectedAccountType);
    if (selectedAccountType === '타 계좌') {
      setBankInfo({
        bank: '',
        accountHolder: '',
        accountNumber: '',
        phoneNumber: ''
      });
    }
  };

  const handleBankInfoChange = (prop) => (event) => {
    setBankInfo({ ...bankInfo, [prop]: event.target.value });
  };

  const handleEnterPrice = () => {
    if (price === '' || price === 0) {
      priceInputRef.current && priceInputRef.current.focus();
      setIsError(true);
    } else {
      setIsError(false);
      updateData('accountHolder', bankInfo.accountHolder);
      updateData('accountNumber', bankInfo.accountNumber);
      updateData('bankName', bankInfo.bank);
      updateData('phoneNumber', bankInfo.phoneNumber);
      updateData('purchasePrice', price); // 전역 상태에 price 저장
      navigate('/PurchaseConfirm'); // PurchaseConfirm 경로로 이동
    }
  };

  const handlePriceChange = (event) => {
    const value = event.target.value;
    handleNumericInput(value, setPrice); // setPrice는 해당 컴포넌트에서 상태를 업데이트하는 함수여야 합니다.
  };

  return (
    <div>
      <CommonLayout title="금액 입력" icon={<ArrowBackIcon onClick={() => navigate(-1)} />}>
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <List>
            <ListItem>
              <ListItemIcon>
                <AttachMoneyIcon color="primary" fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="판매금액을 입력해주세요." />
            </ListItem>
            <ListItem>
              <TextField
                label="금액 입력"
                placeholder="'-' 없이 숫자만 입력"
                value={price}
                onChange={handlePriceChange}
                fullWidth
                inputRef={priceInputRef}
                error={isError}
              />
            </ListItem>
          </List>
          
          <List>
            <ListItem>
              <ListItemIcon>
                <AccountBalanceIcon color="primary" fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="입금받으실 계좌정보를 입력해주세요." />
            </ListItem>
            <ListItem>
              <FormControl component="fieldset">
                <FormLabel component="legend">계좌 유형</FormLabel>
                <RadioGroup row aria-label="account type" name="account-type-group" value={accountType} onChange={handleAccountTypeChange}>
                  <FormControlLabel value="내 계좌" control={<Radio />} label="내 계좌" />
                  <FormControlLabel value="타 계좌" control={<Radio />} label="타 계좌" />
                </RadioGroup>
              </FormControl>
            </ListItem>
            <ListItem><TextField label="은행" fullWidth value={bankInfo.bank} onChange={handleBankInfoChange('bank')} /></ListItem>
            <ListItem><TextField label="예금주" fullWidth value={bankInfo.accountHolder} onChange={handleBankInfoChange('accountHolder')} /></ListItem>
            <ListItem><TextField label="계좌번호" fullWidth value={bankInfo.accountNumber} onChange={handleBankInfoChange('accountNumber')} /></ListItem>
            <ListItem><TextField label="전화번호" fullWidth value={bankInfo.phoneNumber} onChange={handleBankInfoChange('phoneNumber')} /></ListItem>
          </List>
        </Box>
        <Box position="fixed" bottom={0} left={0} right={0}>
          <Button variant="contained" color="primary" size="large" fullWidth onClick={handleEnterPrice}>금액 입력하기</Button>
        </Box>
      </CommonLayout>
    </div>
  );
}
