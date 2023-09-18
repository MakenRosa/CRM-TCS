import { Box, Typography, styled } from "@mui/material"

export const StyledKanbanColumn = styled(Box, {
  shouldForwardProp: prop => !['columnColor', 'isCollapsed'].includes(prop) })`
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  flex-shrink: 0;
  width: 240px;
  min-height: 100%;
  border: 1px solid #8F8B8B;
  border-top: 3px solid ${ ({ columnColor }) => columnColor || "#8F8B8B" };
  background: #E6E4E4;
  margin: 0 10px;
  position: relative;
  align-self: flex-start;
  transition: all 0.3s ease-in-out;
  max-width: ${ ({ isCollapsed }) => (isCollapsed ? "80px" : "none") };
  min-width: ${ ({ isCollapsed }) => (isCollapsed ? "80px" : "240px") };

  @media (max-width: 768px) {
    margin: 10px 0;
  }
`
export const StyledKanbanColumnHeader = styled(Box, {
  shouldForwardProp: prop => !['isCollapsed'].includes(prop) })`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  background: ${ ({ isCollapsed }) => (isCollapsed ? "#E6E4E4" : "#F3EFEF") };
  border-bottom: ${ ({ isCollapsed }) => (isCollapsed ? "none" : "1px solid #8F8B8B") };
  color: var(--secondary-color);
  flex-direction: row;
  writing-mode: ${ ({ isCollapsed }) => (isCollapsed ? "vertical-rl" : "horizontal-tb") };

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const StyledNoCard = styled(Typography)`
display: flex;
align-items: center;
height: 100%;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
width: max-content;
`

export const StyledKanbanColumnTitle = styled(Box)`
  display: flex;
  align-items: center;
`

export const StyledKanbanColumnArrow = styled(Box)`
  display: flex;
  align-items: center;
`
export const StyledCardsContainer = styled(Box)`
  flex-grow: 1;
  min-height: 600px;
  margin-top: 10px;
`