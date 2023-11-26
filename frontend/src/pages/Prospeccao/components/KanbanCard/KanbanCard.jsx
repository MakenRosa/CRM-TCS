import { CardContent, Typography } from "@mui/material"
import PropTypes from "prop-types"
import { Draggable } from 'react-beautiful-dnd'
import { useNavigate } from "react-router-dom"
import { StyledCardDescription, StyledCardFooter, StyledCardLabel, StyledKanbanCard, StyledKanbanCardDate } from "./KanbanCard.styles"

export const KanbanCard = ({ label, description, date, status, leadId, id, index }) => {
  const navigate = useNavigate()

  const handleEditProspeccao = () => {
    if (status === "Em prospecção") {
      localStorage.setItem('edit_prospeccao', id)
      navigate(`/oportunidades/register`)
    } else {
      navigate(`/oportunidades/${ leadId }/${ id }`)
    }
  }
  return (
    <Draggable draggableId={ String(id) } index={index}>
      {provided => (
        <StyledKanbanCard
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={handleEditProspeccao}
          ref={provided.innerRef}
        >
          <CardContent>
            <StyledCardLabel variant="subtitle1">{label}</StyledCardLabel>
            <StyledCardDescription variant="body2">{description}</StyledCardDescription>
            <StyledCardFooter>
              <Typography fontWeight={600} variant="caption">Próxima ação:</Typography>
              <StyledKanbanCardDate variant="caption">{date}</StyledKanbanCardDate>
            </StyledCardFooter>
          </CardContent>
        </StyledKanbanCard>)}
    </Draggable>
)}

KanbanCard.propTypes = {
  date: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.number,
  index: PropTypes.number,
  label: PropTypes.string,
  leadId: PropTypes.number,
  status: PropTypes.string,
  value: PropTypes.string
}