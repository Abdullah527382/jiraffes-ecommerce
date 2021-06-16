import React from "react";
import ShopItem from "../../Components/shop-item/shop-item";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// Styles doesnt work for some reason -- FIX
import "./items-page.css";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import InputBase from "@material-ui/core/InputBase";
import { withStyles } from "@material-ui/core/styles";
import SimpleForm from "../../Components/chatbot/SimpleForm";
import StyledButton from "../../Components/styled-button/styled-button";

const SearchBar = withStyles({
  root: {
    position: "relative",
    backgroundColor: "white",
    boxShadow: "0 3px 5px 2px rgb(0,0,0, 0.1)",
    marginBottom: 20,
    borderColor: "black",
    width: "150%",
  },
})(InputBase);

class ItemsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      user: null,
      searchField: "",
      searchHistoryField: "",
      searchHistory: [],
    };
  }

  onSearchSubmit = (e) => {
    if (e.keyCode === 13) {
      this.runSearch(e.target.value);
    }
  };

  runSearch = (searchfield) => {
    const { searchField } = this.state;

    this.setState({
      searchField: searchfield,
    });

    // Fetch an api request to save search history with u_id
    // If a user is signed in, then we save the search history
    if (this.state.user) {
      if (searchField) {
        fetch("/api/user/search/add", {
          method: "POST",
          body: JSON.stringify({
            searchQuery: searchField,
            u_id: this.state.user.key,
          }),
        })
          .then((res) => res.json())
          .then((history) => {
            if (history) {
              this.setState({ searchHistory: history });
            }
          });
      } else {
        this.removeHistoryDisplay();
      }
    }
  };

  onSearchChange = (e) => {
    if (this.state.user) {
      fetch("/api/user/search/history", {
        method: "POST",
        body: JSON.stringify({
          u_id: this.state.user.key,
        }),
      })
        .then((res) => res.json())
        .then((history) => {
          if (history) {
            console.log(history);
            this.setState({ searchHistory: history });
          }
        });
      this.toggleHistory();
    }

    this.setState({ searchHistoryField: e.target.value });
  };

  componentDidMount() {
    fetch("/api/items")
      .then((res) => res.json())
      .then((items) =>
        this.setState({ items: items, user: this.props.currentUser.user })
      );
    //this.setState({ user: this.props.currentUser.user });
    if (this.state.user) {
      fetch("/api/user/search/history", {
        method: "POST",
        body: JSON.stringify({
          u_id: this.props.currentUser.user.key,
        }),
      });
    }
  }

  toggleHistory() {
    document.getElementById("myDropdown").classList.add("show");
  }

  removeHistoryDisplay() {
    document.getElementById("myDropdown").classList.remove("show");
  }

  setCheapestOrder = (e) => {
    if (this.state.user) {
      this.setState({
        items: this.state.items.sort((a, b) =>
          parseInt(a.price) > parseInt(b.price) ? 1 : -1
        ),
      });
    }
  };

  setTrendingOrder = (e) => {
    if (this.state.user) {
      this.setState({
        items: this.state.items.sort((a, b) =>
          parseInt(a.recscore) < parseInt(b.recscore) ? 1 : -1
        ),
      });
    }
  };

  setRandomItem = (e) => {
    const randomItem = this.state.items[
      Math.floor(Math.random() * this.state.items.length)
    ];

    this.setState({
      searchField: randomItem.name,
    });
  };

  updateSearch = (value) => {
    this.setState({
      searchField: value,
    });
  };

  filterButtonHighlight() {
    // Add active class to the current control button (highlight it)
    var btnContainer = document.getElementById("myBtnContainer");
    if (btnContainer) {
      var btns = btnContainer.getElementsByClassName("btn");
      for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
          var current = document.getElementsByClassName("active");
          current[0].className = current[0].className.replace(" active", "");
          this.className += " active";
        });
      }
    }
  }

  render() {
    const {
      items,
      user,
      searchField,
      searchHistory,
      searchHistoryField,
    } = this.state;
    // Map the items in a list like structure
    const filteredSearch = searchHistory.filter((search) =>
      search.toLowerCase().includes(searchHistoryField.toLowerCase())
    );
    const filteredItems = items.filter((item) =>
      item.name.toLowerCase().includes(searchField.toLowerCase())
    );

    // Add active class to the current control button (highlight it)

    this.filterButtonHighlight();

    return (
      <Container className="itemPage" maxWidth="xl">
        <Typography
          className="pageTitle"
          variant="h3"
          component="h2"
          gutterBottom
        >
          Items Page
        </Typography>
        <div className="dropdown">
          <div
            id="myBtnContainer"
            className="dropdown-control"
            style={{ display: "flex", gap: "25px" }}
          >
            <SearchBar
              justify="center"
              placeholder="Search for Item"
              inputProps={{ "aria-label": "search" }}
              onKeyDown={this.onSearchSubmit}
              onChange={this.onSearchChange}
              required
              // Replace below h1 with actual styles
            />
            <StyledButton
              className="randomSearchButton"
              onClick={this.setRandomItem}
            >
              {" "}
              Random Search
            </StyledButton>
            <button
              class="btn active"
              onClick={() =>
                this.setState({
                  searchField: "",
                })
              }
            >
              {" "}
              Show all
            </button>
            <button class="btn" onClick={this.setTrendingOrder}>
              {" "}
              Trending
            </button>
            <button class="btn" onClick={this.setCheapestOrder}>
              {" "}
              Cheapest
            </button>
          </div>

          <div id="myDropdown" className="dropdown-content">
            {this.state.searchHistory ? (
              <button
                className="close"
                onClick={() =>
                  fetch("/api/user/search/erase", {
                    method: "POST",
                    body: JSON.stringify({
                      u_id: this.props.currentUser.user.key,
                    }),
                  })
                    .then(this.setState({ searchHistory: [] }))
                    .then(this.removeHistoryDisplay())
                }
              >
                &times;
              </button>
            ) : (
              ""
            )}

            {filteredSearch
              .slice(0)
              .reverse()
              .map((search) => (
                <div className="search-history-item">
                  <button
                    onClick={() =>
                      this.setState({ searchField: search }, () => {
                        this.removeHistoryDisplay();
                      })
                    }
                  >
                    {search}
                  </button>
                </div>
              ))}
          </div>
        </div>

        <Grid container justify="center" spacing={3}>
          {filteredItems.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
              <ShopItem key={item.id} user={user} {...item}></ShopItem>
            </Grid>
          ))}
        </Grid>

        <SimpleForm
          user={this.state.user}
          items={this.state.items}
          searchField={this.state.searchField}
          runSearch={this.runSearch}
          setCheapestOrder={this.setCheapestOrder}
          setTrendingOrder={this.setTrendingOrder}
          updateSearch={this.updateSearch}
        />
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  currentUser: state.user,
});

export default connect(mapStateToProps)(withRouter(ItemsPage));
