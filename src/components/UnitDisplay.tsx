import React, { useState, useEffect, useMemo } from "react";

import { Activity, HierarchyItem, HierarchyType, Unit } from "../types";
import './UnitDisplay.css';

import SAMPLE_DATA from '../../sample-jsons/sample-navigation.json';
import AddActivity from "./AddActivity";


const checkActivityExists = (activityToAdd: Activity, activities: Activity[]) => {
  let found = false;
  for (const activity of activities) {
    if (activity.activityName === activityToAdd.activityName && activity.activityType === activityToAdd.activityType) {
      found = true;
      break;
    }
  }
  return found;
}

// Create simplified version of the data, removing unnecessary ids, etc.
const createFilteredProxy:any = (data:Unit, excludeKeys = ["id", "prerequisites", "description", "tooltip", "url"]) => {
  if (Array.isArray(data)) {
    return data.map(item => createFilteredProxy(item, excludeKeys));
  } else if (typeof data === "object" && data !== null) {
    return new Proxy(data, {
      get(target, prop) {
        if (typeof prop === 'string' && excludeKeys.includes(prop)) return undefined;
        const value = target[prop as keyof typeof target];
        return typeof value === "object" && value !== null 
          ? createFilteredProxy(value, excludeKeys) 
          : value;
      }
    });
  }
  return data;
};


