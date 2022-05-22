import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { User } from '../../../models'
import bcrypt from 'bcryptjs'
import { jwt, validations } from '../../../utils'

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
            return registerUser(req, res)

        default:
            res.status(400).json({
                message: 'Bad Request'
            })
        }

}

const registerUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { name = '', email = '', password = '' } = req.body as { name: string, email: string, password: string }

    console.log({ name, email, password })
        
    if (password.length < 5) {
        return res.status(400).json({
            message: 'Password must be at least 6 characters'
        })
    }
    
    if (password.length < 3) {
        return res.status(400).json({
            message: 'Name must be at least 3 characters'
        })
    }
    
    // TODO: Validar email
    if (! validations.isValidEmail(email)) {
        return res.status(400).json({
            message: 'Email is not valid'
        })
    }

    await db.connect()
    const user = await User.findOne({ email })

    if ( user ) {
        await db.disconnect()
        return res.status(401).json({ message: 'Correo ya registrado' })
    }


    const newUser = new User({
        email: email.toLocaleLowerCase(),
        password: bcrypt.hashSync(password),
        name: name,
        role: 'client'
    })

    try {
        await newUser.save({
            validateBeforeSave: true
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Error al registrar usuario'
        })
    }

    
    const { _id, role } = newUser

    const token = jwt.signToken(_id, email);

    return res.status(200).json({
        token, // jwt
        user: {
            role,
            name,
            email
        }
    })
}
