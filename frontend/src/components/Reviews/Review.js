import { Grid, IconButton, Rating, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";

const Review = ({ review, handleReviewDelete }) => {
  const date = new Date(review.date);

  return (
    <Grid
      container
      py={3}
      sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.2)" }}
    >
      <Grid item xs={3}>
        <Typography variant="caption" fontWeight="700" mb="0.2rem">
          {review.user.firstName + " " + review.user.surname}
        </Typography>
        <Typography variant="body1" mb="0.2rem">
          {date.toLocaleDateString()}
        </Typography>
        <Rating readOnly value={review.grade} size="small" />
      </Grid>
      <Grid item xs={8}>
        <Typography variant="subtitle1">{review.reviewText}</Typography>
      </Grid>
      {handleReviewDelete && (
        <Grid item xs={1}>
          <IconButton onClick={handleReviewDelete}>
            <Close />
          </IconButton>
        </Grid>
      )}
    </Grid>
  );
};

export default Review;
