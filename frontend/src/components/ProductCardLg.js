import { 
  Typography, 
  Card, 
  CardMedia, 
  CardContent,
  CardActions,
  Button
} from "@mui/material";
import { ShoppingCartRounded, StarBorderRounded, StarRounded } from "@mui/icons-material";
import styled from "styled-components";

const CardInfoRow = styled.div`
display: flex;
width: 100%;
justify-content: space-between;
align-items: center;
height: 3em;
padding-top: 0.5em;
padding-bottom: 0.5em;

img {
  max-height: 100%;
}
`

const ProductCardLg = ({ product, onFavouriteChange, isFavourited, isLoggedIn }) => {
  return (
    <Card
      sx={{
        px: "3em"
      }}>
      <CardMedia
          component="img"
          height="404"
          sx={{
            objectFit: "contain",
          }}
          image={product.rawIconURL}
          alt={product.name}>
      </CardMedia>
      <CardContent>
        <Typography
          variant="h5"
          component="h5">
            {product.name}
        </Typography>
        <CardInfoRow>
          <Typography
            variant="price"
            component="p"
            color="secondary"
            align="right">
            {product.rawPrice}₴&nbsp;{product.isOnSale ? <Typography sx={{textDecoration: "line-through"}} component="span">{product.oldPrice}₴</Typography> : null }
          </Typography>
          <img src={product.rawCategory.store.iconURL} alt="Product vendor icon"/>
        </CardInfoRow>
      </CardContent>
      <CardActions sx={{mb: 1, columnGap: 2}}>
        <Button
          color="secondary"
          variant="contained"
          sx={{
            flex: "1 0 0", 
            color: "primary.main",
          }}
          href={product.rawItemURL}>
            <ShoppingCartRounded />
            <Typography 
              sx={{ml: 1, textTransform: "none"}}>До магазину</Typography>
        </Button>
        <Button
          disabled={isLoggedIn ? false : true }
          color={isFavourited ? "secondary" : "disabled"}
          variant="outlined"
          sx={{
            borderWidth: "2px",
            "&:focus, &:hover": {
              borderWidth: "2px"
            }
          }}
          onClick={onFavouriteChange}>
          {isFavourited ? <StarRounded /> : <StarBorderRounded/>}
        </Button>
      </CardActions>
    </Card>
  );
};
// isFavourited
export default ProductCardLg;
