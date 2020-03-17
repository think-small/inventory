import React from "react";

import Navbar from "../Navbar/Navbar";
import Jumbotron1 from "../Jumbotron/Jumbotron"; 

import Card_Input_main from "../Card_Input/Card_Input_main"; 
import Tables_main from "../Table/Tables_main";
import Tables2 from "../Table/Tables2"; 



const Cobas8100 = ()=> {


return (

<div>


<Navbar />
<Jumbotron1 Title="Cobas 8100"  />


<Card_Input_main route="whatever-route-in-the-future" />
  
<Tables_main />       

<Tables2 />
      

</div>



)
} 

export default Cobas8100;
