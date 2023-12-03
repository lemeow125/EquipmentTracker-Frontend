import { useQuery } from "@tanstack/react-query";
import Header from "../../Components/Header/Header";
import styles from "../../styles";
import { EquipmentLogsAPI } from "../../Components/API/API";
import { CircularProgress } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { colors } from "../../styles";

export default function EquipmentLogsPage() {
  const equipment_logs = useQuery({
    queryKey: ["equipment_logs"],
    queryFn: EquipmentLogsAPI,
  });
  if (equipment_logs.isLoading) {
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
      <Header label={"SKU History"} />
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
                    SKU ID
                  </TableCell>
                  <TableCell align="center" style={styles.text_light}>
                    Name
                  </TableCell>
                  <TableCell align="center" style={styles.text_light}>
                    Description
                  </TableCell>
                  <TableCell align="center" style={styles.text_light}>
                    Category
                  </TableCell>
                  <TableCell align="center" style={styles.text_light}>
                    Date Modified
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {equipment_logs.data ? (
                  equipment_logs.data.map((equipment_log) => (
                    <TableRow
                      key={equipment_log.history_id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center" component="th" scope="row">
                        {equipment_log.history_id}
                      </TableCell>
                      <TableCell align="center" component="th" scope="row">
                        {equipment_log.id}
                      </TableCell>
                      <TableCell align="center" component="th" scope="row">
                        {equipment_log.name}
                      </TableCell>

                      <TableCell align="center" component="th" scope="row">
                        {equipment_log.description}
                      </TableCell>
                      <TableCell align="center" component="th" scope="row">
                        {equipment_log.category}
                      </TableCell>
                      <TableCell align="right">
                        <div
                          style={{
                            ...styles.flex_column,
                            ...{ alignItems: "center" },
                          }}
                        >
                          <div>{equipment_log.history_date}</div>
                          <div>
                            {equipment_log.history_user
                              ? "by " + equipment_log.history_user
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
