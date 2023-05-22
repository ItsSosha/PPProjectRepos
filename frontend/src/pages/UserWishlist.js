import {
  Box,
  Button,
  Pagination,
  Stack,
  Typography,
  CircularProgress
} from "@mui/material";
import ProductsList from "../components/ProductsList/ProductList";
import { useEffect, useState } from "react";
import { useAuthContext } from "../auth/auth";

const PER_ROW = 4;
const ROWS = 2;

const fetchUserFavourites = async id => {
  const response = await fetch(`https://pricely.tech/api/Favourites?userId=${id}`);
  return await response.json();
}

const deleteAllFavourites = async (jwt) => {
  const response = await fetch(`https://pricely.tech/api/Favourites/deleteAll`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jwt)
  })

  return response;
}

const UserWishlist = (props) => {
  const [favourites, setFavourites] = useState([]);
  const [page, setPage] = useState(1);
  const [loading , setLoading] = useState(true);
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      fetchUserFavourites(user.id).then(data => {
        const actualData = data.map(elem => {
          return elem.item;
        })
        setFavourites(actualData);
        setLoading(false);
      })
    }
  }, [])

  const handleFavouritesDelete = () => {
    deleteAllFavourites(user?.jwt);
    setFavourites([]);
  }

  console.log(favourites);
  return (
    <>
      <Box display="flex" justifyContent="space-between" sx={{
        marginBottom: "2rem"
      }}>
        <Typography variant="h4" fontWeight="700">
          Список бажань
        </Typography>
        <Button variant="outlined" color="secondary" onClick={handleFavouritesDelete}>
          Видалити всі
        </Button>
      </Box>
      {(favourites.length > 0) ?
        <>
        <ProductsList
          data={favourites}
          itemsPerRow={PER_ROW}
          rows={ROWS}
          page={page}
        />
        <Stack alignItems="center" mt={2}>
        <Pagination
            count={Math.ceil(favourites.length / (PER_ROW * ROWS))}
            page={page}
            onChange={(e, value) => setPage(value)}
            sx={{
              justifyContent: "center",
              "& .MuiPaginationItem-root": {
                fontWeight: "700",
                fontSize: "1rem",
              },
              "& .Mui-selected" : {
                textDecoration: "underline",
                backgroundColor: "transparent",
              }
            }}
          />
        </Stack>
        </> :
        loading ?
        <CircularProgress color="secondary" size={80}/> :
        <Typography variant="h4">
          На даний момент ваш список бажань пустий
        </Typography>}
    </>
  )
};


export default UserWishlist;
