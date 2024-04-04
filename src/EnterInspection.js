import React, { useEffect } from 'react';
import { Box, Button, List, ListItem,ListItemIcon, ListItemText,Typography, Autocomplete, TextField, Chip, Paper  } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ScreenshotIcon from '@mui/icons-material/Screenshot';
import { useNavigate } from 'react-router-dom';
import CommonLayout from './CommonLayout';
import { useData } from './contexts/PurchaseDataContext';

export default function EnterInspection() {
  const navigate = useNavigate();
  const { data, updateData } = useData();

  const gradeOptions = {
    'A등급': ['전체 깨끗'],
    'A-등급': ['액정미세흠집', '후면미세흠집', '몸체미세흠집', '카메라미세흠집'],
    'B+등급': ['후면찍힘', '몸체찍힘', '카메라찍힘'],
    'B등급': ['후면찍힘 심함', '몸체찍힘 심함', '카메라찍힘 심함'],
    'All등급': ['액정파손', '기능불량'],
    'LCD등급': ['터치불량', '흑멍', '노란멍', '픽셀', '검수불가'],
    '폐폰등급': ['폐휴대폰'],
  };

  const gradePriority = ['폐폰등급', 'LCD등급', 'All등급', 'B등급', 'B+등급', 'A-등급', 'A등급'];

  useEffect(() => {
    // 등급 선택에 따라 최종 등급을 전역 상태에 업데이트합니다.
    const selectedGrades = Object.keys(data).filter(key => gradeOptions[key] && data[key].length > 0);
    const highestPriorityGrade = selectedGrades.sort((a, b) => gradePriority.indexOf(a) - gradePriority.indexOf(b))[0] || '';
    updateData('purchaseGrade', highestPriorityGrade);

    // 최종 등급 상세 업데이트
    const details = highestPriorityGrade ? data[highestPriorityGrade] : [];
    updateData('purchaseDetails', details);

  }, [data, updateData]);

  const handleReset = () => {
    // 모든 Autocomplete 값을 초기화합니다.
    Object.keys(gradeOptions).forEach(gradeKey => {
      updateData(gradeKey, []);
    });
    updateData('purchaseGrade', ''); // 전역 상태의 최종 등급도 초기화합니다.
    updateData('purchaseDetails', []); // 전역 상태의 최종 등급도 초기화합니다.
  };

  const handleBackClick = () => navigate('/EnterPhoneInfo');
  const handleEnterPrice = () => navigate('/EnterPrice');

  return (
    <div>
      <CommonLayout title="검수등급 입력" icon={<ArrowBackIcon onClick={handleBackClick} />}>
        <Box sx={{ width: '100%', bgcolor: 'background.paper', p: 2 }}>
          <List>
          <ListItem>
              <ListItemIcon>
                <ScreenshotIcon color="primary" fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="접수하시려는 휴대폰의 모델정보를 입력." />    
              <Button variant="outlined" onClick={handleReset}>
              초기화
            </Button>
          
            </ListItem>
            {Object.entries(gradeOptions).map(([gradeKey, options]) => (
              <ListItem key={gradeKey}>
                <Autocomplete
                  multiple
                  options={options}
                  value={data[gradeKey] || []}
                  onChange={(event, newValue) => updateData(gradeKey, newValue)}
                  filterSelectedOptions
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => <Chip variant="outlined" label={option} {...getTagProps({ index })} />)
                  }
                  renderInput={(params) => <TextField {...params} label={gradeKey} />}
                  sx={{ width: '100%' }}
                />
              </ListItem>
            ))}
          </List>
          <Typography variant="h6">최종 등급: {data.purchaseGrade || ""}</Typography>
          <Typography variant="h6">최종 등급 상세:{data.purchaseDetails || ""} </Typography>

          {/* 전역 데이터 전체 출력 */}
          <Typography sx={{ mt: 2 }} variant="h6">전역 데이터:</Typography>
          <Paper variant="outlined" sx={{ mt: 1, p: 2 }}>
            {Object.entries(data).map(([key, value]) => (
              <Typography key={key}>{`${key}: ${Array.isArray(value) ? value.join(', ') : value}`}</Typography>
            ))}
          </Paper>


        </Box>
        <Box position="fixed" bottom={0} left={0} right={0}>
          <Button variant="contained" color="primary" size="large" fullWidth onClick={handleEnterPrice}>
            검수등급 입력 완료
          </Button>
        </Box>
      </CommonLayout>
    </div>
  );
}
