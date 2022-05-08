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
        case 'POST':
            return loginUser(req, res)

        default:
            res.status(400).json({
                message: 'Bad Request'
            })
        }
}

const loginUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { email = '', password = '' } = req.body
    
    await db.connect()
    
    const user = await User.findOne({ email })
    await db.disconnect()

    if ( !user ) {
        return res.status(401).json({ message: 'Correo o contraseña no válidos - MAIL' })
    }

    if ( !bcrypt.compareSync(password, user.password!) ) {
        return res.status(401).json({ message: 'Correo o contraseña no válidos - PASSWORD' })
    }
    const { role, name } = user

    const token = jwt.signToken(user._id, email);

    return res.status(200).json({
        token, // jwt
        user: {
            role,
            name,
            email
        }
    })
}
