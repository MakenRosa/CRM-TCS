import { Box, styled } from "@mui/material"

export const StyledParagraph = styled('p')({
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#666666',
    margin: '0'
})

export const StyledBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: '4px',
    padding: '8px',
    border: '1px solid #666666',
    borderRadius: '5px',
    backgroundColor: '#f2f2f2'
})