function UnitDisplay() {
  const [unitTaxonomy, setUnitTaxonomy] = useState<Unit>(SAMPLE_DATA);
  const [currentEdit, setCurrentEdit] = useState<HierarchyItem>({ title: '', id: '' });

  useEffect(() => {
    // initialize empty activity arrays for all unit/modules/topics:
    const dataCopy: Unit = SAMPLE_DATA;
    dataCopy.activities = [];
    for (let i = 0; i < dataCopy.modules.length; i++) {
      dataCopy.modules[i].activities = [];
      for (let j = 0; j < dataCopy.modules[i].topics.length; j++) {
        dataCopy.modules[i].topics[j].activities = [];
      }
    }
  }, [unitTaxonomy])

  const addActivityHandler = (activityDetails: Activity, hierarchyType: HierarchyType, id: string) => {
    let taxonomy = structuredClone(unitTaxonomy);
    switch (hierarchyType) {
      case HierarchyType.UNIT:
        taxonomy = addActivityToUnit(taxonomy, activityDetails, id);
        break;
      case HierarchyType.MODULE:
        taxonomy = addActivityToModule(taxonomy, activityDetails, id);
        break;
      case HierarchyType.TOPIC:
        taxonomy = addActivityToTopic(taxonomy, activityDetails, id);
        break;
    }
    setUnitTaxonomy(taxonomy);
  }

  const addActivityToUnit = (taxonomy: Unit, activityDetails: Activity, id: string) => {
    let activities = taxonomy.activities;
    if (taxonomy.id === id) {
      if (!checkActivityExists(activityDetails, activities!)) taxonomy.activities?.push(activityDetails);
      else alert('Duplicate Activity Name + Type')
    }
    return taxonomy;
  }

  const addActivityToModule = (taxonomy: Unit, activityDetails: Activity, id: string) => {
    for (let i = 0; i < taxonomy?.modules.length; i++) {
      if (taxonomy?.modules[i].id === id) {
        let activities = taxonomy.modules[i].activities;
        if (!checkActivityExists(activityDetails, activities!)) taxonomy.modules[i].activities?.push(activityDetails);
        else alert('Duplicate Activity Name + Type');
        break;
      }
    }
    return taxonomy;
  }

  const addActivityToTopic = (taxonomy: Unit, activityDetails: Activity, id: string) => {
    for (let i = 0; i < taxonomy?.modules.length; i++) {
      for (let j = 0; j < (taxonomy?.modules[i].topics?.length || 0); j++) {
        if (taxonomy.modules[i].topics[j].id === id) {
          let activities = taxonomy.modules[i].topics[j].activities;
          if (!checkActivityExists(activityDetails, activities!)) taxonomy.modules[i].topics[j].activities?.push(activityDetails);
          else alert('Duplicate Activity Name + Type');
          return taxonomy;
        }
      }
    }
    return taxonomy;
  }

  const downloadTaxonomy = () => {
    const fileData = JSON.stringify(previewData);
    const blob = new Blob([fileData], { type: 'text/json' });
    const url = URL.createObjectURL(blob);
    const linkElement = document.createElement('a');
    linkElement.download = 'taxonomy-with-activities.json';
    linkElement.href = url;
    linkElement.click();
  }

  const previewData = useMemo(() => createFilteredProxy(unitTaxonomy), [unitTaxonomy]);




  return (

    <div className='ml-12 my-6  bg-white rounded-lg shadow-md  flex justify-between'>

      <div>
        {unitTaxonomy &&
          <div className='unit'>
            <h1 className='unit-title font-bold'>{unitTaxonomy.title} (Unit)</h1>
            <h2 className='font-bold'>Activities:</h2>
            <ul className="max-w-md space-y-1 list-disc list-inside">
              {unitTaxonomy.activities?.map((activity: Activity) =>
                <li key={activity.activityName + activity.activityType}>{activity.activityName} ({activity.activityType})</li>
              )}
            </ul>
            <button className="mt-2 m-2 py-3 px-6 bg-gradient-to-r from-indigo-600 to-blue-500 
            text-white font-semibold rounded-lg shadow-lg transform text-center
            transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl mx-auto 
            focus:outline-none focus:ring-2 focus:ring-indigo-300 cursor-pointer mb-8" onClick={() => setCurrentEdit({ hierarchyType: HierarchyType.UNIT, title: unitTaxonomy.title, id: unitTaxonomy.id })}>Add Activity (Unit Level)</button>

            {unitTaxonomy.modules.map(module =>
              <div className='module bg-gray-300 mb-5 p-4 rounded-xl' key={module.id}>
                <h3 className='module-title font-bold'>{module.title} (Module)</h3>
                <ul className="max-w-md space-y-1 list-disc list-inside">
                  {module.activities?.map((activity: Activity) =>
                    <li key={activity.activityName + activity.activityType}>{activity.activityName} ({activity.activityType})</li>
                  )}
                </ul>
                <button className="mt-2 m-2 py-3 px-6 bg-gradient-to-r from-indigo-600 to-blue-500 
      text-white font-semibold rounded-lg shadow-lg transform text-center
      transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl mx-auto 
      focus:outline-none focus:ring-2 focus:ring-indigo-300 cursor-pointer mb-8"onClick={() => setCurrentEdit({ hierarchyType: HierarchyType.MODULE, title: module.title, id: module.id })}>Add Activity (Module Level)</button>

                {module.topics.map(topic =>
                  <div className='topic bg-gray-200 mb-5 p-3 rounded-xl' key={topic.id}>
                    <p className='topic-title text-xl font-bold'>{topic.title} (Topic)</p>
                    <ul className="max-w-md space-y-1 list-disc list-inside ">
                      {topic.activities?.map((activity: Activity) =>
                        <li key={activity.activityName + activity.activityType}>{activity.activityName} ({activity.activityType})</li>
                      )}
                    </ul>
                    <button className="mt-2 m-2 py-3 px-6 bg-gradient-to-r from-indigo-600 to-blue-500 
      text-white font-semibold rounded-lg shadow-lg transform text-center
      transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl mx-auto 
      focus:outline-none focus:ring-2 focus:ring-indigo-300 cursor-pointer" onClick={() => setCurrentEdit({ hierarchyType: HierarchyType.TOPIC, title: topic.title, id: topic.id })}>Add Activity (Topic Level)</button>
                  </div>
                )}
              </div>

            )}
          </div>
        }
      </div>

      <div className="add-activity">
        <AddActivity hierarchyItem={currentEdit} addActivityFunc={addActivityHandler} />

        <h2 className="text-2xl font-semibold text-center mb-4 mt-5">Preview of Unit:</h2>
        <button
          onClick={downloadTaxonomy}
          className="block  py-3 px-6 bg-gradient-to-r from-indigo-600 to-blue-500 
      text-white font-semibold rounded-lg shadow-lg transform text-center
      transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl mx-auto 
      focus:outline-none focus:ring-2 focus:ring-indigo-300 cursor-pointer"



        >Download</button>

        <pre className="bg-white-800  m-auto text-blue-950 p-6 rounded-lg shadow-xl font-mono text-sm whitespace-pre-wrap ">
          {JSON.stringify(previewData, null, 2)}
        </pre>


        
      </div>


    </div>
  )

}

export default UnitDisplay;