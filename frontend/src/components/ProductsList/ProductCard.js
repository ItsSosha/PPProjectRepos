import { 
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea } from "@mui/material"

const ProductCard = ({data}) => {
  return (
    <Card 
      sx={{
        width: "255px",
        boxShadow: '0 4px 24px rgba(123, 123, 123, 0.15)'}}>
      <CardActionArea
        component="a">
        <CardMedia
          component="img"
          height="154"
          sx={{
            objectFit: "contain",
            padding: "1em"
          }}
          image={data.RawIconURL}
          alt="lalat satuk">
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
            {data.RawPrice}₴&nbsp;{data.IsOnSale ? <Typography sx={{textDecoration: "line-through", display: "inline"}}>{data.OldPrice}₴</Typography> : null }
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ProductCard;

// https://tekhnolog.com/wp-content/uploads/2017/12/Bez-nazvaniya-1-374.jpg