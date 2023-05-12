import styled from "styled-components";
import Filters from "../components/Filters";
import ProductsList from "../components/ProductsList/ProductList";
import { useState } from "react";
import { Stack, Pagination } from "@mui/material";

const SearchResultsWrapper = styled.div`
  display: flex;
  column-gap: 32px;
`;

const dummyData = [
  {
    Id: 0,
    Name: "Ноутбук ASUS TUF Gaming A15 FA506ICB-HN119 (90NR0667-M00KT0) Graphite Black / AMD Ryzen 5 4600H / RAM 16 ГБ / SSD 512 ГБ / nVidia GeForce RTX 3050",
    RawIconURL:
      "https://content1.rozetka.com.ua/goods/images/big/302686477.jpg",
    VendorIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/ROZETKA-Logo-L3-B-RGB.png/1200px-ROZETKA-Logo-L3-B-RGB.png",
    RawPrice: 35999,
    OldPrice: 39999,
    IsOnSale: true,
    Specifications: [
      {
        Key: 'Серия',
        Value: 'TUF Gaming'
      },
      {
        Key: 'Диагональ экрана',
        Value: '"15.6" (1920x1080) Full HD'
      },
      {
        Key: 'Тип экрана',
        Value: 'IPS'
      },
    ]
  },
  {
    Id: 1,
    Name: "Ноутбук ASUS TUF Gaming A15 FA506ICB-HN119 (90NR0667-M00KT0) Graphite Black / AMD Ryzen 5 4600H / RAM 16 ГБ / SSD 512 ГБ / nVidia GeForce RTX 3050",
    RawIconURL:
      "https://content1.rozetka.com.ua/goods/images/big/302686477.jpg",
    RawPrice: 35999,
    OldPrice: 0,
    IsOnSale: false,
  },
  {
    Id: 2,
    Name: "Ноутбук ASUS TUF Gaming A15 FA506ICB-HN119 (90NR0667-M00KT0) Graphite Black / AMD Ryzen 5 4600H / RAM 16 ГБ / SSD 512 ГБ / nVidia GeForce RTX 3050",
    RawIconURL:
      "https://content1.rozetka.com.ua/goods/images/big/302686477.jpg",
    RawPrice: 35999,
    OldPrice: 0,
    IsOnSale: false,
  },
  {
    Id: 3,
    Name: "Ноутбук ASUS TUF Gaming A15 FA506ICB-HN119 (90NR0667-M00KT0) Graphite Black / AMD Ryzen 5 4600H / RAM 16 ГБ / SSD 512 ГБ / nVidia GeForce RTX 3050",
    RawIconURL:
      "https://content1.rozetka.com.ua/goods/images/big/302686477.jpg",
    RawPrice: 35999,
    OldPrice: 0,
    IsOnSale: false,
  },
  {
    Id: 4,
    Name: "Ноутбук ASUS TUF Gaming A15 FA506ICB-HN119 (90NR0667-M00KT0) Graphite Black / AMD Ryzen 5 4600H / RAM 16 ГБ / SSD 512 ГБ / nVidia GeForce RTX 3050",
    RawIconURL:
      "https://content1.rozetka.com.ua/goods/images/big/302686477.jpg",
    RawPrice: 35999,
    OldPrice: 0,
    IsOnSale: false,
  },
  {
    Id: 5,
    Name: "Ноутбук ASUS TUF Gaming A15 FA506ICB-HN119 (90NR0667-M00KT0) Graphite Black / AMD Ryzen 5 4600H / RAM 16 ГБ / SSD 512 ГБ / nVidia GeForce RTX 3050",
    RawIconURL:
      "https://content1.rozetka.com.ua/goods/images/big/302686477.jpg",
    RawPrice: 35999,
    OldPrice: 0,
    IsOnSale: false,
  },
  {
    Id: 6,
    Name: "Ноутбук ASUS TUF Gaming A15 FA506ICB-HN119 (90NR0667-M00KT0) Graphite Black / AMD Ryzen 5 4600H / RAM 16 ГБ / SSD 512 ГБ / nVidia GeForce RTX 3050",
    RawIconURL:
      "https://content1.rozetka.com.ua/goods/images/big/302686477.jpg",
    RawPrice: 35999,
    OldPrice: 0,
    IsOnSale: false,
  },
  {
    Id: 7,
    Name: "Ноутбук ASUS TUF Gaming A15 FA506ICB-HN119 (90NR0667-M00KT0) Graphite Black / AMD Ryzen 5 4600H / RAM 16 ГБ / SSD 512 ГБ / nVidia GeForce RTX 3050",
    RawIconURL:
      "https://content1.rozetka.com.ua/goods/images/big/302686477.jpg",
    RawPrice: 35999,
    OldPrice: 0,
    IsOnSale: false,
  },
  {
    Id: 8,
    Name: "Ноутбук ASUS TUF Gaming A15 FA506ICB-HN119 (90NR0667-M00KT0) Graphite Black / AMD Ryzen 5 4600H / RAM 16 ГБ / SSD 512 ГБ / nVidia GeForce RTX 3050",
    RawIconURL:
      "https://content1.rozetka.com.ua/goods/images/big/302686477.jpg",
    RawPrice: 35999,
    OldPrice: 0,
    IsOnSale: false,
  },
  {
    Id: 9,
    Name: "Ноутбук ASUS TUF Gaming A15 FA506ICB-HN119 (90NR0667-M00KT0) Graphite Black / AMD Ryzen 5 4600H / RAM 16 ГБ / SSD 512 ГБ / nVidia GeForce RTX 3050",
    RawIconURL:
      "https://content1.rozetka.com.ua/goods/images/big/302686477.jpg",
    RawPrice: 35999,
    OldPrice: 0,
    IsOnSale: false,
  },
];

const PER_PAGE = 8;

const SearchResults = () => {

  const [page, setPage] = useState(1);

  return (
    <SearchResultsWrapper>
      <Filters />
      <Stack spacing={3} sx={{width: '100%'}}>
      <ProductsList itemsPerRow={4} rows={2} data={dummyData} page={page}/>
        <Pagination
            count={Math.ceil(dummyData.length / PER_PAGE)}
            page={page}
            onChange={(e, value) => setPage(value)}
            sx={{
              "& .MuiPagination-ul": {
                justifyContent: "center"
              },
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
    </SearchResultsWrapper>
  );
};

export default SearchResults;
