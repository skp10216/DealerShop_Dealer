import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
const CommonLayout = ({ title, icon, onSettingsClick, children }) => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  // 설정 아이콘 클릭 시 메인 화면으로 이동하는 함수
  const handleSettingsClick = () => {
    navigate('/'); // 메인 화면의 경로로 이동 (예: '/')
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            {icon}
          </IconButton>
          <Typography variant="h6">{title}</Typography>
          <Button
            color="inherit"
            onClick={handleSettingsClick}
            sx={{ ml: 'auto' }}
          >
            {' '}
            {/* 여기에 변경을 적용 */}
            <SettingsIcon />
          </Button>
        </Toolbar>
      </AppBar>
      <div>{children}</div> {/* 페이지별 컨텐츠 */}
    </div>
  );
};

export default CommonLayout;
