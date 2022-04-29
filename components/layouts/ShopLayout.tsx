import Head from "next/head"
import { FC, ReactNode } from "react"
import { Navbar } from "../ui";

interface Props {
    children?:ReactNode;
    title: string,
    pageDescription: string,
    imageFullUrl?: string
}

export const ShopLayout:FC<Props> = ({children, title, pageDescription, imageFullUrl}) => {
  return (
    <>
    <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={title} />
        {imageFullUrl && <meta property="og:image" content={imageFullUrl} />}
    </Head>

    <nav>
        <Navbar />
    </nav>

    {/* Sidebar */}
    
    <main style={{
        margin: '80px auto',
        maxWidth: '1440px',
        padding: '0px 30px'
    }}>
        {children}
    </main>

    <footer>

    </footer>
    
    </>
  )
}
