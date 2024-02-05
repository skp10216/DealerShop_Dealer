import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Divider,
  Box,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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

export default function DealerShopPurchaseList() {
  const navigate = useNavigate();

  // 대리점 목록 예시 데이터
  const dealers = [
    { id: 1, name: '대리점 A' },
    { id: 2, name: '대리점 B' },
    { id: 3, name: '대리점 C' },
    { id: 4, name: '대리점 D' },
    { id: 5, name: '대리점 E' },
    // 추가 대리점 데이터...
  ];

  const handleCreateNewDealer = () => {
    navigate('/DealerShopCreatePage'); // 이동할 경로
  };
  // 편집 아이콘 클릭 시 Update 페이지로 이동하는 함수
  const handleEditClick = (dealerId) => {
    navigate(`/DealerShopPurchaseTargetList/`);
  };

  const handleSettingsClick = () => {
    // DealerListPage에서의 환경설정 기능
  };

  return (
    <CommonLayout
      title="수거대상 대리점 선택"
      icon={<ArrowBackIcon onClick={() => navigate(-1)} />}
      onSettingsClick={handleSettingsClick}
    >
      <div>
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <nav aria-label="main mailbox folders">
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <StoreMallDirectoryIcon color="primary" fontSize="large" />
                  </ListItemIcon>
                  <ListItemText primary="대리점 목록" />
                  <FormControlLabel
                    value="start"
                    control={<Checkbox />}
                    label="미수거대리점 보기"
                    labelPlacement="start"
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>

          <Divider />
        </Box>

        <List>
          {dealers.map((dealer) => (
            <React.Fragment key={dealer.id}>
              <ListItem>
                <ListItemText primary={dealer.name} />
                <ListItemSecondaryAction>
                  <Chip label="1건" color="primary" />
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => handleEditClick(dealer.id)}
                  >
                    <EditIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </div>
    </CommonLayout>
  );
}
