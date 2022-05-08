import jwt from 'jsonwebtoken'

export const signToken = (_id: string, email:string) => {

    if ( !process.env.JWT_SECRET_SEED ) {
        throw new Error('JWT_SECRET env variable is not defined')
    }

    return jwt.sign(
        { _id, email }, //payload, 
        process.env.JWT_SECRET_SEED, //seed
        { expiresIn: '12h' } // options
    )

}

export const isValidToken = (token: string):Promise<string> => {
    if (!process.env.JWT_SECRET_SEED) {
        throw new Error('JWT_SECRET env variable is not defined')
    }

    return new Promise((resolve, reject) => {

        try {
            jwt.verify(token, process.env.JWT_SECRET_SEED || '', (err, payload) => {
                if ( err ) return reject('Not valid token')

                const { _id } = payload as { _id: string }

                resolve(_id)
            })
        } catch (error) {
            reject('JWT not valid')
        }

    })
}
