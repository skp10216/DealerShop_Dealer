import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommonLayout from './CommonLayout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShopFormComponent from './ShopFormComponent';

const DealerShopCreatePage = () => {
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState({
    shopName: '',
    ownerName: '',
    phone: { first: '', middle: '', last: '' },
    shopOwnerID : '',
    id: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (formData) => {
    console.log('Form Data:', formData);
   
    try {
      // API 요청을 통한 데이터 생성
      const response = await fetch('http://127.0.0.1:8000/shops/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ShopName: formData.ShopName,
          OwnerName: formData.OwnerName,
          PhoneNumber: formData.PhoneNumber,
          OwnerID: formData.OwnerID,
          Password: formData.Password,
          ShopOwnerID : formData.ShopOwnerID,
          UserID: 1  // 'UserID'가 서버 측 요구사항에 맞는 필드명인지 확인 필요
        }),
      });
      if (response.ok) {
        // 응답이 성공적인 경우, 리스트 페이지로 이동
        navigate('/DealerShopListPage');
      } else {
        // 에러 처리
        console.error('Server Error:', response);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <CommonLayout
      title="대리점 신규 등록"
      icon={<ArrowBackIcon onClick={() => navigate(-1)} />}
    >
      <ShopFormComponent
        initialData={initialData}
        onSubmit={handleSubmit}
        isEditMode={false}
      />
    </CommonLayout>
  );
};

export default DealerShopCreatePage;
