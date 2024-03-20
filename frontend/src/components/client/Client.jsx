import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"
export const Client = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}