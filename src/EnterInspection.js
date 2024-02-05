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
  Chip,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ScreenshotIcon from '@mui/icons-material/Screenshot';
import { useNavigate } from 'react-router-dom';
import CommonLayout from './CommonLayout';

export default function EnterPhoneInfo() {
  const navigate = useNavigate();
  const gradeA = ['전체 깨끗'];
  const gradeAdown = [
    '액정미세흠집',
    '후면미세흠집',
    '몸체미세흠집',
    '카메라미세흠집',
  ];
  const gradeBup = ['후면찍힘', '몸체찍힘', '카메라찍힘'];
  const gradeB = ['후면찍힘 심함', '몸체찍힘 심함', '카메라찍힘 심함'];
  const gradeAll = ['액정파손', '기능불량'];
  const gradeLCD = ['터치불량', '흑멍', '노란멍', '픽셀', '검수불가'];
  const gradeBroken = ['폐휴대폰'];
  const [selectedGradeAdown, setSelectedGradeAdown] = useState([]);
  const [selectedGradeBup, setSelectedGradeBup] = useState([]);
  const [selectedGradeB, setSelectedGradeB] = useState([]);
  const [selectedGradeAll, setSelectedGradeAll] = useState([]);
  const [selectedGradeLCD, setSelectedGradeLCD] = useState([]);
  const [selectedGradeBroken, setSelectedGradeBroken] = useState([]);

  // 최종 등급 계산 함수
  const calculateFinalGrade = () => {
    // 각 등급별 선택된 아이템들을 기반으로 최종 등급 계산 로직 구현
    if (selectedGradeBroken.length > 0) {
      return '폐폰 등급';
    } else if (selectedGradeLCD.length > 0) {
      return 'LCD 등급';
    } // ... 기타 등급 계산 로직 ...
    else {
      return 'A 등급';
    }
  };

  const finalGrade = calculateFinalGrade(); // 최종 등급 계산

  const handleBackClick = () => {
    navigate('/EnterPhoneInfo');
  };

  const handleEnterPrice = () => {
    navigate('/EnterPrice');
  };

  return (
    <div>
      <CommonLayout
        title="검수등급 입력"
        icon={<ArrowBackIcon onClick={handleBackClick} />}
      >
        <Box sx={{ width: '100%', bgcolor: 'background.paper', p: 2 }}>
          <List>
            <ListItem>
              <ListItemIcon>
                <ScreenshotIcon color="primary" fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="휴대폰의 상태를 확인하고 해당 하는 항목을 모두 체크해주세요." />
            </ListItem>
            <ListItem>
              <Autocomplete
                disablePortal
                id="combo-box-gradeA"
                options={gradeA}
                sx={{ width: '100%' }}
                onChange={(event, newValue) => {}}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="1. A 등급"
                    placeholder="항목 선택"
                    InputLabelProps={{
                      style: { fontWeight: 'bold' }, // 라벨의 글씨체를 굵게 설정
                    }}
                  />
                )}
              />
            </ListItem>
            <ListItem>
              <Autocomplete
                multiple
                id="combo-box-gradeAdown"
                options={gradeAdown}
                value={selectedGradeAdown}
                onChange={(event, newValue) => {
                  setSelectedGradeAdown(newValue);
                }}
                filterSelectedOptions
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="2. A- 등급"
                    InputLabelProps={{
                      style: { fontWeight: 'bold' }, // 라벨의 글씨체를 굵게 설정
                    }}
                  />
                )}
                sx={{ width: '100%' }}
              />
            </ListItem>
            <ListItem>
              <Autocomplete
                multiple
                id="combo-box-gradeBup"
                options={gradeBup}
                value={selectedGradeBup}
                onChange={(event, newValue) => {
                  setSelectedGradeBup(newValue);
                }}
                filterSelectedOptions
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="3. B+ 등급"
                    InputLabelProps={{
                      style: { fontWeight: 'bold' }, // 라벨의 글씨체를 굵게 설정
                    }}
                  />
                )}
                sx={{ width: '100%' }}
              />
            </ListItem>
            <ListItem>
              <Autocomplete
                multiple
                id="combo-box-gradeB"
                options={gradeB}
                value={selectedGradeB}
                onChange={(event, newValue) => {
                  setSelectedGradeB(newValue);
                }}
                filterSelectedOptions
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="4. B 등급"
                    InputLabelProps={{
                      style: { fontWeight: 'bold' }, // 라벨의 글씨체를 굵게 설정
                    }}
                  />
                )}
                sx={{ width: '100%' }}
              />
            </ListItem>
            <ListItem>
              <Autocomplete
                multiple
                id="combo-box-all"
                options={gradeAll}
                value={selectedGradeAll}
                onChange={(event, newValue) => {
                  setSelectedGradeAll(newValue);
                }}
                filterSelectedOptions
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="5. 통단가 등급"
                    InputLabelProps={{
                      style: { fontWeight: 'bold' }, // 라벨의 글씨체를 굵게 설정
                    }}
                  />
                )}
                sx={{ width: '100%' }}
              />
            </ListItem>
            <ListItem>
              <Autocomplete
                multiple
                id="combo-box-lcd"
                options={gradeLCD}
                value={selectedGradeLCD}
                onChange={(event, newValue) => {
                  setSelectedGradeLCD(newValue);
                }}
                filterSelectedOptions
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="6. LCD 등급"
                    InputLabelProps={{
                      style: { fontWeight: 'bold' }, // 라벨의 글씨체를 굵게 설정
                    }}
                  />
                )}
                sx={{ width: '100%' }}
              />
            </ListItem>

            <ListItem>
              <Autocomplete
                multiple
                id="combo-box-broken"
                options={gradeBroken}
                value={selectedGradeBroken}
                onChange={(event, newValue) => {
                  setSelectedGradeBroken(newValue);
                }}
                filterSelectedOptions
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="7. 폐폰 등급"
                    InputLabelProps={{
                      style: { fontWeight: 'bold' }, // 라벨의 글씨체를 굵게 설정
                    }}
                  />
                )}
                sx={{ width: '100%' }}
              />
            </ListItem>

            <ListItem>
              <ListItemText
                primary={
                  <Typography
                    style={{
                      fontWeight: 'bold',
                      fontSize: '1.2rem',
                      textAlign: 'right',
                    }}
                  >
                    <span style={{ color: 'black' }}>최종 등급 : </span>
                    <span style={{ color: 'blue' }}>{finalGrade}</span>
                  </Typography>
                }
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
            onClick={handleEnterPrice}
          >
            검수등급 입력
          </Button>
        </Box>
      </CommonLayout>
    </div>
  );
}
