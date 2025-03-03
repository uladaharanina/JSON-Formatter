import { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { Module, ModuleType } from "./Module";
import React from "react";
/*Represenation of Navigation.json */


export const Taxonomy: React.FC = () => {

    const [moduleFormDisplay, setModuleFormDisplay] = useState<boolean>(false);
    const [currentModulesData, setModulesData] = useState<ModuleType[]>([]);

    const AddModuleToArray = (module: ModuleType) : void => {
        console.log(module);
        setModulesData([...currentModulesData, module]);    
    }

    return(
        <>
        <form>
            <div className="flex gap-[50px] text-2xl">
                <h2>Create a Unit</h2>
                <IoMdCloseCircle className="cursor-pointer"></IoMdCloseCircle>
            </div>

            <label htmlFor="unit_title" className="block">Unit Title</label>
            <input type="text" required id="unit_title" className="block"/>

            <label htmlFor="unit_description" className="block">Unit Description </label>
            <input type="text" id="unit_description" className="block"/>
            <button type="button" onClick={() => setModuleFormDisplay(!moduleFormDisplay)}>Add Module</button>
           
            {
               moduleFormDisplay && <Module closeModule={() => setModuleFormDisplay(false) } AddModuleToArray = {AddModuleToArray}></Module>
            }
            <h3 className="text-2xl ">Selected Modules</h3>
            <ul className="text-3xl list-disc">
            {   
                currentModulesData.map((module: ModuleType, index: number) => (
                    <div key={index}>
                        <li key={index + module.title} className="list-disc">
                            <p>Module Name: {module.title}</p>
                            <p>Module Description:{module.description}</p>
                            <p>Related Topics:</p>
                            </li>  

                        <ul>
                        {module.topics.map((topic, i) => ((<li key={i}>{topic.title}</li>)))}
                        </ul>
                    </div>              
            ))
            }
            </ul>
            <button type="submit" className="block">Generate</button>

        </form>
        </>
    )
}