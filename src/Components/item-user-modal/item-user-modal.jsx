import React from "react";
import Popup from "reactjs-popup";
import "./item-user-modal.css";
import StyledButton from "../styled-button/styled-button";
import { useState } from "react";
import GlobalError from "../dismiss-error/GlobalError";
import Review from "../../Components/reviews/reviews";
import "./user-modal.css";

const contentStyle = {
  maxWidth: "600px",
  maxHeight: "500px",
  size: "fluid",
  overflow: "scroll",
};

// The item modal should act differently for user/admin
// Its just a popup, uses the reactJs popup library

const ItemModal = ({
  user,
  name,
  id,
  image,
  price,
  description,
  quantity,
  keywords,
  recscore,
  reviews,
}) => {
  // Usestate hook used here since functional component
  const [itemName = name, setItemName] = useState();
  const [itemImg = image, setItemImg] = useState();
  const [itemPrice = price, setItemPrice] = useState();
  const [itemDescription = description, setItemDescription] = useState();
  const [itemQuantity = quantity, setItemQuantity] = useState();
  const [itemKeywords = keywords, setItemKeywords] = useState();
  const [itemRecscore = recscore, setItemRecscore] = useState();
  const [error, setError] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/items/edit", {
      method: "POST",
      body: JSON.stringify({
        name: itemName,
        price: itemPrice,
        quantity: itemQuantity,
        keywords: itemKeywords,
        image: itemImg,
        description: itemDescription,
        id: id,
        recscore: itemRecscore,
        userId: user.key,
        reviews: [],
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        if (user.error) {
          alert("ERROR: " + user.error);
        } else {
          alert("Item edited successfully");
        }
      });
  };

  return (
    <Popup
      trigger={
        <StyledButton className="buttonCart" size="medium">
          {" "}
          {user.admin ? "Edit Item" : "More Info"}{" "}
        </StyledButton>
      }
      modal
      contentStyle={contentStyle}
    >
      {(close) => (
        <div className="modal-div" style={{ border: "none" }}>
          <div className="container">
            <GlobalError error={error} resetError={setError("")} />
          </div>
          <div className="modal">
            <button className="close" onClick={close}>
              &times;
            </button>
            {user.admin ? (
              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <h4>Item name</h4>
                <input
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  required
                />
                <h4>Price</h4>
                <input
                  type="text"
                  value={itemPrice}
                  onChange={(e) => setItemPrice(e.target.value)}
                  required
                />
                <h4>Quantity</h4>
                <input
                  type="text"
                  value={itemQuantity}
                  onChange={(e) => setItemQuantity(e.target.value)}
                  required
                />
                <h4>Description</h4>
                <input
                  type="text"
                  value={itemDescription}
                  onChange={(e) => setItemDescription(e.target.value)}
                  required
                />
                <h4>Image</h4>
                <input
                  type="text"
                  value={itemImg}
                  onChange={(e) => setItemImg(e.target.value)}
                  required
                />
                <h4>Keywords (Seperate by space)</h4>
                <input
                  type="text"
                  value={itemKeywords}
                  onChange={(e) => setItemKeywords(e.target.value)}
                  required
                />
                <h4>Recommend Points</h4>
                <input
                  type="text"
                  value={itemRecscore}
                  onChange={(e) => setItemRecscore(e.target.value)}
                  required
                />
              </form>
            ) : (
              <div className="content">
                {" "}
                <h3>
                  {name} ${price}
                </h3>
                <br />
                {description}
              </div>
              //
            )}
            <div
              className="control"
              style={{
                justifyContent: "center",
                margin: "auto",
                paddingTop: "25px",
              }}
            >
              {user.admin ? (
                <StyledButton
                  style={{ textAlign: "center" }}
                  className="button"
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
                >
                  Edit Item
                </StyledButton>
              ) : (
                <StyledButton
                  className="button"
                  onClick={() => {
                    close();
                  }}
                  style={{ marginLeft: "250px" }}
                >
                  Minimize
                </StyledButton>
              )}
              {user.admin ? (
                <h6>{""}</h6>
              ) : (
                <Review
                  key={id}
                  id={id}
                  name={itemName}
                  userId={user.key}
                  userName={user.first_name}
                  reviews={reviews}
                  rating={0}
                  review={""}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default ItemModal;
