import React ,{useState, useEffect} from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Card from "react-bootstrap/Card";
import "./styles.css";
import Navbar from "../../Navbar/Navbar"
import moment from "moment";

const Dashboard = () => {
  
  const [database, setdatabase] = useState([]);
  const [database1, setdatabase1] = useState([]);
  const [Searchbar_value, setSearch] = useState("");

const [display_results, set_results] = useState([]);

  const current_time = moment().format("LT");
  const current_date = moment().format("LL");


    useEffect(
             ()=> {
           
           
            fetch("api/8100")
            .then(response => {
              return response.json();
            })
            .then(myJson => {
              console.log(myJson);
      
             setdatabase1(myJson);
            }).catch(err => console.log(err));
           
           
            const fetchData = async ()=> {
              const res = await fetch("/api/Cobas9", {credentials: 'include'});
              res.json().then(res => setdatabase(res))
              .catch(err => console.log(err));
            }
              
         fetchData();  

              },  [],
              )

              
const low_quantity =   database1.filter(items=>items.Quantity<100);  
const days_left =  database1.filter(items=>items.Time_Left<100);

const handleSubmit = event=> {
  alert('the vlaue of your search is' + Searchbar_value);
  
  event.preventdefault; 
}



const handleChange = event => {
  
  const value = event.target.value; 
  const target = event.target.type
  //console.log(value);
 // console.log(target);

if (target==="text") {
  setSearch(value);
}

//alert(database1.length);
//alert(database1[0].Lot)

// sort by Lot and also make a new array. you want to preserve the  object
var Lot_array = [];
database1.sort(function(a, b) {
  var nameA = a.Lot.toUpperCase(); // ignore upper and lowercase
  var nameB = b.Lot.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    // push the entire object into the array, but now it is ordered
    Lot_array.push(a);
    return -1;
  }
  if (nameA > nameB) {
    Lot_array.push(a);
    return 1;
  }

  // names must be equal
  Lot_array.push(a)
  return 0;
});
//alert('Lot_array length is ' + Lot_array.length)
//alert(database1[0].Lot)
const everything = database1.map(item=>item.Lot);
console.log("everything" + everything)
const show = Lot_array.map(item=>item);
//console.log('FROM line 92' + show);
const show1 = Lot_array.map(item=>item.Lot);
console.log("line 97" + show1)




const combine = [...show]; // combine the arrays
//var sorted = combine.sort(); //sort the array by alphabetical order

binarySearch(combine, value);


}


function handleKeyPress(target) {
  if(target.charCode==13){
    alert('the vlaue of your search is' + Searchbar_value);
  } 
}


const binarySearch = (array, target) => {
  let startIndex = 0;
  let endIndex = array.length - 1;
  while(startIndex <= endIndex) {
    let middleIndex = Math.floor((startIndex + endIndex) / 2);
    if(target === array[middleIndex].Lot) {

        //***IMPORTANT*** make sure to put [] around the object!!!
        set_results([array[middleIndex]])   
     
      return console.log("Target was found at index " + middleIndex);
    }
    if(target > array[middleIndex].Lot) {
      //console.log("Searching the right side of Array")
      startIndex = middleIndex + 1;
    }
    if(target < array[middleIndex].Lot) {
    //  console.log("Searching the left side of array")
      endIndex = middleIndex - 1;
    }
    else {
      console.log("Not Found this loop iteration. Looping another iteration.")
    }
  }
  
  console.log("Target value not found in array");
}  


const x = display_results.map(item=><div style={{padding: "30px"}}><div>Lot: {item.Lot}</div><div>Name: {item.Name}</div><div>Quantity: {item.Quantity}</div>
<div>Expiration Date: {item.Expiration_Date}</div>
<div>Count Per Box: {item.countPerBox}</div>
</div>);

return (
    <div>
     
<Navbar/>
 {database.length === 1 ? <h1 style={{padding:"30px"}}> {   database.map(item=> <div>Hello, {item.Username}</div>)} </h1> : <h1></h1>      }


<div style={{padding: "30px" , fontSize:"30px"}}>About to Expire or Low Quantity: </div>
<div style={{padding:"5px 30px"}}>Current Time: {current_date} {current_time}</div>


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
              placeholder="Search for Lot in Cobas8100  - will add more later, word must match exactly"
              value={Searchbar_value} onChange={handleChange} 
              onKeyPress={handleKeyPress}
            />
</div>


<div>{x}</div>




<hr></hr>

  {low_quantity.map(item=> 
      <Card
        bg="info"
        border="secondary"
        text="black"
        style={{
          width: "18rem",
          display: "inline-block",
          padding: "30px",
          margin: "20px", 
          backgroundColor: "red"
         
        }}
      >
        <Card.Header>Lot#: {item.Lot}</Card.Header>
        <Card.Body>
          <Card.Title>Quantity Left: {item.Quantity}</Card.Title>
          <Card.Text>
        Low Quantity Please Update
          </Card.Text>
        </Card.Body>
      </Card>
)}
      
      {days_left.map(item=> 
      <Card
        bg="warning"
        border="secondary"
        text="black"
        style={{
          width: "18rem",
          display: "inline-block",
          padding: "30px",
          margin: "20px", 
         
        }}
      >
        <Card.Header>Lot#: {item.Lot}</Card.Header>
        <Card.Body>
          <Card.Title>Days Left: {item.Time_Left}</Card.Title>
          <Card.Text>
          About to Expire please Update
          </Card.Text>
        </Card.Body>
      </Card>
)}  
    
    {database.length===0 ? <h1>Nothing Yet-(log in to the server to see)</h1> : <div></div>}



     
      
    </div>

    
  );
};

export default Dashboard;
