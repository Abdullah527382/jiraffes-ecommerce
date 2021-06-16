import React, { Component } from "react";
import ChatBot from "react-simple-chatbot";
import ItemModal from "../item-user-modal/item-user-modal";

// This class handles the searches through the props given
class SearchHandler extends Component {
  componentWillMount() {
    const { steps } = this.props;
    const search = steps.searchset.value;
    this.props.handleSearch(search);
  }
  // Doesnt render anything since functional
  render() {
    return null;
  }
}

// Handles the cheap filter option in the chatbot
class CheapRecHandler extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: null,
      search: "",
    };
  }

  // After mounting it sets the state for the search and cheapRec
  componentWillMount() {
    const { steps } = this.props;
    const search = steps.recset.value;
    this.setState({ search: search }, this.doCheapRec(search));
  }

  doCheapRec(search) {
    this.props.handleCheapRec(this.state);
    const items = this.props.getFilteredItems(search);
    if (items.length > 0) {
      this.setState({ product: items[0] });
    }
  }

  // It will just render the modal popup for an item to be recommended after a search
  render() {
    const { product } = this.state;
    if (product == null) {
      return null;
    }
    return (
      <ItemModal
        description={product.description}
        price={product.price}
        name={product.name}
        user={this.props.getUser()}
        reviews={product.reviews}
        id={product.id}
      />
    );
  }
}

// This is similar to the cheap alternative but instead lists an item whcih instead leaches off the trending field
class TrendRecHandler extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: null,
      search: "",
    };
  }

  componentWillMount() {
    const { steps } = this.props;
    const search = steps.recset.value;
    this.setState({ search: search }, this.doTrendRec(search));
  }

  doTrendRec(search) {
    this.props.handleTrendRec(this.state);
    const items = this.props.getFilteredItems(search);
    if (items.length > 0) {
      this.setState({ product: items[0] });
    }
  }
  // Also renders an itemModal since we want to keep this consistent
  render() {
    const { product } = this.state;
    if (product == null) {
      return null;
    }
    return (
      <ItemModal
        description={product.description}
        price={product.price}
        name={product.name}
        user={this.props.getUser()}
        reviews={product.reviews}
        id={product.id}
      />
    );
  }
}

// The config of the chatbot is initially set to true
const config = {
  floating: true,
};

// The actual chatbot
class SimpleForm extends Component {
  constructor(props) {
    super(props);
    // The state is binded in the constructor
    this.handleSearch = this.handleSearch.bind(this);
    this.handleCheapRec = this.handleCheapRec.bind(this);
    this.handleTrendRec = this.handleTrendRec.bind(this);
    this.getFilteredItems = this.getFilteredItems.bind(this);
    this.getUser = this.getUser.bind(this);
    this.getItems = this.getItems.bind(this);

    // The main change will be in the botSearch field
    this.state = {
      botSearch: "",
    };
  }

  // Handlers for the search of a value given
  handleSearch(value) {
    this.props.runSearch(value);
    this.updatePageSearch(value);
  }

  updatePageSearch(value) {
    this.props.updateSearch(value);
  }

  handleCheapRec(state) {
    const { search } = state;
    this.handleSearch(search);
    this.props.setCheapestOrder();
  }

  handleTrendRec(state) {
    const { search } = state;
    this.handleSearch(search);
    this.props.setTrendingOrder();
  }

  getItems() {
    return this.props.items;
  }

  getFilteredItems(search) {
    const items = this.getItems();
    //console.log(this.props.searchField);

    const filteredItems = items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    return filteredItems;
  }

  getUser() {
    return this.props.user;
  }

