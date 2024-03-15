import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // 초기 상태를 별도의 변수로 선언하여 관리합니다.
  const initialState = {
    imei: '',
    carrier: '',
    model: '',
    size: '',
    series: '',
    purchaseGrade: '',
    purchaseDetails: '',
    purchasePrice: 0,
  };

  const [data, setData] = useState(initialState);

  const updateData = (key, value) => {
    setData(prevData => ({ ...prevData, [key]: value }));
  };

  // 데이터를 초기 상태로 재설정하는 함수입니다.
  const resetData = () => {
    setData(initialState);
  };

  return (
    <DataContext.Provider value={{ data, updateData, resetData }}>
      {children}
    </DataContext.Provider>
  );
};

// 커스텀 훅
export const useData = () => useContext(DataContext);
