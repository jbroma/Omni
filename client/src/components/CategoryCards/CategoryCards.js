import React from "react";
import Card from "./Card";

const Categories = [
  {
    name: "Housing",
    desc: "Houses, flats, rooms",
    color: "warning",
    icon: "fa-home",
    link: "/ad/search?category=1"
  },
  {
    name: "Electronics",
    desc: "TVs, mobiles, appliances",
    color: "danger",
    icon: "fa-laptop",
    link: "/ad/search?category=2"
  },
  {
    name: "Motors",
    desc: "Cars, motorbikes, boats",
    color: "info",
    icon: "fa-car",
    link: "/ad/search?category=3"
  },
  {
    name: "Services",
    desc: "Occasions, transport, health",
    color: "success",
    icon: "fa-concierge-bell",
    link: "/ad/search?category=4"
  },
  {
    name: "Jobs",
    desc: "Full-time, part-time, internships",
    color: "link",
    icon: "fa-user-tie",
    link: "/ad/search?category=5"
  },
  {
    name: "Animals",
    desc: "Dogs, cats, bears",
    color: "grey",
    icon: "fa-dog",
    link: "/ad/search?category=6"
  },
  {
    name: "Sport",
    desc: "Bikes, sneakers, fishing rods",
    color: "cyan",
    icon: "fa-bicycle",
    link: "/ad/search?category=7"
  },
  {
    name: "Fashion",
    desc: "Dresses, trousers, shoes",
    color: "purple",
    icon: "fa-tshirt",
    link: "/ad/search?category=8"
  },
  {
    name: "For Kids",
    desc: "Toys, strollers, clothing",
    color: "orange",
    icon: "fa-child",
    link: "/ad/search?category=9"
  }
];

const CategoryCards = () => {
  return (
    <div className="columns is-multiline">
      {Categories.map(category => {
        return (
          <Card
            {...category}
            key={category.name.replace(/ /g, "_").toLowerCase()}
          />
        );
      })}
    </div>
  );
};

export default CategoryCards;
