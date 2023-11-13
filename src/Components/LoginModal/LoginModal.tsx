import { useState } from "react";
import styles from "../../styles";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function LoginModal() {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  return (
    <>
      <p style={{ ...styles.text_dark, ...styles.text_L }}>Welcome back!</p>
      <div style={styles.flex_column}>
        <TextField
          id="outlined-helperText"
          label="Username"
          style={{
            ...styles.text_dark,
            ...styles.text_M,
            ...{
              background: "none",
              borderRadius: 8,
              minWidth: "15vw",
              minHeight: "5vh",
              marginTop: 16,
            },
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUser({ ...user, username: e.target.value })
          }
          value={user.username}
          placeholder={"Enter username"}
        />
        <TextField
          id="outlined-helperText"
          type={showPassword ? "text" : "password"}
          style={{
            ...styles.text_dark,
            ...styles.text_M,
            ...{
              background: "none",
              borderRadius: 8,
              minWidth: "15vw",
              minHeight: "5vh",
              marginTop: 16,
            },
          }}
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
      </div>
    </>
  );
}
