import { useState } from "react";
import Modal from "../components/Modal/Modal";
import ModalReview from "../components/Modal/ModalReview";
import styled from "styled-components";
import reviews from "../components/Reviews/Reviews";
import ReviewList from "../components/Reviews/ReviewList";
import {
  Button,
  Grid,
  Typography,
  Pagination,
  Stack
} from "@mui/material";

const ReviewsWrapper = styled.div`
padding: 20px;
display: flex;
flex-direction: column;
`
const PER_PAGE = 4;

const ProductReviews = () => {
  const [page, setPage] = useState(1);
  const [isModalOpened, setIsModalOpened] = useState(false);

  return (
    <ReviewsWrapper>
      <Modal open={isModalOpened} onModalClose={() => setIsModalOpened(false)}>
        <ModalReview />
      </Modal>
      <Grid container mb={2}>
        <Grid item xs={6}>
          <Typography variant="h5" fontWeight="700">
            {reviews.length} коментарі(-в)
          </Typography>
        </Grid>
        <Grid item xs={6} textAlign="end">
          <Button
            onClick={() => setIsModalOpened(true)}
            variant="contained"
            color="secondary"
            sx={{
              color: "#FFF",
              paddingX: "2.5em",
              paddingY: "0.5em"
            }}>
            Залишити відгук
          </Button>
        </Grid>
      </Grid>
      <ReviewList reviews={reviews} perPage={PER_PAGE} page={page} />
        <Stack alignItems="center" mt={2}>
        <Pagination
            count={Math.ceil(reviews.length / PER_PAGE)}
            page={page}
            onChange={(e, value) => setPage(value)}
            sx={{
              justifyContent: "center",
              "& .MuiPaginationItem-root": {
                fontWeight: "700",
                fontSize: "1rem",
              },
              "& .Mui-selected" : {
                textDecoration: "underline",
                backgroundColor: "transparent",
              }
            }}
          />
        </Stack>
    </ReviewsWrapper>
  );
};

export default ProductReviews;
