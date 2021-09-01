import React, { Component } from 'react';
import {withRouter} from "react-router-dom";

class CpuFormCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                id: "",
                label: "",
                price: "",
                speed: "",
                status: "",
                description: ""
            },
        }
    }

    handleLabelChange = (event) => {
        this.setState({
            formData: {
                ...this.state.formData,
                label: event.target.value,
            }
        })
    }

    handlePriceChange = (event) => {
        this.setState({
            formData: {
                ...this.state.formData,
                price: event.target.value,
            }
        })
    }

    handleSpeedChange = (event) => {
        this.setState({
            formData: {
                ...this.state.formData,
                speed: event.target.value,
            }
        })
    }

    handleDescriptionChange = (event) => {
        this.setState({
            formData: {
                ...this.state.formData,
                description: event.target.value,
            }
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:8080/api/v1/cpus/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(this.state.formData)
        }).then(response => response.json()
        ).then(response => {
            console.log('Success', response)
            alert("Created successfully.")
            window.location.replace("http://localhost:3000/")
        }).catch((error) =>{
            console.error('Error:', error);
        })
    }

    render() {
        return (
            <form>
                <h2>Create Cpu</h2>
                <div>
                    <label>Label</label>
                    <input type={"text"} name={"label"} onChange={this.handleLabelChange} required></input>
                    <label>Price</label>
                    <input type={"text"} name={"price"} onChange={this.handlePriceChange} required></input>
                    <label>Speed</label>
                    <input type={"text"} name={"speed"} onChange={this.handleSpeedChange} required></input>
                    <label>Description</label>
                    <input type={"text"} name={"description"} onChange={this.handleDescriptionChange} required></input>
                </div>
                <button type="submit" onClick={this.handleSubmit}>Submit</button>
            </form>
        )
    }
}

export default withRouter(CpuFormCreate);