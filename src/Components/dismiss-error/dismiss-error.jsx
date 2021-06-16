import React from "react";

class DismissError extends React.Component {
  // This component is essentially just an exaggerated popup
  // Similar to https://material-ui.com/components/alert/
  render() {
    return (
      <div class="callout" data-closable>
        <button
          class="close-button"
          aria-label="Close alert"
          type="button"
          data-close
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  }
}

export default DismissError;
