import React, { useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemText, Divider, IconButton, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CommonLayout from './CommonLayout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ListIcon from '@mui/icons-material/List';
import PurchaseListTable from './PurchaseListTable';
import { useAuth } from './contexts/AuthContext';

export default function PurchaseList() {
    const navigate = useNavigate();
    const { authData } = useAuth();
    const [purchaseData, setPurchaseData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const paymentStatusOptions = [
        { label: "접수", value: "Pending" },
        { label: "검수중", value: "Review" },
        { label: "입금대기", value: "WaitDeposit" },
        { label: "입금완료", value: "Complete" },
        { label: "완료", value: "Finished" },
    ];

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (value) => {
        if (value) {
            setFilteredData(purchaseData.filter(purchase => purchase.PaymentStatus === value));
        } else {
            setFilteredData(purchaseData); // 전체 데이터로 리셋
        }
        setAnchorEl(null);
    };

    useEffect(() => {
        const fetchData = async () => {
            const url = `http://127.0.0.1:8000/purchases/${authData.UserID}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch purchases');
            }
            const data = await response.json();
            setPurchaseData(data);
            setFilteredData(data); // 기본적으로 전체 데이터를 표시
        };

        fetchData().catch(error => console.error("Fetching purchases failed:", error));
    }, [authData.UserID]);

    return (
        <div>
            <CommonLayout title="수거대상목록" icon={<ArrowBackIcon onClick={() => navigate(-1)} />} >
                <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <nav aria-label="main Purchase list">
                        <List>
                            <ListItem disablePadding>
                                <ListItemText primary={`수거목록 (총 ${filteredData.length}건)`} />
                                <IconButton
                                    color="primary"
                                    onClick={handleClick}
                                    size="large"
                                    sx={{ ml: 'auto' }} // 아이콘을 오른쪽 끝으로 정렬
                                >
                                    <FilterAltIcon />
                                </IconButton>
                                <Menu
                                    id="payment-status-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={open}
                                    onClose={() => handleClose()}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                >
                                    {paymentStatusOptions.map((option) => (
                                        <MenuItem key={option.value} onClick={() => handleClose(option.value)}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </ListItem>
                        </List>
                    </nav>
                    <Divider />
                    <PurchaseListTable data={filteredData} />
                </Box>
            </CommonLayout>
        </div>
    );
}
