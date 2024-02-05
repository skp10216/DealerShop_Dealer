import './style.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { blue } from '@mui/material/colors';

export default function LoginPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberId, setRememberId] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedId = localStorage.getItem('rememberId');
    if (savedId) {
      setId(savedId);
      setRememberId(true);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('로그인 시도: ', id, password);
    // 테스트 코드
    navigate('/main');

    // 로그인 API 요청 및 처리 로직
    try {
      const response = await fetch('http://127.0.0.0/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, password }),
      });

      if (response.ok) {
        if (rememberId) {
          localStorage.setItem('rememberId', id);
        } else {
          localStorage.removeItem('rememberId');
        }
        navigate('/main');
      } else {
        // 에러 처리
        console.log('error');
      }
    } catch (error) {
      // 에러 처리
      console.log('error');
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
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberId}
                onChange={(e) => setRememberId(e.target.checked)}
                color="primary"
              />
            }
            label="Remember ID"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
            }}
          >
            로그인
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
