import { Typography, IconButton, Collapse } from "@mui/material"
import { ArrowBack, ArrowForward } from "@mui/icons-material"
import PropTypes from "prop-types"
import { KanbanCard } from "pages/Prospeccao"
import { Droppable } from 'react-beautiful-dnd'
import { StyledKanbanColumn, StyledKanbanColumnArrow, StyledKanbanColumnHeader, StyledKanbanColumnTitle, StyledNoCard, StyledCardsContainer } from "./KanbanColumn.styles"

export const KanbanColumn = ({ title, cards, columnColor, isCollapsed, toggleColumnCollapse, ...props }) => (
  <StyledKanbanColumn
    columnColor={columnColor}
    isCollapsed={isCollapsed}
    style={{ padding: "0.5em" }}
    {...props}
  >
    <StyledKanbanColumnHeader isCollapsed={isCollapsed}>
      <StyledKanbanColumnArrow>
        <IconButton onClick={() => toggleColumnCollapse(title)}>
          {isCollapsed ? (
            <ArrowForward sx={{ color: "#9181f4" }} />
          ) : (
            <ArrowBack sx={{ color: "#9181f4" }} />
          )}
        </IconButton>
      </StyledKanbanColumnArrow>
      <StyledKanbanColumnTitle>
        <Typography variant="h6">{title}</Typography>
      </StyledKanbanColumnTitle>
      <Typography
        className={isCollapsed ? 'cards-number-collapsed' : 'cards-number'}
        variant="body2"
      >
        ({cards.length})
      </Typography>
    </StyledKanbanColumnHeader>


    <Droppable droppableId={title}>
      {provided => (
        <Collapse in={!isCollapsed} sx={{ minHeight: "100%" }}>
          <StyledCardsContainer ref={provided.innerRef} {...provided.droppableProps}>
            {cards.length > 0 ? (
              cards.map((card, index) => (
                <KanbanCard
                  {...card}
                  index={index}
                  key={card.id}
                  status={title}
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

KanbanColumn.propTypes = {
  cards: PropTypes.array,
  columnColor: PropTypes.string,
  id: PropTypes.number,
  isCollapsed: PropTypes.bool,
  title: PropTypes.string,
  toggleColumnCollapse: PropTypes.func
}
