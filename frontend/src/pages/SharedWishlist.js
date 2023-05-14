import { Box, Pagination, Stack, Typography } from "@mui/material";
import { useState } from "react";
import ProductsList from "../components/ProductsList/ProductList";

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

const SharedWishlist = (props) => {
  const [favourites, setFavourites] = useState(dummyData);
  const [page, setPage] = useState(1);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="100%"
    >
      <Typography variant="h4" fontWeight="700" mb={4}>
        Список бажань користувача Username
      </Typography>
      <Box>
        <ProductsList
          data={favourites}
          itemsPerRow={PER_ROW}
          rows={ROWS}
          page={page}
        />
      </Box>
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
            "& .Mui-selected": {
              textDecoration: "underline",
              backgroundColor: "transparent",
            }
          }}
        />
      </Stack>
    </Box>
  )
};

export default SharedWishlist;
