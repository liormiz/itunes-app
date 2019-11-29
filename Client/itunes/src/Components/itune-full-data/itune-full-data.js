import React, { Component } from 'react';
import './itune-full-data.css';

class ItunesFullData extends Component {
    constructor(props) {
       super(props);
       this.trackId = this.props.match.params.id;
    }

    render(match) { 
        return (
           <div>
               {/* {this.trackId} */}
               <div class="container">
               <h3>itunes Details</h3>
               <fieldset class="row">
                    Id
               </fieldset>
               </div>
           </div>
        )
     }

     async componentDidMount(){
        const res = await fetch('http://localhost:9000/itunes/'+this.trackId);
        var data = await res.json();
        this.setState({ itunes : data.results[0] })
    }
}

export default ItunesFullData; 