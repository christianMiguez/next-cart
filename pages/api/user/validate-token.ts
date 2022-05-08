import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { User } from '../../../models'
import bcrypt from 'bcryptjs'
import { jwt } from '../../../utils'

type Data = 
| { message: string }
| { 
    token: string, 
    user: { 
        role: string, 
        name: string, 
        email: string 
    }
}

export default function Handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return checkJWT(req, res)

        default:
            res.status(400).json({
                message: 'Bad Request'
            })
        }
}

const checkJWT = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { token = '' } = req.cookies;

    let userId = '';

    try {
        userId = await jwt.isValidToken(token);

    } catch (error) {
        return res.status(401).json({
            message: 'Token no válido'
        })
    }

    await db.connect()
    const user = await User.findById(userId).lean()
    await db.disconnect()

    if ( !user ) {
        return res.status(401).json({
            message: 'Usuario no valido'
        })
    }

    const { _id, email, role, name } = user;

    console.log({token: jwt.signToken(_id, email), // jwt
    user: {
        email,
        role,
        name
    }})

    return res.status(200).json({
        token: jwt.signToken(_id, email), // jwt
        user: {
            email,
            role,
            name
        }
    })
}

