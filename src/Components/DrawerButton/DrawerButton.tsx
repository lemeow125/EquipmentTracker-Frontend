import React, { useState } from "react";
import styles from "../../styles";
import { colors } from "../../styles";

export interface props {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  label: string;
}
export default function DrawerButton(props: props) {
  const [clicked, setClicked] = useState(false);
  return (
    <div>
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
          minWidth: "128px",
          maxWidth: "128px",
          borderColor: colors.button_border,
          borderStyle: "solid",
          borderWidth: "2px",
          paddingBottom: 0,
          paddingTop: 0,
          paddingRight: "4px",
          paddingLeft: "4px",
          marginBottom: "4px",
          marginTop: "4px",
          backgroundColor: clicked ? colors.button_light : colors.button_dark,
        }}
      >
        <div style={styles.flex_row}>
          {clicked ? <></> : props.icon}
          <p
            style={{
              ...(clicked ? styles.text_dark : styles.text_light),
              ...styles.text_M,
              ...{ marginLeft: "4px" },
            }}
          >
            {props.label}
          </p>
        </div>
      </button>
    </div>
  );
}
