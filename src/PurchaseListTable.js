import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Table,
  TableBody,
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
import { useAuth } from './contexts/AuthContext';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: 'bold',
    fontSize: 16,
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

export default function PurchaseListTable() {

  const { authData } = useAuth(); // 훅은 컴포넌트 본문의 최상위에서 호출합니다.
  const [openModal, setOpenModal] = useState(false);

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

  const [rows, setRows] = useState([]);

  const fetchData = async () => {    
    const url = `http://127.0.0.1:8000/purchases/${authData.UserID}`;
    const response = await fetch(url); // 수정된 URL 사용
    if (!response.ok) {
      throw new Error('Failed to fetch purchases');
    }
    const data = await response.json();
    // 응답 데이터를 콘솔에 로그로 출력합니다.
  console.log('Fetched purchases data:', data);
  
    return data;
  };

  useEffect(() => {

    const getRows = async () => {
      try {
        const data = await fetchData(authData.UserID);
        setRows(data);
      } catch (error) {
        console.error('Failed to fetch purchases:', error);
      }
    };

    getRows();
  }, []);

  

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>IMEI</StyledTableCell>
            <StyledTableCell align="right">제조사</StyledTableCell>
            <StyledTableCell align="right">시리즈</StyledTableCell>
            <StyledTableCell align="right">모델</StyledTableCell>
            <StyledTableCell align="right">사이즈</StyledTableCell>
            <StyledTableCell align="right">상태</StyledTableCell>
            <StyledTableCell align="right">등급/상세</StyledTableCell>
            <StyledTableCell align="right">금액</StyledTableCell>
            <StyledTableCell align="right">매입일</StyledTableCell>
            <StyledTableCell align="right">액션</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">{row.IMEI}</StyledTableCell>
              <StyledTableCell align="right">{row.Carrier}</StyledTableCell>
              <StyledTableCell align="right">{row.Series}</StyledTableCell>
              <StyledTableCell align="right">{row.Model}</StyledTableCell>
              <StyledTableCell align="right">{row.Size}</StyledTableCell>
              <StyledTableCell align="right">{row.PaymentStatus === "Pending" ? "접수" : row.PaymentStatus}</StyledTableCell>
              <StyledTableCell align="right">
                {row.PurchaseGrade}<br/>{row.PurchaseDetails}
              </StyledTableCell>
              <StyledTableCell align="right">{row.PurchasePrice.toLocaleString()}</StyledTableCell>
              <StyledTableCell align="right">{new Date(row.CreatedAt).toLocaleString()}</StyledTableCell>
              <StyledTableCell align="right">
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
          <Button onClick={handleCloseModal} color="error">
            Cancel
          </Button>
          <Button onClick={handleConfirmCancel} color="success" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      
    </TableContainer>
  );
}
