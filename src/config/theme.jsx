import { createMuiTheme } from '@material-ui/core'

const defaultTheme = createMuiTheme()

// Tema inicial de la aplicación
const theme = createMuiTheme({
  ...defaultTheme,
  palette: {
    primary: {
      main: '#00e676',
      light: '#66ffa6',
      dark: '#00b248',
      contrastText: '#000'
    },
    secondary: {
      main: '#212121',
      light: '#484848',
      dark: '#000000',
      contrastText: '#fff'
    },
    common: {
        main: '#00e676',
    },
    success: {
      main: '#2e7d32'
    },
    error: {
      main: '#d50000',
      dark: '#9b0000',
      light: '#ff5131',
      contrastText: '#ffffff'
    },
    paper: '#fff'
  },
  typography: {
    fontFamily: [
      'Roboto'
    ].join(',')
  }
})

export default theme
