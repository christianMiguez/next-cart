import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { jwt } from "../../utils";


export async function middleware (req: NextRequest, event: NextFetchEvent) {
    const { token='' } = req.cookies;

    try {
        await jwt.isValidToken(token);
        return NextResponse.next()
    } catch (error) {
        const url           = req.nextUrl.clone()
        const requestedPage =  req.page.name;
        return NextResponse.redirect( `${ url.origin }/auth/login?goto=${ requestedPage }`)
    }
}

