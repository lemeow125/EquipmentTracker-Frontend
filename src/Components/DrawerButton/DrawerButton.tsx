import React, { useState } from "react";
import styles from "../../styles";
import { colors } from "../../styles";

export interface props {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  label: string;
}
export default function DrawerButton(props: props) {
  const [clicked, setClicked] = useState(false);
  return (
    <button
      onClick={props.onClick}
      onMouseDown={() => {
        if (!clicked) {
          setClicked(!clicked);
        }
      }}
      onMouseUp={() => setClicked(false)}
      onMouseLeave={() => setClicked(false)}
      style={{
        borderRadius: 24,
        minWidth: "132px",
        maxWidth: "132px",
        borderColor: colors.button_border,
        borderStyle: "solid",
        borderWidth: "2px",
        paddingBottom: 0,
        paddingTop: 0,
        paddingLeft: "4px",
        marginBottom: "4px",
        marginTop: "4px",
        backgroundColor: clicked ? colors.button_dark : colors.button_light,
      }}
    >
      <p
        style={{
          ...(clicked ? styles.text_light : styles.text_dark),
          ...styles.text_M,
          ...{ textAlign: "left", marginLeft: "16px" },
        }}
      >
        {props.label}
      </p>
    </button>
  );
}
