import React, { useState } from 'react';
import { Box, Button, List, ListItem, ListItemIcon, ListItemText, Autocomplete, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ScreenshotIcon from '@mui/icons-material/Screenshot';
import { useNavigate } from 'react-router-dom';
import CommonLayout from './CommonLayout';
import { useData } from './contexts/PurchaseDataContext'; // DataContext import

export default function EnterPhoneInfo() {
  const navigate = useNavigate();
  const { updateData } = useData(); // 사용자의 선택을 전역 상태에 저장하기 위해 useData 훅 사용

  const carrier = ['APPLE', 'SAMSUNG', 'LG'];
  const series = ['갤럭시S22', '갤럭시 S22 플러스', '갤럭시S22 울트라'];
  const models = ['갤럭시S22', '갤럭시 S22 플러스'];
  const sizes = ['64GB', '128GB', '256GB', '512GB'];

  const handleUpdateData = (type, value) => {
    updateData(type, value); // 전역 상태 업데이트 함수에 변경사항 적용
  };

  const handleEnterIMEI = () => {
    navigate('/EnterInspection');
  };

  return (
    <div>
      <CommonLayout title="기기정보 입력" icon={<ArrowBackIcon onClick={() => navigate('/EnterIMEI')} />}>
        <Box sx={{ width: '100%', bgcolor: 'background.paper', p: 2 }}>
          <List>
            <ListItem>
              <ListItemIcon>
                <ScreenshotIcon color="primary" fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="접수하시려는 휴대폰의 모델정보를 입력." />
            </ListItem>
            {[
              { label: '1. 제조사 선택', options: carrier, onChange: (value) => handleUpdateData('carrier', value) },
              { label: '2. 시리즈 선택', options: series, onChange: (value) => handleUpdateData('series', value), disabled: !carrier },
              { label: '3. 모델 선택', options: models, onChange: (value) => handleUpdateData('model', value), disabled: !series },
              { label: '4. 용량 선택', options: sizes, onChange: (value) => handleUpdateData('size', value), disabled: !models },
            ].map((item, index) => (
              <ListItem key={index}>
                <Autocomplete
                  disablePortal
                  options={item.options}
                  sx={{ width: '100%' }}
                  onChange={(event, newValue) => item.onChange(newValue)}
                  renderInput={(params) => (
                    <TextField {...params} label={item.label} />
                  )}
                  disabled={item.disabled}
                />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box position="fixed" bottom={0} left={0} right={0}>
          <Button variant="contained" color="primary" size="large" fullWidth onClick={handleEnterIMEI}>
            기기정보 입력
          </Button>
        </Box>
      </CommonLayout>
    </div>
  );
}
