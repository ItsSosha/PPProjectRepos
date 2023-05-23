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
  const response = await fetch(`https://pricely.tech/api/Favourites/isOnFavourites?itemId=${id}&jwt=${jwt}`);
  return await response.json();
}

const updateProductFavourite = async (id, jwt, isFavourited) => {
  const response = await fetch(`https://pricely.tech/api/Favourites?itemId=${id}`, {
    method: isFavourited ? "DELETE" : "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jwt)
  })

  return response;
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
  }, [user, id])

  const handleFavouriteChange = () => {
    setIsFavourited(prevState => !prevState);
    updateProductFavourite(id, user?.jwt, isFavourited);
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
        <ButtonNavLink to="reviews?offset=0" text="Відгуки"/>
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
