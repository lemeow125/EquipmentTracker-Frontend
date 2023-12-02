import { useEffect, useState } from "react";
import styles from "../../styles";
import { colors } from "../../styles";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import Button from "../Button/Button";
import { toast } from "react-toastify";
import {
  EquipmentAPI,
  EquipmentRemoveAPI,
  EquipmentUpdateAPI,
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

export default function EditSKUModal(props: {
  id: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const queryClient = useQueryClient();
  const [item, setItem] = useState({
    name: "",
    description: "",
    category: "",
  });
  const [error, setError] = useState("");

  const equipment = useQuery({
    queryKey: ["equipment", props.id],
    queryFn: () => EquipmentAPI(Number(props.id)),
  });

  useEffect(() => {
    if (equipment.data) {
      setItem({
        ...item,
        name: equipment.data.name,
        description: equipment.data.description,
        category: equipment.data.category,
      });
    }
  }, [equipment.data]);

  const update_mutation = useMutation({
    mutationFn: async () => {
      const data = await EquipmentUpdateAPI(item, props.id);
      if (data[0] != true) {
        return Promise.reject(new Error(JSON.stringify(data[1])));
      }
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["equipments"] });
      queryClient.invalidateQueries({
        queryKey: ["equipment", props.id],
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
          name: data[1].name,
          description: data[1].description,
          category: data[1].category,
        });
      }
    },
    onError: (error) => {
      setError(JSON.stringify(error));
    },
  });

  const delete_mutation = useMutation({
    mutationFn: async () => {
      const data = await EquipmentRemoveAPI(props.id);
      if (data[0] != true) {
        return Promise.reject(new Error(JSON.stringify(data[1])));
      }
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["equipments"] });
      queryClient.invalidateQueries({
        queryKey: ["equipment", props.id],
      });
      setError("Deleted successfully");
      toast("SKU deleted successfuly", {
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
          name: data[1].name,
          description: data[1].description,
          category: data[1].category,
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
        <p style={{ ...styles.text_dark, ...styles.text_L }}>Edit SKU</p>
      </div>

      <div style={styles.flex_column}>
        <FormControl style={{ marginTop: "8px" }}>
          <TextField
            id="outlined-helperText"
            label="SKU Name"
            style={styles.input_form}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setItem({ ...item, name: e.target.value });
              setError("");
            }}
            value={item.name}
            placeholder={"Enter SKU name"}
          />
          <TextField
            id="outlined-helperText"
            label="Description"
            multiline
            style={styles.input_form}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setItem({ ...item, description: e.target.value })
            }
            value={item.description}
            placeholder={"Give a brief description of the SKU"}
          />
          <FormLabel
            style={styles.text_dark}
            id="demo-radio-buttons-group-label"
          >
            Category
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setItem({ ...item, category: e.target.value });
              setError("");
            }}
            value={item.category}
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
