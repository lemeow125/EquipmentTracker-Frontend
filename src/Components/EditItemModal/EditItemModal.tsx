import { useEffect, useState } from "react";
import styles from "../../styles";
import { colors } from "../../styles";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import Button from "../Button/Button";
import { toast } from "react-toastify";
import {
  EquipmentInstanceAPI,
  EquipmentInstanceRemoveAPI,
  EquipmentInstanceUpdateAPI,
} from "../API/API";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import React from "react";

export default function EditItemModal(props: {
  id: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const queryClient = useQueryClient();
  const [item, setItem] = useState({
    remarks: "",
    status: "",
  });
  const [error, setError] = useState("");

  const equipment = useQuery({
    queryKey: ["equipment_instance", props.id],
    queryFn: () => EquipmentInstanceAPI(Number(props.id)),
  });

  useEffect(() => {
    if (equipment.data) {
      setItem({
        ...item,
        remarks: equipment.data.remarks,
        status: equipment.data.status,
      });
    }
  }, [equipment.data]);

  const update_mutation = useMutation({
    mutationFn: async () => {
      const data = await EquipmentInstanceUpdateAPI(item, props.id);
      if (data[0] != true) {
        return Promise.reject(new Error(JSON.stringify(data[1])));
      }
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["equipment_instances"] });
      queryClient.invalidateQueries({
        queryKey: ["equipment_instance", props.id],
      });
      setError("Updated successfully");
      toast(
        `Item updated successfuly,  ${
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
      if (typeof data[1] == "object") {
        setItem({
          ...item,
          remarks: data[1].remarks,
          status: data[1].status,
        });
      }
    },
    onError: (error) => {
      setError(JSON.stringify(error));
    },
  });

  const delete_mutation = useMutation({
    mutationFn: async () => {
      const data = await EquipmentInstanceRemoveAPI(props.id);
      if (data[0] != true) {
        return Promise.reject(new Error(JSON.stringify(data[1])));
      }
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["equipment_instances"] });
      queryClient.invalidateQueries({
        queryKey: ["equipment_instance", props.id],
      });
      setError("Deleted successfully");
      toast("Item deleted successfuly", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      props.setOpen(false);
      if (typeof data[1] == "object") {
        setItem({
          ...item,
          remarks: data[1].remarks,
          status: data[1].status,
        });
      }
    },
    onError: (error) => {
      setError(JSON.stringify(error));
    },
  });

  if (equipment.isLoading) {
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
        <EditIcon
          style={{
            height: 64,
            width: 64,
            fill: colors.font_dark,
            marginLeft: "1rem",
            marginRight: "1rem",
          }}
        />
        <p style={{ ...styles.text_dark, ...styles.text_L }}>Edit Item</p>
      </div>

      <div style={styles.flex_column}>
        <FormControl style={{ marginTop: "8px" }}>
          <div
            style={{
              ...styles.flex_row,
              ...{
                alignItems: "center",
                justifyContent: "center",
                verticalAlign: "center",
              },
            }}
          >
            <p
              style={{
                ...styles.text_dark,
                ...styles.text_L,
                ...{ marginRight: "8px" },
              }}
            >
              Associated SKU:
            </p>
            <p style={{ ...styles.text_dark, ...styles.text_M }}>
              {equipment.data?.equipment_name}
              {" (SKU #" + equipment.data?.equipment + ")"}
            </p>
          </div>

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
      <div
        style={{
          ...styles.flex_row,
          ...{ justifyContent: "center" },
        }}
      >
        <Button
          type={"dark"}
          label={"Update Item"}
          onClick={async () => {
            await update_mutation.mutate();
          }}
        />
        <div style={{ margin: "8px" }}></div>
        <Button
          type={"light"}
          label={"Delete Item"}
          onClick={async () => {
            await delete_mutation.mutate();
          }}
        />
      </div>
    </>
  );
}
