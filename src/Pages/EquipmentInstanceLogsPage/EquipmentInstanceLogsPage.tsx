import { useQuery } from "@tanstack/react-query";
import Header from "../../Components/Header/Header";
import styles from "../../styles";
import { EquipmentInstanceLogsAPI } from "../../Components/API/API";
import { CircularProgress } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { colors } from "../../styles";

export default function EquipmentInstanceLogsPage() {
  const equipment_instance_logs = useQuery({
    queryKey: ["equipment_instance_logs"],
    queryFn: EquipmentInstanceLogsAPI,
  });
  if (equipment_instance_logs.isLoading) {
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
      <Header label={"Item History"} />
      <div
        style={{
          ...styles.flex_column,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
          minHeight: "100%",
          minWidth: "100%",
          flexWrap: "wrap",
        }}
      >
        <div style={{ width: "90%", overflowY: "scroll", marginTop: "2rem" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: "32rem" }} size="medium">
              <TableHead>
                <TableRow style={{ backgroundColor: colors.header_color }}>
                  <TableCell align="center" style={styles.text_light}>
                    Transaction ID
                  </TableCell>
                  <TableCell align="center" style={styles.text_light}>
                    Item ID
                  </TableCell>
                  <TableCell align="center" style={styles.text_light}>
                    SKU
                  </TableCell>
                  <TableCell align="center" style={styles.text_light}>
                    Remarks
                  </TableCell>
                  <TableCell align="center" style={styles.text_light}>
                    Status
                  </TableCell>
                  <TableCell align="center" style={styles.text_light}>
                    Date Modified
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {equipment_instance_logs.data ? (
                  equipment_instance_logs.data.map((equipment_instance_log) => (
                    <TableRow
                      key={equipment_instance_log.history_id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="center" component="th" scope="row">
                        {equipment_instance_log.history_id}
                      </TableCell>
                      <TableCell align="center" component="th" scope="row">
                        {equipment_instance_log.id}
                      </TableCell>
                      <TableCell align="center" component="th" scope="row">
                        {`SKU #${equipment_instance_log.equipment} - ${equipment_instance_log.equipment_name}`}
                      </TableCell>

                      <TableCell align="center" component="th" scope="row">
                        {equipment_instance_log.remarks}
                      </TableCell>
                      <TableCell align="center" component="th" scope="row">
                        {equipment_instance_log.status}
                      </TableCell>
                      <TableCell align="right">
                        <div
                          style={{
                            ...styles.flex_column,
                            ...{ alignItems: "center" },
                          }}
                        >
                          <div>{equipment_instance_log.history_date}</div>
                          <div>
                            {equipment_instance_log.history_user
                              ? "by " + equipment_instance_log.history_user
                              : ""}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <></>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
