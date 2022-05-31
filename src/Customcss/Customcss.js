import { createTheme } from '@mui/material/styles';
import { blue , pink } from '@mui/material/colors';

export const Responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
};

export const modal = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    inset: "0px",
};

export const backdrop = {
    "zIndex" : "-1",
}

export const theme = createTheme({
  palette: {
    primary: {
      main: blue[700],
    },
    secondary: {
      main: pink[500],
    },
  },
});

export const customGenreCss = { 
    margin: "2px",
    backgroundColor: "#e0e0e0",
}

export const customSelectedGenreCss = {
    margin: "2px",
    backgroundColor: "#3f51b5",
    color: "#fff"
}

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const bottomNavigation = {
  backgroundColor: "#2d313a",
  width: "100%",
  position: "fixed",
  bottom: 0,
  zIndex: 100,
}