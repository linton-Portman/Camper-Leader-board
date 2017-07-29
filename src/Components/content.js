import React, { Component } from 'react';
import axios from 'axios';

class Content extends Component {

constructor(props){
super(props);

this.state = {
    latestCampersData : [],
    allTimeCampusData : [],
    latestList: []
}

this.handleClick = this.handleClick.bind(this);
  }// constructor end

  componentDidMount(){
                document.getElementById('img2').style.visibility = "hidden"
                document.getElementById('img1').style.visibility = "visible"
  }

  componentWillMount(){
   
        axios.all([this.getLatestCampers(), this.getAllTimeCampers()])
        .then(axios.spread((latest, allTime) => {
            // Both requests are now complete
            this.setState({
                latestCampersData:latest.data,
                allTimeCampusData:allTime.data,
                latestList : latest.data
            });
        }));

        

        }// end componentWillmount

    getLatestCampers() {
        return axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent');
        }

    getAllTimeCampers() {
        return axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/alltime');
        }


    handleClick(event){
           // event.target.id === 'latest' ? this.setState({latestList: this.state.latestCampersData}) : this.setState({latestList: this.state.allTimeCampusData});
            if(event.target.id === 'latest' ){
                this.setState({latestList: this.state.latestCampersData});
                document.getElementById('img2').style.visibility = "hidden"
                document.getElementById('img1').style.visibility = "visible"
            }
              if(event.target.id === 'alltime' ){
                this.setState({latestList: this.state.allTimeCampusData});
                 document.getElementById('img1').style.visibility = "hidden"
                document.getElementById('img2').style.visibility = "visible"
            }
    }

  render() {

//<a onClick={this.handleClick} id="latest">Points in the last 30 days</a><div id="img1" className="icon">

  
    return (
        <section>
            <table className=" table table-hover">
                <thead >
                    <tr >
                        <th>#</th>
                        <th id="name">Camper Name</th>
                        <th><span><a onClick={this.handleClick} id="latest">Points in the last 30 days</a><img id="img1" src="https://cdn4.iconfinder.com/data/icons/arrows-set-1-1/100/arrow1-512.png" alt=""/></span></th>
                        <th><span><a onClick={this.handleClick} id= "alltime">All time points </a><img id="img2"  src="https://cdn4.iconfinder.com/data/icons/arrows-set-1-1/100/arrow1-512.png"  alt=""/></span></th>
                    </tr>
                </thead>
                <tbody>
                 {  
                       this.state.latestList.map((obj , index) =>{
                    return(
                            <tr key={index}>
                                <td>#{index + 1}</td>
                                <td><span><img src={obj.img} alt=""/>{obj.username}</span></td>
                                <td>{obj.recent}</td>
                                <td>{obj.alltime}</td>
                            </tr>
                    )
                 })
                 }

                </tbody>
                
            </table>
        </section>
    );// end of render return
  }// end off render

}// end of class

export default Content ;