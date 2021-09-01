import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import { isEmptyObject } from '../util/helper.js';

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
            errors: {
                label: "",
                price: "",
                speed: "",
                description: ""
            }
        }
    }

    handleInputChange = (event) => {
        const {name, value} = event.target
        this.setState({
                formData: {
                    ...this.state.formData,
                    [name]: value,
                }
            }
        )
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
        let errors = this.validateForm()
        if (isEmptyObject(errors)) {
            fetch(`http://localhost:8080/api/v1/cpus/${this.props.match.params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.state.formData)
            }).then(response => {
                console.log(response)
                if (!response.ok) {
                    if (response.status == 400) {
                        throw "Bad request"
                    } else {
                        throw "Internal server error"
                    }
                } else {
                    return response.json()
                }
            }).then(response => {
                alert("Cpu updated")
                this.props.history.push("/")
            }).catch(error => {
                this.setState({
                    response: error
                })
            })
        }
        else {
            this.setState({
                errors: errors
            })
        }
    }

    validateForm = () => {
        let errors = {}
        if (this.state.formData.label.trim() == "") {
            errors.label = "Label is required"
        }
        if (this.state.formData.price == "" ) {
            errors.price = "Price is required"
            // else if (type(this.state.formData.price) === ‘integer’)
        }
        if (this.state.formData.speed.trim() == "") {
            errors.speed = "Speed is required"
        }
        return errors
    }

    render() {
        return (
            <form className={"px-2"}>
                <h2>Update Cpu</h2>
                <div className={"mb-3"}>
                    <label className={"form-label"}>Label</label>
                    <input  className={"form-control"} type={"text"} name={"label"} value={this.state.formData.label}
                           onChange={this.handleInputChange}></input>
                    <div className={"text-danger"}>{this.state.errors.label}</div>
                    <label className={"form-label"}>Price</label>
                    <input className={"form-control"} type={"text"} name={"price"} value={this.state.formData.price}
                           onChange={this.handleInputChange}></input>
                    <div className={"text-danger"}>{this.state.errors.price}</div>
                    <label className={"form-label"}>Speed</label>
                    <input className={"form-control"} type={"text"} name={"speed"} value={this.state.formData.speed}
                           onChange={this.handleInputChange}></input>
                    <div className={"text-danger"}>{this.state.errors.speed}</div>
                    <label className={"form-label"}>Description</label>
                    <input className={"form-control"} type={"text"} name={"description"} value={this.state.formData.description}
                           onChange={this.handleInputChange}></input>
                    <div className={"text-danger"}>{this.state.errors.description}</div>
                </div>
                <button type="submit" onClick={this.handleSubmit}>Submit</button>
            </form>
        )
    }
}

export default withRouter(CpuFormUpdate);