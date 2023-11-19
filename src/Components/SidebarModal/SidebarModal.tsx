import styles, { colors } from "../../styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
export default function SidebarModal() {
  return (
    <div
      style={{
        width: "256px",
        height: "100%",
        padding: 16,
        alignContent: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: colors.header_color,
      }}
    >
      <div style={styles.flex_row}>
        <AccountCircleIcon
          style={{
            width: "48px",
            height: "px",
            color: "white",
            marginRight: "4px",
          }}
        />
        <p
          style={{
            ...styles.text_light,
            ...styles.text_S,
            ...{ alignSelf: "center" },
          }}
        >
          Placeholder Name
        </p>
      </div>
      <div
        style={{
          backgroundColor: "white",
          marginTop: "16px",
          width: "100%",
          height: "2px",
          marginBottom: 8,
        }}
      />
      <div style={styles.flex_row}>
        <HomeIcon
          style={{
            width: "64px",
            height: "64px",
            color: "white",
            marginRight: "2px",
          }}
        />
        <p
          style={{
            ...styles.text_light,
            ...styles.text_M,
          }}
        >
          Dashboard
        </p>
      </div>
    </div>
  );
}
