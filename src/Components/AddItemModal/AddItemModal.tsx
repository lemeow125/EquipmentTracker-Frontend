import { useEffect, useState } from "react";
import styles from "../../styles";
import { colors } from "../../styles";
import TextField from "@mui/material/TextField";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import Button from "../Button/Button";
import { toast } from "react-toastify";
import { EquipmentInstanceCreateAPI, EquipmentsAPI } from "../API/API";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import React from "react";

export default function AddItemModal() {
  const queryClient = useQueryClient();
  const [item, setItem] = useState({
    equipment: 0,
    remarks: "",
    status: "WORKING",
  });
  const [error, setError] = useState("");

  const equipments = useQuery({
    queryKey: ["equipments"],
    queryFn: EquipmentsAPI,
  });

  useEffect(() => {
    if (equipments.data) {
      setItem({ ...item, equipment: equipments.data[0].id });
    }
  }, [equipments.data]);
  if (equipments.isLoading) {
    return (
      <div
        style={{
          ...styles.flex_column,
          ...{
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "64px",
          },
        }}
      >
        <CircularProgress style={{ height: "128px", width: "128px" }} />
        <p
          style={{
            ...styles.text_dark,
            ...styles.text_L,
          }}
        >
          Loading
        </p>
      </div>
    );
  }
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
        <AddToQueueIcon
          style={{
            height: 64,
            width: 64,
            fill: colors.font_dark,
            marginLeft: "1rem",
            marginRight: "1rem",
          }}
        />
        <p style={{ ...styles.text_dark, ...styles.text_L }}>Add Item</p>
      </div>

      <div style={styles.flex_column}>
        <FormControl style={{ marginTop: "8px" }}>
          <FormLabel style={styles.text_dark} id="associated-equipment-group">
            Select Associated SKU
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={item.equipment}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setItem({ ...item, equipment: Number(e.target.value) });
              setError("");
            }}
          >
            <div
              style={{
                ...styles.flex_column,
                ...{ overflowY: "scroll", maxHeight: "8rem" },
              }}
            >
              {equipments.data ? (
                equipments.data.map((equipment) => (
                  <React.Fragment key={equipment.id}>
                    <FormControlLabel
                      value={equipment.id}
                      control={<Radio />}
                      label={equipment.name}
                      style={styles.text_dark}
                    />
                  </React.Fragment>
                ))
              ) : (
                <></>
              )}
            </div>
          </RadioGroup>
        </FormControl>
        <FormControl style={{ marginTop: "8px" }}>
          <FormLabel style={styles.text_dark} id="status-selection">
            Item Status
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={item.status}
            defaultValue="WORKING"
            name="radio-buttons-group"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setItem({ ...item, status: e.target.value });
              setError("");
            }}
          >
            <div
              style={{
                ...styles.flex_column,
                ...{ overflowY: "scroll", maxHeight: "8rem" },
              }}
            >
              <FormControlLabel
                value="WORKING"
                control={<Radio />}
                label="Working"
                style={styles.text_dark}
              />
              <FormControlLabel
                value="BROKEN"
                control={<Radio />}
                label="Broken"
                style={styles.text_dark}
              />
              <FormControlLabel
                value="MAINTENANCE"
                control={<Radio />}
                label="Under Maintenance"
                style={styles.text_dark}
              />
              <FormControlLabel
                value="DECOMISSIONED"
                control={<Radio />}
                label="Decomissioned"
                style={styles.text_dark}
              />
            </div>
          </RadioGroup>
        </FormControl>
        <TextField
          id="outlined-helperText"
          label="Remarks"
          multiline
          style={styles.input_form}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setItem({ ...item, remarks: e.target.value });
            setError("");
          }}
          value={item.remarks}
          placeholder={"Optionally add a brief description of the item"}
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
        label={"Add Item"}
        onClick={async () => {
          let data;
          if (item.remarks == "") {
            data = await EquipmentInstanceCreateAPI({
              equipment: item.equipment,
              status: item.status,
            });
          } else {
            data = await EquipmentInstanceCreateAPI(item);
          }

          if (data[0]) {
            setError("Added successfully");
            toast(
              `New item added successfuly,  ${
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
            queryClient.invalidateQueries({
              queryKey: ["equipment_instances"],
            });
            setItem({ ...item, status: "WORKING", remarks: "" });
          } else {
            setError(JSON.stringify(data[1]));
          }
        }}
      />
    </>
  );
}
