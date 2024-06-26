import React, { useState, useEffect, useCallback } from 'react';
import isEqual from 'lodash/isEqual';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';

import { paths } from 'admin/routes/paths';
import { useRouter } from 'admin/routes/hooks/use-router';
import RouterLink from 'admin/routes/components/router-link';

import { useBoolean } from 'admin/hooks/use-boolean';

import { _roles } from 'admin/_mock/assets';
import { _userList, USER_STATUS_OPTIONS } from 'admin/_mock/_user';

import Label from 'components/label/label';
import Iconify from 'admin/components/iconify/iconify';
import Scrollbar from 'components/scrollbar/scrollbar';
import { useSnackbar } from 'contexts/SnackbarProvider';
import ConfirmDialog from 'components/custom-dialog/ConfirmDialog';
import { useSettingsContext } from 'components/settings/context/settings-context';
import CustomBreadcrumbs from 'components/custom-breadcrumbs/CustomBreadcrumbs';
import {
  useTable,
  emptyRows,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'components/table';

import UserTableRow from '../user-table-row';
import UserTableToolbar from '../user-table-toolbar';
import UserTableFiltersResult from '../user-table-filters-result';

// ----------------------------------------------------------------------

// 상태 옵션 설정
const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...USER_STATUS_OPTIONS];

// 새로운 테이블 헤더 설정
const TABLE_HEAD = [
  { id: 'Username', label: '사용자' },
  { id: 'PhoneNumber', label: '전화번호' },
  { id: 'Address', label: '주소' },
  { id: 'UserType', label: '타입' },
  { id: 'Status', label: '상태' },
  { id: 'BankName', label: '은행' },
  { id: 'AccountHolder', label: '예금주'},
  { id: 'AccountNumber', label: '계좌번호'},
  { id: '', width: 88 }
];

// 필터의 기본값 설정
const defaultFilters = {
  username: '',
  role: [],
  status: 'all',
};

//API 호출 (데이터 가져오기)
const fetchUserData = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/users`); // API 엔드포인트 URL
  if (!response.ok) {  
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
    console.log('User fetchUserData', data);
  return data;
};

// ----------------------------------------------------------------------

export default function UserListView() {
  const { openSnackbar } = useSnackbar();  // Snackbar 훅
  const settings = useSettingsContext();  // 설정 컨텍스트
  const router = useRouter();  // 라우터 훅
  const confirm = useBoolean();  // Boolean 훅
  const [tableData, setTableData] = useState(_userList);  // 사용자 데이터 상태
  const [filters, setFilters] = useState(defaultFilters);  // 필터 상태
  const table = useTable({
    defaultDense: true, // dense 활성화
    defaultRowsPerPage: 10, // 기본 행 수 10개로 설정
  });

  useEffect(() => {  

    const getData = async () => {
      try {
        const data = await fetchUserData();
        setTableData(data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };
    getData();
  }, []);

  // 필터된 데이터 계산
  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  // 현재 페이지의 데이터 계산
  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 56 : 56 + 20;  // 테이블 행 높이 계산
  const canReset = !isEqual(defaultFilters, filters);  // 필터를 리셋할 수 있는지 여부 계산
  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;  // 데이터가 없는지 여부 계산

  // 필터 핸들러 설정
  const handleFilters = useCallback(
    (name, value) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  // 필터 리셋 핸들러 설정
  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  // 행 삭제 핸들러 설정
  const handleDeleteRow = useCallback(
    (id) => {
      const deleteRow = tableData.filter((row) => row.id !== id);

      openSnackbar('Delete success!');

      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  // 여러 행 삭제 핸들러 설정
  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));

    openSnackbar('Delete success!');

    setTableData(deleteRows);

    table.onUpdatePageDeleteRows({
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered.length, dataInPage.length, table, tableData]);

  // 행 편집 핸들러 설정
  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.dashboard.user.edit(id));
    },
    [router]
  );

  // 상태 필터 핸들러 설정
  const handleFilterStatus = useCallback(
    (event, newValue) => {
      handleFilters('status', newValue);
    },
    [handleFilters]
  );

  return (
    <>
      {/* 컨테이너 설정 */}
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        {/* 커스텀 브레드크럼 설정 */}
        <CustomBreadcrumbs
          heading="List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'User', href: paths.dashboard.user.root },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.user.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New User
            </Button>
          }
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        {/* 카드 설정 */}
        <Card>
          {/* 탭 설정 */}
          <Tabs
            value={filters.status}
            onChange={handleFilterStatus}
            sx={{
              px: 2.5,
              boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
            }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab
                key={tab.value}
                iconPosition="end"
                value={tab.value}
                label={tab.label}
                icon={
                  <Label
                    variant={
                      ((tab.value === 'all' || tab.value === filters.status) && 'filled') || 'soft'
                    }
                    color={
                      (tab.value === 'Active' && 'success') ||
                      (tab.value === 'pending' && 'warning') ||
                      (tab.value === 'Banned' && 'error') ||
                      'default'
                    }
                  >
                    {['Active', 'pending', 'Banned', 'rejected'].includes(tab.value)
                      ? tableData.filter((user) => user.Status === tab.value).length
                      : tableData.length}
                  </Label>
                }
              />
            ))}
          </Tabs>

          {/* 사용자 테이블 툴바 설정 */}
          <UserTableToolbar
            filters={filters}
            onFilters={handleFilters}
            roleOptions={_roles}
          />

          {/* 필터 리셋 버튼 설정 */}
          {canReset && (
            <UserTableFiltersResult
              filters={filters}
              onFilters={handleFilters}
              onResetFilters={handleResetFilters}
              results={dataFiltered.length}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}

          {/* 테이블 컨테이너 설정 */}
          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={dataFiltered.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  dataFiltered.map((row) => row.id)
                )
              }
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={confirm.onTrue}>
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Tooltip>
              }
            />

            {/* 스크롤바 설정 */}
            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                {/* 테이블 헤더 설정 */}
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={dataFiltered.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      dataFiltered.map((row) => row.id)
                    )
                  }
                />

                {/* 테이블 본문 설정 */}
                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <UserTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                  />

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          {/* 테이블 페이지네이션 설정 */}
          <TablePaginationCustom
            count={dataFiltered.length}
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
            dense={table.dense}
            onChangeDense={table.onChangeDense}
          />
        </Card>
      </Container>

      {/* 삭제 확인 다이얼로그 설정 */}
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {table.selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

// 필터 적용 함수
function applyFilter({ inputData, comparator, filters }) {
  const { username, status, role } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (username) {
    const lowercasedFilter = username.toLowerCase();
    inputData = inputData.filter((user) => 
      user.Username.toLowerCase().includes(lowercasedFilter)
    );
  }

  if (status !== 'all') {
    inputData = inputData.filter((user) => user.Status === status);
  }

  if (role.length) {
    inputData = inputData.filter((user) => role.includes(user.UserType));
  }

  return inputData;
}
