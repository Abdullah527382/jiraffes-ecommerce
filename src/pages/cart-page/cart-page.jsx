import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ItemCart from "../../Components/item-cart/item";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Box from "@material-ui/core/Box";
import StripeCheckout from "react-stripe-checkout";
// Maybe use this for styling: https://material-ui.com/components/dividers/

class CartPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: [],
      u_id: null,
      total: 0,
      paid: false,
    };
  }

  handler = (changeTotal) => {
    const newTotal = this.state.total + parseFloat(changeTotal);
    this.setState({
      total: newTotal,
    });
  };

  componentDidMount() {
    fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify({
        u_id: this.props.currentUser.user.key,
      }),
    })
      .then((res) => res.json())
      .then((cart) =>
        this.setState({
          u_id: this.props.currentUser.user.key,
          cart: cart,
          total: cart.reduce(
            (a, b) => a + (b["price"] * b["quantity"] || 0),
            0
          ),
        })
      );
  }

  handleToken = (e) => {
    // Now delete the cart from the backend database and the front end state
    if (this.state.u_id) {
      fetch("/api/cart/delete", {
        method: "POST",
        body: JSON.stringify({
          u_id: this.state.u_id,
        }),
      })
        .then((res) => res.json())
        .then(() => this.setState({ cart: [], paid: true }));
      alert("Thank you for your purchase");
    }
  };

  render() {
    const user = this.props.currentUser.user;

    return (
      <div className="cart-items-display">
        <h1>
          CART PAGE FOR USER:{" "}
          {user.first_name[0].toUpperCase() + user.first_name.substring(1)}
        </h1>
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
                  Item
                </Box>
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>
                <Box fontWeight="fontWeightBold" m={1}>
                  Quantity
                </Box>
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>
                <Box fontWeight="fontWeightBold" m={1}>
                  Price
                </Box>
              </TableCell>
              <TableCell>
                <Box fontWeight="fontWeightBold" m={1}>
                  SubTotal
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.cart.map((item) => (
              <ItemCart
                handler={this.handler}
                key={item.itemId}
                user={user}
                {...item}
              ></ItemCart>
            ))}
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>
                <StripeCheckout
                  stripeKey="pk_test_51IaFUxFWys8mpEzjw5Xr5Oj03CjZAw6cXHXG28pRC1zPZ4af4ddmOR7q24cKd6jpKdBK0EPEM09DnsByfsvCUIEU009MRsgYBn"
                  token={this.handleToken}
                  amount={this.state.total * 100}
                  name={user.first_name}
                  billingAddress
                  shippingAddress
                />
              </TableCell>
              <TableCell>
                <Box fontWeight="fontWeightBold" m={1}>
                  Total:
                </Box>
              </TableCell>
              <TableCell>
                <Box fontWeight="fontWeightBold" m={1}>
                  ${Math.round(this.state.total * 100) / 100}
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user,
});

export default connect(mapStateToProps)(withRouter(CartPage));
