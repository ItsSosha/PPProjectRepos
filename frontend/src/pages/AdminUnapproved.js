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
import { useAuthContext } from "../auth/auth";

const fetchUnapprovedItems = async (jwt) => {
    const data = await fetch(`https://pricely.tech/api/Item/getAllNotApproved?jwt=${jwt}&offset=0&limit=1000`);
    return await data.json();
}

const approveItem = async (jwt, id) => {
  const response = await fetch(`https://pricely.tech/api/Item/addToItems?rawItemId=${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jwt)
  });
  
  if (!response.ok) {
    throw new Error();
  }

  return await fetchUnapprovedItems(jwt);
}

const AdminUnapproved = () => {
  const [rows, setRows] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();

  const handleItemChange = (item) => {
    approveItem(user?.jwt, item.id).then(data => setRows(data.result));
    setActiveItem(null);
  };

  useEffect(() => {
    fetchUnapprovedItems(user?.jwt)
      .then(data => {
        setRows(data.result);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Modal onModalClose={() => setActiveItem(null)} open={activeItem != null}>
        <ModalProductDetails
          product={activeItem}
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
            {rows.map(row => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">
                  <img src={row.vendorIcon} style={{ height: "1.5em" }} />
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ color: "#FFF" }}
                    onClick={() => setActiveItem(row)}
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

export default AdminUnapproved;
