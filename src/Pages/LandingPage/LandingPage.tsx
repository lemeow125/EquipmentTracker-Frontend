import Button from "../../Components/Button/Button";
import styles from "../../styles";
import citc_logo from "../../assets/citc_logo.jpg";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useEffect, useState } from "react";
import LoginModal from "../../Components/LoginModal/LoginModal";
import RegisterModal from "../../Components/RegisterModal/RegisterModal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../Components/Plugins/Redux/Store/Store";
import ResetPasswordModal from "../../Components/ResetPasswordModal/ResetPasswordModal";
export default function LandingPage() {
  const [loginmodalOpen, SetloginmodalOpen] = useState(false);
  const [registermodalOpen, SetRegisterModalOpen] = useState(false);
  const [resetmodalOpen, SetResetModalOpen] = useState(false);
  const authenticated = useSelector((state: RootState) => state.auth.value);
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated) {
      navigate("/dashboard");
      console.log("Already logged in. Redirecting to dashboard page");
    }
  }, [authenticated, navigate]);
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
                  SetloginmodalOpen(true);
                  SetRegisterModalOpen(false);
                  SetResetModalOpen(false);
                }}
              />
              <Button
                type={"dark"}
                label={"Register"}
                onClick={() => {
                  SetRegisterModalOpen(true);
                  SetloginmodalOpen(false);
                  SetResetModalOpen(false);
                }}
              />
              <Button
                type={"light"}
                label={"Forgot Password"}
                onClick={() => {
                  SetResetModalOpen(true);
                  SetRegisterModalOpen(false);
                  SetloginmodalOpen(false);
                }}
              />
              <Popup
                open={loginmodalOpen}
                onClose={() => SetloginmodalOpen(false)}
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
                open={registermodalOpen}
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
              <Popup
                open={resetmodalOpen}
                onClose={() => SetResetModalOpen(false)}
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
                <ResetPasswordModal />
              </Popup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
