import { FC } from "react"
import {Slide} from 'react-slideshow-image';

import 'react-slideshow-image/dist/styles.css'
import styles from './ProductSlideshow.module.css';

interface Props {
    images: string[]
}

const ProductSlideshow:FC<Props> = ({images}) => {
  return (
      <Slide
      easing="ease"
        duration={5000}
        indicators={true}
        arrows={true}
      >
        {
            images.map( image => {
                const url = `/products/${image}`
                return (
                    <div className={styles['each-slide']} key={image}>
                        <div style={{
                            backgroundImage: `url(${url})`,
                            backgroundSize: 'cover',

                        }} ></div>
                    </div>
                )
        })
    }
      </Slide>
  )
}

export default ProductSlideshow