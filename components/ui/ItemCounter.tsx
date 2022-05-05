import { FC } from "react"
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"

interface Props {
  currentValue: number;
  maxValue: number;

  // methods
  // the following function: 
  updatedQuantity: (newValue: number) => void
}

const ItemCounter:FC<Props> = ({currentValue, updatedQuantity, maxValue}) => {

  const addOrRemove = (value: number) => {
    if (value === -1) {
      if (currentValue === 1) return

      return updatedQuantity(currentValue - 1)
    }

    if (currentValue >= maxValue) return

    updatedQuantity(currentValue + 1)
  }

  return (
    <Box display='flex' alignItems='center'>
      <IconButton onClick={() => addOrRemove(-1)}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{width: 30, textAlign:'center'}}>{currentValue}</Typography>
      <IconButton onClick={() => addOrRemove(+1)}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  )
}

export default ItemCounter