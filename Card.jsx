import { useState } from 'react'
import './App.css'

function Card({label, onClick, className="defaultButton"}){
    return(
        <button onClick ={onClick} className = {className}>
            {label}
        </button>
    )
}

export default Card