export const colors = {
  background: "#FFFFFF",
  header_color: "#141762",
  font_dark: "#141762",
  font_light: "#FFFFFF",
  button_dark: "#141762",
  button_light: "#FFFFFF",
  button_border: "#141762",
  red: "#a44141",
  orange: "#c57331",
  green: "#80b28a",
};
const styles: { [key: string]: React.CSSProperties } = {
  background: {
    backgroundColor: colors.background,
    position: "fixed",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    minHeight: "100%",
    minWidth: "100%",
  },
  text_dark: {
    color: colors.font_dark,
    fontWeight: "bold",
  },
  text_light: {
    color: colors.font_light,
    fontWeight: "bold",
  },
  text_red: {
    color: colors.red,
    fontWeight: "bold",
  },
  text_orange: {
    color: colors.orange,
    fontWeight: "bold",
  },
  text_green: {
    color: colors.green,
    fontWeight: "bold",
  },
  text_XL: {
    fontSize: "clamp(1vw, 4rem, 2vw)",
  },
  text_L: {
    fontSize: "clamp(1vw, 2rem, 2vw)",
  },
  text_M: {
    fontSize: "clamp(1vw, 1rem, 2vw)",
  },
  text_S: {
    fontSize: "clamp(1vw, 0.5rem, 2vw)",
  },
  text_XS: {
    fontSize: "clamp(1vw, 0.2rem, 2vw)",
  },
  flex_row: {
    display: "flex",
    flexDirection: "row",
  },
  flex_column: {
    display: "flex",
    flexDirection: "column",
  },
};

export default styles;
