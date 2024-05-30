import React from 'react';
import { m } from 'framer-motion';
import { useCallback } from 'react';

import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import { useLocales, useTranslate } from 'locales/useLocales';

import Iconify from 'admin/components/iconify/iconify';
import { varHover } from 'components/animate/actions';
import CustomPopover  from 'components/custom-popover/CustomPopover';
import  usePopover  from 'components/custom-popover/use-popover'; 

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const popover = usePopover();

  const { onChangeLang } = useTranslate();

  const { allLangs, currentLang } = useLocales();

  const handleChangeLang = useCallback(
    (newLang) => {
      onChangeLang(newLang);
      popover.onClose();
    },
    [onChangeLang, popover]
  );

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        onClick={popover.onOpen}
        sx={{
          width: 40,
          height: 40,
          ...(popover.open && {
            bgcolor: 'action.selected',
          }),
        }}
      >
        <Iconify icon={currentLang.icon} sx={{ borderRadius: 0.65, width: 28 }} />
      </IconButton>

      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 160 }}>
        {allLangs.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === currentLang.value}
            onClick={() => handleChangeLang(option.value)}
          >
            <Iconify icon={option.icon} sx={{ borderRadius: 0.65, width: 28 }} />

            {option.label}
          </MenuItem>
        ))}
      </CustomPopover>
    </>
  );
}
