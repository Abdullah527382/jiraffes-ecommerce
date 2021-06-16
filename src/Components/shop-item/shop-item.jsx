import React from "react";
import "./shop-item.css";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ItemModal from "../item-user-modal/item-user-modal";
import StyledButton from "../styled-button/styled-button";

const ShopItem = ({
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
}) => (
  <Card className="hello">
    <CardContent>
      <div className="image">
        <img alt="product" src={image} />
      </div>
      <Typography className="title" variant="h5" component="h2">
        {name}
      </Typography>
      <Typography className="price" color="textSecondary">
        $ {price}
      </Typography>
    </CardContent>
    <CardActions className="buttonGrid">
      {user ? (
        user.admin ? (
          <div className="admin-buttons" style={{ margin: 0 + "auto" }}>
            <ItemModal
              description={description}
              price={price}
              name={name}
              user={user}
              id={id}
              image={image}
              quantity={quantity}
              keywords={keywords}
              recscore={recscore}
              reviews={reviews}
            />
            <StyledButton
              className="buttonCart"
              size="small"
              onClick={() =>
                fetch("/api/item/remove", {
                  method: "POST",
                  body: JSON.stringify({
                    itemId: id,
                  }),
                })
                  .then((res) => res.json())
                  .then((user) => {
                    if (user.error) {
                      alert("ERROR: " + user.error);
                    } else {
                      alert("Item removed successfully");
                    }
                  })
              }
            >
              Delete Item
            </StyledButton>
          </div>
        ) : (
          <div className="user-buttons">
            <StyledButton
              className="buttonCart"
              size="small"
              onClick={() =>
                fetch("/api/cart/item/add", {
                  method: "POST",
                  body: JSON.stringify({
                    u_id: user.key,
                    itemId: id,
                  }),
                })
              }
            >
              Add to cart
            </StyledButton>
            <ItemModal
              description={description}
              price={price}
              name={name}
              user={user}
              reviews={reviews}
              id={id}
            />
          </div>
        )
      ) : (
        <h1>{""}</h1>
      )}
    </CardActions>
  </Card>
);

export default ShopItem;
