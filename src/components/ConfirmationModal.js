import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../contexts/AuthContext';



const ConfirmationModal = ({ open, onClose, purchase, onConfirm, title, content }) => {
  const { authData } = useAuth();
  const handleConfirm = async () => {
    const url = `http://127.0.0.1:8000/purchases/${purchase.PurchaseID}`;
    const payload = {
      ...purchase,
      UserID: authData.UserID,
      PaymentStatus: "딜러매입취소",
      IsDeleted : true
    };
  
    onConfirm(url, payload, '성공적으로 취소 되었습니다.', '매입 취소 업데이트를 실패했습니다.');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
    >
      <DialogTitle id="confirmation-dialog-title">
        {title || "Confirm Action"}
        <IconButton
          aria-label="close"
          onClick={onClose}     
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="confirmation-dialog-description">
          {content || "Are you sure you want to proceed with this action?"}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
      <Button onClick={handleConfirm} color="primary" autoFocus>
          삭제
        </Button>
        <Button onClick={onClose} color="error">
          취소
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
