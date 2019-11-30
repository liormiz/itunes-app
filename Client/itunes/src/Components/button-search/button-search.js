import React, { Component } from 'react';
import TableItunes from "../table-itunes/table-itunes";
import './button-search.css';

class ButtonSearch extends Component {
    constructor(props) {
       super(props)
    }

    render() { 
        return (
           <div>
            <button className="btn btn-primary margin-right" type="submit" onClick={async (e) =>{
                    const res = await fetch('http://localhost:9000/itunes/topten');
                    var data = await res.json();
                    this.props.getSearchData(data.results);
            }}>top ten itunes</button>
            <div className="btn-group">
            <button className="btn btn-primary margin-right" type="submit" onClick={async (e) =>{
                debugger;
                    const res = await fetch('http://localhost:9000/queries/topten');
                    var data = await res.json();
                    let queries = "";
                    for (var i =0; i < data.length; i++){
                        queries += data[i] + ", ";
                    }

                    queries = queries.slice(0, queries.length - 2);
                    this.props.getTopTenQueries(queries);

            }}>top ten searching</button>
            <button className="btn btn-primary" type="submit" onClick={async (e) =>{
                if (this.state && this.state.searchText)
                {
                    const res = await fetch('http://localhost:9000/itunes/search/' + this.state.searchText);
                    var data = await res.json();
                    this.props.getSearchData(data.results);
                }
                else {
                    alert("u need to choose ur Search");
                }
            }}>search</button>
            <input type="text" className="margin-left" name="text" onChange={(e) => { this.setState({ searchText: e.target.value }) }}/>
            </div>
           </div>
        )
     }
}

export default ButtonSearch; 