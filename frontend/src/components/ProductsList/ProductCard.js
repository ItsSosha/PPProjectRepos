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
        to={`/products/${data.id}/about`}>
        <CardMedia
          component="img"
          sx={{
            maxHeight: "154px",
            objectFit: "contain",
            padding: "1em"
          }}
          image={data.rawItem.rawIconURL}
          alt={data.rawItem.name}>
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
              WebkitBoxOrient: 'vertical',
              minHeight: '5em'
            }}>
            {data.rawItem.name}
          </Typography>
          <Typography
            variant="price"
            component="p"
            color="secondary"
            align="right">
            {data.rawItem.rawPrice}₴&nbsp;{data.rawItem.isOnSale ? <Typography sx={{textDecoration: "line-through"}} component="span">{data.rawItem.oldPrice}₴</Typography> : null }
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ProductCard;