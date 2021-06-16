import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ContactForm from "../../Components/contact-form/contact-form";


class ContactPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          user: null,
        };
    }

    render() {
    const user = this.props.currentUser.user;
      
  
      return (
        <ContactForm subject = {""} message = {""} userName = {user.first_name} userId = {user.key}/>
      );
    }
  }
  const mapStateToProps = (state) => ({
    currentUser: state.user,
  });
  
  export default connect(mapStateToProps)(withRouter(ContactPage));
