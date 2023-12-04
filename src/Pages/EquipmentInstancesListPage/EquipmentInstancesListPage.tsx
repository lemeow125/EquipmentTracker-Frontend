import { useQuery } from "@tanstack/react-query";
import Header from "../../Components/Header/Header";
import styles from "../../styles";
import { EquipmentInstancesAPI } from "../../Components/API/API";
import { CircularProgress } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { colors } from "../../styles";
import EditItemModal from "../../Components/EditItemInstanceModal/EditItemInstanceModal";
import { useState } from "react";
import Popup from "reactjs-popup";

export default function EquipmentInstancesListPage() {
  const [editmodalOpen, SetEditModalOpen] = useState(false);
  const [selectedItem, SetSelectedItem] = useState(0);
  const equipment_instances = useQuery({
    queryKey: ["equipment_instances"],
    queryFn: EquipmentInstancesAPI,
  });
  if (equipment_instances.isLoading) {
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
      <Header label={"Items List"} />
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
                  <TableCell style={styles.text_light}>ID</TableCell>
                  <TableCell align="center" style={styles.text_light}>
                    Name
                  </TableCell>
                  <TableCell align="center" style={styles.text_light}>
                    Status
                  </TableCell>
                  <TableCell align="center" style={styles.text_light}>
                    Category
                  </TableCell>
                  <TableCell align="center" style={styles.text_light}>
                    Last Modified
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {equipment_instances.data ? (
                  equipment_instances.data.map((equipment) => (
                    <TableRow
                      key={equipment.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      onClick={() => {
                        SetSelectedItem(equipment.id);
                        SetEditModalOpen(true);
                      }}
                    >
                      <TableCell align="center" component="th" scope="row">
                        {equipment.id}
                      </TableCell>
                      <TableCell align="center" component="th" scope="row">
                        {equipment.equipment_name}
                      </TableCell>

                      <TableCell align="center" component="th" scope="row">
                        {equipment.status}
                      </TableCell>
                      <TableCell align="center" component="th" scope="row">
                        {equipment.category}
                      </TableCell>
                      <TableCell align="right">
                        <div
                          style={{
                            ...styles.flex_column,
                            ...{ alignItems: "center" },
                          }}
                        >
                          <div>{equipment.last_updated}</div>
                          <div>
                            {equipment.last_updated_by
                              ? "by " + equipment.last_updated_by
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
      <Popup
        open={editmodalOpen}
        onClose={() => SetEditModalOpen(false)}
        modal
        position={"top center"}
        contentStyle={styles.popup_center}
      >
        <EditItemModal id={selectedItem} setOpen={SetEditModalOpen} />
      </Popup>
    </div>
  );
}
