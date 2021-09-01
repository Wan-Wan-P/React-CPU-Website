import React, {Component} from "react";
import CpuFormUpdate from "./CpuFormUpdate";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

class ListCpu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            data: []
        }
    }

    componentDidMount() {
        fetch(`http://localhost:8080/api/v1/cpus`, {
            method: "GET"
        }).then(response => response.json()).then(response => {
            console.log(response)
            this.setState({
                id: response.result.id,
                data: response.result
            })
        })
    }

    handleDelete(id) {
        // eslint-disable-next-line no-restricted-globals
        if(confirm("Are you sure?")) {
            fetch(`http://localhost:8080/api/v1/cpus/${id}`, {
                method: 'DELETE'
            }).then(response => response.json()
            ).then(response => {
                if (response.result) {
                    alert("CPU deleted.")
                }
            })
        }
    }

    render() {
        return (
            <div>
                <table>
                    {this.state.data.map(item => {
                        return (<tr key={item.id}>
                            <td><Link to={`/updateCpu/${item.id}`}>{item.id}</Link></td>
                            <td>{item.label}</td>
                            <td>{item.price}</td>
                            <td>{item.speed}</td>
                            <td>{item.status}</td>
                            <td>{item.description}</td>
                            <td><a href={"http://localhost:3000/"} onClick={() => this.handleDelete(item.id)}>Delete</a></td>
                        </tr>)
                    })}
                </table>
            </div>
        );
    }
}

export default ListCpu;