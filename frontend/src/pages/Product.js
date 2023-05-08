import { 
  Typography,
  Button
} from "@mui/material";
import { useParams, Outlet, NavLink } from "react-router-dom";
import styled from "styled-components";

const dummyData = [
  {
    Id: 0,
    Name: "Ноутбук ASUS TUF Gaming A15 FA506ICB-HN119 (90NR0667-M00KT0) Graphite Black / AMD Ryzen 5 4600H / RAM 16 ГБ / SSD 512 ГБ / nVidia GeForce RTX 3050",
    RawIconURL:
      "https://content1.rozetka.com.ua/goods/images/big/302686477.jpg",
    RawPrice: 35999,
    OldPrice: 39999,
    IsOnSale: true,
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
`;

const ButtonsWrapper = styled.div`
display: flex;
column-gap: 16px;
margin: 16px 0;
`;

const ProductContent = styled.div`
  display: grid;
  grid-template-columns: 6fr 4fr;
`;

const CardSection = styled.div`
  padding: 20px;
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

  const product = dummyData[id];

  return (
    <ProductWrapper>
      <Typography
          variant="h5"
          component="h5"
          sx={{
            width: '100%'
          }}>
          {product.Name}
      </Typography>
      <ButtonsWrapper>
        <ButtonNavLink to="about" text="Про товар" />
        <ButtonNavLink to="reviews" text="Відгуки"/>
      </ButtonsWrapper>
      <ProductContent>
        <Outlet context={{ product }}/>
        <CardSection>
          
        </CardSection>
      </ProductContent>
    </ProductWrapper>
  );
};

export default Product;
