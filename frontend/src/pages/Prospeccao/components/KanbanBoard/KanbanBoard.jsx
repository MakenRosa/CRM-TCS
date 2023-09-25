import PropTypes from "prop-types"
import { KanbanColumn } from "pages/Prospeccao"
import { DragDropContext } from 'react-beautiful-dnd'
import { useCallback, useEffect, useState } from "react"
import { updateProspeccao } from "utils"
import { toast } from "react-toastify"
import { StyledKanbanContainer } from "./KanbanBoard.styles"

const transformData = data => {
  const columns = [
    { title: 'Em prospecção', columnColor: '#F44336' },
    { title: 'Em elaboração', columnColor: '#9C27B0' },
    { title: 'Em negociação', columnColor: '#3F51B5' },
    { title: 'Em revisão', columnColor: '#2196F3' },
    { title: 'Descontinuado', columnColor: '#009688' },
    { title: 'Suspenso', columnColor: '#FF9800' },
    { title: 'Perdido', columnColor: '#795548' },
    { title: 'Vendido', columnColor: '#4CAF50' }
  ]

  const transformedData = columns.map(column => ({
      ...column,
      cards: data.filter(item => item.status === column.title).map(item => ({
        id: item.id,
        label: item.nome_negocio,
        description: item.observacao,
        value: item.comissao ? `R$ ${ item.comissao }` : 'R$ 0,00', 
        date: item.data_inicio_prospeccao 
      }))
    }))
  return transformedData
}

export const KanbanBoard = ({ boardData }) => {
  const [boardDataState, setBoardDataState] = useState(transformData(boardData))

  useEffect(() => {
  setBoardDataState(transformData(boardData))
}, [boardData])

  const onDragEnd = useCallback(async result => {
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

    const movedCard = removed
    try {
      updateProspeccao(movedCard.id, { ...movedCard, status: destination.droppableId })
    } catch (error) {
      toast.error('Erro ao atualizar o status do negócio')
    }
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
