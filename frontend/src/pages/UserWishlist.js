import {
  Box,
  Button,
  Pagination,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import ProductsList from "../components/ProductsList/ProductList";
import { useEffect, useState } from "react";
import { useAuthContext } from "../auth/auth";
import { FacebookRounded } from "@mui/icons-material";
import { useSearchParams } from "react-router-dom";

const PER_ROW = 4;
const ROWS = 2;

const fetchUserFavourites = async (id, offset) => {
  const response = await fetch(`https://pricely.tech/api/Favourites/getPaginated?userId=${id}&offset=${offset ?? 0}&limit=${PER_ROW * ROWS}`);
  
  if (!response.ok) {
    throw new Error();
  }

  return await response.json();
}

const deleteAllFavourites = async (jwt) => {
  const response = await fetch(
    `https://pricely.tech/api/Favourites/deleteAll`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jwt),
    }
  );

  return response;
};

const UserWishlist = (props) => {
  const [favourites, setFavourites] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (user) {
      setLoading(true);
      fetchUserFavourites(
        user.id,
        searchParams.get('offset')
      ).then((data) => {
        const actualData = data.result.map((elem) => {
          return elem.item;
        });
        setFavourites({data: actualData, total: data.total});
        setLoading(false);
      });
    }
  }, [searchParams]);

  const handleFavouritesDelete = () => {
    deleteAllFavourites(user?.jwt);
    setFavourites([]);
  };

  const handlePageChange = page => {
    setSearchParams({
      offset: (page - 1) * PER_ROW * ROWS
    })
  }

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{
          marginBottom: "2rem",
        }}
      >
        <Typography variant="h4" fontWeight="700">
          Список бажань
        </Typography>
        <Box display="flex" alignItems="center" columnGap={3}>
          <Button
            href={
              `https://www.facebook.com/sharer/sharer.php?u=https://pricely.tech/sharedWishlist/${user.id}?` +
              new URLSearchParams({
                offset: 0,
              })
            }
            target="_blank"
            variant="contained"
            color="secondary"
            sx={{ color: "#FFF" }}
          >
            Поділитись списком
            <FacebookRounded sx={{ marginInlineStart: "0.4em" }} />
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleFavouritesDelete}
          >
            Видалити всі
          </Button>
        </Box>
      </Box>
      {favourites.data?.length > 0 && !loading ? (
        <>
          <ProductsList
            data={favourites.data}
            itemsPerRow={PER_ROW}
          />
          <Stack alignItems="center" mt={2}>
            <Pagination
              count={Math.ceil(favourites.total / (ROWS * PER_ROW))}
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
                },
              }}
            />
          </Stack>
        </>
      ) : loading ? (
        <CircularProgress color="secondary" size={80} />
      ) : (
        <Typography variant="h4">
          На даний момент ваш список бажань пустий
        </Typography>
      )}
    </>
  );
};

export default UserWishlist;
