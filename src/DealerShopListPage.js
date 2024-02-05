import React from 'react';
import Divider from '@mui/material/Divider';
import CommonLayout from './CommonLayout';
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Box,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

export default function DealerListPage() {
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
    navigate(`/DealerShopUpdatePage/${dealerId}`);
  };

  const handleSettingsClick = () => {
    // DealerListPage에서의 환경설정 기능
  };

  return (
    <CommonLayout
      title="대리점 목록"
      icon={<ArrowBackIcon onClick={() => navigate(-1)} />}
      onSettingsClick={handleSettingsClick}
    >
      <div>
        <List>
          {dealers.map((dealer) => (
            <React.Fragment key={dealer.id}>
              <ListItem>
                <ListItemText primary={dealer.name} />
                <ListItemSecondaryAction>
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
        <Box position="fixed" bottom={0} left={0} right={0}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            onClick={handleCreateNewDealer}
          >
            신규 대리점 등록
          </Button>
        </Box>
      </div>
    </CommonLayout>
  );
}
