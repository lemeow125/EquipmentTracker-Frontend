import { useState } from "react";
import styles from "../../styles";
import { colors } from "../../styles";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";
import Checkbox from "@mui/material/Checkbox";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { LoginAPI } from "../API/API";
import { useDispatch } from "react-redux";
import { auth_toggle } from "../Plugins/Redux/Slices/AuthSlice/AuthSlice";
import { toast } from "react-toastify";
export default function LoginModal() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [remember_session, setRememberSession] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
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
        <LoginIcon
          style={{
            height: 64,
            width: 64,
            fill: colors.font_dark,
          }}
        />
        <p style={{ ...styles.text_dark, ...styles.text_L }}>Welcome back!</p>
      </div>

      <div style={styles.flex_column}>
        <TextField
          id="outlined-helperText"
          label="Username"
          style={styles.input_form}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUser({ ...user, username: e.target.value });
            setError("");
          }}
          value={user.username}
          placeholder={"Enter username"}
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
                    setError("");
                  }}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          label="Password"
          placeholder={"Enter password"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUser({ ...user, password: e.target.value })
          }
          value={user.password}
        />
        <div style={styles.flex_row}>
          <div
            style={{
              ...styles.flex_row,
              ...{ flex: 1, alignItems: "center" },
            }}
          >
            <Checkbox
              inputProps={{ "aria-label": "Checkbox demo" }}
              defaultChecked
              sx={{
                color: colors.button_dark,
                "&.Mui-checked": {
                  color: colors.button_dark,
                },
              }}
              value={remember_session}
              onChange={() => setRememberSession(!remember_session)}
            />
            <p style={{ ...styles.text_dark, ...styles.text_S }}>Remember me</p>
          </div>
          <div style={{ flex: 1 }}>
            <p
              style={{
                ...styles.text_dark,
                ...styles.text_S,
              }}
            >
              Forgot password?
            </p>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundColor: colors.button_border,
          width: "100%",
          height: "2px",
          marginBottom: 8,
        }}
      />
      <p style={{ ...styles.text_dark, ...styles.text_S }}>{error}</p>
      <Button
        type={"dark"}
        label={"Login"}
        onClick={async () => {
          const status = await LoginAPI(user, remember_session);
          if (status === true) {
            await dispatch(auth_toggle());
            navigate("/dashboard");
            toast("Logged in", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else {
            setError("Invalid login");
          }
        }}
      />
    </>
  );
}
