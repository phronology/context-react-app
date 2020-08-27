import React, { Component } from 'react';
import {Table, Button} from  'reactstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faThumbsDown , faThumbsUp , faImage , faMoneyCheckAlt, faSearchDollar } from '@fortawesome/free-solid-svg-icons'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading :false,
            invoices: []            
        }
        console.log(this.state.invoices)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.deletePerson = this.deletePerson.bind(this);
    }
    

    remove(id){
        console.log(id);
        let updateedInvoices = [...this.state.invoices].filter (i => i.id !== id)

        this.setState({invoices : updateedInvoices});
    }



    componentDidMount() {
        this.getPeople();
    }


    getPeople() {
        fetch("https://mgbpcdtxkb.execute-api.eu-west-2.amazonaws.com/dev")
        .then(response => response.json())
        .then(response => this.setState({ invoices: response }))
        .catch(error => console.log(error));
    };
    
    
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const email_addr = target.id
        const n = target.name
        console.log(n)
        const copy = this.state.invoices
        const found = copy.findIndex(element => element.email == email_addr)
       
        

        this.setState(prevState => {
            let inv = Object.assign({}, prevState.invoices);  
            inv[found][n] = value;              // manual_approval needs changing to a variable.. a key?                       
            return { inv };                                 
          })

        
     
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "operation": "update",
                "tableName": "context-checks-applications",
                "payload": {
                    "Item": {
                        "email": email_addr, // neccesarry for DB PK
                        [n] : value
                    }
                }
            })
        };
        console.log(requestOptions)
        fetch('https://zr36kul1lf.execute-api.eu-west-2.amazonaws.com/prod/api-dev', requestOptions)
    }
    

    deletePerson(email) {
        return () => {
          this.setState(prevState => ({
            invoices: prevState.invoices.filter(person => person.email !== email) // filtering out row by email
          }));
        };
      }
    
   
    render() { 
        const isLoading = this.state.isLoading;
        const allinvoices = this.state.invoices;

        if (isLoading)
            return(<div>Loading...</div>);

        let invoices = 
        allinvoices.map( invoice => 
            <tr key={invoice.email}>
                <td>
                    <form>
                        <input
                        type="checkbox"
                        id={invoice.email} checked={invoice.manual_approval} name="manual_approval" 
                        // value={invoice.manual_approval}
                        onChange={this.handleInputChange}
                        />
                    </form>
                </td>
                <td>
                    <form>
                        <input
                        type="checkbox"
                        id={invoice.email} checked={invoice.bolt_ons} name="bolt_ons" 
                        // value={invoice.manual_approval}
                        onChange={this.handleInputChange}
                        />
                    </form>
                </td>
                <td>{invoice.email}</td>
                <td>{invoice.reference}</td>
                <td>{invoice.environment}</td>
                <td>{invoice.name}</td>
                <td>{invoice.dob}</td>
                <td>{invoice.phone}</td>
                <td>{invoice.send_choice}</td>
                <td>{invoice.user}</td>
                {/* <td>{invoice.address}</td> */}
                <td>{invoice.scope}</td>
                <td>{invoice.mandatory}</td>
                <td>{invoice.started}</td>
                <td>{invoice.application_status}</td>
                <td>{invoice.link_expiry}</td>
                <td>{invoice.created}</td>
                <td>{invoice.completed}</td>
                <td>{invoice.result}</td>
                {/* <Button className="btn btn-sm btn-success" onClick={this.deletePerson(invoice.email)} > <FontAwesomeIcon icon={faThumbsUp} /> Save </Button> */}
            </tr>
        )

        return (
            <div className="container border-secondary rouded center">
                <div className="row">
                        <div className="col-12">
                            <h4>Application Tracker</h4>
                        </div>
                </div>
                <div className="row">
                        <div className=".col-xs-12 center text-center">
                            <Table dark responsive striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Manual Approval</th>
                                        <th>Bolt-on Checks</th>
                                        <th>Email</th>
                                        <th>Reference</th>
                                        <th>Environment</th>
                                        <th>Name</th>
                                        <th>DOB</th>
                                        <th>Phone</th>
                                        {/* <th>Address</th> */}
                                        <th>Send Choice</th>
                                        <th>Requester</th>
                                        <th>Scope</th>
                                        <th>Mandatory</th>
                                        <th>Started</th>
                                        <th>Application Status</th>
                                        <th>Link Expiry</th>
                                        <th>Created</th>
                                        <th>Completed</th>
                                        <th>Result</th>
                                        {/* <th colSpan="4">Actions</th> */}
                                        {/* <th>Image</th> */}
                                    </tr>
                                </thead>
                            <tbody>
                                {this.state.invoices.length === 0 ? <td colSpan="9">All caught up!</td> : invoices}
                            </tbody>
                            </Table>
                        </div>
                </div>
            </div>
        );
    }
}
 
export default App;





