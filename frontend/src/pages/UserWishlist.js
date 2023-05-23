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
import { FacebookRounded } from "@mui/icons-material";

const PER_ROW = 4;
const ROWS = 2;

const fetchUserFavourites = async (id, offset, limit) => {
  const response = await fetch(`https://pricely.tech/api/Favourites/getPaginated?userId=${id}&offset=${offset}&limit=${limit}`);
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
      setLoading(true);
      fetchUserFavourites(user.id, (page - 1) * PER_ROW * ROWS, PER_ROW * ROWS).then(data => {
        const actualData = data.result.map(elem => {
          return elem.item;
        })
        setFavourites(actualData);
        setLoading(false);
      })
    }
  }, [page])

  const handleFavouritesDelete = () => {
    deleteAllFavourites(user?.jwt);
    setFavourites([]);
  }

  return (
    <>
      <Box display="flex" justifyContent="space-between" sx={{
        marginBottom: "2rem"
      }}>
        <Typography variant="h4" fontWeight="700">
          Список бажань
        </Typography>
        <Box display="flex" alignItems="center" columnGap={3}>
          <Button 
            href={`https://www.facebook.com/sharer/sharer.php?u=https://pricely.tech/sharedWishlist/${user.id}?` + new URLSearchParams({
              offset: 0
            })}
            target="_blank"
            variant="contained"
            color="secondary"
            sx={{ color: "#FFF" }}>
            Поділитись списком
            <FacebookRounded sx={{ marginInlineStart: "0.4em" }} />
          </Button>
        <Button variant="outlined" color="secondary" onClick={handleFavouritesDelete}>
          Видалити всі
        </Button>
        </Box>
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
