import React, { useState } from "react";
import HeroTitle from "../common/HeroTitle";
import LocationSearch from "../common/LocationSearch";

const SearchTitle = props => {
  const title = (
    <div className="search-title">
      <span className="icon">
        <i className="fas fa-search"></i>
      </span>
      <span className="title is-4">Search results for:</span>
    </div>
  );
  const subtitle = <span className="subtitle is-4">{props.query}</span>;

  return <HeroTitle title={title} subtitle={subtitle} />;
};

const AdvancedSearchBar = () => {
  return (
    <div className="columns">
      <div className="column is-full">
        <div className="notification is-white">
          <div className="columns is-multiline is-centered is-vcentered">
            <div className="column is-narrow">
              <div class="field">
                <label class="label ">Category</label>

                <p class="control has-icons-right is-expanded">
                  <input
                    list="categories"
                    className="input"
                    type="text"
                    placeholder="Category"
                  />
                  <datalist id="categories">
                    <option value="Internet Explorer" />
                    <option value="Firefox" />
                    <option value="Chrome" />
                    <option value="Opera" />
                    <option value="Safari" />
                  </datalist>
                  <span className="icon is-small is-right">
                    <i className="fas fa-chevron-down"></i>
                  </span>
                </p>
              </div>
            </div>
            <div className="column is-narrow">
              <div class="field">
                <label class="label ">Min. price</label>
                <p class="control is-expanded">
                  <input class="input" type="number" placeholder="0" />
                </p>
              </div>
            </div>
            <div className="column is-narrow">
              <div class="field">
                <label class="label ">Max price</label>
                <p class="control is-expanded">
                  <input class="input" type="number" placeholder="0" />
                </p>
              </div>
            </div>
            <div className="column is-narrow">
              <div class="field">
                <label class="label ">Sort by</label>

                <div class="select">
                  <select>
                    <option>Select dropdown</option>
                    <option>With options</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="column">
              <div class="field is-grouped is-grouped-centered">
                <div class="control">
                  <button class="button is-primary is-medium has-text-weight-bold">
                    Filter
                  </button>
                </div>
                <div class="control">
                  <button class="button is-primary is-light is-medium has-text-weight-bold">
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdvancedSearch = () => {
  const [isToggled, setToggled] = useState(false);
  const toggle = () => setToggled(!isToggled);

  return (
    <div className="columns is-centered">
      <div className="column">
        <div className="has-text centered">
          <button className="button is-primary is-fullwidth" onClick={toggle}>
            <span className=" has-text-weight-bold">Refine Search</span>
            <span className="icon">
              <i
                className={`fas fa-${
                  isToggled ? "minus" : "plus"
                }-square fa-medium`}
              ></i>
            </span>
          </button>
          {isToggled ? <AdvancedSearchBar /> : null}
        </div>
      </div>
    </div>
  );
};

const AdvertListing = () => {
  return (
    <div className="list-item columns is-mobile is-marginless">
      <div className="column is-narrow ad-image-background">
        <figure class=" image is-96x96">
          <img src="https://picsum.photos/96" />
        </figure>
      </div>
      <div className="column">
        <div className="columns">
          <div className="column">
            <span className="title is-size-3 is-pulled-right ad-price-tag">
              $1234
            </span>
            <p className="title is-5">Eyjafjallajokull</p>
            <p className="subtitle is-6 has-text-grey">For Kids</p>
            <div className="level is-mobile">
              <div>
                <div className="columns is-mobile is-vcentered">
                  <div className="column is-narrow ">
                    <span className="icon has-text-primary">
                      <i className="fas fa-map-marker-alt fa-lg"></i>
                    </span>
                  </div>
                  <div className="column is-paddingless has-text-justified">
                    <span className="">Wrocław</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="columns is-mobile is-vcentered">
                  <div className="column is-narrow">
                    <span className="icon has-text-primary">
                      <i className="fas fa-calendar-alt fa-lg"></i>
                    </span>
                  </div>
                  <div className="column has-text-justified ad-date-column">
                    <span className="">25.12.2020 15:36</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdvertList = () => {
  return (
    <div className="list is-hoverable advert-list">
      <AdvertListing />
      <AdvertListing />
      <AdvertListing />
    </div>
  );
};

const Pagination = () => {
  return (
    <div className="search-pagination">
      <nav class="pagination" role="navigation" aria-label="pagination">
        <ul class="pagination-list">
          <li>
            <a class="pagination-link " aria-label="Page 1" aria-current="page">
              1
            </a>
          </li>
          <li>
            <a class="pagination-link is-current" aria-label="Goto page 2">
              2
            </a>
          </li>
          <li>
            <a class="pagination-link" aria-label="Goto page 3">
              3
            </a>
          </li>
        </ul>
        <a class="pagination-previous" title="This is the first page">
          Previous
        </a>
        <a class="pagination-next">Next page</a>
      </nav>
    </div>
  );
};

class AdSearch extends React.Component {
  render() {
    return (
      <div>
        <SearchTitle query={"Wiedźmin 3 Xbox One nowy"} />
        <section className="container is-clipped">
          <div className="columns is-centered">
            <div className="column is-full">
              <div className="notification">
                <div className="columns is-centered">
                  <div className="column is-three-fifths">
                    <div className="field">
                      <div className="control has-icons-left">
                        <input
                          className="input is-medium"
                          type="text"
                          placeholder="E.g. Golden Retriever puppies"
                        />
                        <span className="icon is-small is-left">
                          <i className="fas fa-search fa-lg"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <LocationSearch />
                  </div>
                  <div className="column is-narrow">
                    <button className="button is-primary is-light is-medium is-fullwidth">
                      Search
                    </button>
                  </div>
                </div>
                <AdvancedSearch />
              </div>
            </div>
          </div>
          <div className="columns is-centered">
            <div className="column is-full">
              <AdvertList />
              <Pagination />
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default AdSearch;
