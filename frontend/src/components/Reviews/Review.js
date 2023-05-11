import {
    Grid,
    Rating,
    Typography
} from "@mui/material"

const Review = ({ review }) => {
  return (
    <Grid container py={3} sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.2)" }}>
      <Grid item xs={3}>
        <Typography variant="h6" fontWeight="700" mb="0.2rem">
            {review.user.name}
        </Typography>
        <Typography variant="body1" mb="0.2rem">
            {review.date.toDateString()}
        </Typography>
        <Rating readOnly value={review.grade} size="small" />
      </Grid>
      <Grid item xs={9}>
        <Typography variant="body2">
         {review.reviewText}
        </Typography>
      </Grid>
    </Grid>
  )
};

export default Review;
