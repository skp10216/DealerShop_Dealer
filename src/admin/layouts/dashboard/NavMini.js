import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { useMockedUser } from 'admin/hooks/use-mocked-user';

import { hideScroll } from 'theme/css';

import Logo from 'admin/components/logo/logo';
import { NavSectionMini } from 'components/nav-section';

import { NAV } from '../configLayout';
import { useNavData } from './ConfigNavigation';
import NavToggleButton from '../common/NavToggleButton';

// ----------------------------------------------------------------------

export default function NavMini() {
  const { user } = useMockedUser();

  const navData = useNavData();

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_MINI },
      }}
    >
      <NavToggleButton
        sx={{
          top: 22,
          left: NAV.W_MINI - 12,
        }}
      />

      <Stack
        sx={{
          pb: 2,
          height: 1,
          position: 'fixed',
          width: NAV.W_MINI,
          borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          ...hideScroll.x,
        }}
      >
        <Logo sx={{ mx: 'auto', my: 2 }} />

        <NavSectionMini
          data={navData}
          slotProps={{
            currentRole: user?.role,
          }}
        />
      </Stack>
    </Box>
  );
}
