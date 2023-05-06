import { 
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea } from "@mui/material"

const ProductCard = () => {
  return (
    <Card 
      sx={{
        maxWidth: "255px",
        boxShadow: '0 4px 24px rgba(123, 123, 123, 0.15)'}}>
      <CardActionArea
        component="a">
        <CardMedia
          component="img"
          height="154"
          sx={{
            objectFit: "contain"
          }}
          image="https://tekhnolog.com/wp-content/uploads/2017/12/Bez-nazvaniya-1-374.jpg"
          alt="lalat satuk">
        </CardMedia>
        <CardContent>
          <Typography
            variant="caption"
            component="p">
              Назва продукту
          </Typography>
          <Typography
            variant="price"
            component="p"
            color="secondary"
            align="right">
            8.99$
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ProductCard;