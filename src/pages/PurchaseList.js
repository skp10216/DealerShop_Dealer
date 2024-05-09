import React, { useState, useEffect } from 'react';
import {
    Box, List, ListItem, ListItemText, Divider, IconButton, Menu, MenuItem, TextField, Button, Grid, CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CommonLayout from './CommonLayout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import PurchaseListTable from './PurchaseListTable';
import { useAuth } from '../contexts/AuthContext';
import MenuIcon from '@mui/icons-material/Menu';
import paymentStatusOptions from '../utils/paymentStatusOptions';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'; // 수정된 부분

const PurchaseList = () => {
    const navigate = useNavigate();
    const { authData } = useAuth();
    const [purchaseData, setPurchaseData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [startError, setStartError] = useState(false); // 에러 상태 추가
    const [endError, setEndError] = useState(false); // 에러 상태 추가
    const [loading, setLoading] = useState(false);
    const open = Boolean(anchorEl);

    const isValidDate = (date) => date && !isNaN(new Date(date).getTime());

    const handleDateChange = (setDate, setError) => (newValue) => {
        setDate(newValue);
        setError(!isValidDate(newValue));
    };

    const handleMenuClick = (event) => setAnchorEl(event.currentTarget);

    const handleMenuClose = (value) => {
        if (value) {
            setFilteredData(purchaseData.filter(purchase => purchase.PaymentStatus === value));
        } else {
            setFilteredData(purchaseData);
        }
        setAnchorEl(null);
    };

    const fetchData = async () => {
        try {
            setLoading(true);

            const formatDateString = (date) => date.toISOString().split('T')[0];

            const formattedStartDate = formatDateString(startDate);
            const formattedEndDate = formatDateString(endDate);

            const url = `http://127.0.0.1:8000/purchases/${authData.UserID}?start_date=${formattedStartDate}&end_date=${formattedEndDate}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Failed to fetch purchases');
            }

            const data = await response.json();
            const filteredData = data.filter(purchase => purchase.IsDeleted === false);
            setPurchaseData(filteredData);
            setFilteredData(filteredData);

        } catch (error) {
            console.error("API 호출 중 에러 발생:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [authData.UserID, endDate]);

    return (
        <CommonLayout title="매입 리스트" icon={<ArrowBackIcon onClick={() => navigate(-1)} />}>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <List>
                    <ListItem >
                        <MenuIcon color="primary" fontSize="large" />
                        <ListItemText 
                            primary={`매입 (총 ${filteredData.length}건)`} 
                            primaryTypographyProps={{ style: { whiteSpace: 'nowrap' } }}
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Grid container spacing={1} alignItems="center" justifyContent="flex-end">
                                <Grid item>
                                    <DatePicker
                                        label="시작일"
                                        value={startDate}
                                        onChange={handleDateChange(setStartDate, setStartError)}
                                        renderInput={(params) => (
                                            <TextField 
                                                {...params}
                                                error={!isValidDate(startDate)}
                                                helperText={!isValidDate(startDate) ? "잘못된 날짜 형식" : ""}
                                            />
                                        )}
                                        inputFormat="yyyy-MM-dd"
                                        format='yyyy-MM-dd'
                                    />
                                </Grid>
                                <Grid item>
                                    <DatePicker
                                        label="종료일"
                                        value={endDate}
                                        onChange={handleDateChange(setEndDate, setEndError)}
                                        renderInput={(params) => (
                                            <TextField 
                                                {...params}
                                                error={!isValidDate(endDate)}
                                                helperText={!isValidDate(endDate) ? "잘못된 날짜 형식" : ""}
                                            />
                                        )}
                                        inputFormat="yyyy-MM-dd"
                                        format='yyyy-MM-dd'
                                    />
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="primary" onClick={fetchData} disabled={loading}>
                                        조회
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <IconButton color="primary" onClick={handleMenuClick} size="large" sx={{ ml: 'auto' }}>
                                        <FilterAltIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </LocalizationProvider>
                        {loading && (
                            <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
                                <CircularProgress size={48} />
                            </Box>
                        )}
                        <Menu
                            id="payment-status-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={open}
                            onClose={() => handleMenuClose(null)}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                        >
                            {paymentStatusOptions.map((option) => (
                                <MenuItem key={option.value} onClick={() => handleMenuClose(option.value)}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Menu>
                    </ListItem>
                </List>
                <Divider />
                <PurchaseListTable data={filteredData} onDeletePurchase={(purchaseId) => {
                    const updatedData = purchaseData.filter(purchase => purchase.PurchaseID !== purchaseId);
                    setPurchaseData(updatedData);
                    setFilteredData(updatedData);
                }} />
            </Box>
        </CommonLayout>
    );
}

export default PurchaseList;
