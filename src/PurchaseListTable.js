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
import { fetchData } from './utils/fetchData';  // fetchData 함수를 가져옵니다.
import { useSnackbar } from './contexts/SnackbarProvider';  // 훅을 가져옵니다.

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


export default function PurchaseListTable({data, onDeletePurchase }) {

  const { authData } = useAuth(); // 현재 로그인된 사용자의 인증 데이터 사용
  const [openModal, setOpenModal] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null); // 선택된 구매 정보 상태
  const { openSnackbar } = useSnackbar();  // 훅을 사용하여 스낵바 열기 함수를 가져옵니다.

  const handleCancelClick = (purchase) => {
    setSelectedPurchase(purchase); // 선택된 구매 정보를 상태에 저장
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleConfirmCancel = async () => {
    if (selectedPurchase) {
      const url = `http://127.0.0.1:8000/purchases/${selectedPurchase.PurchaseID}`;
      const payload = {
        ...selectedPurchase,
        UserID: authData.UserID,
        PaymentStatus: "딜러매입취소",
        IsDeleted: true
      };
  
      try {
        // fetchData 함수를 사용하여 API 호출
        const response = await fetchData(url, payload, 'PUT');
        if (response.ok) {
          openSnackbar("성공적으로 취소 되었습니다.");
          onDeletePurchase(selectedPurchase.PurchaseID); // 삭제 성공 시 부모 컴포넌트에 알림
        } else {
          throw new Error(`Failed to cancel purchase: ${response.status}`);
        }
      } catch (error) {
        console.error('Error cancelling purchase:', error);
      } finally {
        handleCloseModal();
      }
    }
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
                  onClick={() => handleCancelClick(row)}
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
        <Button onClick={handleConfirmCancel} color="primary" autoFocus>
            완료
          </Button>
          <Button onClick={handleCloseModal} color="error">
            취소
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
