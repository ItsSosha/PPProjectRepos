import { Typography, TextField, Rating, Button } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
display: flex;
flex-direction: column;
row-gap: 8px;
align-items: center;
`

const ModalReview = ({onReviewSubmit}) => {

  const [reviewText, setReviewText] = useState('');
  const [grade, setGrade] = useState(0);

  return (
    <Form onSubmit={e => onReviewSubmit(e, reviewText, grade)}>
      <Typography
        variant="h5"
        component="h5"
        align="center"
        sx={{
          fontWeight: 700,
          marginBottom: "1em"
        }}
      >
        Додати відгук
      </Typography>
      <TextField 
        multiline
        label="Введіть ваш відгук"
        minRows={10}
        color="secondary"
        value={reviewText}
        required
        onChange={e => setReviewText(e.target.value)}
        sx={{
          minWidth: "75ch"
        }}
      />
      <Rating size="large" value={grade} onChange={e => setGrade(e.target.value)}/>
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        sx={{
          color: "primary.main",
          px: 5,
          py: 1
        }}
      >
        Додати відгук
      </Button>
    </Form>
  );
};

export default ModalReview;
