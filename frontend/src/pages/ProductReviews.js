import { useEffect, useState } from "react";
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
  Stack,
  CircularProgress,
} from "@mui/material";
import { useAuthContext } from "../auth/auth";
import { useOutletContext, useSearchParams } from "react-router-dom";

const ReviewsWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;
const PER_PAGE = 4;

const fetchReviews = async (id, offset) => {
  const response = await fetch(
    `https://pricely.tech/api/Review/get/${id}?offset=${offset}&limit=${PER_PAGE}`
  );
  return await response.json();
};

const addReview = async (jwt, id, reviewtext, grade) => {
  const response = await fetch(
    `https://pricely.tech/api/Review/add?itemId=${id}&reviewText=${reviewtext}&grade=${grade}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jwt),
    }
  );

  if (!response.ok) {
    throw new Error();
  }

  return await response.json();
};

const removeReview = async (jwt, reviewId) => {
  const resp = await fetch(
    `https://pricely.tech/api/Review/delete/${reviewId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jwt),
    }
  );

  if (!resp.ok) {
    throw new Error();
  }

  return await resp.json();
};

const ProductReviews = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();
  const { product } = useOutletContext();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleReviewSubmit = (id, e, reviewtext, grade) => {
    e.preventDefault();
    setSearchParams({
      offset: 0,
    });
    addReview(user.jwt, id, reviewtext, grade).then(() => {
      setLoading(true);
      fetchReviews(product.id, 0).then((data) => {
        setReviews(data);
        setLoading(false);
        setIsModalOpened(false);
      });
    });
  };

  const handlePageChange = (page) => {
    setSearchParams((prevSearchParams) => ({
      ...Object.fromEntries(prevSearchParams.entries()),
      offset: (page - 1) * PER_PAGE,
    }));
  };

  useEffect(() => {
    setLoading(true);
    fetchReviews(product?.id, searchParams.get("offset")).then((data) => {
      setLoading(false);
      setReviews(data);
    });
  }, [searchParams]);

  const handleReviewDelete = async (jwt, reviewId) => {
    await removeReview(jwt, reviewId);
    setSearchParams((prevSearchParams) => ({
      offset:
        (prevSearchParams.offset - 1) % PER_PAGE === 0
          ? prevSearchParams.offset - PER_PAGE
          : prevSearchParams.offset,
    }));
  };

  return (
    <ReviewsWrapper>
      <Modal open={isModalOpened} onModalClose={() => setIsModalOpened(false)}>
        <ModalReview
          onReviewSubmit={(e, reviewText, grade) =>
            handleReviewSubmit(product?.id, e, reviewText, grade)
          }
        />
      </Modal>
      <Grid container mb={2}>
        <Grid item xs={6}>
          <Typography variant="h5" fontWeight="700">
            {reviews?.total} коментарі(-в)
          </Typography>
        </Grid>
        <Grid item xs={6} textAlign="end">
          <Button
            onClick={() => setIsModalOpened(true)}
            variant="contained"
            color="secondary"
            disabled={!user ?? true}
            sx={{
              color: "#FFF",
              paddingX: "2.5em",
              paddingY: "0.5em",
            }}
          >
            Залишити відгук
          </Button>
        </Grid>
      </Grid>
      {loading ? (
        <CircularProgress color="secondary" size={80} />
      ) : (
        <View
          page={searchParams.get("offset") / PER_PAGE + 1}
          reviews={reviews}
          onPageChange={handlePageChange}
          user={user}
          handleReviewDelete={handleReviewDelete}
        />
      )}
    </ReviewsWrapper>
  );
};

const View = ({ reviews, page, onPageChange, user, handleReviewDelete }) => {
  return (
    <>
      {reviews.total != 0 ? (
        <>
          {/* <ReviewList reviews={reviews} perPage={PER_PAGE} page={page} /> */}
          <ReviewList
            reviews={reviews.result}
            handleReviewDelete={handleReviewDelete}
            user={user}
          />
          <Stack alignItems="center" mt={2}>
            <Pagination
              count={Math.ceil(reviews.total / PER_PAGE)}
              page={page}
              onChange={(e, value) => onPageChange(value)}
              sx={{
                justifyContent: "center",
                "& .MuiPaginationItem-root": {
                  fontWeight: "700",
                  fontSize: "1rem",
                },
                "& .Mui-selected": {
                  textDecoration: "underline",
                  backgroundColor: "transparent",
                },
              }}
            />
          </Stack>
        </>
      ) : (
        <Typography component="h4" variant="h4">
          Продукт не має жодних відгуків.
        </Typography>
      )}
    </>
  );
};

export default ProductReviews;
