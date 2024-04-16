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
  Typography, Grid,IconButton 
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import CloseIcon from '@mui/icons-material/Close';
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

export default function PurchaseListTable({data}) {

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


  const [paymentInfo, setPaymentInfo] = useState({});
  const [paymentInfoModalOpen, setPaymentInfoModalOpen] = useState(false);
  const [hasPaymentInfo, setHasPaymentInfo] = useState(true);

  const fetchPaymentInfo = async (purchaseId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/payment-info/purchase/${purchaseId}`);
      if (response.status === 404) {
        setHasPaymentInfo(false);
        setPaymentInfoModalOpen(true);
        return;
      }
      if (!response.ok) {
        throw new Error('서버 통신에 문제가 발생했습니다.');
      }
      const data = await response.json();
      setPaymentInfo(data);
      setPaymentInfoModalOpen(true);
      setHasPaymentInfo(true);
    } catch (error) {
      console.error('Fetching payment info failed:', error);
    }
  };

  const PaymentInfoModal = ({ open, onClose, info }) => (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>결제 정보 상세
      <IconButton
        aria-label="close"
        onClick={onClose}
        style={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
      >
        <CloseIcon />
      </IconButton>
      </DialogTitle>
      <DialogContent>
        {hasPaymentInfo ? (
          <Grid container spacing={2}>
            <Grid item xs={6}><Typography variant="subtitle1" color="textSecondary">은행명</Typography></Grid>
            <Grid item xs={6}><Typography variant="body1">{info.BankName}</Typography></Grid>
            
            <Grid item xs={6}><Typography variant="subtitle1" color="textSecondary">예금주</Typography></Grid>
            <Grid item xs={6}><Typography variant="body1">{info.AccountHolder}</Typography></Grid>
            
            <Grid item xs={6}><Typography variant="subtitle1" color="textSecondary">계좌번호</Typography></Grid>
            <Grid item xs={6}><Typography variant="body1">{info.AccountNumber}</Typography></Grid>
            
            <Grid item xs={6}><Typography variant="subtitle1" color="textSecondary">핸드폰 번호</Typography></Grid>
            <Grid item xs={6}><Typography variant="body1">{info.PhoneNumber}</Typography></Grid>
            
            <Grid item xs={6}><Typography variant="subtitle1" color="textSecondary">기타</Typography></Grid>
            <Grid item xs={6}><Typography variant="body1">{info.AdditionalInfo || ''}</Typography></Grid>
          </Grid>
        ) : (
          <Typography>결제정보가 없습니다.</Typography>
        )
      }
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">닫기</Button>
      </DialogActions>
    </Dialog>
  );

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
          {data.map((row, index) => (
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
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <Button
                  variant="contained"
                  onClick={() => fetchPaymentInfo(row.PurchaseID)} // PurchaseID를 사용하여 결제 정보 조회
                >
                  상세
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleCancelClick}
                >
                  취소
                </Button>
                </div>
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

      <PaymentInfoModal
      open={paymentInfoModalOpen}
      onClose={() => setPaymentInfoModalOpen(false)}
      info={paymentInfo}
      />      
      
    </TableContainer>
  );
}
