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
            <div className="btn-group">
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
            }}>חיפוש</button>
            <input type="text" className="margin-left" name="text" onChange={(e) => { this.setState({ searchText: e.target.value }) }}/>
            </div>
            <div>
            <button className="btn btn-primary margin-top" type="submit" onClick={async (e) =>{
                    const res = await fetch('http://localhost:9000/itunes/topten');
                    var data = await res.json();
                    this.props.getSearchData(data.results);
            }}>עשרת החיפושים המבוקשים ביותר</button>
           </div>
           </div>
        )
     }
}

export default ButtonSearch; 