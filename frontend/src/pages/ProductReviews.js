import { useState } from "react";
import Modal from "../components/Modal/Modal";
import ModalReview from "../components/Modal/ModalReview";
import styled from "styled-components";

const ReviewsWrapper = styled.div`
padding: 20px;
display: flex;
flex-direction: column;
`

const ProductReviews = () => {
  
  const [isModalOpened, setIsModalOpened] = useState(true);

  return (
    <ReviewsWrapper>
      <Modal open={isModalOpened} onModalClose={() => setIsModalOpened(false)}>
        <ModalReview />
      </Modal>
    </ReviewsWrapper>
  );
};

export default ProductReviews;
