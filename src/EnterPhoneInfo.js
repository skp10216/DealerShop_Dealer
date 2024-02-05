import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Autocomplete,
  TextField,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ScreenshotIcon from '@mui/icons-material/Screenshot';
import { useNavigate } from 'react-router-dom';
import CommonLayout from './CommonLayout';

export default function EnterPhoneInfo() {
  const navigate = useNavigate();

  const manufacturers = ['APPLE', 'SAMSUNG', 'LG'];
  const series = ['갤럭시S22', '갤럭시 S22 플러스', '갤럭시S22 울트라'];
  const models = ['갤럭시S22', '갤럭시 S22 플러스'];
  const sizes = ['64GB', '128GB', '256GB', '512GB'];

  const [selectedManufacturer, setSelectedManufacturer] = useState('');
  const [selectedSeries, setSelectedSeries] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  const [openSeries, setOpenSeries] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [openSize, setOpenSize] = useState(false);

  const handleBackClick = () => {
    navigate('/EnterIMEI'); // EnterIMEI 페이지로 이동
  };

  const handleEnterIMEI = () => {
    navigate('/EnterInspection');
  };

  useEffect(() => {
    if (selectedManufacturer) {
      setOpenSeries(true);
    }
  }, [selectedManufacturer]);

  useEffect(() => {
    if (selectedSeries) {
      setOpenModel(true);
    }
  }, [selectedSeries]);

  useEffect(() => {
    if (selectedModel) {
      setOpenSize(true);
    }
  }, [selectedModel]);

  return (
    <div>
      <CommonLayout
        title="기기정보 입력"
        icon={<ArrowBackIcon onClick={handleBackClick} />}
      >
        <Box sx={{ width: '100%', bgcolor: 'background.paper', p: 2 }}>
          <List>
            <ListItem>
              <ListItemIcon>
                <ScreenshotIcon color="primary" fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="접수하시려는 휴대폰의 모델정보를 입력." />
            </ListItem>
            <ListItem>
              <Autocomplete
                disablePortal
                id="combo-box-company"
                options={manufacturers}
                sx={{ width: '100%' }}
                onChange={(event, newValue) => {
                  setSelectedManufacturer(newValue);
                  setSelectedSeries('');
                  setSelectedModel('');
                  setSelectedSize('');
                }}
                renderInput={(params) => (
                  <TextField {...params} label="1. 제조사 선택" />
                )}
              />
            </ListItem>
            <ListItem>
              <Autocomplete
                disablePortal
                id="combo-box-series"
                options={series}
                open={openSeries}
                onOpen={() => setOpenSeries(true)}
                onClose={() => setOpenSeries(false)}
                value={selectedSeries}
                onChange={(event, newValue) => {
                  setSelectedSeries(newValue);
                  setSelectedModel('');
                  setSelectedSize('');
                }}
                disabled={!selectedManufacturer}
                sx={{ width: '100%' }}
                renderInput={(params) => (
                  <TextField {...params} label="2. 시리즈 선택" />
                )}
              />
            </ListItem>
            <ListItem>
              <Autocomplete
                disablePortal
                id="combo-box-model"
                options={models}
                open={openModel}
                onOpen={() => setOpenModel(true)}
                onClose={() => setOpenModel(false)}
                value={selectedModel}
                onChange={(event, newValue) => {
                  setSelectedModel(newValue);
                  setSelectedSize('');
                }}
                disabled={!selectedSeries}
                sx={{ width: '100%' }}
                renderInput={(params) => (
                  <TextField {...params} label="3. 모델 선택" />
                )}
              />
            </ListItem>
            <ListItem>
              <Autocomplete
                disablePortal
                id="combo-box-size"
                options={sizes}
                open={openSize}
                onOpen={() => setOpenSize(true)}
                onClose={() => setOpenSize(false)}
                value={selectedSize}
                onChange={(event, newValue) => setSelectedSize(newValue)}
                disabled={!selectedModel}
                sx={{ width: '100%' }}
                renderInput={(params) => (
                  <TextField {...params} label="4. 용량 선택" />
                )}
              />
            </ListItem>
          </List>
        </Box>
        <Box position="fixed" bottom={0} left={0} right={0}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            onClick={handleEnterIMEI}
          >
            기기정보 입력
          </Button>
        </Box>
      </CommonLayout>
    </div>
  );
}
