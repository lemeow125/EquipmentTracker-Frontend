import { useEffect, useState } from "react";
import styles, { colors } from "../../styles";
import MenuIcon from "@mui/icons-material/Menu";
import SidebarModal from "../SidebarModal/SidebarModal";
import { Drawer } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../Plugins/Redux/Store/Store";
import { useNavigate } from "react-router-dom";

export interface props {
  label: string;
}

export default function Header(props: props) {
  const [SidebarOpen, SetSidebarOpen] = useState(false);
  const authenticated = useSelector((state: RootState) => state.auth.value);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      navigate("/");
      console.log("Not logged in. Redirecting to landing page");
    }
  }, [authenticated, navigate]);

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: -1,
        backgroundColor: colors.header_color,
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div
        style={{
          flex: 1,
          alignSelf: "center",
        }}
      >
        <MenuIcon
          style={{
            height: "64px",
            width: "64px",
            float: "left",
            marginLeft: "8px",
          }}
          onClick={() => {
            SetSidebarOpen(true);
          }}
        />
      </div>
      <p style={{ ...styles.text_light, ...styles.text_M, ...{ flex: 1 } }}>
        {props.label}
      </p>
      <div style={{ flex: 1 }} />
      <Drawer open={SidebarOpen} onClose={() => SetSidebarOpen(false)}>
        <SidebarModal />
      </Drawer>
    </div>
  );
}
