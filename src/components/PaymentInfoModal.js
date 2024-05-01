import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, Grid, Typography, IconButton, Button, DialogActions
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { fetchData } from '../utils/fetchData';  // fetchData 함수를 가져옵니다.

const PaymentInfoModal = ({ open, onClose, info }) => {
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      if (info && info.PurchaseID) {
        const url = `http://127.0.0.1:8000/payment-info/purchase/${info.PurchaseID}`;
        try {
          const data = await fetchData(url, {}, 'GET');
          console.log('fetchPaymentDetails data', data);
          // 데이터 유효성 검증: AccountHolder와 BankName 확인
          if (data && data.AccountHolder && data.BankName) {
            setPaymentDetails(data);
          } else {
            // 유효하지 않은 데이터
            throw new Error('No valid data returned');
          }
        } catch (error) {
          console.error('Error fetching payment details:', error);
          setPaymentDetails(null);  // 실패 시 paymentDetails를 null로 설정
        }
      }
    };

    if (open) {
      fetchPaymentDetails();
    }
  }, [info, open]);  // 의존성 배열에 'info'와 'open'을 추가

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        결제 정보 상세
        <IconButton
          aria-label="close"
          onClick={onClose}
          style={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {paymentDetails ? (
            <Grid container spacing={2}>
              <Grid item xs={6}><Typography variant="subtitle1" color="textSecondary">은행명</Typography></Grid>
              <Grid item xs={6}><Typography variant="body1">{paymentDetails.BankName}</Typography></Grid>
              <Grid item xs={6}><Typography variant="subtitle1" color="textSecondary">예금주</Typography></Grid>
              <Grid item xs={6}><Typography variant="body1">{paymentDetails.AccountHolder}</Typography></Grid>
              <Grid item xs={6}><Typography variant="subtitle1" color="textSecondary">계좌번호</Typography></Grid>
              <Grid item xs={6}><Typography variant="body1">{paymentDetails.AccountNumber}</Typography></Grid>
              <Grid item xs={6}><Typography variant="subtitle1" color="textSecondary">핸드폰 번호</Typography></Grid>
              <Grid item xs={6}><Typography variant="body1">{paymentDetails.PhoneNumber}</Typography></Grid>
              <Grid item xs={6}><Typography variant="subtitle1" color="textSecondary">기타</Typography></Grid>
              <Grid item xs={6}><Typography variant="body1">{paymentDetails.AdditionalInfo || ''}</Typography></Grid>
            </Grid>
          ) : (
            <Typography>결제정보가 없습니다.</Typography>
          )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">닫기</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentInfoModal;