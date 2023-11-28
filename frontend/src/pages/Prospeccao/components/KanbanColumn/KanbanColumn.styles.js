import { Box, Typography, styled } from "@mui/material"

export const StyledKanbanColumn = styled(Box, {
  shouldForwardProp: prop => !['columnColor', 'isCollapsed'].includes(prop) })`
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  flex-shrink: 0;
  width: 255px;
  min-height:calc(100vh - 350px);
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
    border-right: 1px solid ${ ({ columnColor }) => columnColor || "#8F8B8B" };
    border-left: 1px solid ${ ({ columnColor }) => columnColor || "#8F8B8B" };
    margin-right: 5px;
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
    flex-direction: row; // Mantém a direção da linha para evitar distorção
  }

  .cards-number {
    margin-left: 0.5em;
    font-weight: 700;
    font-size: 1.2rem;
  }

  .cards-number-collapsed {
    writing-mode: horizontal-tb;
    margin-top: 1em;
    font-weight: 700;
    font-size: 1.2rem;
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
  min-height: 120%;
  margin-top: 10px;
`