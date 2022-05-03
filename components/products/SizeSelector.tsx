import { FC } from "react"
import { Box, Button } from "@mui/material"
import { ISize} from "../../interfaces"

interface Props {
    selectedSize?: ISize,
    sizes: ISize[]

    // methods
    onSelectedSize: (size: ISize) => void
}
const SizeSelector:FC<Props> = ({selectedSize, sizes, onSelectedSize}) => {
  return (
    <Box>
        {
            sizes.map( size => (
                    <Button
                        key={size}
                        size='small'
                        color={ selectedSize === size ? 'primary' : 'info' }
                        onClick={() => onSelectedSize( size )}
                    >
                        {size}
                    </Button>
                )
            )
        }
    </Box>
  )
}

export default SizeSelector