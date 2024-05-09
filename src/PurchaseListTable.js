import React, { useState } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import {
  Button, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, Typography, Grid, IconButton, Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from './contexts/AuthContext';
import { fetchData } from './utils/fetchData';
import { useSnackbar } from './contexts/SnackbarProvider';
import { formatDate } from './utils/dateUtils';

export default function PurchaseListTable({ data, onDeletePurchase }) {
  const { authData } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const { openSnackbar } = useSnackbar();

  const handleCancelClick = (purchase) => {
    setSelectedPurchase(purchase);
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
        const response = await fetchData(url, payload, 'PUT');
        if (response.ok) {
          openSnackbar("성공적으로 취소 되었습니다.");
          onDeletePurchase(selectedPurchase.PurchaseID);
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

  const columns = [
    { field: 'IMEI', headerName: 'IMEI', flex: 1},
    { field: 'ShopName', headerName: '매입처', flex: 1},
    { field: 'Carrier', headerName: '제조사', flex: 1 },
    { field: 'Series', headerName: '시리즈', flex: 1 },
    { field: 'Model', headerName: '모델', flex: 1 },
    { field: 'Size', headerName: '사이즈', flex: 1 },
    { field: 'PaymentStatus', headerName: '상태', flex: 1, renderCell: (params) => params.value  },
    { field: 'PurchaseGradeDetails', headerName: '등급/상세', flex: 1, renderCell: (params) => `${params.row.PurchaseGrade}\n${params.row.PurchaseDetails}` },
    { field: 'PurchasePrice', headerName: '금액', flex: 1, renderCell: (params) => {
      const formattedPrice = new Intl.NumberFormat('ko-KR', {
        currency: 'KRW',
      }).format(params.value);
      return formattedPrice;
    },},
    { field: 'PurchaseDate', headerName: '매입일', flex: 1, renderCell: (params) => formatDate(params.value) },
    {
      field: 'actions', headerName: '액션', flex: 1, renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <Button
            variant="contained"
            onClick={() => fetchPaymentInfo(params.row.PurchaseID)}
          >
            상세
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleCancelClick(params.row)}
          >
            삭제
          </Button>
        </Box>
      ),
     
    }
  ];

  return (
    <div style={{ height: '90vh', width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={10}
        getRowId={(row) => row.PurchaseID}
        checkboxSelection
      />
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'정말 삭제 하시겠습니까?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            이 작업은 되돌릴 수 없습니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmCancel} color="primary" autoFocus>
            삭제
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
    </div>
  );
}
