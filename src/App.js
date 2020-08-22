import React, { Component } from 'react';
import {Table, Button} from  'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp, faImage, faMoneyCheckAlt, faSearchDollar } from '@fortawesome/free-solid-svg-icons'
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';


class App extends Component {

    state = { 
        isLoading :false,
        invoices :  []
     }

    remove(id){
        console.log(id);
        let updateedInvoices = [...this.state.invoices].filter (i => i.id !== id)

        this.setState({invoices : updateedInvoices});
    }


    async componentDidMount() {
        const response = await fetch(
          "https://mgbpcdtxkb.execute-api.eu-west-2.amazonaws.com/dev"
        );
        const body = await response.json();
        this.setState({ invoices: body, isLoading: false });
    }
    
      

    render() { 

        const isLoading = this.state.isLoading;
        const allinvoices = this.state.invoices;



        if (isLoading)
            return(<div>Loading...</div>);


        let invoices = 
        allinvoices.map( invoice => 
            <tr key={invoice.email}>
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
                {/* <td><Button className="btn btn-lg btn-success" onClick={ () => this.remove(invoice.email)} > <FontAwesomeIcon icon={faThumbsUp} /> OK </Button></td>
                <td><Button className="btn btn-lg btn-danger" onClick={ () => this.remove(invoice.email)} > <FontAwesomeIcon icon={faThumbsDown} /> NOK </Button></td>
                <td><Button className="btn btn-lg btn-info" onClick={ () => this.remove(invoice.email)} > <FontAwesomeIcon icon={faMoneyCheckAlt} /> 50% </Button></td>
                <td><Button className="btn btn-lg btn-warning" onClick={ () => this.remove(invoice.email)} ><FontAwesomeIcon icon={faSearchDollar} /> ?? </Button></td>
                <td><Button className="btn btn-lg btn-info" onClick={ () => this.remove(invoice.email)} > <FontAwesomeIcon icon={faImage} /> Image </Button></td> */}
            </tr>
        )

        return (
            
            <div className="container border border-secondary rouded center">

                <div className="row">
                        <div className="col-12">
                            <h4>Pending Invoices - The Test Comapny</h4>
                        </div>
                </div>

                <div className="row">
                        <div className=".col-xs-12 center text-center">
                            <Table dark responsive striped bordered hover>
                                <thead>
                                    <tr>
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
 
export default withAuthenticator(App);





