import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    imei: '', // IMEI 번호를 저장할 상태
    manufacturer : '',
    series : '',
    model : '',
    size : '',
    finalGrade: '', // 최종 등급을 저장할 새로운 상태
    finalGradeDetails: [], // 최종 등급 상세를 저장할 새로운 상태
    totalPrice: 0,
  });

  const updateData = (key, value) => {
    setData(prevData => ({ ...prevData, [key]: value }));
  };

  return (
    <DataContext.Provider value={{ data, updateData }}>
      {children}
    </DataContext.Provider>
  );
};

// 커스텀 훅
export const useData = () => useContext(DataContext);