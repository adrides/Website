/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Cuando metas Jost via Google Fonts o similar, usará esto
        rocky: ['"Jost"', "system-ui", "sans-serif"],
      },
      colors: {
        rocky: {
          // Paleta principal (exacta de DogCollabAppNew theme.ts)
          primary: "#d5b693", // Marrón cálido (principal)
          primaryDark: "#5A3F31",
          primaryLight: "#8A6B57",
          primaryLightExtra: "#dabd9a",
          grayBackground: "#f1f2f1",

          secondary: "#A7CDEB", // Azul cielo pastel
          accent: "#D8C4A0", // Beige arena

          // Fondos
          background: "#ffffff", // Blanco
          navigator: "#faf9f5",
          surface: "#FFFFFF",
          card: "#fff0d7", // Crema sutil para tarjetas
          cardShadow: "#d9bea0",
          buttonBg: "#d9bea0",

          // Texto
          text: "#333333",
          textMuted: "#6B6B6B",
          textLight: "#FFFFFF",
          textDisabled: "#B7B7B7",
          textAccent: "#6B4E3D",

          // Estados
          success: "#66BB6A",
          warning: "#FFD54F",
          error: "#E57373",
          info: "#81C784",

          // Bordes
          border: "#EFE7DB",
          borderLight: "#F4EFE7",

          // Tonos naturales adicionales
          sage: "#EDE4D6",
          forest: "#6B4E3D",
          moss: "#8A6B57",
          cream: "#FAF9F5",
          sand: "#E9DDC9",
          bark: "#5D4037",
        },
      },

      // Border radius inspirados en borderRadius de theme.ts
      borderRadius: {
        rockyXs: "6px",
        rockySm: "12px",
        rockyMd: "16px",
        rockyLg: "20px",
        rockyXl: "24px",
        rockyXxl: "32px",
      },

      // Espaciados base (aprox. mapping del spacing del theme)
      spacing: {
        rockyXxs: "2px",
        rockyXs: "4px",
        rockySm: "8px",
        rockyMd: "16px",
        rockyLg: "24px",
        rockyXl: "32px",
        rockyXxl: "48px",
      },

      // Sombra inspirada en shadows.sm del theme (web-friendly)
      boxShadow: {
        rockyCard:
          "0 2px 6px rgba(0,0,0,0.08)", // parecida a shadowOpacity 0.06-0.08
      },
    },
  },
  plugins: [],
};
