import React, { Component } from 'react';
import {withRouter} from "react-router-dom";

class CpuFormUpdate extends Component {
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

    componentDidMount() {
        fetch(`http://localhost:8080/api/v1/cpus/${this.props.match.params.id}`, {
            method: "GET"
        }).then(response => response.json()).then(response => {
            console.log(response)
            console.log(this.props)
            console.log(this.state.formData)
            this.setState({
                id: this.props.match.params.id,
                formData: response.result
            })
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:8080/api/v1/cpus/${this.props.match.params.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(this.state.formData)
        }).then(response => response.json()
        ).then(response => {
            console.log('Success', response)
            alert("Updated successfully.")
            window.location.replace("http://localhost:3000/")
        }).catch((error) =>{
            console.error('Error:', error);
        })
    }

    render() {
        return (
            <form>
                <h2>Update Cpu</h2>
                <div>
                    <label>Label</label>
                    <input type={"text"} name={"label"} value={this.state.formData.label} onChange={this.handleLabelChange}></input>
                    <label>Price</label>
                    <input type={"text"} name={"price"} value={this.state.formData.price} onChange={this.handlePriceChange}></input>
                    <label>Speed</label>
                    <input type={"text"} name={"speed"} value={this.state.formData.speed} onChange={this.handleSpeedChange}></input>
                    <label>Description</label>
                    <input type={"text"} name={"description"} value={this.state.formData.description} onChange={this.handleDescriptionChange}></input>
                </div>
                <button type="submit" onClick={this.handleSubmit}>Submit</button>
            </form>
        )
    }
}

export default withRouter(CpuFormUpdate);