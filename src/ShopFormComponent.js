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
  const [formData, setFormData] = useState({
    shopName: '',
    ownerName: '',
    shopOwnerID: '',
    phone: { first: '010', middle: '', last: '' },
    password: '',
    confirmPassword: '',
    userID:'',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // initialData가 변경될 때마다 formData 상태를 업데이트
  useEffect(() => {
    console.log('Initial data received:', initialData);
    if (initialData) {
      // 전화번호 처리
      const phoneParts = initialData.PhoneNumber ? initialData.PhoneNumber.split('-') : [];
      
      // initialData를 사용하여 formData 상태 초기화
      setFormData({
        shopName: initialData.ShopName || '',
        ownerName: initialData.OwnerName || '',
        shopOwnerID: initialData.ShopOwnerID || '',
        phone: {
          first: phoneParts.length > 0 ? phoneParts[0] : '010',
          middle: phoneParts.length > 1 ? phoneParts[1] : '',
          last: phoneParts.length > 2 ? phoneParts[2] : '',
        },
        // initialData에서 비밀번호 값 설정
        password: initialData.Password || '',
        confirmPassword: initialData.Password || '', // 수정 모드에서 초기 비밀번호 확인 값을 비밀번호와 동일하게 설정
        userID: initialData.UserID ||''
      });
    }

  }, [initialData]);

  useEffect(() => {
    const allFieldsFilled =
      formData.shopName &&
      formData.ownerName &&
      formData.shopOwnerID &&
      formData.phone.first &&
      formData.phone.middle &&
      formData.phone.last &&
      formData.password &&
      formData.confirmPassword;

    setIsFormValid(allFieldsFilled && !passwordError);
  }, [formData, passwordError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      phone: name in prev.phone ? { ...prev.phone, [name]: value } : prev.phone,
    }));

     // 비밀번호 또는 비밀번호 확인 필드를 업데이트하는 경우, 최신 값으로 검증
    if (name === 'password' || name === 'confirmPassword') {
      const newPassword = name === 'password' ? value : formData.password;
      const newConfirmPassword = name === 'confirmPassword' ? value : formData.confirmPassword;
      setPasswordError(newPassword !== newConfirmPassword);
  }
  };

  const handleToggleShowPassword = () => setShowPassword(!showPassword);
  const handleToggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("handleSubmit : " + formData);
    
    const phoneNumber = `${formData.phone.first}-${formData.phone.middle}-${formData.phone.last}`;

    // 폼 데이터에서 서버가 요구하는 형식으로 변환
    const submissionData = {
      ShopName: formData.shopName,
      OwnerName: formData.ownerName,
      ShopOwnerID: formData.shopOwnerID,
      PhoneNumber: phoneNumber,
      Password: formData.password,
      UserID: 1, 
  };
    onSubmit(submissionData);
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
        value={formData.ownerName}
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
        name="shopOwnerID"
        value={formData.shopOwnerID}
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
