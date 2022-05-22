import bcrypt from 'bcryptjs';
import { User } from '../models';
import {db} from './'

export const checkUserEmailPassword = async (email:string, password:string) => {

    await db.connect();
    const user = await User.findOne({email});
    await db.disconnect();

    if (!user) {
        return null;
    }

    if (!bcrypt.compareSync(password, user.password!) ) {
        return null
    }

    const {_id, name, role} = user;

    return {
        _id,
        name,
        role,
        email: email.toLocaleLowerCase()
    }

}

export const oAuthToDbUser = async (aAuthEmail: string, oAuthName: string) => {
    db.connect();
    const user = await User.findOne({email: aAuthEmail});

    if (user) {
        db.disconnect();
        const {_id, name, role, email} = user;
        return {
            _id,
            name,
            role,
            email
        }
    }

    const newUser = new User({
        email: aAuthEmail,
        name: oAuthName,
        password: '@',
        role: 'client'    
    });

    await newUser.save();
    db.disconnect();

    const {_id, name, role, email} = newUser;
    return {
        _id,
        name,
        role,
        email
    }

}