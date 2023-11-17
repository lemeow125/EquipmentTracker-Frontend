import React, { useState } from "react";
import styles from "../../styles";
import { colors } from "../../styles";

export interface props {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  label?: string;
  type: "light" | "dark";
  children?: React.ReactNode;
}
export default function Button(props: props) {
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
          minWidth: "50%",
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
          backgroundColor:
            props.type == "light"
              ? clicked
                ? colors.button_dark
                : colors.button_light
              : clicked
              ? colors.button_light
              : colors.button_dark,
        }}
      >
        <p
          style={{
            ...(props.type == "light"
              ? clicked
                ? styles.text_light
                : styles.text_dark
              : clicked
              ? styles.text_dark
              : styles.text_light),
            ...styles.text_S,
          }}
        >
          {props.label}
        </p>
        {props.children}
      </button>
    </div>
  );
}
