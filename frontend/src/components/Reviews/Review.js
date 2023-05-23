import {
    Grid,
    Rating,
    Typography
} from "@mui/material"

const Review = ({ review }) => {

  const date = new Date(review.date);

  return (
    <Grid container py={3} sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.2)" }}>
      <Grid item xs={3}>
        <Typography variant="caption" fontWeight="700" mb="0.2rem">
            {review.user.firstName + " " + review.user.surname}
        </Typography>
        <Typography variant="body1" mb="0.2rem">
            {date.toLocaleDateString()}
        </Typography>
        <Rating readOnly value={review.grade} size="small" />
      </Grid>
      <Grid item xs={9}>
        <Typography variant="subtitle1">
         {review.reviewText}
        </Typography>
      </Grid>
    </Grid>
  )
};

export default Review;
