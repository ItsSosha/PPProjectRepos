import Review from "./Review";

const ReviewList = ({ reviews, handleReviewDelete, user }) => {
  return (
    <>
      {reviews.map((review) => (
        <Review
          key={review.id}
          review={review}
          handleReviewDelete={
            review.userId === user.id || user.isAdmin
              ? () => {
                  handleReviewDelete(user.jwt, review.id);
                }
              : null
          }
        />
      ))}
    </>
  );
};

export default ReviewList;
