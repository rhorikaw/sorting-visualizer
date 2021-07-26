import * as React from "react"

import App from "../components/App"


import "../styles.css";

// styles
const pageStyles = {
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}



// markup
class IndexPage extends React.Component{

  render(){
    return (
      <main style={pageStyles}>
        <title>Sorting Visualizer</title>
        <h1 className="center">
          Sorting Algorithm Visualizer
        </h1>
        <App></App>
      
      </main>
    )
  }
  
}

export default IndexPage
