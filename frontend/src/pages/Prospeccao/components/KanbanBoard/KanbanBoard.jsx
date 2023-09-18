import PropTypes from "prop-types"
import { KanbanColumn } from "pages/Prospeccao"
import { DragDropContext } from 'react-beautiful-dnd'
import { StyledKanbanContainer } from "./KanbanBoard.styles"

export const KanbanBoard = ({ boardData }) => {
  const onDragEnd = result => {
    console.log(result)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StyledKanbanContainer>
        {boardData.map(columnData => (
          <KanbanColumn cards={columnData.cards}
            columnColor={columnData.columnColor}
            id={columnData.id}
            key={columnData.title}
            title={columnData.title}
            {...columnData}
          />
        ))}
      </StyledKanbanContainer>
    </DragDropContext>
  )}

KanbanBoard.propTypes = {
  boardData: PropTypes.array
}
