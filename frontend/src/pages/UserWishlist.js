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

const dummyData = [
  {
    Id: 0,
    Name: "Ноутбук ASUS TUF Gaming A15 FA506ICB-HN119 (90NR0667-M00KT0) Graphite Black / AMD Ryzen 5 4600H / RAM 16 ГБ / SSD 512 ГБ / nVidia GeForce RTX 3050",
    RawIconURL: "https://content1.rozetka.com.ua/goods/images/big/302686477.jpg",
    RawPrice: 35999,
    OldPrice: 39999,
    IsOnSale: true
  },
  {
    Id: 1,
    Name: "Ноутбук ASUS TUF Gaming A15 FA506ICB-HN119 (90NR0667-M00KT0) Graphite Black / AMD Ryzen 5 4600H / RAM 16 ГБ / SSD 512 ГБ / nVidia GeForce RTX 3050",
    RawIconURL: "https://content1.rozetka.com.ua/goods/images/big/302686477.jpg",
    RawPrice: 35999,
    OldPrice: 0,
    IsOnSale: false
  },
  {
    Id: 2,
    Name: "Ноутбук ASUS TUF Gaming A15 FA506ICB-HN119 (90NR0667-M00KT0) Graphite Black / AMD Ryzen 5 4600H / RAM 16 ГБ / SSD 512 ГБ / nVidia GeForce RTX 3050",
    RawIconURL: "https://content1.rozetka.com.ua/goods/images/big/302686477.jpg",
    RawPrice: 35999,
    OldPrice: 0,
    IsOnSale: false
  },
  {
    Id: 3,
    Name: "Ноутбук ASUS TUF Gaming A15 FA506ICB-HN119 (90NR0667-M00KT0) Graphite Black / AMD Ryzen 5 4600H / RAM 16 ГБ / SSD 512 ГБ / nVidia GeForce RTX 3050",
    RawIconURL: "https://content1.rozetka.com.ua/goods/images/big/302686477.jpg",
    RawPrice: 35999,
    OldPrice: 0,
    IsOnSale: false
  },
  {
    Id: 4,
    Name: "Ноутбук ASUS TUF Gaming A15 FA506ICB-HN119 (90NR0667-M00KT0) Graphite Black / AMD Ryzen 5 4600H / RAM 16 ГБ / SSD 512 ГБ / nVidia GeForce RTX 3050",
    RawIconURL: "https://content1.rozetka.com.ua/goods/images/big/302686477.jpg",
    RawPrice: 35999,
    OldPrice: 0,
    IsOnSale: false
  },
];

const PER_ROW = 4;
const ROWS = 2;

const fetchUserFavourites = async id => {
  const response = await fetch(`https://pricely.tech/api/Favourites?userId=${id}`);
  return await response.json();
}

const UserWishlist = (props) => {
  const [favourites, setFavourites] = useState([]);
  const [page, setPage] = useState(1);
  const [loading , setLoading] = useState(true);
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      fetchUserFavourites(user.id).then(data => {
        setFavourites(data);
        setLoading(false);
      })
    }
  }, [])

  return (
    <>
      <Box display="flex" justifyContent="space-between" sx={{
        marginBottom: "2rem"
      }}>
        <Typography variant="h4" fontWeight="700">
          Список бажань
        </Typography>
        <Button variant="outlined" color="secondary" onClick={() => setFavourites([])}>
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
