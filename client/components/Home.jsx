import React, { Component } from 'react';
import Map from './Map.jsx';
import axios from 'axios';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 0,
            lng: 0,
            isConnect: false,
            findResult: [],
            select: {}
        }
        this.handleClick = this.handleClick.bind(this);
        this.selectMarker = this.selectMarker.bind(this);
        this.emptyMarker = this.emptyMarker.bind(this);
    }

    emptyMarker() {
        this.setState({
            select: {}
        })
    }

    selectMarker(marker) {
        this.setState({
            select: marker
        })
    }
    handleClick(event) {
        event.preventDefault();
        let food = event.target.food.value;
        food = food.toLowerCase();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(data => {
                this.setState({
                    lat: data.coords.latitude,
                    lng: data.coords.longitude
                })
                axios.post('/api/yelp/restaurant', {
                    lat: data.coords.latitude,
                    lng: data.coords.longitude,
                    food: food
                })
                    .then(res => {
                        this.setState({
                            findResult: res.data
                        })
                    })
                    .catch(console.error)
            }, error => {
                console.error(error);
            })
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleClick}>
                    <label>
                        food you are looking for :
                    </label>
                        <input type="text" name="food" required />
                    <input type="submit" value="submit" />

                </form>
                {
                    (this.state.lat !== 0 && this.state.lng !== 0 && this.state.findResult.length > 0) &&
                    (
                        <div style={{ height: '100%', width: '100%' }}>
                            <Map
                                center={{ lat: this.state.lat, lng: this.state.lng }}
                                marker={this.state.findResult}
                                handleSubmit={this.selectMarker}
                                emptyMarker={this.emptyMarker}
                                selectMarker={this.state.select}
                            />
                        </div>
                    )
                }
            </div>
        )
    }
}

export default Home;
