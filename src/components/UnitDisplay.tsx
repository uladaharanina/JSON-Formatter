import React, { useState, useEffect } from "react";

import { Activity, HierarchyItem, HierarchyType, Unit } from "../types";
import './UnitDisplay.css';

import SAMPLE_DATA from '../../sample-jsons/sample-navigation.json';
import AddActivity from "./AddActivity";


function UnitDisplay() {


  const [data, setData] = useState<Unit>();

  const [currentEdit, setCurrentEdit] = useState<HierarchyItem>({title: '', id: ''});

  useEffect(() => {
    // initialize empty activity arrays for all unit/modules/topics:
    const dataCopy:Unit = SAMPLE_DATA;
    dataCopy.activities = [];
    for(let i = 0; i < dataCopy.modules.length; i ++) {
      dataCopy.modules[i].activities = [];
      for(let j = 0; j < dataCopy.modules[i].topics.length; j ++) {
        dataCopy.modules[i].topics[j].activities = [];
      }
    }
    setData(dataCopy);
  }, [data])

  const addActivity = (activityDetails: Activity, hierarchyType: HierarchyType, id: string) => {
    console.log("Now, do something with this:");
    console.log(activityDetails);
    console.log(id);
    console.log(hierarchyType);

    const dataCopy = data;
    if(!dataCopy) return;

    switch(hierarchyType) {
      case HierarchyType.UNIT:
        dataCopy?.activities?.push(activityDetails);
        break;
      case HierarchyType.MODULE:
        for(let i = 0; i < dataCopy?.modules.length; i ++) {
          if(dataCopy?.modules[i].id === id) {
            dataCopy?.modules[i].activities?.push(activityDetails);
            break;
          }
        }
        break;
      case HierarchyType.TOPIC:
        for(let i = 0; i < dataCopy?.modules.length; i ++) {
          for(let j = 0; j < (dataCopy?.modules[i].topics?.length || 0); j ++) {
            if(dataCopy.modules[i].topics[j].id === id) {
              dataCopy.modules[i].topics[j].activities?.push(activityDetails);
            }
          }
        }
        break;
    }

    setData(dataCopy);
    console.log(dataCopy);

  }



  return (

    <div className='container'>
      <div>
        {data &&
          <div className='unit'>
            <h1 className='unit-title'>{data.title} (Unit)</h1>
            <h2 className='unit-description'>{data.description}</h2>
            <button onClick={() => setCurrentEdit({hierarchyType:HierarchyType.UNIT, title: data.title, id: data.id})}>Add Activity (Unit Level)</button>

            {data.modules.map(module =>
              <div className='module' key={module.id}>
                <h3 className='module-title'>{module.title} (Module)</h3>
                <h3 className='module-description'>{module.description}</h3>
                <button onClick={() => setCurrentEdit({hierarchyType:HierarchyType.MODULE, title: module.title, id: module.id})}>Add Activity (Module Level)</button>
                {module.topics.map(topic =>
                  <div className='topic' key={topic.id}>
                    <p className='topic-title'>{topic.title} (Topic)</p>
                    <button onClick={() => setCurrentEdit({hierarchyType:HierarchyType.TOPIC, title: topic.title, id: topic.id})}>Add Activity (Topic Level)</button>
                  </div>
                )}
              </div>

            )}
          </div>
        }
      </div>

      <div className="add-activity">
        <AddActivity hierarchyItem={currentEdit} addActivityFunc={addActivity}/>
      </div>

    </div>



  )

}

export default UnitDisplay;