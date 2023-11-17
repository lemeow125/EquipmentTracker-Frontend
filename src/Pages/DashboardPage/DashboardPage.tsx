import Header from "../../Components/Header/Header";
import styles from "../../styles";

export default function Dashboard() {
  return (
    <div style={styles.background}>
      <Header label={"Dashboard"} />
      <p style={{ ...styles.text_dark, ...styles.text_M }}>Dashboard Page</p>
    </div>
  );
}