  // The actual chatbot library is used here as a component
  render() {
    // Need to see if a user is logged in before doing anything
    if (this.props.user) {
      return (
        <ChatBot
          // This value is off for the component since becomes annoying !
          speechSynthesis={{ enable: false, lang: "en" }}
          steps={[
            {
              id: "intro",
              message: "Click on the speech bubble for chat-bot assistance!",
              trigger: "waitforaccept",
            },
            {
              id: "waitforaccept",
              options: [
                {
                  value: "yeshelp",
                  label: "Hello, please help me!",
                  trigger: "home",
                },
                {
                  value: "nohelp",
                  label: "No thanks, I'm fine on my own",
                  trigger: "end",
                },
              ],
            },
            {
              id: "home",
              message: "What can I help you with?",
              trigger: "homeoptions",
            },
            {
              id: "homeoptions",
              options: [
                { value: "faq", label: "FAQ", trigger: "faqlist" },
                {
                  value: "search",
                  label: "Help me browse!",
                  trigger: "searchprompt",
                },
                {
                  value: "recommend",
                  label: "Recommend me an item!",
                  trigger: "recprompt",
                },
                { value: "done", label: "No more help needed", trigger: "end" },
              ],
            },
            {
              id: "faqlist",
              message: "Which question do you want answered?",
              trigger: "faqoptions",
            },
            {
              id: "faqoptions",
              options: [
                {
                  value: "shipping",
                  label: "What is your approach to shipping?",
                  trigger: "shipping",
                },
                {
                  value: "returns",
                  label: "Do you have a return policy?",
                  trigger: "returns",
                },
                {
                  value: "recscore",
                  label: "What does it mean if an item is highly recommended?",
                  trigger: "recscore",
                },
                { value: "done", label: "No more questions", trigger: "home" },
              ],
            },
            {
              id: "shipping",
              message:
                "We are still a small business, so we don't have many resources for shipping yet. But we'll do our best to get your order to you in a timely manner!",
              trigger: "shipping2",
            },
            {
              id: "shipping2",
              message:
                " Please allow up to 3 business days after payment for us to send your item, and then 1-3 weeks for it to arrive depending on your location.",
              trigger: "faqlist",
            },
            {
              id: "returns",
              message:
                "We don't make a habit of processing returns for change of mind at the moment, but if you really need our help returning something, please send us a message and we'll do our best to help you out!",
              trigger: "faqlist",
            },
            {
              id: "recscore",
              message:
                "An item's recommendation score can change in a few ways. A site administrator can manually alter the score, it will automatically increase when someone buys it, and it will decrease if someone tells us they don't like it.",
              trigger: "recscore2",
            },
            {
              id: "recscore2",
              message:
                " Regardless, if you're seeing an item as highly recommended, it means someone thinks it's especially good!",
              trigger: "faqlist",
            },
            {
              id: "searchprompt",
              message:
                "Ok, describe what you're looking for in one word, and I'll do my best!",
              trigger: "searchset",
            },
            {
              id: "searchset",
              user: true,
              // Error and edge case handling here in case we are given nothing or too much
              validator: (value) => {
                if (value === "") {
                  return "Please give me something to work with!";
                } else if (value.match(" ")) {
                  return "One word only, please!";
                }
                return true;
              },
              trigger: "searchdisplay",
            },
            {
              id: "searchdisplay",
              component: <SearchHandler handleSearch={this.handleSearch} />,
              trigger: "completesearch",
            },
            {
              id: "completesearch",
              message:
                "This is everything we have that matches your word. I hope it helps you browse more efficiently!",
              trigger: "homeoptions",
            },
            {
              id: "recprompt",
              message: "OK, give me a word and I'll give you an item!",
              trigger: "recset",
            },
            {
              id: "recset",
              user: true,
              validator: (value) => {
                // Error and edge case handling here in case we are given nothing or too much

                if (value === "") {
                  return "Please give me something to work with!";
                } else if (value.match(" ")) {
                  return "One word only, please!";
                }
                return true;
              },
              trigger: "recconfig",
            },
            {
              id: "recconfig",
              message: "And what type of thing are you looking for?",
              trigger: "recoptions",
            },
            {
              id: "recoptions",
              options: [
                {
                  value: "cheapest",
                  label: "The cheapest one",
                  trigger: "reccheap",
                },
                {
                  value: "recommended",
                  label: "The most popular one",
                  trigger: "rectrend",
                },
              ],
            },
            {
              id: "reccheap",
              component: (
                <CheapRecHandler
                  handleCheapRec={this.handleCheapRec}
                  getFilteredItems={this.getFilteredItems}
                  getUser={this.getUser}
                />
              ),
              trigger: "completerec",
            },
            {
              id: "rectrend",
              component: (
                <TrendRecHandler
                  handleTrendRec={this.handleTrendRec}
                  getFilteredItems={this.getFilteredItems}
                  getUser={this.getUser}
                />
              ),
              trigger: "completerec",
            },
            {
              id: "completerec",
              message:
                "Here's my best recommendation for you! I hope it helps!",
              trigger: "homeoptions",
            },
            {
              id: "end",
              message: "Okay, no problem! Have fun shopping :)",
              end: true,
            },
          ]}
          {...config}
        />
      );
    } else return null;
  }
}
// export for the component to be used in the app.js file
export default SimpleForm;
