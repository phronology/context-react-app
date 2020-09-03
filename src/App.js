import React, { Component } from 'react';
import {Table, Form} from 'react-bootstrap'
// import { Table, Button } from 'reactstrap';
import './App.css';
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faThumbsDown , faThumbsUp , faImage , faMoneyCheckAlt, faSearchDollar } from '@fortawesome/free-solid-svg-icons'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading :false,
            invoices: [],
            // noteText : 'This is where some notes will go.'
        }
        console.log(this.state.invoices)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.deletePerson = this.deletePerson.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this)
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
        fetch("https://5vm2bafsvg.execute-api.eu-west-2.amazonaws.com/prod/")
        .then(response => response.json())
        .then(response => this.setState({ invoices: response }))
        .catch(error => console.log(error));
    };
    
    
    handleInputChange(event) {
        let target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let email_addr = target.id
        let n = target.name
        console.log(n)
        let copy = this.state.invoices
        let found = copy.findIndex(element => element.email == email_addr);
        // console.log(found)


        this.setState(prevState => {
            let inv = Object.assign({}, prevState.invoices);  
            inv[found][n] = value;              // manual_approval needs changing to a variable.. a key?                       
            return { inv };                                 
          })

        
        // Headers + CORS are handled back lambda proxy
        let requestOptions = {
            method: 'POST',
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
        fetch('https://5vm2bafsvg.execute-api.eu-west-2.amazonaws.com/prod/', requestOptions)
    }


// todo UPDATE THE INPUT TEXT ///////

    handleTextChange(event) {
        let textTarget = event.target
        const email_addrText = textTarget.id
        const nText = textTarget.textArea
        // this.setState({ invoices.admin_notes : event.target.value });
        // console.log(email_addrText)
        // console.log(nText)

        let target = event.target;
        let value = target.value;
        let email_addr = target.id
        let n = target.name
        console.log(n)
        let copy = this.state.invoices
        let found = copy.findIndex(element => element.email == email_addr);
        console.log(found)

        this.setState(prevState => {
            let inv = Object.assign({}, prevState.invoices);  
            inv[found][n] = value;              // manual_approval needs changing to a variable.. a key?                       
            return { inv };                                 
        })
        
        // Headers + CORS are handled back lambda proxy
        let requestOptions = {
            method: 'POST',
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
        fetch('https://5vm2bafsvg.execute-api.eu-west-2.amazonaws.com/prod/', requestOptions)

        };
    

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
            allinvoices.map(invoice => 
            <tr  key={invoice.email}>
                <td >
                    <Form className="w" >
                        <Form.Group  controlId="exampleForm.ControlTextarea1" >
                                <Form.Control
                                    as="textarea"
                                    id={invoice.email}
                                    value={invoice.admin_notes}
                                    name="admin_notes"
                                    onChange={this.handleTextChange} />
                        </Form.Group>
                    </Form>
                    {/* <Button outline color="primary" size="sm"> Save </Button>
                    <Button outline color="secondary" size="sm"> Edit </Button> */}
                </td>
                <td className="checkboxUnit">
                    <form>
                        <input
                        type="checkbox"
                        id={invoice.email} checked={invoice.manual_approval} name="manual_approval" 
                        // value={invoice.manual_approval}
                        onChange={this.handleInputChange}
                        />
                    </form>
                </td>
                <td className="checkboxUnit">
                    <form>
                        <input
                        type="checkbox"
                        id={invoice.email} checked={invoice.bolt_ons} name="bolt_ons" 
                        // value={invoice.manual_approval}
                        onChange={this.handleInputChange}
                        />
                    </form>
                </td>
                <td className="checkboxUnit">
                    <form>
                        <input
                        type="checkbox"
                        id={invoice.email} checked={invoice.active} name="active" 
                        // value={invoice.manual_approval}
                        onChange={this.handleInputChange}
                        />
                    </form>
                </td>
                <td className="checkboxUnit">
                    <form>
                        <input
                        type="checkbox"
                        id={invoice.email} checked={invoice.report_generated} name="report_generated" 
                        // value={invoice.manual_approval}
                        onChange={this.handleInputChange}
                        />
                    </form>
                    </td>
                    <td>{invoice.invoice_number}</td>

                <td>{invoice.email}</td>
                <td>{invoice.reference}</td>
                <td>{invoice.environment}</td>
                <td>{invoice.name}</td>
                <td>{invoice.dob}</td>
                <td>{invoice.phone}</td>
                <td>{invoice.send_choice}</td>
                <td>{invoice.user}</td>
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
          <div class="container-fluid">
            <div >
                <div> 
                        <div >
                            <h4>Application Tracker</h4>
                        </div>
                </div>
            </div>
                <div >
                        <div >
                        <div>
                            <Table className="react-table"  bordered hover responsive>
                                <thead>
                                    <tr >
                                        <th >Notes</th>
                                        <th >Active</th>
                                        <th >Report Generated</th>
                                        <th >Manual Approval</th>
                                        <th >Bolt-on Checks</th>
                                        <th>Invoice Number</th>
                                        <th >Email</th>
                                        <th >Reference</th>
                                        <th >Environment</th>
                                        <th >Name</th>
                                        <th >DOB</th>
                                        <th >Phone</th>
                                        {/* <th>Address</th> */}
                                        <th >Send Choice</th>
                                        <th >Requester</th>
                                        <th >Scope</th>
                                        <th >Mandatory</th>
                                        <th >Started</th>
                                        <th >Application Status</th>
                                        <th >Link Expiry</th>
                                        <th >Created</th>
                                        <th >Completed</th>
                                        <th >Result</th>
                                        {/* <th colSpan="4">Actions</th> */}
                                        {/* <th>Image</th> */}
                                    </tr>
                                </thead>
                            <tbody>
                                {this.state.invoices.length === 0 ? <td >Loading...</td> : invoices}
                                </tbody>
                                </Table>
                            </div>
                        </div>
                      </div>
                  <AmplifySignOut />
                </div>
        );
    }
}
 
export default withAuthenticator(App, true);





