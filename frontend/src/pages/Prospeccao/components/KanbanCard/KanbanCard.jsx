import { CardContent,  Typography } from "@mui/material"
import PropTypes from "prop-types"
import { Draggable } from 'react-beautiful-dnd'
import { StyledCardDescription, StyledCardFooter, StyledCardLabel, StyledKanbanCard, StyledKanbanCardDate } from "./KanbanCard.styles"

export const KanbanCard = ({ label, description, value, date, id, index }) => (
  <Draggable draggableId={ String(id) } index={index}>
    {provided => (
      <StyledKanbanCard
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
      >
        <CardContent>
          <StyledCardLabel variant="subtitle1">{label}</StyledCardLabel>
          <StyledCardDescription variant="body2">{description}</StyledCardDescription>
          <StyledCardFooter style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="caption">{value}</Typography>
            <StyledKanbanCardDate variant="caption">{date}</StyledKanbanCardDate>
          </StyledCardFooter>
        </CardContent>
      </StyledKanbanCard>)}
  </Draggable>
)

KanbanCard.propTypes = {
  date: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.number,
  index: PropTypes.number,
  label: PropTypes.string,
  value: PropTypes.string
}