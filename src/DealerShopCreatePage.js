import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommonLayout from './CommonLayout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DealerFormComponent from './DealerFormComponent';

const DealerShopCreatePage = () => {
  const navigate = useNavigate();

  // 초기 폼 데이터 설정, phone 데이터 포함
  const [initialData, setInitialData] = useState({
    shopName: '',
    ownerName: '',
    phone: { first: '', middle: '', last: '' },
    id: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (formData) => {
    console.log('Form Data:', formData);
    // 폼 데이터 제출 로직
    // 예: API 요청을 통한 데이터 생성

    navigate('/DealerShopList'); // 성공 후 이동할 경로
  };

  return (
    <CommonLayout
      title="대리점 신규 등록"
      icon={<ArrowBackIcon onClick={() => navigate(-1)} />}
    >
      <DealerFormComponent
        initialData={initialData}
        onSubmit={handleSubmit}
        isEditMode={false}
      />
    </CommonLayout>
  );
};

export default DealerShopCreatePage;