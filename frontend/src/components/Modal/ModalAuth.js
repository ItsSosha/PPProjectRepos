import { useEffect } from "react";
import { Typography } from "@mui/material";

const ModalAuth = () => {

  useEffect(() => {
    /* global google */
    google.accounts.id.renderButton(
      document.getElementById("authModalButton"),
      { theme: "outline", size: "large" }
    )
  })

  return (
    <>
      <Typography
        variant="h5"
      >
        Увійдіть у свій акаунт
      </Typography>
      <div id='authModalButton'></div>
    </>
  )
}

export default ModalAuth;