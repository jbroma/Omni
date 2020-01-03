import React from "react";
import HeroTitle from "../common/HeroTitle";

class AdSearch extends React.Component {
  render() {
    const title = "Search Results";
    return (
      <div>
        <HeroTitle title={title} />
      </div>
    );
  }
}

export default AdSearch;
