import { useState } from "react";
import styles from "../../styles";
import { colors } from "../../styles";
import TextField from "@mui/material/TextField";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import Button from "../Button/Button";
import { toast } from "react-toastify";
import { EquipmentCreateAPI } from "../API/API";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import { useQueryClient } from "@tanstack/react-query";

export default function AddSKUModal() {
  const queryClient = useQueryClient();
  const [sku, setSKU] = useState({
    name: "",
    description: "",
    category: "MISC",
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
        <NoteAddIcon
          style={{
            height: 64,
            width: 64,
            fill: colors.font_dark,
          }}
        />
        <p style={{ ...styles.text_dark, ...styles.text_L }}>Add SKU</p>
      </div>

      <div style={styles.flex_column}>
        <TextField
          id="outlined-helperText"
          label="SKU Name"
          style={styles.input_form}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSKU({ ...sku, name: e.target.value });
            setError("");
          }}
          value={sku.name}
          placeholder={"Enter SKU name"}
        />
        <TextField
          id="outlined-helperText"
          label="Description"
          multiline
          style={styles.input_form}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSKU({ ...sku, description: e.target.value })
          }
          value={sku.description}
          placeholder={"Give a brief description of the SKU"}
        />
        <FormControl style={{ marginTop: "8px" }}>
          <FormLabel
            style={styles.text_dark}
            id="demo-radio-buttons-group-label"
          >
            Category
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="MISC"
            name="radio-buttons-group"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSKU({ ...sku, category: e.target.value });
              setError("");
            }}
          >
            <div style={styles.flex_row}>
              <div style={styles.flex_column}>
                <FormControlLabel
                  value="PC"
                  control={<Radio />}
                  label="Workstation"
                  style={styles.text_dark}
                />
                <FormControlLabel
                  value="NETWORKING"
                  control={<Radio />}
                  label="Networking"
                  style={styles.text_dark}
                />
                <FormControlLabel
                  value="CCTV"
                  control={<Radio />}
                  label="CCTV"
                  style={styles.text_dark}
                />
              </div>
              <div style={styles.flex_column}>
                <FormControlLabel
                  value="FURNITURE"
                  control={<Radio />}
                  label="Furniture"
                  style={styles.text_dark}
                />
                <FormControlLabel
                  value="PERIPHERALS"
                  control={<Radio />}
                  label="Peripherals"
                  style={styles.text_dark}
                />
                <FormControlLabel
                  value="MISC"
                  control={<Radio />}
                  label="Miscellaneous"
                  style={styles.text_dark}
                />
              </div>
            </div>
          </RadioGroup>
        </FormControl>
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
        label={"Add SKU"}
        onClick={async () => {
          const data = await EquipmentCreateAPI(sku);
          if (data[0]) {
            setError("Added successfully");
            toast(
              `New SKU added successfuly,  ${
                typeof data[1] == "object" ? "ID:" + data[1].id : ""
              }`,
              {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              }
            );
            queryClient.invalidateQueries({ queryKey: ["equipments"] });
            setSKU({ name: "", description: "", category: "MISC" });
          } else {
            setError(JSON.stringify(data[1]));
          }
        }}
      />
    </>
  );
}
