import React, { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";

type Module  = {
    title: string,
    description: string,
    topics: Topic[]
}

type Topic  = {
    title: string,
    description: string
}

type Props  ={
    closeModule: () => void,
    AddModuleToArray: (module:Module) => void,  
}
export const Module = ({ closeModule, AddModuleToArray } : Props ) => {

    const [currentModule,  setCurrentModule] = useState<Module | null> (null);

    const updateModule = (event) => {
        event.preventDefault();
        setCurrentModule({
            title: event.target.module_title.value,
            description: event.target.module_description.value,
            topics: []
        });
    }

    return(
        <form>
            <div className="flex">   
                <h3>Create a Module</h3>            
                <IoMdCloseCircle onClick={closeModule}></IoMdCloseCircle>
            </div>
            <label htmlFor="module_title" className="block">Module Title</label>
            <input type="text" required id="module_title" className="block"/>

            <label htmlFor="module_description" className="block">Module Description </label>
            <input type="text" id="module_description" className="block"/>
            <div>

            </div>
            <label htmlFor="module_description" className="block">Add Topic</label>
            <input type="text" id="module_description"/>


            <div>

            </div>

            <button type="submit" className="block" onClick = {updateModule}>Confirm</button>

        </form>
    )
}