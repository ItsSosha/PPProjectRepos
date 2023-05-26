import { Typography, Box, Button, Link } from "@mui/material";
import styled from "styled-components";

const ProductRow = styled.div`
display: grid;
grid-template-columns: repeat(2, 1fr);
justify-items: start;
width: 100%;
`

const ModalProductDetails = ({ product, onItemChange }) => {

  if (!product) {
    return null;
  }

  return (
    <>
      <Typography
        component="h6">
          {product.name}
      </Typography>
      <ProductRow>
        <Typography
          variant="subtitle1"
        >
          Магазин  
        </Typography>
        <Box 
          component="img"
          src={product.rawCategory.store.iconURL}
          sx={{
            height: '2em',
          }}
        />
      </ProductRow>
      <ProductRow>
        <Typography
          variant="subtitle1"
        >
          Ціна  
        </Typography>
        <Typography
          variant="price"
          component="p"
          color="secondary"
          align="left"
        >
            {product.rawPrice}₴&nbsp;{product.isOnSale ? <Typography sx={{textDecoration: "line-through"}} component="span">{product.oldPrice}₴</Typography> : null }
        </Typography>
      </ProductRow>
      <ProductRow>
        <Typography
          variant="subtitle1"
        >
          Сторінка у магазині
        </Typography>
        <Typography
          variant="price"
          component="p"
          color="secondary"
          align="left"
        >
          <Link href={product.rawItemURL} color="inherit">Посилання</Link>
        </Typography>
      </ProductRow>
      <ProductRow>
        <Typography
          variant="subtitle1"
        >
          Категорія
        </Typography>
        <Typography
          variant="price"
          component="p"
          color="secondary"
          align="left"
        >
          {product.rawCategory.parsedName}
        </Typography>
      </ProductRow>
      <ProductRow>
        <Typography
          variant="subtitle1"
        >
          Опис
        </Typography>
        <Typography
          variant="price"
          component="p"
          color="secondary"
          align="left"
        >
          {product.description}
        </Typography>
      </ProductRow>
      <ProductRow>
        <Button
          onClick={onItemChange}
          variant="contained"
          color={product.isApproved ? "error" : "secondary"}
          sx={{color: "#FFF"}}>
            {product.isApproved ? "Прибрати" : "Затвердити"}
        </Button>
        <Button>

        </Button>
      </ProductRow>
    </>
  );
};

export default ModalProductDetails;
