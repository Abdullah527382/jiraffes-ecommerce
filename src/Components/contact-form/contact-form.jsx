import React from "react";
import Button from "@material-ui/core/Button";
import { useState } from "react";

const ContactForm = ({ userName, userId, subject, message }) => {
  // We use the useState() hook here since we are working with a functional component
  const [userSubject = subject, setUserSubject] = useState();
  const [userMessage = message, setUserMessage] = useState();

  // Handle the userMessage submit with a fetch call to the backend
  const handleSubmit = (e) => {
    e.preventDefault();
    // make api call:
    fetch("/api/item/userMessage", {
      method: "POST",
      body: JSON.stringify({
        u_id: userId,
        firstName: userName,
        subject: userSubject,
        message: userMessage,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        if (user.error) {
          alert("ERROR: " + user.error);
        } else {
          alert("Added message successfully");
        }
      });
  };

  // The actual component with the appropriate styling
  return (
    <div>
      <h1>Hello {userName}, Do you have something to share?</h1>
      <textarea
        className="subject"
        placeholder="subject"
        value={userSubject}
        style={{
          height: "25px",
          width: "50%",
        }}
        inputProps={{ "aria-label": "subject" }}
        onChange={(e) => setUserSubject(e.target.value)}
      ></textarea>
      <textarea
        placeholder="Have your Say..."
        value={userMessage}
        style={{
          height: "200px",
          width: "100%",
        }}
        onChange={(e) => setUserMessage(e.target.value)}
      ></textarea>
      <Button
        variant="contained"
        color="primary"
        onClick={(e) => {
          handleSubmit(e);
          alert(
            "Thanks for Your Feedback. It may take up to 1 week for a reply"
          );
        }}
      >
        Submit
      </Button>
    </div>
  );
};

export default ContactForm;
