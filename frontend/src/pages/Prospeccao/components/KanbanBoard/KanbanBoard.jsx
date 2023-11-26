import PropTypes from "prop-types"
import { KanbanColumn } from "pages/Prospeccao"
import { DragDropContext } from 'react-beautiful-dnd'
import { useCallback, useEffect, useState } from "react"
import { updateProspeccao } from "utils"
import { toast } from "react-toastify"
import { Box, Divider, Typography } from "@mui/material"
import { TouchApp } from "@mui/icons-material"
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
        date: item.data_proxima_acao,
        leadId: item.lead
      }))
    }))
  return transformedData
}

export const KanbanBoard = ({ boardData, onUpdateBoardData }) => {
  const [boardDataState, setBoardDataState] = useState(transformData(boardData))
  const [collapsedColumns, setCollapsedColumns] = useState({})

  const collapseProspect = () => {
    setCollapsedColumns(prevState => ({
      ...prevState,
      'Em prospecção': !prevState['Em prospecção']
    }))
  }
  
  const collapseProposal = () => {
    const proposalColumns = [
      'Em elaboração', 'Em negociação', 'Em revisão', 
      'Descontinuado', 'Suspenso', 'Perdido', 'Vendido'
    ]
    const areAllCollapsed = proposalColumns.every(column => collapsedColumns[column])
  
    const updatedState = {}
    for (const column of proposalColumns) {
      updatedState[column] = !areAllCollapsed
    }
  
    setCollapsedColumns(prevState => ({
      ...prevState,
      ...updatedState
    }))
  }
  

  useEffect(() => {
  setBoardDataState(transformData(boardData))
  }, [boardData])

  const toggleColumnCollapse = columnName => {
    setCollapsedColumns(prevState => ({
      ...prevState,
      [columnName]: !prevState[columnName]
    }))
  }


  const onDragEnd = useCallback(async result => {
    const { source, destination } = result

    // Se não há destino ou se a posição do card não mudou, retorna sem fazer nada
    if (!destination || 
        (source.droppableId === destination.droppableId && source.index === destination.index)) {
        return
    }

    const newBoardData = [...boardDataState]
    const sourceColumn = newBoardData.find(column => column.title === source.droppableId)
    const destColumn = newBoardData.find(column => column.title === destination.droppableId)

    const [removed] = sourceColumn.cards.splice(source.index, 1)
    destColumn.cards.splice(destination.index, 0, removed)

    onUpdateBoardData(newBoardData)

    try {
        await updateProspeccao(removed.id, { ...removed, status: destination.droppableId })
    } catch (error) {
        toast.error('Erro ao atualizar o status do negócio')
    }
}, [boardDataState, setBoardDataState])


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StyledKanbanContainer>
        <Box className="columnGroup">
          <Typography className="columnTitle" component="h1" gutterBottom onClick={collapseProspect} variant="h4">
            Prospecção {collapsedColumns['Em prospecção'] ? <TouchApp sx={{ color: '#9181f4' }} /> : <TouchApp />}
          </Typography>
          {boardDataState.map(columnData => {
            if (columnData.title === 'Em prospecção') {
              return (
                <KanbanColumn 
                  isCollapsed={collapsedColumns[columnData.title]}
                  key={columnData.title}
                  toggleColumnCollapse={toggleColumnCollapse}
                  {...columnData}
                />
              )
            }
            return null
          })}
        </Box>
        <Divider flexItem orientation="vertical" />
        <Box className="columnGroup">
          <Typography className="columnTitle" component="h1" gutterBottom onClick={collapseProposal} variant="h4">
            Proposta {collapsedColumns['Em elaboração'] && collapsedColumns['Em negociação'] && collapsedColumns['Em revisão'] && collapsedColumns['Descontinuado'] && collapsedColumns['Suspenso'] && collapsedColumns['Perdido'] && collapsedColumns['Vendido'] ? <TouchApp sx={{ color: '#9181f4' }} /> : <TouchApp />}
          </Typography>
          <Box className="propostaColumns">
            {boardDataState.map(columnData => {
              if (columnData.title !== 'Em prospecção') {
                return (
                  <KanbanColumn 
                    isCollapsed={collapsedColumns[columnData.title]}
                    key={columnData.title}
                    toggleColumnCollapse={toggleColumnCollapse}
                    {...columnData}
                  />
                )
              }
              return null
            })}
          </Box>
        </Box>
      </StyledKanbanContainer>
    </DragDropContext>
  )
}

KanbanBoard.propTypes = {
  boardData: PropTypes.array,
  onUpdateBoardData: PropTypes.func
}
