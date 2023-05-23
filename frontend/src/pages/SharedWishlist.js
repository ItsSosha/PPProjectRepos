import { Box, Pagination, Stack, Typography, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import ProductsList from "../components/ProductsList/ProductList";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const PER_ROW = 4;
const ROWS = 2;

const fetchFavourites = async (id, offset) => {
  const response = await fetch(`https://pricely.tech/api/Favourites/getPaginated?userId=${id}&offset=${offset ?? 0}&limit=${PER_ROW * ROWS}`);
  
  if (!response.ok) {
    throw new Error();
  }

  return await response.json();
}

const SharedWishlist = (props) => {
  const [favourites, setFavourites] = useState([]);
  const [username, setUsername] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    fetchFavourites(id, searchParams.get('offset'))
      .then(data => {
        if (data.total == 0) {
          throw new Error();
        }
        const actualData = data.result.map(elem => {
          return elem.item;
        })
        setFavourites({data: actualData, total: data.total});
        setUsername(data.result[0].user.firstName + " " + data.result[0].user.surname);
        setLoading(false);
      })
      .catch(error => {
        console.error('Can\'t find shared wishlist of user with such id.');
        navigate('/*');
      })
  }, [searchParams])

  const handlePageChange = page => {
    setSearchParams({
      offset: (page - 1) * PER_ROW * ROWS,
    })
  }

  return (
    <>
    {loading ? (
      <CircularProgress color="secondary" size={80} />
    ) : (
      <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="100%"
    >
      <Typography variant="h4" fontWeight="700" mb={4}>
        Список бажань користувача {username}
      </Typography>
      <Box>
        <ProductsList
          data={favourites.data}
          itemsPerRow={PER_ROW}
        />
      </Box>
      <Stack alignItems="center" mt={2}>
        <Pagination
          count={Math.ceil(favourites.total / (PER_ROW * ROWS))}
          page={searchParams.get("offset") / (ROWS * PER_ROW) + 1}
          onChange={(e, value) => handlePageChange(value)}
          sx={{
            justifyContent: "center",
            "& .MuiPaginationItem-root": {
              fontWeight: "700",
              fontSize: "1rem",
            },
            "& .Mui-selected": {
              textDecoration: "underline",
              backgroundColor: "transparent",
            }
          }}
        />
      </Stack>
    </Box>
    )}
    </>
  )
};

export default SharedWishlist;
