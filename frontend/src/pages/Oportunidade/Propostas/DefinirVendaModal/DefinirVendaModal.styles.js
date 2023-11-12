import { Box, Button, Modal, styled } from "@mui/material"

export const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

export const ModalContent = styled(Box)({
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0px 3px 6px #00000029',
  outline: 'none'
})

export const StyledButton = styled(Button)({
  backgroundColor: '#9181F4',
  color: 'white',
  marginTop: '20px',
  '&:hover': {
    backgroundColor: '#7a6fde'
  }
})
