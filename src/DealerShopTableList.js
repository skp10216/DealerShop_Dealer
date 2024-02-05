import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.blue, // 테이블 헤더 글자 색상을 파란색으로 지정
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, phone, status, date) {
  return { name, phone, status, date };
}

const rows = [
  createData('서광필', '010-6876-7570', '접수', '2024-01-29 12:00'),
  createData('서광필', '010-6876-7570', '접수', '2024-01-29 12:00'),
  createData('서광필', '010-6876-7570', '접수', '2024-01-29 12:00'),
  createData('서광필', '010-6876-7570', '접수', '2024-01-29 12:00'),
  createData('서광필', '010-6876-7570', '접수', '2024-01-29 12:00'),
  createData('서광필', '010-6876-7570', '접수', '2024-01-29 12:00'),
  // ... 나머지 데이터
];

export default function DealerShopTableList() {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const handlePurchaseClick = (row) => {
    // 수거하기 버튼 클릭 시 로직
    navigate('/EnterIMEI'); // 이동할 경로
  };

  const handleCancelClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleConfirmCancel = () => {
    // 취소 확인 로직
    setOpenModal(false);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>이름</StyledTableCell>
            <StyledTableCell align="right">전화번호</StyledTableCell>
            <StyledTableCell align="right">상태</StyledTableCell>
            <StyledTableCell align="right">등록일</StyledTableCell>
            <StyledTableCell align="right">액션</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.phone}</StyledTableCell>
              <StyledTableCell align="right">{row.status}</StyledTableCell>
              <StyledTableCell align="right">{row.date}</StyledTableCell>
              <StyledTableCell align="right">
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginRight: '10px' }}
                  onClick={() => handlePurchaseClick(row)}
                >
                  수거하기
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleCancelClick}
                >
                  취소
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      {/* 모달 컴포넌트 */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'정말 취소 하시겠습니까?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            이 작업은 되돌릴 수 없습니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmCancel} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
}
