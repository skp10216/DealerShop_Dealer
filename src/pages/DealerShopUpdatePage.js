import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // useParams 추가
import ShopFormComponent from './ShopFormComponent';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CommonLayout from './CommonLayout';

const DealerShopUpdatePage = () => {
  const navigate = useNavigate();
  const { shop_id } = useParams(); // shop_id를 URL 파라미터에서 추출

  const [dealerData, setDealerData] = useState(null); // 초기 상태를 null로 설정

  const fetchDealerData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/shops/${shop_id}`); // shop_id를 사용하여 데이터 요청
      const data = await response.json();
      setDealerData(data); // 받아온 데이터로 상태 업데이트
    } catch (error) {
      console.error('대리점 데이터를 불러오는데 실패했습니다.', error);
    }
  };

  useEffect(() => {
    fetchDealerData();
  }, [shop_id]); // shop_id가 변경될 때마다 데이터 다시 불러오기

  const handleUpdate = async (updatedData) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/shops/${shop_id}`, { // shop_id를 사용하여 수정 요청
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        console.log('대리점 정보가 성공적으로 업데이트되었습니다.');
        navigate('/DealerShopListPage'); // 성공 후 리스트 페이지로 이동
      } else {
        console.error('대리점 정보 업데이트 실패');
      }
    } catch (error) {
      console.error('업데이트 중 에러가 발생했습니다.', error);
    }
  };

  if (!dealerData) return <div>로딩 중...</div>;

  return (
    <CommonLayout
      title="대리점 정보 수정"
      icon={<ArrowBackIcon onClick={() => navigate(-1)} />}
    >
      <ShopFormComponent
        initialData={dealerData}
        onSubmit={handleUpdate}
        isEditMode={true}
      />
    </CommonLayout>
  );
};

export default DealerShopUpdatePage;