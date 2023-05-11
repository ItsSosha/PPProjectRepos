import { 
  Typography,
  Button
} from "@mui/material";
import { useParams, Outlet, NavLink } from "react-router-dom";
import styled from "styled-components";
import ProductCardLg from "../components/ProductCardLg";
import { useState } from "react";
import ProductList from "../components/ProductsList/ProductList"

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
];

const ProductWrapper = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
`;

const ButtonsWrapper = styled.div`
display: flex;
column-gap: 16px;
margin: 16px 0;
`;

const ProductContent = styled.div`
  display: grid;
  flex: 1 0 0;
  grid-template-columns: 6fr 4fr;
`;

const CardSection = styled.div`
  padding: 20px;
  align-self: center;
`;

const ButtonNavLink = ({to, text}) => {
  return (
    <NavLink
      to={to}>
      {({isActive}) => {
        return (
          <Button
            variant={isActive ? "outlined" : "text"}
            color={isActive ? "secondary" : "disabled"}
            sx={{
              textTransform: 'none'
            }}>
            {text}
          </Button>
        )
      }}
    </NavLink>
  )
}

const Product = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(dummyData[id]);

  const handleFavouriteChange = () => {
    setProduct(prevProduct => ({
      ...prevProduct,
      isFavourited: !prevProduct.isFavourited
    }))
  }

  return (
    <ProductWrapper>
      <Typography
          variant="h5"
          component="h5">
          {product.Name}
      </Typography>
      <ButtonsWrapper>
        <ButtonNavLink to="about" text="Про товар" />
        <ButtonNavLink to="reviews" text="Відгуки"/>
      </ButtonsWrapper>
      <ProductContent>
        <Outlet context={{ product }}/>
        <CardSection>
          <ProductCardLg product={product} onFavouriteChange={handleFavouriteChange}/>
        </CardSection>
      </ProductContent>
      <Typography
          variant="h5"
          component="h5"
          sx={{
            mt: 3,
            mb: 1
          }}>
          Рекомендовані товари
      </Typography>
      <ProductList itemsPerRow={5} data={dummyData}/>
    </ProductWrapper>
  );
};

export default Product;
