import React ,{useState, useEffect} from "react";

import Card from "react-bootstrap/Card";
import "./styles.css";
import NavbarComponent from "../../components/navbar/navbar.component"
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

import 'chartjs-plugin-datalabels'

const DashboardComponent = () => {

  
    //name of the our tables from the database, we will get values from the fetch requests
    const [Cobas8100, setCobas8100] = useState([]);
    const [Abl, setAbl] = useState([]);
    const [SignIn, setSignIn] = useState([]);
    const [Cobas8100name, setCobas8100name] = useState([]);


    //value from the searchbar 
    const [Searchbar_value, setSearch] = useState("");


    //after you get results from binarysearch put values into these arrays
    const [displayResults, set_results] = useState([]);
    const [clearAll, setclearAll] = useState([]);


    useEffect(
        ()=> {
                fetch("api/8100")
                .then(response => {
                    return response.json();
                })
                .then(myJson => {
                    console.log(myJson);
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
                fetchData1();
                // find a better solution to this...don't want to use fetch twice....
                fetch("api/8100")
                .then(response => {
                    return response.json();
                })
                .then(myJson => {
                   console.log(myJson);
                   setCobas8100name(myJson);

                }).catch(err => console.log(err));

                //just gets the user name info- will change in the future 
                const fetchData = async ()=> {
                const res = await fetch("/api/Cobas9", {credentials: 'include'});
                res.json().then(res => setSignIn(res))
                .catch(err => console.log(err));
                }

             fetchData();
        },  [],
    )

//when you sort the arrays...
    const handleChange = event => {
        const value = event.target.value;
        const target = event.target.type
         if (target==="text") {
            setSearch(value);
        }

        function Alphabetical_Sort(databaseName,Object_Property) {
            databaseName.sort(function(a, b) {
            var nameA = a[Object_Property]   //ABCDEF caps come before lowercase (abcdef) in javascript!!
            var nameB = b[Object_Property]
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
    
                return 1;
            }
            return 0;
            });
        }

        Alphabetical_Sort(Cobas8100, "lotNum");
        Alphabetical_Sort(Abl, "lotNum");
        Alphabetical_Sort(Cobas8100name, "displayName");
       }

//defining binary serach algorithim       
    const binarySearch = (array, target, Lot) => {
        let startIndex = 0;
        let endIndex = array.length -1;

        while(startIndex <= endIndex) {
            let middleIndex = Math.floor((startIndex + endIndex) / 2);

            console.log("Line 122 target: " + target + " middleIndex: " + " " + middleIndex + ' the value ' + array[middleIndex][Lot]);

            if(target === array[middleIndex][Lot]) {
                // alert('there is a match!' + middleIndex)
                //***IMPORTANT*** make sure to put [] around the object!!!
                //since object propertys are not quite the same between them...
                if (array[middleIndex].Name) {
                    set_results([array[middleIndex]])
                    //clear the other array
                    setclearAll([]);
                }
                //seperate here, why the arrays are different
                if (array[middleIndex].displayName) {
                    setclearAll([array[middleIndex]])
                    //clear the other array
                    set_results([])
                }

                //check for duplicates by doing a linear search, the maximum number of iterations is array.length / 2

                var array_size = Math.floor((array.length) / 2);
                var copy = [];
                //for the right hand side
                for (var counter =1; counter <=array_size; counter++) {
                    var add = middleIndex+counter;
                    if (target === array[add][Lot]) {

                        copy.push(array[add]);

                        set_results(displayResults => {
                            return  ([...displayResults, ...copy]);
                        });
                    }
                }
                //for the left hand side
                for (var counter =1; counter <= array_size; counter++) {
                    var subtract = middleIndex-counter;
                    if (target === array[subtract][Lot]) {

                        copy.push(array[subtract]);
                        // console.log("ffis " + ff + " " + target + "  " + counter + " " + array[middleIndex+counter][Lot] + array[middleIndex+counter].Lot)
                        set_results(displayResults => {
                            return  ([...displayResults, ...copy]);
                        });
                    }
                }

                return console.log("Target was found at index " + middleIndex);
                
            }


            if(target < array[middleIndex][Lot]) {
                console.log("Searching the left side of array")
                endIndex = middleIndex - 1;
            }
            if(target > array[middleIndex][Lot]) {
                console.log("Searching the right side of Array")
                startIndex = middleIndex + 1;

            }
            else {
                console.log("Not Found this loop iteration. Looping another iteration.")
            
            }
        }
        console.log("Target value not found in array");
    }

    const low_quantity =   Cobas8100.filter(items=>items.quantity<100);
    const low_quantity_size = low_quantity.length;
    
    const low_quantity_Abl = Abl.filter(items=>items.quantity<100);
    const low_quantity_size_Abl = low_quantity_Abl.length;
 
    const days_left =  Cobas8100.filter(items=>items.timeLeft<100);
    const days_left_size = days_left.length;

    const handleKeyPress = (target)=> {

        if(target.charCode==13){
            set_results([]); //clear the previous search 
            binarySearch(Cobas8100, Searchbar_value, "lotNum");
            binarySearch(Cobas8100name, Searchbar_value, "displayName");
            binarySearch(Abl, Searchbar_value, "lotNum");
        }
    }

    const handleSubmit = event=> {
        binarySearch(Cobas8100, Searchbar_value,"lotNum");
        binarySearch(Cobas8100name, Searchbar_value, "displayName");
        binarySearch(Abl, Searchbar_value, "lotNum");
        event.preventdefault;
    }

    //display the search results
    const searchResults = displayResults.map(item=><div style={{padding: "30px"}}><div>Lot: {item.lotNum}</div><div>Name: {item.displayName}</div><div>Quantity: {item.quantity}</div>
        <div>Expiration Date: {item.expirationDate}</div><div>Count Per Box: {item.countPerBox}</div></div>);

    const searchResults1 = clearAll.map(item=><div style={{padding: "30px"}}><div>Lot: {item.lotNum}</div><div>Name: {item.displayName}</div><div>Quantity: {item.quantity}</div>
        <div>Expiration Date: {item.expirationDate}</div><div>Count Per Box: {item.countPerBox}</div></div>);


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

            <NavbarComponent/>
            {SignIn.length === 1 ? <h1 style={{padding:"30px"}}> {   SignIn.map(item=> <div>Hello, {item.Username}</div>)} </h1> : <h1></h1>      }


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
              placeholder="Search for Lot in Abl & Cobas8100Component  - will add more later, Lot must match exactly"
              value={Searchbar_value} onChange={handleChange} 
              onKeyPress={handleKeyPress}
            />
        </div>


{searchResults.length>=1 ? <div> {searchResults} </div>: <div>  </div>}
{searchResults1.length>=1 ? <div> {searchResults1} </div>: <div>  </div>}




            <div style={{padding: "25px" , marginLeft: "20px",  fontSize:"30px"}}> </div>
            <Container >
                <Row>  {/*
    <Col xs={6} md={4}>
    <Card style={{ width: '20rem' }} bg="danger">
    <Card.Header>Total Warnings: {low_quantity_size+days_left_size+low_quantity_size_Abl}</Card.Header>
    <ListGroup variant="flush">
    <ListGroup.Item>
    <Doughnut
          data={graph_data1}
          options={{
            title:{
              display:false,
              text:'Total Warnings',
              fontSize:20,
              barThickness: 1,
            },
            
            legend:{
              display:false,
              position:'right'
            }
          }}
        />

    </ListGroup.Item>
    <ListGroup.Item style={{color:"blue"}}>Low Quantity Total: {low_quantity_size+low_quantity_size_Abl} </ListGroup.Item>
    <ListGroup.Item style={{color:"pink"}}>Days Left Total: {days_left_size} </ListGroup.Item>
</ListGroup>
</Card></Col>
*/}


                    <Col xs={6} md={4}>
                        <Card style={{ width: '20rem', color:'white' }} bg="dark">
                            <Card.Header>Total Warnings</Card.Header>
                            <ListGroup variant="flush">
                                <h1 style={{padding: '30px', textAlign:'center'}}>Total: {low_quantity.length+low_quantity_size_Abl+days_left_size}</h1>
                                <ListGroup.Item >Abl: {low_quantity_size_Abl} </ListGroup.Item>
                                <ListGroup.Item >Architect: 0 </ListGroup.Item>
                                <ListGroup.Item>Cobas 8000: 0 </ListGroup.Item>
                                <ListGroup.Item>Cobas 8100: {low_quantity.length+days_left_size} </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>






                    <Col xs={6} md={4}>
                        <Card style={{ width: '20rem', color:'white' }} bg="dark">
                            <Card.Header>About to Expire Total</Card.Header>
                            <ListGroup variant="flush">
                                <h1 style={{padding: '30px', textAlign:'center'}}>Total: {days_left.length}</h1>
                                <ListGroup.Item>Abl: 0 </ListGroup.Item>
                                <ListGroup.Item>Architect: 0 </ListGroup.Item>
                                <ListGroup.Item>Cobas 8000: 0 </ListGroup.Item>
                                <ListGroup.Item>Cobas 8100: {days_left.length} </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>

                    <Col xs={6} md={4}>
                        <Card style={{ width: '20rem', color:"white" }} bg="dark">
                            <Card.Header>Low Quantity Total</Card.Header>
                            <ListGroup variant="flush">
                                <h1 style={{padding: '30px', textAlign:'center'}}>Total: {low_quantity.length+low_quantity_size_Abl}</h1>
                                <ListGroup.Item>Abl: {low_quantity_size_Abl} </ListGroup.Item>
                                <ListGroup.Item>Architect: 0 </ListGroup.Item>
                                <ListGroup.Item>Cobas 8000: 0 </ListGroup.Item>
                                <ListGroup.Item>Cobas 8100: {low_quantity.length} </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>



                    <Col xs={6} md={4}>
                        <Card style={{ width: '32rem', marginTop: "40px", color:"white" }} bg="dark">
                            <Card.Header>About to Expire Lots</Card.Header>
                            <ListGroup variant="flush">

                                <ListGroup.Item>

                                    <div >
                                        <Tabs defaultActiveKey="abl" id="uncontrolled-tab-example">
                                            <Tab eventKey="abl" title="Abl" >

                                                <Table striped bordered hover>
                                                    <thead>
                                                    <tr>
                                                        <th>Lot #</th>
                                                        <th>Expiration Date</th>


                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <div>Nothing yet</div>
                                                    </tbody>

                                                </Table>

                                            </Tab>
                                            <Tab eventKey="Architect" title="Architect">
                                                <div>Nothin yet</div>
                                            </Tab>
                                            <Tab eventKey="Cobas 8000" title="Cobas 8000">
                                                <div>Nothin yet</div>
                                            </Tab>
                                            <Tab eventKey="Cobas 8100" title="Cobas 8100">

                                                <Table striped bordered hover>
                                                    <thead>
                                                    <tr>
                                                        <th>Lot #</th>
                                                        <th>Days to Expiration</th>


                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {low_quantity.map(item=>   <tr> <td>{item.lotNum}   </td>
                                                            <td>{item.timeLeft}</td>

                                                        </tr>

                                                    )}
                                                    </tbody>

                                                </Table>

                                            </Tab>
                                        </Tabs>
                                    </div>



                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>


                    <Col xs={6} md={4}>
                        <Card style={{ width: '32rem',  marginTop: "40px", marginLeft:"190px", color: "white"}} bg="dark">
                            <Card.Header>Low Quantity Lots</Card.Header>
                            <ListGroup variant="flush">

                                <ListGroup.Item>

                                    <div >
                                        <Tabs defaultActiveKey="abl" id="uncontrolled-tab-example">
                                            <Tab eventKey="abl" title="Abl" >

                                                <Table striped bordered hover>
                                                    <thead>
                                                    <tr>
                                                        <th>Lot #</th>
                                                        <th>Quantity</th>


                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {low_quantity_Abl.map(item=>   <tr> <td>{item.lotNum}   </td>
                                                            <td>{item.quantity}</td>

                                                        </tr>

                                                    )}
                                                    </tbody>

                                                </Table>

                                            </Tab>
                                            <Tab eventKey="Architect" title="Architect">
                                                <div>Nothin yet</div>
                                            </Tab>
                                            <Tab eventKey="Cobas 8000" title="Cobas 8000">
                                                <div>Nothin yet</div>
                                            </Tab>
                                            <Tab eventKey="Cobas 8100" title="Cobas 8100">

                                                <Table striped bordered hover>
                                                    <thead>
                                                    <tr>
                                                        <th>Lot #</th>
                                                        <th>Quantity</th>


                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {low_quantity.map(item=>   <tr> <td>{item.lotNum}   </td>
                                                            <td>{item.quantity}</td>

                                                        </tr>

                                                    )}
                                                    </tbody>

                                                </Table>

                                            </Tab>
                                        </Tabs>
                                    </div>



                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
               </Row>
            </Container>



 

        </div>


    );
};

export default DashboardComponent;