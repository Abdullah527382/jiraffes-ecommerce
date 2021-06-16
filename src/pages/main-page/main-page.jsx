import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AdminDashboard from "../../Components/admin-dashboard/admin-dashboard";
import ShopItem from "../../Components/shop-item/shop-item";
import Grid from "@material-ui/core/Grid";

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      user: null,
    };
  }

  componentDidMount() {
    fetch("/api/items")
      .then((res) => res.json())
      .then((items) =>
        this.setState({ items: items, user: this.props.currentUser.user })
      );
    // console.log(items);
  }

  render() {
    const { user, items } = this.state;
    return (
      <div>
        <h1>MAIN PAGE</h1>
        {this.state.user ? (
          <div>
            {user.admin ? (
              <div>
                <h1>
                  Welcome Admin {user.first_name} {user.key}.
                </h1>
                <AdminDashboard />
              </div>
            ) : (
              <div className="user-content">
                <h2>Recommended items for {user.first_name}.</h2>
                <Grid container justify="center" spacing={3}>
                  {items
                    .filter((item, idx) => idx < 4)
                    .map((item) => (
                      <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                        <ShopItem
                          key={item.id}
                          user={user}
                          {...item}
                        ></ShopItem>
                      </Grid>
                    ))}
                </Grid>
                <h2>Recently added/edited items.</h2>
                <Grid container justify="center" spacing={3}>
                  {items
                    .slice(0)
                    .reverse()
                    .filter((item, idx) => idx < 4)
                    .map((item) => (
                      <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                        <ShopItem
                          key={item.id}
                          user={user}
                          {...item}
                        ></ShopItem>
                      </Grid>
                    ))}
                </Grid>
              </div>
            )}
          </div>
        ) : (
          <div>
            <h1>Please sign in!</h1>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user,
});

export default connect(mapStateToProps)(withRouter(MainPage));
