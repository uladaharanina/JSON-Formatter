import React from "react"
export const Header : React.FC  = ()  => {
    return (
        <header className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-8 px-4 shadow-lg rounded-b-lg">
            <div className="max-w-7xl mx-auto flex items-center justify-center">
                <h1 className="text-3xl font-bold text-left">
                    JSON Formatter
                </h1>
            </div>
        </header>
    )
    
}