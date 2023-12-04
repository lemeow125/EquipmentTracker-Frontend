import { useState } from "react";
import styles from "../../styles";
import { colors } from "../../styles";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { AppRegistration } from "@mui/icons-material";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { RegisterAPI } from "../API/API";
import { toast } from "react-toastify";
export default function RegisterModal() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState("");
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
        <AppRegistration
          style={{
            height: 64,
            width: 64,
            fill: colors.font_dark,
          }}
        />
        <p style={{ ...styles.text_dark, ...styles.text_L }}>Get Started</p>
      </div>

      <div style={styles.flex_column}>
        <TextField
          id="outlined-helperText"
          label="First Name"
          style={styles.input_form}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUser({ ...user, first_name: e.target.value });
            setError("");
          }}
          value={user.first_name}
          placeholder={"Enter your first name"}
        />
        <TextField
          id="outlined-helperText"
          label="Last Name"
          style={styles.input_form}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUser({ ...user, last_name: e.target.value })
          }
          value={user.last_name}
          placeholder={"Enter your last name"}
        />
        <TextField
          id="outlined-helperText"
          label="Email"
          style={styles.input_form}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUser({ ...user, email: e.target.value })
          }
          value={user.email}
          placeholder={"Enter your email"}
        />
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
          label="Confirm Password"
          placeholder={"Re-enter password"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUser({ ...user, confirm_password: e.target.value });
            setError("");
          }}
          value={user.confirm_password}
        />
      </div>
      <p style={{ ...styles.text_dark, ...styles.text_M }}>{error}</p>
      <div
        style={{
          backgroundColor: colors.button_border,
          marginTop: "16px",
          width: "100%",
          height: "2px",
          marginBottom: 8,
        }}
      />
      <Button
        type={"dark"}
        label={"Register"}
        onClick={async () => {
          if (user.password !== user.confirm_password) {
            setError("Passwords do not match");
          } else {
            const status = await RegisterAPI(user);
            if (status[0]) {
              setError(
                "Registration successful. Please activate your account using the email provided"
              );
              toast("Registration successful", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              setTimeout(() => {
                navigate(0);
              }, 3000);
              setUser({
                first_name: "",
                last_name: "",
                username: "",
                email: "",
                password: "",
                confirm_password: "",
              });
            } else {
              setError(JSON.stringify(status[1]));
            }
          }
        }}
      />
    </>
  );
}
