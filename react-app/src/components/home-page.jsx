// import { useState } from "react"
import "../styles/app.css"
import JobSearch from "./searchbar"

export default function HomePage() {
    return (
        <><nav className="navbar"><h3>Job Board</h3></nav>
        <JobSearch/>
        </>
    )
}