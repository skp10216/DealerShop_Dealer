import { useContext, createContext } from 'react';

// ----------------------------------------------------------------------

export const SettingsContext = createContext({});

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);

  // 디버깅용 로그 추가
  //console.log('useSettingsContext: context value:', context);

  if (!context) throw new Error('useSettingsContext must be use inside SettingsProvider');

  return context;
};
