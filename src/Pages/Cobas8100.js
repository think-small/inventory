import React from "react";

class Cobas8100 extends React.Component {
  state = {
    name: ""
  };

  componentWillMount() {
    fetch("http://localhost:8080/api/hello") //not sure why you have to type in the entire route??? instead of just /api/hello
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        console.log(myJson);
        this.setState({ name: myJson });
      });
  }

  render() {
    return <div>Hello {this.state.name}</div>;
  }
}

export default Cobas8100;
