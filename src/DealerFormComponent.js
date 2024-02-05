import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  InputAdornment,
  IconButton,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const DealerFormComponent = ({ initialData, onSubmit, isEditMode }) => {
  // initialData에서 전달된 phone 객체가 없거나 phone.first 값이 없는 경우 '010'을 기본값으로 설정
  const [formData, setFormData] = useState({
    ...initialData,
    phone: {
      first: initialData.phone?.first || '010',
      middle: initialData.phone?.middle || '',
      last: initialData.phone?.last || '',
    },
  });
  // 비밀번호 표시 상태
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false); // 비밀번호 일치 여부 상태 추가
  const [isFormValid, setIsFormValid] = useState(false);

  // 유효성 검사 - 모든 필드가 채워졌는지 확인
  useEffect(() => {
    // 모든 필드가 채워졌는지 확인
    const allFieldsFilled =
      formData.shopName &&
      formData.ownerName &&
      formData.id &&
      formData.phone.first &&
      formData.phone.middle &&
      formData.phone.last &&
      formData.password &&
      formData.confirmPassword;

    // 유효성 검사 업데이트
    setIsFormValid(allFieldsFilled && !passwordError);
  }, [formData, passwordError]);

  // 폼 데이터 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData };

    if (name === 'first' || name === 'middle' || name === 'last') {
      newFormData.phone = { ...newFormData.phone, [name]: value };
    } else {
      newFormData[name] = value;
    }

    // 비밀번호 확인 필드가 활성화된 경우에만 비밀번호 일치 검사
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError(newFormData.password !== newFormData.confirmPassword);
    }
    setFormData(newFormData);
  };
  // 비밀번호 표시 토글 핸들러
  const handleToggleShowPassword = () => setShowPassword(!showPassword);
  const handleToggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        label="대리점명"
        name="shopName"
        value={formData.shopName}
        onChange={handleChange}
        margin="normal"
        fullWidth
        required
      />
      <TextField
        required
        fullWidth
        label="대표자명"
        name="ownerName"
        onChange={handleChange}
        margin="normal"
        placeholder="대표자명을 입력해주세요."
      />
      {/* 전화번호 필드 */}
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mt: 2 }}
      >
        <FormControl sx={{ flex: 1 }}>
        <InputLabel id="phone-first-label">전화번호</InputLabel>
          <Select
            labelId="phone-first-label"
            id="phone-first"
            name="first"
            value={formData.phone.first}
            label="전화번호 앞"
            onChange={(e) =>
              handleChange({ target: { name: 'first', value: e.target.value } })
            }
          >
            <MenuItem value="010">010</MenuItem>
            <MenuItem value="011">011</MenuItem>
            <MenuItem value="016">016</MenuItem>
          </Select>
        </FormControl>
        <TextField
          sx={{ flex: 2 }}
          id="middle"
          label="중간"
          name="middle"
          value={formData.phone.middle}
          onChange={handleChange}
          inputProps={{ maxLength: 4 }}
        />
        <TextField
          sx={{ flex: 2 }}
          id="last"
          label="마지막"
          name="last"
          value={formData.phone.last}
          onChange={handleChange}
          inputProps={{ maxLength: 4 }}
        />
      </Box>
      <TextField
        required
        fullWidth
        label="ID"
        name="id"
        onChange={handleChange}
        margin="normal"
        placeholder="아이디를 입력해주세요."
      />
      <TextField
        required
        fullWidth
        label="Password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        onChange={handleChange}
        margin="normal"
        placeholder="비밀번호를 입력해주세요."
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleToggleShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        required
        fullWidth
        label="Password 확인"
        name="confirmPassword"
        type={showConfirmPassword ? 'text' : 'password'}
        onChange={handleChange}
        margin="normal"
        placeholder="동일한 비밀번호를 입력해주세요."
        error={passwordError}
        helperText={passwordError && '비밀번호가 일치하지 않습니다.'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle confirm password visibility"
                onClick={handleToggleShowConfirmPassword}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {passwordError.password && (
        <Alert severity="error">비밀번호가 일치하지 않습니다.</Alert>
      )}
      <Box position="fixed" bottom={0} left={0} right={0} p={0}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={!isFormValid}
        >
          {isEditMode ? '수정하기' : '등록하기'}
        </Button>
      </Box>
    </Box>
  );
};

export default DealerFormComponent;
