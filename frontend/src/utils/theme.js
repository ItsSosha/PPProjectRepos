import { createTheme } from "@mui/material";

const breakpoints = {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1440
}

const defaultTheme = createTheme({
    palette: {
        primary: {
            main: "#FFFFFF"
        },
        secondary: {
            main: "#56B280"
        }
    },
    typography: {
        fontFamily: "Inter",
        price: {
            fontFamily: "Manrope",
            fontSize: 20,
            fontWeight: 500
        },
        caption: {
            fontSize: 16,
            fontWeight: 500
        },
        h1: {
            fontFamily: "Manrope",
            fontSize: 24,
            fontWeight: 600
        }
    },
    breakpoints: {
        values: breakpoints
    }
})

export default defaultTheme;