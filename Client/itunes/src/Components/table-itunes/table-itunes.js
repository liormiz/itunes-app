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
            {this.renderTopTenQueries()}
            {this.getFullTableData()}
            
         </div>
      )
   }
   
   getFullTableData(){
    var data = null;
    debugger;
    if (this.state && this.state.itunes && this.state.itunes    .length > 0)
    {
        var data =  (
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
        )
        }

        return data;
   }

   renderTopTenQueries(){
        let data = "";

        if (this.state && this.state.queries != ""){
            data = (
                <div className="table-size">
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
            itunes: data,
            queries : ""
        });
    }

    getTopTenQueries = (data) => {
       this.setState({
           queries: data,
           itunes : []
       });
   }
}

export default TableItunes 