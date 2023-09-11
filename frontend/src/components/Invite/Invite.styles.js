import { Box, Modal, styled } from "@mui/material"

export const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const StyledModalBox = styled(Box)`
  position: absolute;
  width: 50%;
  max-width: 400px;
  height: 50%;
  max-height: 300px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 24;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  padding: 20px;
  text-align: center;

  h1 {
    color: var(--secondary-color);
  }

  Button {
    display: block;
    margin: 0 auto;
    margin-top: 20px;
  }

  input {
  }
`