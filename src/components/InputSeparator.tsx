import React, { useState } from "react";

type Props = {

    insertNewData: (input:string) => void;
}


export const InputSeparator: React.FC<Props>  = ({insertNewData}) => {

    const [currentInputList, setCurrentInputList] = useState<string[]>([]);
    const [currentInput, setCurrentInput] = useState<string>();

    const handleKeyDown = (event) => {
        if(event.key === 'Enter' && currentInput != null && currentInput != undefined){
            setCurrentInputList(prev => [...prev, currentInput]);
            insertNewData(currentInput);
        }
    }

    return(
        <div>
            <input type="text" placeholder="Enter value..."  
                onKeyDown={handleKeyDown}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                value = {currentInput} 
                onChange={(e) => setCurrentInput(e.target.value)}/>
            <div className="border-2 border-amber-200">
                {
                    currentInputList && (
                        currentInputList.map((item, index) => (
                            <div key={index} className="py-2 px-3 border-b-2 border-gray-200">
                                {item}
                            </div>
                        ))
                    )
                }
            </div>
        </div>
        
    )
}
