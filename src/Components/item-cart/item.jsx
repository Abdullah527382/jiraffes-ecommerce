import React, { useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

// The item component in a cart, this has different styling than the shop item component

const RemoveButton = withStyles({
  root: {
    background: "#FF0000",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 18,
    width: 10,
    padding: "0 30px",
  },
  label: {
    textTransform: "capitalize",
  },
})(Button);

const OperationButton = withStyles({
  root: {
    background: "#FFFF00",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "black",
    height: 18,
    width: 10,
    padding: "0px 10px",
  },
  label: {
    textTransform: "capitalize",
  },
})(Button);

const ItemCart = ({
  handler,
  user,
  itemId,
  itemName,
  img,
  price,
  quantity,
}) => {
  const [itemQuantity = quantity, setItemQuantity] = useState();

  return itemQuantity > 0 ? (
    <TableRow key={itemId}>
      <TableCell>{itemName}</TableCell>
      <TableCell>
        {" "}
        <img src={img} alt="Cart Item" width="150px" height="150px" />{" "}
      </TableCell>
      <TableCell>
        <OperationButton
          onClick={() =>
            fetch("/api/cart/item/add", {
              method: "POST",
              body: JSON.stringify({
                u_id: user.key,
                itemId: itemId,
              }),
            })
              .then(setItemQuantity(itemQuantity + 1))
              .then(() => handler(price))
          }
        >
          +
        </OperationButton>
      </TableCell>
      <TableCell>{itemQuantity}</TableCell>
      <TableCell>
        <OperationButton
          onClick={() =>
            fetch("/api/cart/item/decrease", {
              method: "POST",
              body: JSON.stringify({
                u_id: user.key,
                itemId: itemId,
              }),
            })
              .then(setItemQuantity(itemQuantity - 1))
              .then(() => handler(-price))
          }
        >
          -
        </OperationButton>
      </TableCell>
      <TableCell>
        <RemoveButton
          onClick={() =>
            fetch("/api/cart/item/remove", {
              method: "POST",
              body: JSON.stringify({
                u_id: user.key,
                itemId: itemId,
              }),
            })
              .then(setItemQuantity(0))
              .then(() => handler(-(price * itemQuantity)))
          }
        >
          Remove
        </RemoveButton>
      </TableCell>
      <TableCell>${price} </TableCell>
      <TableCell>${price * itemQuantity}</TableCell>
    </TableRow>
  ) : (
    <h1>{""}</h1>
  );
};

export default ItemCart;
