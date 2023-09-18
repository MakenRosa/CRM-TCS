import { useState } from "react"
import { Typography, IconButton, Collapse } from "@mui/material"
import { ArrowBack, ArrowForward } from "@mui/icons-material"
import PropTypes from "prop-types"
import { KanbanCard } from "pages/Prospeccao"
import { Droppable } from 'react-beautiful-dnd'
import { StyledKanbanColumn, StyledKanbanColumnArrow, StyledKanbanColumnHeader, StyledKanbanColumnTitle, StyledNoCard, StyledCardsContainer } from "./KanbanColumn.styles"

export const KanbanColumn = ({ title, cards, columnColor, ...props }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <StyledKanbanColumn
      columnColor={columnColor}
      isCollapsed={isCollapsed}
      style={{ padding: "0.5em" }}
      {...props}
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

      <Droppable droppableId={title}>
        {provided => (
          <Collapse in={!isCollapsed} sx={{ minHeight: "100%" }}>
            <StyledCardsContainer ref={provided.innerRef} {...provided.droppableProps}>
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
                <StyledNoCard variant="body2">
                  Sem registros nessa coluna
                </StyledNoCard>
              )}
              {provided.placeholder}
            </StyledCardsContainer>
          </Collapse>
        )}
      </Droppable>
    </StyledKanbanColumn>
  )
}

KanbanColumn.propTypes = {
  cards: PropTypes.array,
  columnColor: PropTypes.string,
  id: PropTypes.number,
  title: PropTypes.string
}
