import React, { Component } from 'react';
import {Table, Button} from  'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown , faThumbsUp , faImage , faMoneyCheckAlt, faSearchDollar } from '@fortawesome/free-solid-svg-icons'

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
    // state = { 
    //     isLoading :false,
    //     invoices :  []
    //  }

    remove(id){
        console.log(id);
        let updateedInvoices = [...this.state.invoices].filter (i => i.id !== id)

        this.setState({invoices : updateedInvoices});
    }


    // async componentDidMount() {
    //     const response = await fetch(
    //       "https://mgbpcdtxkb.execute-api.eu-west-2.amazonaws.com/dev"
    //     );
    //     const body = await response.json();
    //     this.setState({ invoices: body, isLoading: false });
    //     console.log(this.state.invoices)
    // }

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
        let k = "email"
        const copy = this.state.invoices
        // console.log(copy[1])
        const found = copy.findIndex(element => element.email == email_addr)
        console.log(copy)
        console.log(found)
        // for (let x in this.state.invoices){
        //     console.log(typeof(x))
        // }
        console.log(value)
        console.log(this.state)
        


        // this.setState({
        //     invoices: [
        //         ...this.state.invoices,
        //         this.state.invoices[0].manual_approval = value
                        
               
        //     ],
        //   });

        
        // let key = "email";
        // console.log(key)
        // this.setState(prevState => ({
          
        //     invoices: prevState.invoices.map(
        //         el => el.key = email ? { ...el, email: email, manual_approval: value } : el

        //     )
              
          
        // }
        // ))

        this.setState(prevState => {
            // let idx = 
            let jasper = Object.assign({}, prevState.invoices);  // creating copy of state variable jasper
            jasper[found].manual_approval = value;                     // update the name property, assign a new value                 
            return { jasper };                                 // return new object jasper object
          })

        // let key = "email";
        // console.log(key)

        // this.setState(prevState => ({
            
        //     invoices: prevState.invoices.findIndex(
        //         // el => el.key === email ? { ...el, email: email, manual_approval: value } : el
                
        //         el => el.key = email ? { ...el, manual_approval: value } : el
        //     )
              
          
        // }
        // ))
     
        


        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify({ title: 'React POST Request Example' })
            body: JSON.stringify({
                "operation": "update",
                "tableName": "context-checks-applications",
                "payload": {
                    "Item": {
                        "email": email_addr,
                        "manual_approval": value
                    }
                }
            })
        };
        console.log(requestOptions)
        fetch('https://mgbpcdtxkb.execute-api.eu-west-2.amazonaws.com/dev', requestOptions)
        // .then(response => response.json())
        // .then(data => this.setState({ postId: data.id }));

        // this.setState({invoice : true})

        // this.setState(filter())

        // this.setState({ choice: value })
        // console.log(`onInput: ${this.state.choice}`)

        // this.setState(prevState =>{
        //     return{
        //          console.log(...prevState)
        //     }
        //  })
        
    
        
    }
    
    deletePerson(email) {
        return () => {
          this.setState(prevState => ({
            invoices: prevState.invoices.filter(person => person.email !== email) // filtering out row by email
          }));
        };
      }
    
    // deletePerson(manual_approval) {
    // return () => {
    //     this.setState(prevState => ({
    //     invoices: prevState.invoices.manual_approval // filtering out row by email
    //     }));
    // };
    // }

    render() { 

        const isLoading = this.state.isLoading;
        const allinvoices = this.state.invoices;

        console.log(allinvoices)

        if (isLoading)
            return(<div>Loading...</div>);

        
        let invoices = 
        allinvoices.map( invoice => 
            <tr key={invoice.email}>
                {/* <td>{invoice.}</td> */}
                <td>
                    <form>
                        <input
                        type="checkbox"
                        id={invoice.email} checked={invoice.manual_approval} // is it getting stuck in a checkbox = checked loop?
                        // value={invoice.manual_approval}
                        onChange={this.handleInputChange}
                        />
                    </form>
                    {/* <Button className="btn btn-sm btn-success" onClick={this.deletePerson(invoice.email)} > <FontAwesomeIcon icon={faThumbsUp} /> Save </Button> */}
                </td>
                {/* <td>{invoice.email}</td> */}
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





