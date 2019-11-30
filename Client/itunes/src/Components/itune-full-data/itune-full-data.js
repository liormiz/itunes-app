import React, { Component } from 'react';
import './itune-full-data.css';
import ReactAudioPlayer from 'react-audio-player';
import ReactPlayer from 'react-player'

class ItunesFullData extends Component {
    constructor(props) {
       super(props);
       this.trackId = this.props.match.params.id;
    }

    render() { 
        let data;
        debugger;
        if (this.state != null && this.state.currItune != null){
            data = (
                <div>
                    <div className="form-data">
                    <h3>itunes Details</h3>
                    <table id='currItunes'>
                    <tbody>
                        <tr>
                            <td>{this.state.currItune.trackId}</td>
                            <th>Track Id</th>
                        </tr>
                        <tr>
                            <td>{this.state.currItune.trackName}</td>
                            <th>Track name</th>
                        </tr>
                        <tr>
                            <td>{this.state.currItune.artistId}</td>
                            <th>Artist Id</th>
                        </tr>
                        <tr>
                            <td>{this.state.currItune.artistName}</td>
                            <th>Artist Name</th>
                        </tr>
                        <tr>
                            <td>{this.state.currItune.wrapperType}</td>
                            <th>Type Name</th>
                        </tr>
                        <tr>
                            <td>{this.state.currItune.country}</td>
                            <th>Country</th>
                        </tr>
                        <tr>
                            <td>{this.state.currItune.releaseDate}</td>
                            <th>Release Date</th>
                        </tr>
                        <tr>
                            <td><a href={this.state.currItune.trackViewUrl}>link to song</a></td>
                            <th>Track Url</th>
                        </tr>
                    </tbody>
                </table>
{/*                 
                <ReactAudioPlayer src="https://www.youtube.com/watch?v=IW9OvRwHPR4" autoPlay controls/> */}
                <ReactPlayer url="https://itunes.apple.com/us/movie/once-upon-a-time-in-hollywood/id1473165316?ign-mpt=uo%3D4" playing />
            </div>
                </div>
              );
        }
        else{
            data = null;
        }
        return data;
     }

     async componentDidMount(){
        const res = await fetch('http://localhost:9000/itunes/'+this.trackId);
        var data = await res.json();
        this.setState({ currItune : data.results[0] })
    }
}

export default ItunesFullData; 