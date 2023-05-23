import Review from "./Review";

const ReviewList = ({ reviews }) => {
  // page -= 1;
  // const renderData = reviews.slice(perPage * page, perPage * (page + 1));

  return (
    <>
      {/* {renderData.map(review => 
      <Review
        key={review.id}
        review={review}
      />)} */}
      {reviews.map(review => 
      <Review
        key={review.id}
        review={review}
      />)}
    </>
  )
};

export default ReviewList;
