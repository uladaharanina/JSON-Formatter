import React, { useState, useEffect } from "react";

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
    const taxonomy = unitTaxonomy;
    switch (hierarchyType) {
      case HierarchyType.UNIT:
        setUnitTaxonomy(addActivityToUnit(taxonomy, activityDetails, id));
        break;
      case HierarchyType.MODULE:
        setUnitTaxonomy(addActivityToModule(taxonomy, activityDetails, id));
        break;
      case HierarchyType.TOPIC:
        setUnitTaxonomy(addActivityToTopic(taxonomy, activityDetails, id));
        break;
    }
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

  return (

    <div className='container'>
      <div>
        {unitTaxonomy &&
          <div className='unit'>
            <h1 className='unit-title'>{unitTaxonomy.title} (Unit)</h1>
            <h2 className='unit-description'>{unitTaxonomy.description}</h2>
            <ul>
              {unitTaxonomy.activities?.map((activity: Activity) =>
                <li key={activity.activityName + activity.activityType}>{activity.activityName}</li>
              )}
            </ul>
            <button onClick={() => setCurrentEdit({ hierarchyType: HierarchyType.UNIT, title: unitTaxonomy.title, id: unitTaxonomy.id })}>Add Activity (Unit Level)</button>

            {unitTaxonomy.modules.map(module =>
              <div className='module' key={module.id}>
                <h3 className='module-title'>{module.title} (Module)</h3>
                <h3 className='module-description'>{module.description}</h3>
                <ul>
                  {module.activities?.map((activity: Activity) =>
                    <li key={activity.activityName + activity.activityType}>{activity.activityName}</li>
                  )}
                </ul>
                <button onClick={() => setCurrentEdit({ hierarchyType: HierarchyType.MODULE, title: module.title, id: module.id })}>Add Activity (Module Level)</button>

                {module.topics.map(topic =>
                  <div className='topic' key={topic.id}>
                    <p className='topic-title'>{topic.title} (Topic)</p>
                    <ul>
                      {topic.activities?.map((activity: Activity) =>
                        <li key={activity.activityName + activity.activityType}>{activity.activityName}</li>
                      )}
                    </ul>
                    <button onClick={() => setCurrentEdit({ hierarchyType: HierarchyType.TOPIC, title: topic.title, id: topic.id })}>Add Activity (Topic Level)</button>
                  </div>
                )}
              </div>

            )}
          </div>
        }
      </div>

      <div className="add-activity">
        <AddActivity hierarchyItem={currentEdit} addActivityFunc={addActivityHandler} />
      </div>

    </div>
  )

}

export default UnitDisplay;