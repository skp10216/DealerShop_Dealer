//날짜 변환 함수 (yyyy-MM-dd) 
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

//숫자만 입력되도록 검증
export const handleNumericInput = (value, setStateFunction) => {
const numericValue = value.replace(/,/g, '');
if (numericValue === '' || /^[0-9\b]+$/.test(numericValue)) {
    setStateFunction(new Intl.NumberFormat('en-US').format(numericValue));
}
};