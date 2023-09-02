const { styled, TextField } = require("@mui/material")

export const StyledTextField = styled(TextField)`

  .MuiFilledInput-underline:before,
  & .MuiFilledInput-underline:after {
    display: none;
  }

  > div {
    border-radius: ${ ({ borderRadius }) => borderRadius || '8px' };
    outline: none;
  }
  input {
    padding-top: 16px;
    margin-bottom: 8px;
  }
  svg {
    margin-bottom: 12px;
  }
`
