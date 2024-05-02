import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Table, TableBody, TableContainer, TableHead, TableRow, Paper, Button, Typography, Grid
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useAuth } from './contexts/AuthContext';
import PurchaseInfoModal from './components/PurchaseInfoModal';
import PaymentInfoModal from './components/PaymentInfoModal';
import ConfirmationModal from './components/ConfirmationModal';
import { fetchData } from './utils/fetchData';

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

const fieldNames = {
  IMEI: 'IMEI',
  Carrier: '제조사',
  Series: '시리즈',
  Model: '모델',
  Size: '사이즈',
  PaymentStatus: '상태',
  PurchaseGrade: '등급/상세',
  //PurchaseDetails: '등급상세',
  PurchasePrice: '금액',
  PurchaseETC: '기타',
  CreatedAt: '매입일',
  ETC: 'etc',
};

export default function DealerShopTableList({ data, updateData }) {
  const { authData } = useAuth();
  const [modalInfo, setModalInfo] = useState({ open: false, type: '', data: {} });

  if (!Array.isArray(data) || data.length === 0) {
    return <Typography variant="h6" align="center">데이터가 없습니다.</Typography>;
  }

  const handleOpenModal = (type, purchase) => {
    if (type === 'cancel') {
      setModalInfo({
        open: true,
        type,
        data: purchase,
        title: '정말 취소 하시겠습니까',
        content: '이 작업은 되돌릴 수 없습니다.'
      });
    } else {
      setModalInfo({ open: true, type, data: purchase });
    }
  };

  const handleCloseModal = () => {
    setModalInfo({ ...modalInfo, open: false });
  };

  const handleUpdateData = async (url, payload, successMessage, errorMessage) => {
    console.log("handleUpdateData called with URL:", url);
    console.log("Payload:", payload);
    
    try {
      const response = await fetchData(url, payload, 'PUT');
      console.log("HTTP Response:", response);
      
      if (response.ok) {
        console.log("Response OK, updating data...");
        updateData(data.filter(item => {
          console.log(`Checking if PurchaseID ${item.PurchaseID} equals ${payload.PurchaseID}`);
          return item.PurchaseID !== payload.PurchaseID;
        }));
        console.log("Data updated successfully.");
        alert(successMessage);
      } else {
        console.log(`Response not OK, status: ${response.status}`);
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Error in fetchData:", error);
      alert(errorMessage);
    } finally {
      console.log("Closing modal...");
      handleCloseModal();
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {Object.keys(fieldNames).map(key => (
              <StyledTableCell key={key} align="right">{fieldNames[key]}</StyledTableCell>
            ))}
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
                {row.PurchaseGrade}<br />{row.PurchaseDetails}
              </StyledTableCell>
              <StyledTableCell align="right">{row.PurchasePrice.toLocaleString()}</StyledTableCell>
              <StyledTableCell align="right">{row.PurchaseETC}</StyledTableCell>
              <StyledTableCell align="right">{new Date(row.CreatedAt).toLocaleString()}</StyledTableCell>
              <StyledTableCell align="right">
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <Button variant="contained" onClick={() => handleOpenModal('detail', row)}>상세</Button>
                  <Button variant="contained" color="success" onClick={() => handleOpenModal('edit', row)}>수거</Button>
                  <Button variant="contained" color="error" onClick={() => handleOpenModal('cancel', row)}>삭제</Button>
                </div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      {modalInfo.open && (
        modalInfo.type === 'detail' ? (
          <PaymentInfoModal open={modalInfo.open} onClose={handleCloseModal} info={modalInfo.data} />
        ) : modalInfo.type === 'edit' ? (
          <PurchaseInfoModal open={modalInfo.open} onClose={handleCloseModal} purchase={modalInfo.data} onConfirm={handleUpdateData} />
        ) : (
          <ConfirmationModal open={modalInfo.open} onClose={handleCloseModal} purchase={modalInfo.data} onConfirm={handleUpdateData} title={modalInfo.title} content={modalInfo.content}  />
        )
      )}
    </TableContainer>
  );
}
