import React from 'react';
import React, { useState } from 'react';
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
import CommonLayout from './CommonLayout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import EditIcon from '@mui/icons-material/Edit';
import CommonLayout from './CommonLayout';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
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

export default function EnterIMEI() {
  const navigate = useNavigate();
  const [imei, setIMEI] = useState('');

  const handleDealerManagementClick = () => {
    navigate('/DealerShopListPage');
  };

  const handleSettingsClick = () => {
    // MainPage에서의 환경설정 기능
    console.log('Main Page Setting Click');
  };

  const handleDealerPurchaseClick = () => {
    navigate('/DealerShopPurchaseList');
  };

  const handleEnterIMEI = () => {
    navigate('/EnterPhoneInfo');
  };

  const handleIMEIChange = (event) => {
    const value = event.target.value;
    // 숫자만 입력되도록 검사
    if (value === '' || /^[0-9\b]+$/.test(value)) {
      setIMEI(value);
    }
  };

  return (
    <div>
      <CommonLayout
        title="IMEI 입력"
        icon={<ArrowBackIcon onClick={() => navigate(-1)} />}
        onSettingsClick={handleSettingsClick}
      >
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <nav aria-label="main Purchase list">
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <ScreenshotIcon color="primary" fontSize="large" />
                  </ListItemIcon>
                  <ListItemText primary="IMEI 입력" />
                  <TextField
                    label="IMEI"
                    placeholder="'-'없이 숫자만 입력"
                    value={imei}
                    onChange={handleIMEIChange}
                  />
                </ListItemButton>
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
            onClick={handleEnterIMEI}
          >
            IMEI 입력
          </Button>
        </Box>
      </CommonLayout>
    </div>
  );
}
