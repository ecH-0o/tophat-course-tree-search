import { createTheme } from '@mui/material/styles';
import colors from './colors';
const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    text: {
      primary: colors.primary_text,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: colors.background,
        }
      }},
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: colors.secondary,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: colors.primary,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.primary,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: colors.primary,
          border: `1px solid ${colors.primary}`,
          color: '#FFFFFF',
        }
      }
    }
  },
});

export default theme;
