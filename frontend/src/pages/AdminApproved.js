import Modal from "../components/Modal/Modal";
import ModalProductDetails from "../components/Modal/ModalProductDetails";
import dummyAdminData from "../utils/dummyAdminData";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CircularProgress } from "@mui/material";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";

const fetchApprovedItems = async () => {
  const response = await fetch("https://pricely.tech/api/Item?offset=0&limit=1000");
  return await response.json();
};

const AdminApproved = () => {
  const [rows, setRows] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleItemChange = (index) => {
    const rowsCopy = [...rows];
    rowsCopy.splice(index, 1);

    setActiveItem(null);
    setRows(rowsCopy);
  };

  useEffect(() => {
    fetchApprovedItems()
      .then(data => {
        setRows(data.result);
        setLoading(false);
      });
  }, [])

  return (
    <div>
      <Modal onModalClose={() => setActiveItem(null)} open={activeItem != null}>
        <ModalProductDetails
          product={rows[activeItem]?.rawItem}
          onItemChange={() => handleItemChange(activeItem)}
        />
      </Modal>
      {loading ? 
        <CircularProgress color="secondary" size={80}/> : 
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Item name</TableCell>
              <TableCell align="right">Магазин</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.rawItem.name}
                </TableCell>
                <TableCell align="right">
                  <img src={row.rawItem.vendorIcon} style={{ height: "1.5em" }} />
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ color: "#FFF" }}
                    onClick={() => setActiveItem(index)}
                  >
                    Деталі
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>}
    </div>
  );
};

export default AdminApproved;
