import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // 사용자 정보를 저장할 상태

  // 로그인 함수
  const login = (userInfo) => {
    setUser(userInfo); // 사용자 정보를 상태에 저장
  };

  // 로그아웃 함수
  const logout = () => {
    setUser(null); // 사용자 정보를 null로 초기화
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 커스텀 훅을 사용하여 컴포넌트에서 쉽게 접근
export const useAuth = () => useContext(AuthContext);