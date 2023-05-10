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

const ProductCardLg = ({ product, onFavouriteChange }) => {

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
          image={product.RawIconURL}
          alt={product.Name}>
      </CardMedia>
      <CardContent>
        <Typography
          variant="h5"
          component="h5">
            {product.Name}
        </Typography>
        <CardInfoRow>
          <Typography
            variant="price"
            component="p"
            color="secondary"
            align="right">
            {product.RawPrice}₴&nbsp;{product.IsOnSale ? <Typography sx={{textDecoration: "line-through"}} component="span">{product.OldPrice}₴</Typography> : null }
          </Typography>
          <img src={product.VendorIcon} alt="Product vendor icon"/>
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
          href="#">
            <ShoppingCartRounded />
            <Typography 
              sx={{ml: 1, textTransform: "none"}}>До магазину</Typography>
        </Button>
        <Button
          color={product.isFavourited ? "secondary" : "disabled"}
          variant="outlined"
          sx={{
            borderWidth: "2px",
            "&:focus, &:hover": {
              borderWidth: "2px"
            }
          }}
          onClick={onFavouriteChange}>
          {product.isFavourited ? <StarRounded /> : <StarBorderRounded/>}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCardLg;
