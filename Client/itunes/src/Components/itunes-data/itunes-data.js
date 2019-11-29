import React, { Component } from 'react';
import TableItunes from "../table-itunes/table-itunes";

class ItunesDataPage extends Component {
    constructor(props) {
       super(props)
       this.state = {}
    }

    render() { 
        return (
           <div>
              <TableItunes/>
           </div>
        )
     }
}

export default ItunesDataPage; 