import React from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Button, Grid, Typography, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../contexts/AuthContext';

const fieldNames = {
  Carrier: '제조사',
  Series: '시리즈',
  Model: '모델',
  Size: '사이즈',
  PaymentStatus: '상태',
  PurchaseGrade: '등급',
  PurchaseDetails: '등급상세',
  PurchasePrice: '금액',
  PurchaseETC: '기타',
  CreatedAt: '매입일'
};

const PurchaseInfoModal = ({ open, onClose, purchase, onConfirm }) => {
  const { authData } = useAuth();
  
  const handleConfirm = async () => {
    const url = `http://127.0.0.1:8000/purchases/${purchase.PurchaseID}`;
    const payload = {
      ...purchase,
      UserID: authData.UserID,
      PaymentStatus: "딜러매입"
    };

    console.log('PurchaseInfoModal UserID', authData.UserID);

    onConfirm(url, payload, '성공적으로 업데이트되었습니다.', '매입 상태 업데이트를 실패했습니다.');
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        매입 정보 확인
        <IconButton
          aria-label="close"
          onClick={onClose}
          style={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
           {Object.entries(purchase).map(([key, value]) => {
            if (!['PurchaseID', 'DealershipID', 'UserID', 'PhoneID', 'IsDeleted'].includes(key)) {
              return (
                <React.Fragment key={key}>
                  <Grid item xs={6}><Typography variant="subtitle1">{fieldNames[key] || key}</Typography></Grid>
                  <Grid item xs={6}><Typography variant="body1">{value}</Typography></Grid>
                </React.Fragment>
              );
            }
            return null;
          })}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirm} color="primary">완료</Button>
        <Button onClick={onClose} color="error">취소</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PurchaseInfoModal;
