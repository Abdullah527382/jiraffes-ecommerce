import React from "react";
import GlobalError from "../dismiss-error/GlobalError";

/*
  This is the form component for an admin to add an item to the website
  - Has styling for the individual components i.e. buttons, form, etc.
  - Has error handling for adding the item, in case it already exists or isn't valid
  - To see change in effect, we redirect the page to the shop page to see a new item added
  - File created by Abdullah (React) and Justin (CSS/HTML)
*/

class AdminAddItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: 0,
      quantity: 0,
      keywords: "",
      image: "",
      description: "",
      recscore: 0,
      reviews: [],
    };
    this._resetError = this._resetError.bind(this);
    this._setError = this._setError.bind(this);
  }

  onSubmitClick = async (e) => {
    e.preventDefault();

    fetch("/api/items/add", {
      method: "POST",
      body: JSON.stringify({
        name: this.state.name,
        price: this.state.price,
        quantity: this.state.quantity,
        keywords: this.state.keywords,
        image: this.state.image,
        description: this.state.description,
        recscore: this.state.recscore,
        id: null,
        reviews: this.state.reviews,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        if (user.error) {
          this.setState({ error: user.error });
        } else {
          alert("Item: " + this.state.name + " added successfully");
        }
      });
  };

  render() {
    return (
      <div className="signup" style={{ height: "500" }}>
        <div className="container">
          <GlobalError error={this.state.error} resetError={this._resetError} />
        </div>
        <h2>Add An Item</h2>
        <form>
          <h4>Item name</h4>
          <input
            type="text"
            placeholder="Item name"
            value={this.state.name}
            onChange={(e) => this.setState({ name: e.target.value })}
            required
          />
          <h4>Price</h4>
          <input
            type="text"
            placeholder="Price"
            value={this.state.price}
            onChange={(e) => this.setState({ price: e.target.value })}
            required
          />
          <h4>Quantity</h4>
          <input
            type="text"
            placeholder="Quantity"
            value={this.state.quantity}
            onChange={(e) => this.setState({ quantity: e.target.value })}
            required
          />
          <h4>Description</h4>
          <input
            type="text"
            placeholder="Description"
            value={this.state.description}
            onChange={(e) => this.setState({ description: e.target.value })}
            required
          />
          <h4>Image</h4>
          <input
            type="text"
            placeholder="Image link"
            value={this.state.image}
            onChange={(e) => this.setState({ image: e.target.value })}
            required
          />
          <h4>Keywords (Seperate by space)</h4>
          <input
            type="text"
            placeholder="Keywords"
            value={this.state.keywords}
            onChange={(e) => this.setState({ keywords: e.target.value })}
            required
          />
          <button
            onClick={this.onSubmitClick}
            type="submit"
            style={{
              color: "black",
              fontWeight: "bold",
              padding: "14px 20px",
              margin: "8px 350px",
              border: "none",
              cursor: "pointer",
              width: "30%",
              marginTop: "40px",
            }}
          >
            Add Item
          </button>
        </form>
      </div>
    );
  }

  _resetError() {
    this.setState({ error: "" });
  }

  _setError(newError) {
    this.setState({ error: newError });
  }
}

export default AdminAddItemForm;
