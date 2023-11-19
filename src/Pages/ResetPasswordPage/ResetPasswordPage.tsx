import { useNavigate, useParams } from "react-router-dom";
import styles, { colors } from "../../styles";
import { ResetPasswordConfirmAPI } from "../../Components/API/API";
import { useState } from "react";
import { toast } from "react-toastify";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import Button from "../../Components/Button/Button";
export default function ResetPasswordPage() {
  const { uid, token } = useParams();
  const [feedback, setFeedback] = useState("");
  const [user, setUser] = useState({
    password: "",
    confirm_password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  return (
    <div style={styles.background}>
      <div
        style={{
          ...styles.flex_column,
          ...{
            justifyContent: "center",
            verticalAlign: "center",
            height: "100%",
          },
        }}
      >
        <p style={{ ...styles.text_dark, ...styles.text_L }}>
          Confirm Password Reset
        </p>
        <TextField
          id="outlined-helperText"
          type={showPassword ? "text" : "password"}
          style={styles.input_form}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => {
                    setShowPassword(!showPassword);
                    setFeedback("");
                  }}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          label="New Password"
          placeholder={"Enter new password"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUser({ ...user, password: e.target.value })
          }
          value={user.password}
        />
        <TextField
          id="outlined-helperText"
          type={showPassword ? "text" : "password"}
          style={styles.input_form}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => {
                    setShowPassword(!showPassword);
                    setFeedback("");
                  }}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          label="Confirm Password"
          placeholder={"Re-enter password"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUser({ ...user, confirm_password: e.target.value })
          }
          value={user.confirm_password}
        />
        <div style={{ justifyContent: "center", display: "flex" }}>
          <div
            style={{
              backgroundColor: colors.header_color,
              marginTop: "16px",
              width: "80%",
              height: "4px",
              marginBottom: 8,
            }}
          />
        </div>

        <p style={{ ...styles.text_dark, ...styles.text_M }}>{feedback}</p>
        <Button
          type={"dark"}
          label={"Confirm"}
          onClick={() => {
            if (uid && token && feedback == "") {
              ResetPasswordConfirmAPI({
                uid,
                token,
                new_password: user.password,
              }).then((response) => {
                if (response) {
                  setFeedback("Reset successful");
                  toast("Reset successful", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                  toast("Please login to continue", {
                    position: "top-right",
                    autoClose: 6000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                  setTimeout(() => {
                    navigate("/");
                  });
                } else {
                  setFeedback("Invalid token specified for password reset");
                }
              });
            }
            if (!uid || !token) {
              setFeedback("Missing token for password reset");
            }
          }}
        />
      </div>
    </div>
  );
}
