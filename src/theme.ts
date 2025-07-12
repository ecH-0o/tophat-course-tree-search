// theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    text: {
      primary: '#2D1159',
    },
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#F7F0FF',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#934af4',
          border: '1px solid #934af4',
          color: '#fff',
        }
      }
    }
  },
});

export default theme;
