import Header from "../../Components/Header/Header";
import styles from "../../styles";
import { useQueries } from "@tanstack/react-query";
import { EquipmentsAPI, EquipmentInstancesAPI } from "../../Components/API/API";
import { Button, CircularProgress } from "@mui/material";
import ComputerIcon from "@mui/icons-material/Computer";
import RouterIcon from "@mui/icons-material/Router";
import CameraOutdoorIcon from "@mui/icons-material/CameraOutdoor";
import ChairIcon from "@mui/icons-material/Chair";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import NoteIcon from "@mui/icons-material/Note";
import { colors } from "../../styles";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AddSKUModal from "../../Components/AddSKUModal/AddSKUModal";
import Popup from "reactjs-popup";
export default function Dashboard() {
  const navigate = useNavigate();

  const queries = useQueries({
    queries: [
      {
        queryKey: ["equipments"],
        queryFn: EquipmentsAPI,
      },
      {
        queryKey: ["equipment_instances"],
        queryFn: EquipmentInstancesAPI,
      },
    ],
  });
  const isLoading = queries.some((result) => result.isLoading);

  const [addSKUmodalOpen, SetAddSKUModalOpen] = useState(false);
  const [additemmodalOpen, SetAddItemModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div style={styles.background}>
        <Header label={"Dashboard"} />
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
      </div>
    );
  }
  return (
    <div style={styles.background}>
      <Header label={"Dashboard"} />
      <div style={styles.flex_column}>
        <div
          style={{
            ...styles.flex_row,
            ...{
              alignSelf: "center",
              justifyContent: "center",
              flexWrap: "wrap",
            },
          }}
        >
          <div
            style={{
              paddingLeft: "16px",
              paddingRight: "16px",
              margin: "16px",
              borderRadius: 16,
              backgroundColor: "#a6a6a6",
              alignSelf: "center",
              justifyContent: "center",
              width: "32rem",
            }}
          >
            <p
              style={{
                ...styles.text_dark,
                ...styles.text_M,
                ...{ float: "left", position: "absolute" },
              }}
            >
              SKUs in Database
            </p>

            <p
              style={{
                ...styles.text_dark,
                ...styles.text_L,
              }}
            >
              {queries[0].data ? queries[0].data.length : 0}
            </p>
          </div>
          <div
            style={{
              paddingLeft: "16px",
              paddingRight: "16px",
              margin: "16px",
              borderRadius: 16,
              backgroundColor: "#a6a6a6",
              alignSelf: "center",
              justifyContent: "center",
              width: "32rem",
            }}
          >
            <p
              style={{
                ...styles.text_dark,
                ...styles.text_M,
                ...{ float: "left", position: "absolute" },
              }}
            >
              Item Count
            </p>

            <p
              style={{
                ...styles.text_dark,
                ...styles.text_L,
              }}
            >
              {queries[1].data ? queries[1].data.length : 0}
            </p>
          </div>
        </div>
        <div
          style={{
            ...styles.flex_row,
            ...{
              alignSelf: "center",
              justifyContent: "center",
              flexWrap: "wrap",
            },
          }}
        >
          <div
            style={{
              paddingLeft: "16px",
              paddingRight: "16px",
              margin: "16px",
              borderRadius: 16,
              backgroundColor: "#a6a6a6",
              alignSelf: "center",
              justifyContent: "center",
              width: "32rem",
            }}
          >
            <p
              style={{
                ...styles.text_dark,
                ...styles.text_M,
                ...{ float: "left", position: "absolute" },
              }}
            >
              Functional Item
            </p>

            <p
              style={{
                ...styles.text_dark,
                ...styles.text_L,
              }}
            >
              {queries[1].data
                ? queries[1].data.filter(
                    (equipment) => equipment.status == "Working"
                  ).length
                : 0}
            </p>
          </div>
          <div
            style={{
              paddingLeft: "16px",
              paddingRight: "16px",
              margin: "16px",
              borderRadius: 16,
              backgroundColor: "#a6a6a6",
              alignSelf: "center",
              justifyContent: "center",
              width: "32rem",
            }}
          >
            <p
              style={{
                ...styles.text_dark,
                ...styles.text_M,
                ...{ float: "left", position: "absolute" },
              }}
            >
              Broken Items
            </p>

            <p
              style={{
                ...styles.text_dark,
                ...styles.text_L,
              }}
            >
              {queries[1].data
                ? queries[1].data.filter(
                    (equipment) => equipment.status == "Broken"
                  ).length
                : 0}
            </p>
          </div>
        </div>
      </div>
      <p
        style={{
          ...styles.text_dark,
          ...styles.text_L,
        }}
      >
        Equipments
      </p>
      <div
        style={{
          ...styles.flex_row,
          ...{
            alignSelf: "center",
            justifyContent: "center",
            flexWrap: "wrap",
          },
        }}
      >
        <Button
          style={{
            ...styles.flex_column,
            ...{
              alignSelf: "center",
              justifyContent: "center",
              flexWrap: "wrap",
            },
          }}
          onClick={() => {
            navigate("/view/equipment_instances");
          }}
        >
          <FormatListBulletedIcon
            style={{
              height: 64,
              width: 64,
              fill: colors.font_dark,
              marginLeft: "1rem",
              marginRight: "1rem",
            }}
          />
          <p
            style={{
              ...styles.text_dark,
              ...styles.text_M,
            }}
          >
            View All
          </p>
        </Button>
        <Button
          style={{
            ...styles.flex_column,
            ...{
              alignSelf: "center",
              justifyContent: "center",
              flexWrap: "wrap",
            },
          }}
          onClick={() => {
            navigate("/add/equipment_instance");
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
          <p
            style={{
              ...styles.text_dark,
              ...styles.text_M,
            }}
          >
            Add Item
          </p>
        </Button>
        <Button
          style={{
            ...styles.flex_column,
            ...{
              alignSelf: "center",
              justifyContent: "center",
              flexWrap: "wrap",
            },
          }}
          onClick={() => {
            SetAddSKUModalOpen(true);
          }}
        >
          <NoteAddIcon
            style={{
              height: 64,
              width: 64,
              fill: colors.font_dark,
              marginLeft: "1rem",
              marginRight: "1rem",
            }}
          />
          <p
            style={{
              ...styles.text_dark,
              ...styles.text_M,
            }}
          >
            Add SKU
          </p>
        </Button>
        <Button
          style={{
            ...styles.flex_column,
            ...{
              alignSelf: "center",
              justifyContent: "center",
              flexWrap: "wrap",
            },
          }}
          onClick={() => {
            navigate("/view/equipments");
          }}
        >
          <NoteIcon
            style={{
              height: 64,
              width: 64,
              fill: colors.font_dark,
              marginLeft: "1rem",
              marginRight: "1rem",
            }}
          />
          <p
            style={{
              ...styles.text_dark,
              ...styles.text_M,
            }}
          >
            View SKUs
          </p>
        </Button>
      </div>

      <div
        style={{
          ...styles.flex_row,
          ...{
            alignSelf: "center",
            justifyContent: "center",
            flexWrap: "wrap",
          },
        }}
      >
        <Button
          style={{
            ...styles.flex_column,
            ...{
              alignSelf: "center",
              justifyContent: "center",
              flexWrap: "wrap",
            },
          }}
        >
          <ComputerIcon
            style={{
              height: 64,
              width: 64,
              fill: colors.font_dark,
              marginLeft: "1rem",
              marginRight: "1rem",
            }}
          />
          <p
            style={{
              ...styles.text_dark,
              ...styles.text_M,
            }}
          >
            Workstations
          </p>
        </Button>
        <Button
          style={{
            ...styles.flex_column,
            ...{
              alignSelf: "center",
              justifyContent: "center",
              flexWrap: "wrap",
            },
          }}
        >
          <RouterIcon
            style={{
              height: 64,
              width: 64,
              fill: colors.font_dark,
              marginLeft: "1rem",
              marginRight: "1rem",
            }}
          />
          <p
            style={{
              ...styles.text_dark,
              ...styles.text_M,
            }}
          >
            Networking
          </p>
        </Button>

        <Button
          style={{
            ...styles.flex_column,
            ...{
              alignSelf: "center",
              justifyContent: "center",
              flexWrap: "wrap",
            },
          }}
        >
          <CameraOutdoorIcon
            style={{
              height: 64,
              width: 64,
              fill: colors.font_dark,
              marginLeft: "1rem",
              marginRight: "1rem",
            }}
          />
          <p
            style={{
              ...styles.text_dark,
              ...styles.text_M,
            }}
          >
            CCTVs
          </p>
        </Button>
        <Button
          style={{
            ...styles.flex_column,
            ...{
              alignSelf: "center",
              justifyContent: "center",
              flexWrap: "wrap",
            },
          }}
        >
          <ChairIcon
            style={{
              height: 64,
              width: 64,
              fill: colors.font_dark,
              marginLeft: "1rem",
              marginRight: "1rem",
            }}
          />
          <p
            style={{
              ...styles.text_dark,
              ...styles.text_M,
            }}
          >
            Furniture
          </p>
        </Button>
      </div>
      <Popup
        open={addSKUmodalOpen}
        onClose={() => SetAddSKUModalOpen(false)}
        modal
        position={"top center"}
        contentStyle={{
          width: "512px",
          borderRadius: 16,
          borderColor: "grey",
          borderStyle: "solid",
          borderWidth: 1,
          padding: 16,
          alignContent: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <AddSKUModal />
      </Popup>
    </div>
  );
}
