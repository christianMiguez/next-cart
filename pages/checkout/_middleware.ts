import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import {getToken} from 'next-auth/jwt'


export async function middleware (req: NextRequest, event: NextFetchEvent) {
    // const { token='' } = req.cookies;

    // try {
    //     await jwt.isValidToken(token);
    //     return NextResponse.next()
    // } catch (error) {
    //     const url           = req.nextUrl.clone()
    //     const requestedPage =  req.page.name;
    //     return NextResponse.redirect( `${ url.origin }/auth/login?goto=${ requestedPage }`)
    // }

    const session = await getToken({req, secret: process.env.NEXTAUTH_SECRET})

    if (!session) {
        const url           = req.nextUrl.clone()
            const requestedPage =  req.page.name;
            return NextResponse.redirect( `${ url.origin }/auth/login?goto=${ requestedPage }`)
    }

    return NextResponse.next()


}

