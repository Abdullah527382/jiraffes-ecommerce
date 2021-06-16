import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Box from "@material-ui/core/Box";

class MessagesToAdmin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    fetch("/api/item/showuseradminmessage")
      .then((res) => res.json())
      .then((messages) => this.setState({ messages: messages }));
  }

  render() {
    return (
      <div>
        <h1>Messages </h1>
        <Table className="table" size="large">
          <TableHead
            className="table-head"
            style={{
              background: "linear-gradient(45deg, #128aa8 30%, #6dd5ed 90%)",
            }}
          >
            <TableRow>
              <TableCell>
                <Box fontWeight="fontWeightBold" m={1}>
                  User
                </Box>
              </TableCell>
              <TableCell>
                <Box fontWeight="fontWeightBold" m={1}>
                  User Id
                </Box>
              </TableCell>
              <TableCell>
                <Box fontWeight="fontWeightBold" m={1}>
                  Subject
                </Box>
              </TableCell>
              <TableCell>
                <Box fontWeight="fontWeightBold" m={1}>
                  Message
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.messages.map((message) => (
              <TableRow>
                <TableCell>
                  <Box fontWeight="fontWeightBold" m={1}>
                    {message.firstName}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box fontWeight="fontWeightBold" m={1}>
                    {message.u_id}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box fontWeight="fontWeightBold" m={1}>
                    {message.subject}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box fontWeight="fontWeightBold" m={1}>
                    {message.message}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default MessagesToAdmin;
