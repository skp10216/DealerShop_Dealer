import React from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { useBoolean } from 'admin/hooks/use-boolean';

import Label from 'components/label/label';
import Iconify from 'admin/components/iconify/iconify';
import ConfirmDialog from 'components/custom-dialog/ConfirmDialog';
import CustomPopover from 'components/custom-popover/CustomPopover';
import usePopover from 'components/custom-popover/use-popover';

import UserQuickEditForm from './user-quick-edit-form';

// ----------------------------------------------------------------------

export default function UserTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const { UserID, Username, Name, PhoneNumber, Address, UserType, Status, BankName, AccountHolder, AccountNumber } = row;

  const confirm = useBoolean();

  const quickEdit = useBoolean();

  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={Name} src="" sx={{ mr: 2 }} />  {/* Avatar URL을 필요에 맞게 설정 */}
          <ListItemText
            primary={Name}
            secondary={Username}
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{
              component: 'span',
              color: 'text.disabled',
            }}
          />
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{PhoneNumber}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{Address}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{UserType}</TableCell>
        <TableCell>
          <Label
            variant="soft"
            color={
              (Status === 'Active' && 'success') ||
              (Status === 'pending' && 'warning') ||
              (Status === 'Banned' && 'error') ||
              'default'
            }
          >
            {Status}
          </Label>
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{BankName}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{AccountHolder}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{AccountNumber}</TableCell>

        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <Tooltip title="Quick Edit" placement="top" arrow>
            <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={quickEdit.onTrue}>
              <Iconify icon="solar:pen-bold" />
            </IconButton>
          </Tooltip>

          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <UserQuickEditForm currentUser={row} open={quickEdit.value} onClose={quickEdit.onFalse} />

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}

UserTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
