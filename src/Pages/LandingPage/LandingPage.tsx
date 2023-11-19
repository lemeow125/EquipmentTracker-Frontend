import Button from "../../Components/Buttons/Button";
import styles from "../../styles";
import citc_logo from "../../assets/citc_logo.jpg";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useState } from "react";
import LoginModal from "../../Components/LoginModal/LoginModal";
import RegisterModal from "../../Components/RegisterModal/RegisterModal";
export default function LandingPage() {
  const [LoginModalOpen, SetLoginModalOpen] = useState(false);
  const [RegisterModalOpen, SetRegisterModalOpen] = useState(false);
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
              <Button
                type={"light"}
                label={"Login"}
                onClick={() => {
                  SetLoginModalOpen(true);
                  SetRegisterModalOpen(false);
                }}
              />
              <Button
                type={"dark"}
                label={"Register"}
                onClick={() => {
                  SetRegisterModalOpen(true);
                  SetLoginModalOpen(false);
                }}
              />
              <Popup
                open={LoginModalOpen}
                onClose={() => SetLoginModalOpen(false)}
                modal
                position={"top center"}
                contentStyle={{
                  width: "512px",
                  borderRadius: 16,
                  borderColor: "grey",
                  borderStyle: "solid",
                  borderWidth: 1,
                  padding: 16,
                  alignContent: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <LoginModal />
              </Popup>
              <Popup
                open={RegisterModalOpen}
                onClose={() => SetRegisterModalOpen(false)}
                modal
                position={"top center"}
                contentStyle={{
                  width: "512px",
                  borderRadius: 16,
                  borderColor: "grey",
                  borderStyle: "solid",
                  borderWidth: 1,
                  padding: 16,
                  alignContent: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <RegisterModal />
              </Popup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
