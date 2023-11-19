import { useState } from "react";
import styles from "../../styles";
import { colors } from "../../styles";
import TextField from "@mui/material/TextField";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { ResetPasswordAPI } from "../API/API";
import { useDispatch } from "react-redux";
import { auth_toggle } from "../Plugins/Redux/Slices/AuthSlice/AuthSlice";
import { toast } from "react-toastify";
export default function ResetPasswordModal() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  return (
    <>
      <div
        style={{
          ...styles.flex_row,
          ...{
            alignItems: "center",
            justifyContent: "center",
            overflowY: "scroll",
          },
        }}
      >
        <NewReleasesIcon
          style={{
            height: 64,
            width: 64,
            fill: colors.font_dark,
          }}
        />
        <p style={{ ...styles.text_dark, ...styles.text_L }}>Forgot Password</p>
      </div>
      <p style={{ ...styles.text_dark, ...styles.text_S }}>
        Enter your email to request a password reset
      </p>
      <div style={styles.flex_column}>
        <TextField
          id="outlined-helperText"
          label="Email"
          style={styles.input_form}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
            setError("");
          }}
          value={email}
          placeholder={"Enter email associated with account"}
        />
        <p style={{ ...styles.text_dark, ...styles.text_S }}>{error}</p>
        <div
          style={{
            backgroundColor: colors.button_border,
            width: "100%",
            height: "2px",
            marginBottom: 8,
          }}
        />
        <Button
          type={"dark"}
          label={"Confirm"}
          onClick={async () => {
            const status = await ResetPasswordAPI(email);
            if (status === true) {
              await dispatch(auth_toggle());
              navigate("/");
              toast("Reset request sent", {
                position: "top-right",
                autoClose: 6000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              setError(
                "Password reset request sent. Please follow your email for further instructions"
              );
            } else {
              setError("Invalid email specified");
            }
          }}
        />
      </div>
    </>
  );
}
