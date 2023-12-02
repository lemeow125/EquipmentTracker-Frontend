import Header from "../../Components/Header/Header";
import styles from "../../styles";
import { useQueries } from "@tanstack/react-query";
import { EquipmentsAPI, EquipmentInstancesAPI } from "../../Components/API/API";
import { CircularProgress } from "@mui/material";

export default function Dashboard() {
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
        <div style={{ ...styles.flex_row, ...{ alignSelf: "center", justifyContent:'center',flexWrap:'wrap' } }}>
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
             Equipment Types in Database
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
              Equipment Count
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
        <div style={{ ...styles.flex_row, ...{ alignSelf: "center",justifyContent:'center', flexWrap:'wrap' } }}>
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
              Working Items
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
    </div>
  );
}
