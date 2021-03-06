import React ,{useState, useEffect} from "react";

import Card from "react-bootstrap/Card";
import "./styles.css";

import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

//import {Bar, Doughnut} from 'react-chartjs-2';
import {Router, useLocation} from "react-router-dom";
import { useHistory } from "react-router-dom";
import { createBrowserHistory } from "history";
//This doesn't render component
import 'chartjs-plugin-datalabels'



import SearchBarComponent from "./searchbar/searchbar.component"; 
import MakeLot from "./makelot.component";



const DashboardComponent = () => {


    const [showGraph, setShowGraph] = useState(true);

    function callbackfunction (childpropvalue) 
     { setShowGraph(childpropvalue)
     }; 





    let location = useLocation(); 
    console.log(location)
    const history = createBrowserHistory();
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
      
        
        if (Searchbar_value.length>0) {
            
            

            history.push({
                pathname: `/Search/`,
                search: `${Searchbar_value}`,
             
              });
            
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
                pathname: `/Search/`,
                search: `${Searchbar_value}`,
             
              });




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

const total = low_quantity_size+low_quantity_size_Abl+low_quantity_size_Architect+days_left_size; 


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
        <Router history={history}>


{showGraph ? <div> <SearchBarComponent parentCallback={callbackfunction}/> 
   


            <Container >
                <Row>  

                    <Col xs={6} md={4}>
                        <Card bg="light" border="dark">
                            <Card.Header>Total Warnings</Card.Header>
                            <ListGroup variant="flush">
                                <h1 style={{padding: '20px', textAlign:'center'}}>Total: {total}</h1>
                                <ListGroup.Item >Abl: {low_quantity_size_Abl} </ListGroup.Item>
                                <ListGroup.Item >Architect: {low_quantity_size_Architect} </ListGroup.Item>
                                <ListGroup.Item>Cobas 8000: 0 </ListGroup.Item>
                                <ListGroup.Item>Cobas 8100: {low_quantity.length+days_left_size} </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>

                    <Col xs={6} md={4}>
                        <Card  bg="light" border="dark">
                            <Card.Header>About to Expire Total</Card.Header>
                            <ListGroup variant="flush">
                                <h1 style={{padding: '20px', textAlign:'center'}}>Total: {days_left.length}</h1>
                                <ListGroup.Item>Abl: 0 </ListGroup.Item>
                                <ListGroup.Item>Architect: 0 </ListGroup.Item>
                                <ListGroup.Item>Cobas 8000: 0 </ListGroup.Item>
                                <ListGroup.Item>Cobas 8100: {days_left.length} </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>

                    <Col xs={6} md={4}>
                        <Card bg="light" border="dark">
                            <Card.Header>Low Quantity Total</Card.Header>
                            <ListGroup variant="flush">
                                <h1 style={{padding: '20px', textAlign:'center'}}>Total: {low_quantity.length+low_quantity_size_Abl+low_quantity_size_Architect}</h1>
                                <ListGroup.Item>Abl: {low_quantity_size_Abl} </ListGroup.Item>
                                <ListGroup.Item>Architect: {low_quantity_size_Architect} </ListGroup.Item>
                                <ListGroup.Item>Cobas 8000: 0 </ListGroup.Item>
                                <ListGroup.Item>Cobas 8100: {low_quantity.length} </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>



                  
               </Row>
            </Container>
            <MakeLot />

</div>





:  <div> <SearchBarComponent parentCallback={callbackfunction}/>  </div>


}










 

</Router>


    );
};

export default DashboardComponent;