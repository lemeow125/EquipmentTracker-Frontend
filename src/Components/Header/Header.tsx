import styles, { colors } from "../../styles";

export interface props {
  label: React.ReactNode;
}

export default function Header(props: props) {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: -1,
        backgroundColor: colors.header_color,
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
      }}
    >
      <p style={{ ...styles.text_light, ...styles.text_M }}>{props.label}</p>
    </div>
  );
}
