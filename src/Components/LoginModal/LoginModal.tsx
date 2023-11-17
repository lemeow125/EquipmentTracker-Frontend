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
import Button from "../Buttons/Button";
import { useNavigate } from "react-router-dom";
export default function LoginModal() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  return (
    <>
      <div
        style={{
          ...styles.flex_row,
          ...{ alignItems: "center", justifyContent: "center" },
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUser({ ...user, username: e.target.value })
          }
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
                  onClick={() => setShowPassword(!showPassword)}
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
              value={remember}
              onChange={() => setRemember(!remember)}
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
      <Button
        type={"dark"}
        label={"Login"}
        onClick={() => {
          navigate("/dashboard");
        }}
      />
    </>
  );
}
