import { useState } from "react";
import styles, { colors } from "../../styles";
import MenuIcon from "@mui/icons-material/Menu";
import SidebarModal from "../Drawer/Drawer";
import { Drawer } from "@mui/material";
export interface props {
  label: string;
}

export default function Header(props: props) {
  const [SidebarOpen, SetSidebarOpen] = useState(false);
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
