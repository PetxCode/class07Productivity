import React from 'react'
import { Outlet } from "react-router-dom"

const LayOut = () => {
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default LayOut