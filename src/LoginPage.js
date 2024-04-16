import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Alert,
} from '@mui/material';
import { blue } from '@mui/material/colors';
import { useAuth } from './contexts/AuthContext'; 

export default function LoginPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberId, setRememberId] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [idError, setIdError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();
  const idRef = useRef(null);
  const passwordRef = useRef(null);
  const {login} = useAuth();

  useEffect(() => {
    const savedId = localStorage.getItem('rememberId');
    if (savedId) {
      setId(savedId);
      setRememberId(true);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // 초기 상태로 리셋
    setIdError(false);
    setPasswordError(false);
  
    // 아이디 또는 비밀번호가 입력되지 않은 경우의 처리
    if (!id) {
      setIdError(true);
      idRef.current.focus(); // ID 필드에 포커스
    } else if (!password) {
      setPasswordError(true);
      passwordRef.current.focus(); // 비밀번호 필드에 포커스
    }
  
    // 아이디와 비밀번호 모두 입력된 경우에만 로그인 시도
    if (id && password) {
      try {
        const response = await fetch('http://127.0.0.1:8000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ Username: id, Password: password }),
        });
  
        const data = await response.json();
        if (response.ok) {
          login(data);
          if (rememberId) {
            localStorage.setItem('rememberId', id);
          } else {
            localStorage.removeItem('rememberId');
          }
          navigate('/main');
        } else {
          setLoginError(true); // 로그인 실패 상태 설정
          setPassword(''); // 비밀번호 필드 초기화
        }
      } catch (error) {
        console.error('Login error:', error);
        setLoginError(true); // 로그인 실패 상태 설정
      }
    } 
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ color: blue[500] }}>
          로그인
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="id"
            label="ID"
            name="id"
            autoComplete="id"
            autoFocus
            value={id}
            onChange={(e) => setId(e.target.value)}
            error={idError}
            helperText={idError ? "ID를 입력해주세요." : ""}
            ref={idRef}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="비밀번호"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
            helperText={passwordError ? "비밀번호를 입력해주세요." : ""}
            ref={passwordRef}
          />
          {loginError && <Alert severity="error">아이디/패스워드가 틀립니다. 다시 시도해주세요.</Alert>}
          <FormControlLabel
            control={<Checkbox checked={rememberId} onChange={(e) => setRememberId(e.target.checked)} color="primary" />}
            label="Remember ID"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            로그인
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
