import { useState } from "react"
import { Typography, IconButton, Collapse } from "@mui/material"
import { ArrowBack, ArrowForward } from "@mui/icons-material"
import PropTypes from "prop-types"
import { KanbanCard } from "pages/Prospeccao"
import { Droppable } from 'react-beautiful-dnd'
import { StyledKanbanColumn, StyledKanbanColumnArrow, StyledKanbanColumnHeader, StyledKanbanColumnTitle } from "./KanbanColumn.styles"

export const KanbanColumn = ({ title, cards, columnColor }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <Droppable droppableId={ title }>
      {provided => (
        <StyledKanbanColumn
          ref={provided.innerRef}
          {...provided.droppableProps}
          columnColor={columnColor}
          isCollapsed={isCollapsed} 
          style={{ padding: "0.5em" }}
        >
          <StyledKanbanColumnHeader isCollapsed={isCollapsed}>
            <StyledKanbanColumnArrow>
              <IconButton onClick={toggleCollapse}>
                {isCollapsed ? (
                  <ArrowForward sx={{ color: "#9181f4" }} />
              ) : (
                <ArrowBack sx={{ color: "#9181f4" }} />
              )}
              </IconButton>
            </StyledKanbanColumnArrow>
            <StyledKanbanColumnTitle>
              <Typography variant="h6">{title}</Typography>
              <Typography sx={{ marginLeft: "0.5em" }} variant="body2">
                {cards.length}
              </Typography>
            </StyledKanbanColumnTitle>
          </StyledKanbanColumnHeader>
          <Collapse in={!isCollapsed}>
            {cards.length > 0 ? (
            cards.map((card, index) => (
              <KanbanCard 
                date={card.date}
                description={card.description}
                id={card.id}
                index={index}
                key={card.id}
                label={card.label}
                value={card.value} 
                {...card}
              />
            ))
          ) : (
            <Typography align="center" variant="body2">
              Sem registros nessa coluna
            </Typography>
          )}
          </Collapse>
          {provided.placeholder}
        </StyledKanbanColumn>
        )}
    </Droppable>
  )
}

KanbanColumn.propTypes = {
  cards: PropTypes.array,
  columnColor: PropTypes.string,
  id: PropTypes.number,
  title: PropTypes.string
}