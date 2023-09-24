import PropTypes from "prop-types"
import { KanbanColumn } from "pages/Prospeccao"
import { DragDropContext } from 'react-beautiful-dnd'
import { useCallback, useState } from "react"
import { StyledKanbanContainer } from "./KanbanBoard.styles"

export const KanbanBoard = ({ boardData }) => {
  const [boardDataState, setBoardDataState] = useState(boardData)

  const onDragEnd = useCallback(result => {
    const { destination, source } = result

    if (!destination) {
      return
    }
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return
    }
    const newBoardData = JSON.parse(JSON.stringify(boardDataState))
    const [removed] = newBoardData.find(column => column.title === source.droppableId).cards.splice(source.index, 1)
    newBoardData.find(column => column.title === destination.droppableId).cards.splice(destination.index, 0, removed)
    setBoardDataState(newBoardData)
  }, [boardDataState, setBoardDataState])

  return (
    <DragDropContext onDragEnd={onDragEnd} >
      <StyledKanbanContainer>
        {boardDataState.map(columnData => (
          <KanbanColumn 
            key={columnData.title}
            {...columnData}
          />
        ))}
      </StyledKanbanContainer>
    </DragDropContext>
  )
}

KanbanBoard.propTypes = {
  boardData: PropTypes.array
}
