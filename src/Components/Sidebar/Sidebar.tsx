import styles, { colors } from "../../styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { useQuery } from "@tanstack/react-query";
import { UserAPI, setAccessToken, setRefreshToken } from "../API/API";
import DrawerButton from "../DrawerButton/DrawerButton";
import { useDispatch } from "react-redux";
import { auth_toggle } from "../Plugins/Redux/Slices/AuthSlice/AuthSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function Sidebar() {
  const user = useQuery({ queryKey: ["user"], queryFn: UserAPI });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div
      style={{
        width: "256px",
        height: "100%",
        padding: 16,
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: colors.header_color,
      }}
    >
      <div style={styles.flex_row}>
        <AccountCircleIcon
          style={{
            width: "48px",
            height: "48px",
            color: "white",
            marginRight: "4px",
          }}
        />
        <p
          style={{
            ...styles.text_light,
            ...styles.text_S,
            ...{ alignSelf: "center" },
          }}
        >
          {user.data
            ? user.data.username
            : user.isError
            ? "Error loading user"
            : "Loading user..."}
        </p>
      </div>
      <div
        style={{
          backgroundColor: "white",
          marginTop: "16px",
          width: "100%",
          height: "2px",
          marginBottom: 8,
        }}
      />
      <DrawerButton
        onClick={() => {
          navigate("/dashboard");
        }}
        icon={
          <HomeIcon
            style={{
              width: "48px",
              height: "48px",
              color: "white",
              marginRight: "2px",
              alignSelf: "center",
              justifySelf: "center",
            }}
          />
        }
        label={"Dashboard"}
      />
      <DrawerButton
        onClick={async () => {
          navigate("/");
          await dispatch(auth_toggle());
          await setAccessToken("");
          await setRefreshToken("");
          toast("Logged out", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }}
        icon={
          <LogoutIcon
            style={{
              width: "48px",
              height: "48px",
              color: "white",
              marginRight: "2px",
              alignSelf: "center",
              justifySelf: "center",
            }}
          />
        }
        label={"Log out"}
      />
    </div>
  );
}
