import React, { Component } from 'react';
import './table-itunes.css';
import ButtonSearch from "../button-search/button-search";
import ItunesFullData from "../itune-full-data/itune-full-data";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  
class TableItunes extends Component {
   constructor(props) {
      super(props)
      this.state = {
         itunes: [],
         searchText : ""
      }
   }

   render() { 
      return (
         <div>
            <div className="elements-design">
            <h1>Search Itunes</h1>
                <ButtonSearch getSearchData={this.getSearchData}/>
            </div>
            <div className="table-size">
                <table id='itunes'>
                    <tbody>
                        <tr>
                            <th>track Id</th>
                            <th>track Name</th>
                            <th>Artist Id</th>
                            <th>Artist Name</th>
                            <th>Type</th>
                        </tr>
                        {this.renderTableData()}
                    </tbody>
                </table>
            </div>
         </div>
      )
   }

   renderTableData() {

    return this.state.itunes.map((itune, index) => {
       const { trackId, trackName,artistId ,artistName, kind } = itune //destructuring
       return (
          <tr key={trackId}>
             <td><a href={"/CurrentPage/"+trackId} onMouseDown={async (e) =>{
                 debugger;
                 if (e.button == 0 || e.button == 1){
                  const res = await fetch('http://localhost:9000/itunes/increase-search/'+trackId);
                 }
             }}> {trackId}</a></td>
             <td>{trackName}</td>
             <td>{artistId}</td>
             <td>{artistName}</td>
             <td>{kind}</td>

          </tr>
            )
        })
    }
     getSearchData = (data) => {
        this.setState({
            itunes: data
        });
    }

    getTopTenData = (data) => {
       this.setState({
           itunes: data
       });
   }
}

export default TableItunes 