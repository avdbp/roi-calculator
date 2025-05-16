import { createTheme } from "@mui/material/styles"; // 🧱 Importa la utilidad para crear temas personalizados

const theme = createTheme({
  palette: {
    primary: {
      main: "#007bff", // 🔵 Color principal: botones, enlaces, sliders, switches (cuando usan color="primary")
    },
    secondary: {
      main: "#6c757d", // ⚪ Color secundario: botones alternativos u otros elementos secundarios
    },
    background: {
      default: "#f5f5f5", // 🧱 Fondo general del body o áreas grises claras
      paper: "#ffffff",   // 📄 Fondo de tarjetas, cuadros y secciones elevadas (Paper)
    },
    text: {
      primary: "#333333",    // 🖋 Color principal del texto
      secondary: "#666666",  // 🖋 Color de texto menos importante
      highlight: "#007bff", // 🔵  Color especial personalizado, usado por ejemplo en HeroHeader para el total
    },
  },
  typography: {
    fontFamily: "'Lexend', sans-serif", // 🅰️ Fuente principal del proyecto
    fontSize: 14,                       // 🔤 Tamaño base del texto (afecta <body> y componentes heredados)
    h3: {
      fontSize: "2.5rem",               // 🔠 Tamaño de <Typography variant="h3" />
      fontWeight: 700,                  // 🏋️ Negrita fuerte
    },
    h4: {
      fontSize: "1.75rem",              // 🔠 Tamaño de <Typography variant="h4" />
      fontWeight: 600,                  // 🏋️ Negrita media
    },
  },
  shape: {
    borderRadius: 12, // 🔲 Bordes redondeados globales para botones, inputs, tarjetas, etc.
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "outlined", // ✏️ Hace que todos los <TextField> usen el estilo outlined por defecto
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#f0f4ff", // 🧊 Fondo claro para todos los campos de entrada
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#007bff", // 🔵  Borde naranja cuando el input está enfocado
          },
        },
        notchedOutline: {
          borderColor: "#ccc", // 🔳 Borde gris por defecto cuando no está enfocado
        },
        input: {
          color: "#333", // 🖋 Color del texto que escribes dentro del input
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "#007bff", // 🔵  Color del label/flotante cuando el input está enfocado
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,      // 🔘 Bordes redondeados en los botones
          textTransform: "none", // 🔡 Evita que el texto se convierta en mayúsculas automáticamente
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          "&.Mui-checked": {
            color: "#007bff", // 🔵  Color del botón circular cuando está activado
          },
          "&.Mui-checked + .MuiSwitch-track": {
            backgroundColor: "#007bff", // 🔵  Color del fondo de la pista cuando está activado
          },
        },
        track: {
          backgroundColor: "#ccc", // ⚪ Color de la pista cuando está apagado
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        thumb: {
          color: "#007bff", // 🔵  El botón que se arrastra en el slider
        },
        track: {
          color: "#007bff", // 🔵  Línea llenada del slider (desde el inicio hasta el pulgar)
        },
        rail: {
          color: "#ddd",    // ⚪ Línea vacía restante del slider
        },
      },
    },
  },
});

export default theme; // 📦 Exportas el tema para usarlo en <ThemeProvider theme={theme}>
