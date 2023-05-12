import { 
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea } from "@mui/material"
  import { Link } from "react-router-dom";

const ProductCard = ({data}) => {
  return (
    <Card 
      sx={{
        maxWidth: "255px",
        boxShadow: '0 4px 24px rgba(123, 123, 123, 0.15)'}}>
      <CardActionArea
        component={Link}
        to={`/products/${data.Id}/about`}>
        <CardMedia
          component="img"
          sx={{
            maxHeight: "154px",
            objectFit: "contain",
            padding: "1em"
          }}
          image={data.RawIconURL}
          alt={data.Name}>
        </CardMedia>
        <CardContent>
          <Typography
            variant="caption"
            component="p"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '3',
              WebkitBoxOrient: 'vertical'
            }}>
            {data.Name}
          </Typography>
          <Typography
            variant="price"
            component="p"
            color="secondary"
            align="right">
            {data.RawPrice}₴&nbsp;{data.IsOnSale ? <Typography sx={{textDecoration: "line-through"}} component="span">{data.OldPrice}₴</Typography> : null }
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ProductCard;