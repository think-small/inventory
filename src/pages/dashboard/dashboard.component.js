import React ,{useState, useEffect} from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Card from "react-bootstrap/Card";
import "./styles.css";
import NavbarComponent from "../../components/navbar/navbar.component"
import moment from "moment";

const DashboardComponent = () => {
  
  const [database, setdatabase] = useState([]);
  const [database1, setdatabase1] = useState([]);

  const [database_1_name, setdatabase1_name] = useState([]);


  const [Searchbar_value, setSearch] = useState("");

const [display_results, set_results] = useState([]);

const [ablItems, setAblItems] = useState([]);
const [Abl, setAbl] = useState([]);

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

            
            fetch("api/8100")
            .then(response => {
              return response.json();
            })
            .then(myJson => {
              console.log(myJson);
      
             setdatabase1_name(myJson);
        
            }).catch(err => console.log(err));
           
           
            const fetchData = async ()=> {
              const res = await fetch("/api/Cobas9", {credentials: 'include'});
              res.json().then(res => setdatabase(res))
              .catch(err => console.log(err));
            }
              
         fetchData();  


         const fetchData1 = async () => {
          try {
            const res = await fetch("/api/AblComponent/all-items");
            const data = await res.json();
            setAblItems(data);
        
          } catch (err) {
            throw new Error("Unable to fetch AblComponent items");
          }
        };
        fetchData1();



              },  [],
              )

           
const low_quantity =   database1.filter(items=>items.Quantity<100);  
const days_left =  database1.filter(items=>items.Time_Left<100);

const handleSubmit = event=> {
 // alert('the value of your search is' + Searchbar_value);
  binarySearch(database1, Searchbar_value,"Lot");
  binarySearch(database_1_name, Searchbar_value, "Name");
  binarySearch(ablItems, Searchbar_value, "lotNum");
  event.preventdefault; 
}

const handleChange = event => {
  const value = event.target.value; 
  const target = event.target.type

  if (target==="text") {
  setSearch(value);
}
// When using binary search the objects must first be sorted alphabetically 
function Alphabetical_Sort(database_name,Object_Property) {
  database_name.sort(function(a, b) {
  var nameA = a[Object_Property]   //ABCDEF...Z is greator than abcdefg in javascript!!
  var nameB = b[Object_Property]
  if (nameA < nameB) {
    // push the entire object into the array, but now it is ordered

    return -1;
  }
  if (nameA > nameB) {

    return 1;
  }
  // names must be equal
    return 0; 
  
});
}
  
Alphabetical_Sort(database1, "Lot");
Alphabetical_Sort(ablItems, "lotNum");
Alphabetical_Sort(database_1_name, "Name");
console.log( database1)
console.log(ablItems);
console.log( database_1_name)


}

// for our serach we our using Binary Search
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
        setAbl([]);
    }
       //seperate here, why the arrays are different 
       if (array[middleIndex].displayName) {
           setAbl([array[middleIndex]])
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
       
            set_results(display_results => {
            return  ([...display_results, ...copy]);
            });
       }
    }
//for the left hand side     
     for (var counter =1; counter <= array_size; counter++) {
          var subtract = middleIndex-counter; 
          if (target === array[subtract][Lot]) {
           
            copy.push(array[subtract]);
           // console.log("ffis " + ff + " " + target + "  " + counter + " " + array[middleIndex+counter][Lot] + array[middleIndex+counter].Lot) 
          set_results(display_results => {
            return  ([...display_results, ...copy]);
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



function handleKeyPress(target) {
  if(target.charCode==13){
  //  alert('the vlaue of your search is' + Searchbar_value);
    //call binarysearch function 
binarySearch(database1, Searchbar_value, "Lot");
binarySearch(database_1_name, Searchbar_value, "Name");
binarySearch(ablItems, Searchbar_value, "lotNum");
  } 
}


//console.log('the length of the array is' + display_results.length);
//display the search results
const x = display_results.map(item=><div style={{padding: "30px"}}><div>Lot: {item.Lot}</div><div>Name: {item.Name}</div><div>Quantity: {item.Quantity}</div>
          <div>Expiration Date: {item.Expiration_Date}</div><div>Count Per Box: {item.countPerBox}</div></div>);

const r = Abl.map(item=><div style={{padding: "30px"}}><div>Lot: {item.lotNum}</div><div>Name: {item.displayName}</div><div>Quantity: {item.quantity}</div>
<div>Expiration Date: {item.expirationDate}</div><div>Count Per Box: {item.countPerBox}</div></div>);


return (
    <div>
     
<NavbarComponent/>
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
              placeholder="Search for Lot in Abl & Cobas8100Component  - will add more later, Lot must match exactly"
              value={Searchbar_value} onChange={handleChange} 
              onKeyPress={handleKeyPress}
            />
</div>


<div>{x}</div>
<div>{r}</div>




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

export default DashboardComponent;
