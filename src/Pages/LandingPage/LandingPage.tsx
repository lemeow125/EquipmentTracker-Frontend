import Button from "../../Components/Buttons/Button";
import styles from "../../Components/styles";
import citc_logo from "../../assets/citc_logo.jpg";
export default function LandingPage() {
  return (
    <div style={styles.background}>
      <div
        style={{
          ...styles.flex_row,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
          minHeight: "100%",
          minWidth: "100%",
        }}
      >
        <div style={{ maxWidth: "50%", height: "auto", flex: 1 }}>
          <img style={{ maxWidth: "50%", height: "auto" }} src={citc_logo} />
        </div>
        <div
          style={{
            maxWidth: "50%",
            height: "auto",
            flex: 1,
          }}
        >
          <div
            style={{
              minWidth: "30vw",
              borderRadius: 4,
              borderColor: "grey",
              borderStyle: "solid",
              borderWidth: 1,
              padding: 16,
              margin: 64,
              paddingBottom: "16vh",
              paddingTop: "16vh",
            }}
          >
            <p style={{ ...styles.text_dark, ...styles.text_L }}>
              CITC EQUIPMENT
              <br />
              TRACKER
            </p>
            <div style={{ ...styles.flex_column }}>
              <Button type={"light"} label={"Login"} onClick={() => {}} />
              <Button type={"dark"} label={"Register"} onClick={() => {}} />
            </div>
          </div>
        </div>
      </div>
      <p>heh</p>
    </div>
  );
}
