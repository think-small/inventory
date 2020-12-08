import React ,{useState, useEffect} from "react";

import Card from "react-bootstrap/Card";
import "../styles.css";
import NavbarComponent from "../../../components/navbar/navbar.component"
import moment from "moment";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

import Table from "react-bootstrap/Table";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

//add a simple chart
//import Bar from "chart.js";
import {Bar, Doughnut} from 'react-chartjs-2';
import { useHistory } from "react-router-dom";

import 'chartjs-plugin-datalabels'

const SearchBarComponent = () => {

     const history = useHistory(); 
    //name of the our tables from the database, we will get values from the fetch requests
    const [Cobas8100, setCobas8100] = useState([]);
    const [Abl, setAbl] = useState([]);
    const [Architect, setArchitect] = useState([]);

    //value from the searchbar 
   const [Searchbar_value, setSearch] = useState("");


    //after you get results put them into a new array
    const [displayResults, set_results] = useState([]);
    const [KMPresults, setKMPresults] = useState([]);
    const [KMPresults1, setKMPresults1] = useState([]);
   


    useEffect(
        ()=> {
                fetch("api/8100")
                .then(response => {
                    return response.json();
                })
                .then(myJson => {
                   
                    setCobas8100(myJson);

                }).catch(err => console.log(err));

                const fetchData1 = async () => {
                    try {
    
                        const res = await fetch("/api/ABL/all-items");
                        const data = await res.json();
                        setAbl(data);
    
                    } catch (err) {
                        throw new Error("Unable to fetch AblComponent items");
                    }
                };

                const fetchData2 = async () => {
                    try {
                      const res = await fetch("/api/Architect/all-items");
                      const data = await res.json();
                    
                      setArchitect(data);
                
                    } catch (err) {
                      throw new Error("Unable to fetch Architect items");
                    }
                  };

                fetchData1();
                fetchData2();
        },  [],
    )

// sets up the temporary array which is needed for the KMP search
function computeTemporaryArray( pattern){
  
      var lps = new Array(pattern.length); 
      var index =0;

      for(var i=1; i < pattern.length; ){
          if(pattern[i] == pattern[index]){
              lps[i] = index + 1;
              index++;
              i++;
          }else{
              if(index != 0){
                  index = lps[index-1];
              }else{
                  lps[i] =0;
                  i++;
              }
          }
      }
      return lps;
  }
  
  /**
   * KMP algorithm of pattern matching.
   */
  function  KMP(text, pattern){
      var lps = [];   
      //call the function which contains the temporary array 
      lps = computeTemporaryArray(pattern); 
    
      var i=0;
      var j=0;

      while(i < text.length && j < pattern.length){
          if(text[i] == pattern[j]){
              i++;
              j++;
          }else{
              if(j!=0){
                  j = lps[j-1];
              }else{
                  i++;
              }
          }
      }
      if(j == pattern.length){

         // text is value found from your search, then return the searchterm you found
          return text; 
      }
      return "nothing found!";
  }
      
    

const handleChange = event => {
        const value = event.target.value;
        const target = event.target.type
         if (target==="text") {
            setSearch(value);
        }
 }

// run the KMP search
function runKMP () {
      

  //  history.push({
    //    pathname: `/Search/`,
    //    search: `${Searchbar_value}`,
     
   //   });

 // temporary arrays because you cannot push directly into a hook(array)....but can indirectly using spread operators   
 var tempCobas8100 = []; 
 var tempAbl = [];
 var tempArchitect = [];

for (var i = 0; i<Cobas8100.length; i++) {
 
    if (KMP(Cobas8100[i].lotNum, Searchbar_value)===Cobas8100[i].lotNum) {
        tempCobas8100.push(Cobas8100[i]); 
    }
    if (KMP(Cobas8100[i].displayName, Searchbar_value)===Cobas8100[i].displayName) {
        tempCobas8100.push(Cobas8100[i]); 
    } 
    if (KMP(Cobas8100[i].orderID, Searchbar_value)===Cobas8100[i].orderID) {
        tempCobas8100.push(Cobas8100[i]); 
    } 
}
     set_results([]);
     set_results(displayResults =>  ([...displayResults, ...tempCobas8100]));


     

for (var g = 0; g<Abl.length; g++) { 
  
    if (KMP(Abl[g].lotNum, Searchbar_value)===Abl[g].lotNum) {
     tempAbl.push(Abl[g]); 
     
     }
    if (KMP(Abl[g].displayName, Searchbar_value)===Abl[g].displayName) {
       tempAbl.push(Abl[g]); 
     } 
    if (KMP(Abl[g].orderID, Searchbar_value)===Abl[g].orderID) {
        tempAbl.push(Abl[g]); 
    } 
 
     setKMPresults([]);
     setKMPresults(KMPresults => ([...KMPresults,...tempAbl]));
}


for (var f = 0; f<Architect.length; f++) { 
  
    if (KMP(Architect[f].lotNum, Searchbar_value)===Architect[f].lotNum) {
     tempArchitect.push(Architect[f]); 
     }
    if (KMP(Architect[f].displayName, Searchbar_value)===Architect[f].displayName) {
       tempArchitect.push(Architect[f]); 
     } 
    if (KMP(Architect[f].orderID, Searchbar_value)===Architect[f].orderID) {
        tempArchitect.push(Architect[f]); 
    } 
 
     setKMPresults1([]);
     setKMPresults1(KMPresults1 => ([...KMPresults1,...tempArchitect]));
}
if (tempArchitect.length===0 && tempAbl.length===0 && tempCobas8100.length===0 ) {
    
    return null; 

}


}

  
const [searchWarning, setsearchWarning] = useState(""); 
   
const handleKeyPress = (target)=> {
     //when you press 'ENTER' in the searchbar...
      
 if(target.charCode==13){
       
   history.push({
     pathname: `/search/`,
        search: `${Searchbar_value}`,
    });



const url = window.location.href; 
console.log(url)
var addressbar= url.split('?')[1];
console.log(addressbar);
setSearch(addressbar)
      runKMP();  
        if (Searchbar_value.length>0) {
            
            runKMP(); 
           
            if(runKMP()===null) {
                    setsearchWarning("Oh no! No results were found for " + Searchbar_value + "."); 
             }
            
            }

   
        
    }
    }



    const handleSubmit = event=> {

        if (Searchbar_value.length>0) {
        
            history.push({
                pathname: `/search/`,
                search: `${Searchbar_value}`,
               // gofoward() {runKMP()},
              });
        
        
        
        const url = window.location.href; 
        var addressbar= url.split('?');
        console.log(addressbar);



            runKMP(); 
            
            if(runKMP()===null) {
                    setsearchWarning("Oh no! No results were found for " + Searchbar_value + "."); 
             }
            
            }


       
    }

// below variables are for the quantitiy and days left in dasbhoard page
const low_quantity =   Cobas8100.length > 0 ? Cobas8100.filter(items=>items.quantity<100) : [];
const low_quantity_size = low_quantity.length;
const days_left =  Cobas8100.length > 0 ? Cobas8100.filter(items=>items.timeLeft<100) : [];
const days_left_size = days_left.length;


const low_quantity_Abl = Abl.filter(items=>items.quantity<100);
const low_quantity_size_Abl = low_quantity_Abl.length;

const low_quantity_Architect = Architect.filter(items=>items.quantity<100);
const low_quantity_size_Architect = low_quantity_Architect.length; 




// info for the pie graph 
    const graph_data1 = {

        labels: ["Low Quantity", "About to Expire"] ,
        datasets: [
            {
                label: 'Blue Caps?',
                backgroundColor: ['blue', 'pink'],
                borderColor: 'rgba(0,0,0,0)',
                borderWidth: 1,
                data: [low_quantity_size+low_quantity_size_Abl, days_left_size]
            }
        ]
    }

    return (
        <div>
<NavbarComponent />
        <div className="searchMenu">
            <div className="fas">
              <i
                className="fas fa-search"
                style={{ position: "absolute", marginBottom: "30px" }}
                onClick={handleSubmit}
    
              
              ></i>
            </div>
            <input
              className="searchBar"
              
              type="text"
              placeholder="Search by Lot, Name or Order Id"
              value={Searchbar_value} onChange={handleChange} 
              onKeyPress={handleKeyPress}
            />
        </div>


<div style={{marginTop: "20px"}}>

{displayResults.length>=1 || KMPresults.length >=1 || KMPresults1.length>=1 ?
<h2 style={{marginLeft: "15px"}}> {displayResults.length+KMPresults.length+KMPresults1.length}  Matches </h2> :
<div></div> }





{displayResults.length>=1 || KMPresults.length >=1 || KMPresults1.length>=1 ?
 <Table responsive  striped bordered hover size="lg">
  <thead>
    <tr>
       <th>Lot#</th>
      <th>Display Name</th>
      <th>Order Id</th>
      <th>Current Lot?</th>
      <th>Quantity</th>
      <th>Expiration Date</th>
      <th>Instrument Id</th>
    </tr>
  </thead>
  <tbody>
  {displayResults.map(item =>  
    <tr>
       <td>{item.lotNum}</td>
      <td>{item.displayName}</td>
      <td>{item.orderID}</td>
      <td>{item.isCurrentLot===1? <div>Yes</div> : <div>No</div>}</td>
      <td>{item.quantity}
      </td>
      <td>{item.expirationDate.split("T")[0]} </td>
      <td>{item.instrumentID}</td>
    </tr>
  )}
  {KMPresults.map(item =>  
    <tr>
       <td>{item.lotNum}</td>
      <td>{item.displayName}</td>
      <td>{item.orderID}</td>
      <td>{item.isCurrentLot===1? <div>Yes</div> : <div>No</div>}</td>
      <td>{item.quantity}</td>
      <td>{item.expirationDate.split("T")[0]} 
  
      
        </td>
      <td>{item.instrumentID}</td>
    </tr>
  )}
   {KMPresults1.map(item =>  
    <tr>
       <td>{item.lotNum}</td>
      <td>{item.displayName}</td>
      <td>{item.orderID}</td>
      <td>{item.isCurrentLot===1? <div>Yes</div> : <div>No</div>}</td>
      <td>{item.quantity}</td>
      <td>{item.expirationDate.split("T")[0]}</td>
      <td>{item.instrumentID}</td>
    </tr>
  )}
  </tbody>
</Table>  : <h2 style={{margin: "55px"}}>{searchWarning}</h2> }
</div>





 



 

        </div>


    );
};

export default SearchBarComponent;