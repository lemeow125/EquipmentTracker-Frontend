import React, { useState } from "react";
import styles from "../styles";
import { colors } from "../styles";

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
        onMouseDown={() => {
          if (!clicked) {
            props.onClick;
            setClicked(true);
          }
        }}
        onMouseUp={() => setClicked(false)}
        onMouseLeave={() => setClicked(false)}
        style={{
          borderRadius: 24,
          minWidth: "15vw",
          borderColor: colors.button_border,
          borderStyle: "solid",
          borderWidth: 2,
          paddingBottom: "2vh",
          paddingTop: "2vh",
          paddingRight: "5vw",
          paddingLeft: "5vw",
          marginBottom: "0.5vh",
          marginTop: "0.5vh",
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
            ...styles.text_M,
          }}
        >
          {props.label}
        </p>
        {props.children}
      </button>
    </div>
  );
}
