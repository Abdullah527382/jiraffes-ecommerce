import React from "react";
import { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import CardHeader from "@material-ui/core/CardHeader";
import InputBase from "@material-ui/core/InputBase";
import StyledButton from "../styled-button/styled-button";
import ReactStars from "react-rating-stars-component";
import Rating from "@material-ui/lab/Rating";
// Generate Reviews

// A mix of backend in the frontend for this component allowed us to realise we could really
// boost up the interactivity by just using useState a lot and creating more functional components

const Review = ({ name, id, userId, userName, reviews, rating, review }) => {
  const [itemRating = rating, setItemRating] = useState();
  const [itemReview = review, setItemReview] = useState();
  const [itemReviews = reviews, setItemReviews] = useState();

  function addReview(newReview) {
    var temp = 0;
    for (var i = 0; i < reviews.length; i++) {
      var res = reviews[i].split("(!+A)");
      if (parseInt(res[3]) === parseInt(userId)) {
        temp = 1;
        reviews[i] = newReview;
        break;
      }
    }
    if (temp === 0) {
      reviews.push(newReview);
    }
    return reviews;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form");
    fetch("/api/cart/item/reviewadd", {
      method: "POST",
      body: JSON.stringify({
        u_id: userId,
        itemId: id,
        firstName: userName,
        review: itemReview,
        rating: itemRating,
      }),
    })
      .then(
        setItemReviews(
          addReview(
            itemReview +
              "(!+A)" +
              itemRating.toString() +
              "(!+A)" +
              userName +
              "(!+A)" +
              userId.toString()
          )
        )
      )
      .then((res) => res.json())
      .then((user) => {
        if (user.error) {
          alert("ERROR: " + user.error);
        } else {
          alert("Review added successfully");
        }
      });
    // make api call:
  };

  return (
    <Container maxWidth="xl" justify="center">
      <Typography component="h6" variant="h6">
        {" "}
        Your Own Review{" "}
      </Typography>
      <Grid Container xs={12} md={6} lg={10} direction="row" spacing={10}>
        <InputBase
          className="review"
          value={itemReview}
          onChange={(e) => setItemReview(e.target.value)}
          placeholder="Add Review"
          inputProps={{ "aria-label": "reivew" }}
          style={{ width: "800px", height: "50px", marginLeft: "-100px" }}
        />
      </Grid>
      <Grid Container xs={12} md={6} lg={10} direction="row" spacing={10}>
        <Typography component="h5" variant="h6">
          {" "}
          Rating:{" "}
        </Typography>
        <Rating
          name="simple-controlled"
          value={itemRating}
          onChange={(e) => setItemRating(e.target.value)}
        />
        <StyledButton
          className="reviewButton"
          style={{ marginLeft: "50px" }}
          onClick={(e) => {
            handleSubmit(e);
            alert("Thank you for your review");
          }}
        >
          Add
        </StyledButton>
      </Grid>
      <Grid Container xs={12} md={6} lg={10} direction="row" spacing={11}>
        <Typography component="h6" variant="h6">
          {" "}
          Other People's Reviews{" "}
        </Typography>
        {itemReviews.map((review) => (
          <Card
            styles={{ width: "100%", marginLeft: "40px", marginTop: "20px" }}
          >
            <CardHeader
              title={review.split("(!+A)")[2]}
              subheader={
                <ReactStars
                  count={5}
                  value={parseInt(review.split("(!+A)")[1])}
                  size={24}
                  activeColor="#ffd700"
                  edit={false}
                />
              }
              titleTypographyProps={{ align: "left" }}
              subheaderTypographyProps={{ align: "left" }}
            />
            <CardContent>
              <Typography component="h7" variant="h7">
                {" "}
                {review.split("(!+A)")[0]}{" "}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default Review;
