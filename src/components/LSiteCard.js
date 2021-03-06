import React, {useEffect, useState} from 'react'
import './LSiteCard.css'
import { initializeApp } from "firebase/app"
import { getDatabase, ref, child, get } from "firebase/database"
import parse from "html-react-parser";

const firebaseConfig = {
  apiKey: "AIzaSyAd3JIcPWlZ5dtllHg15Cogya9HqEs1sWE",
  authDomain: "vplusplus-8bb54.firebaseapp.com",
  databaseURL: "https://vplusplus-8bb54-default-rtdb.firebaseio.com",
  projectId: "vplusplus-8bb54",
  storageBucket: "vplusplus-8bb54.appspot.com",
  messagingSenderId: "941977342831",
  appId: "1:941977342831:web:2d69a3bd598f91ffc74e9a"
};


initializeApp(firebaseConfig);

const dbRef = ref(getDatabase());



export default function LSiteCard(props) {
  const [ lineupVideo, setlineupVideo ] = useState();
  const [ lineupName, setlineupName] = useState();
  const [ lineupDescription, setlineupDescription ] = useState();
  useEffect(() => {
    get(child(dbRef, `${props.name}/${props.site}/${props.sort}/Lineup${props.count}`)).then((snapshot) => {
      if (snapshot.exists()) {
        setlineupVideo(snapshot.val().LineupVideo);
        setlineupName(snapshot.val().LineupName);
        setlineupDescription(snapshot.val().LineupDescription);          
        } else {
          console.log("No data available");
          setlineupName("Lineup Unavailable");
          setlineupDescription("Lineup unavailable: Agent does not have any lineups in this category. Please select a point on the map to view a lineup.");
        }
        }).catch((error) => {
          console.error(error);
        }); 

        
    }, [props.sort, props.site]);

    function check(){
      if (typeof(lineupVideo) !== 'undefined'){
        return parse(lineupVideo);
      }
    }

    return (
      <div className="lsitecard">
        <div className="sitecardlineupcontainer">
          {check()}
        </div>
        <div className={props.site}>
        <div className="lsitecarddesc">
          <div className={`lsitecardheader ${props.site}`}>
            <strong className="lsitecardlineupname">{lineupName}</strong>
            <div className="lsitecarddividercontainer">
              <div className="lsitecarddivider1"></div>
              <div className="lsitecarddivider2"></div>
            </div>
            <div className="lsitecardside">{props.side}</div>
          </div>
          <p>
            <strong>{lineupDescription}</strong>
          </p>
          </div>
        </div>
      </div>
    ) 
          
}