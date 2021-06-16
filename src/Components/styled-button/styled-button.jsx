import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

// The most used component was the button so we decide its best to have a consistent one
// Rather than repeating this code 100 times

const StyledButton = withStyles({
  root: {
    background: "linear-gradient(45deg, #128aa8 30%, #6dd5ed 90%)",
    border: "0",
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
  label: {
    textTransform: "capitalize",
  },
})(Button);

export default StyledButton;
