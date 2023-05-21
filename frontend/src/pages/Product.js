import { 
  Typography,
  Button
} from "@mui/material";
import { useParams, Outlet, NavLink } from "react-router-dom";
import styled from "styled-components";
import ProductCardLg from "../components/ProductCardLg";
import { useEffect, useState } from "react";
import ProductList from "../components/ProductsList/ProductList"
import { CircularProgress } from "@mui/material";
import { useAuthContext } from "../auth/auth";

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
  align-self: flex-start;
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

const fetchProduct = async (id, jwt) => {
  const response = await fetch(`https://pricely.tech/api/Item/${id}?jwt=${jwt}`);
  return await response.json();
}

const fetchRecommended = async id => {
  const response = await fetch(`https://pricely.tech/api/Item/getRecommended?id=${id}`);
  return await response.json();
}

const fetchFavouritedState = async (id, jwt) => {
  const response = await fetch(`https://pricely.tech/api/Favourites/isOnFavourites?id=${id}&jwt=${jwt}`);
  return await response.json();

}

const Product = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [product, setProduct] = useState(null);
  const [isFavourited, setIsFavourited] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recommended, setRecommended] = useState(null);


  useEffect(() => {
    fetchProduct(id, user?.jwt).then(data => {
      setProduct(data);
      const recommendedPromise = fetchRecommended(data.id).then(recommendedData => {
        setRecommended(recommendedData);
      })

      const favouritedPromise = fetchFavouritedState(id, user?.jwt).then(setIsFavourited);

      Promise.all([recommendedPromise, favouritedPromise]).then(() => {
        setLoading(false);
      });
    });
  }, [user])

  const handleFavouriteChange = () => {
    setIsFavourited(prevState => !prevState);
  }

  return (
    <>
      {loading ? 
      <CircularProgress color="secondary" size={80}/> : 
      <View product={product} isFavourited={isFavourited} user={user} recommended={recommended} handleFavouriteChange={handleFavouriteChange}/>}
    </>
  );
};

const View = ({product, handleFavouriteChange, isFavourited, user, recommended}) => {
  return (
    <ProductWrapper>
      <Typography
          variant="h5"
          component="h5">
          {product.rawItem.name}
      </Typography>
      <ButtonsWrapper>
        <ButtonNavLink to="about" text="Про товар" />
        <ButtonNavLink to="reviews" text="Відгуки"/>
      </ButtonsWrapper>
      <ProductContent>
        <Outlet context={{ product }}/>
        <CardSection>
          <ProductCardLg isLoggedIn={!!user} product={product.rawItem} isFavourited={isFavourited} onFavouriteChange={handleFavouriteChange}/>
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
      <ProductList itemsPerRow={5} data={recommended}/>
    </ProductWrapper>
  )
}

export default Product;
