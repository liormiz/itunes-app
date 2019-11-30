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
         searchText : "",
         queries: []
      }
   }

   render() { 
      return (
         <div>
            <div className="elements-design">
            <h1>Search Itunes</h1>
                <ButtonSearch getSearchData={this.getSearchData} getTopTenQueries={this.getTopTenQueries}/>
            </div>
            <div className="table-size">
                {this.renderTopTenQueries()}
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

   renderTopTenQueries(){
        let data = "";

        if (this.state && this.state.queries != ""){
            data = (
                <div>
                    <h3>Top Ten Queries is: {this.state.queries} </h3>
                </div>
            )
        }

       return data;
   }

   renderTableData() 
   {
        let returnData;
        if (this.state && this.state.itunes)
        {
            returnData =  this.state.itunes.map((itune, index) => {
            const { trackId, trackName,artistId ,artistName, kind } = itune //destructuring
            return (
                <tr key={trackId}>
                    <td><a href={"/CurrentPage/"+trackId} onMouseDown={async (e) =>{
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
        else
        {
            returnData = <div></div>
        }

        return returnData;
    }



     getSearchData = (data) => {
        this.setState({
            itunes: data
        });
    }

    getTopTenQueries = (data) => {
       this.setState({
           queries: data
       });
   }
}

export default TableItunes 