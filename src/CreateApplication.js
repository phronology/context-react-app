import React, { Component } from "react";
import { Table, Form, FormControl } from "react-bootstrap";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { Route } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Formik, ErrorMessage } from "formik";
import { Auth } from "aws-amplify";

class CreateApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: "",
      loggedUser: "",
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  getAuth = async () => {
    try {
      let user = await Auth.currentAuthenticatedUser();
      const { attributes } = user;
      return attributes.email;
    } catch (err) {
      // Handle Error Here
      console.error(err);
      console.log(err.data);
      console.log(err.status);
      console.log(err.headers);
    }
  };

  componentDidMount() {
    this.getAuth().then((value) => this.setState({ loggedUser: value }));
  }

  render() {
    return (
      <div class="container-fluid">
        <div class="row">
          <div className="createTitle">
            <h4>Create Application</h4>
          </div>
        </div>
        <div class="row  justify-content-start">
          <Formik
            initialValues={{
              email: "",
              company: "",
              invoice: "",
              trackingNotes: "",
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              // When button submits form and form is in the process of submitting, submit button is disabled
              setSubmitting(true);
              this.setState({
                values: this.state.values,
              });
              values.requestor = this.state.loggedUser;

              // Send values object to AWS Lambda
              let requestOptions = {
                method: "POST",
                body: JSON.stringify({
                  payload: {
                    values,
                  },
                }),
              };
              console.log(requestOptions);
              fetch(
                "https://lp4o2vnkx7.execute-api.eu-west-2.amazonaws.com/prod/createApplicant/",
                requestOptions
              );

              //   Simulate submitting to database, shows us values submitted, resets form
              setTimeout(() => {
                // alert(JSON.stringify(values, null, 2));
                resetForm();
                setSubmitting(false);
              }, 500);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group id="formBasicEmail">
                  <Form.Label className="formLabel">Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                </Form.Group>
                <Form.Group id="CompanySelect">
                  <Form.Label className="formLabel">Select Company</Form.Label>
                  <Form.Control
                    as="select"
                    name="company"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  >
                    <option value="" disabled selected hidden required>
                      Choose a company
                    </option>
                    <option value="sandbox">Sandbox</option>
                    <option value="digiblu" disabled="true">
                      Digiblu
                    </option>
                    <option value="purple" disabled="true">
                      Purple
                    </option>
                    <option value="context" disabled="true">
                      Context
                    </option>
                  </Form.Control>
                </Form.Group>
                <Form.Group id="InvoiceSelect">
                  <Form.Label className="formLabel">Invoice Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="invoice"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                </Form.Group>
                <Form.Group id="trackingNotes">
                  <Form.Label className="formLabel">Tracking Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="3"
                    name="trackingNotes"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}
export default withAuthenticator(CreateApplication, true);
