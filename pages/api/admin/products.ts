import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../models';

type Data =
    | { message: string }
    | IProduct[]


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {


    switch (req.method) {
        case 'GET':
            return getProducts(req, res)
            break;

        case 'POST':
            return createProduct(req, res)
            break;

        default:
            return res.status(400).json({ message: 'Bad request' });
    }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    await db.connect();
    const products = await Product.find().sort({ title: 'asc' }).lean();
    await db.disconnect();

    // TODO: Image prods

    res.status(200).json(products);

}
function createProduct(req: NextApiRequest, res: NextApiResponse<Data>) {
    throw new Error('Function not implemented.');
}

