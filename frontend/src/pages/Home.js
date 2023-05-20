import { Typography } from "@mui/material";
import ProductList from "../components/ProductsList/ProductList";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

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

const fetchSaleItems = async () => {
  const response = await fetch("https://pricely.tech/api/Item/getSaleItems");
  return await response.json();
}

const fetchNewItems = async () => {
  const response = await fetch("https://pricely.tech/api/Item/getNewItems");
  return await response.json();
}

const Home = () => {

  const [saleItems, setSaleItems] = useState(null);
  const [newItems, setNewItems] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saleItems = fetchSaleItems();
    const newItems = fetchNewItems();
    Promise.all([saleItems, newItems]).then(values => {
      setSaleItems(values[0]);
      setNewItems(values[1]);
      setLoading(false);
    })
  }, [])

  return (
    <>
      {loading ? <CircularProgress color="secondary" size={80}/> : <View saleItems={saleItems} newItems={newItems}/>}
    </>
  )
}

const View = ({saleItems, newItems}) => {
  return (
    <>
      <Typography
      component="h4"
      variant="h4"
      textAlign="center"
      sx={{
        margin: "32px 0 48px"
      }}>
      Акційні товари
      </Typography>
      <ProductList itemsPerRow={5} data={saleItems}/>
      <Typography
      component="h4"
      variant="h4"
      textAlign="center"
      sx={{
        margin: "32px 0 48px"
      }}>
      Нове на сайті
      </Typography>
      <ProductList itemsPerRow={5} data={newItems}/> 
    </>
  )
}

export default Home;