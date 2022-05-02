import { db } from "."
import { IProduct } from "../interfaces"
import { Product } from "../models"

export const getProductBySlug = async(slug: string): Promise<IProduct | null> => {
    db.connect()
    const product = await Product.findOne({slug}).lean()
    db.disconnect()

    if (!product) {
        throw new Error(`Product with slug ${slug} not found`)
    }

    return JSON.parse(JSON.stringify(product))
}

interface ProductSlug {
    slug: string
}
export const getAllProductsSlugs = async (): Promise<ProductSlug[]> => {
    await db.connect()
    const slugs = await Product.find().select('slug -_id').lean()
    await db.disconnect()

    return slugs
}


export const getProductsByTerm = async (term: string): Promise<IProduct[]> => {

    term = term.toString().toLowerCase()

    db.connect()
    const products = await Product.find({
        $text: {
            $search: term
        }
    }).select('title slug images price inStock -_id').lean()
    db.disconnect()

    return products
}

export const getAllProducts = async (): Promise<IProduct[]> => {
    db.connect()
    const products = await Product.find().select('title slug images price inStock -_id').lean()
    db.disconnect()

    return products
}