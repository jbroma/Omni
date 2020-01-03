import React from "react";
import Card from "./Card";

const Categories = [
  {
    name: "Housing",
    desc: "Houses, flats, rooms",
    color: "warning",
    icon: "fa-home"
  },
  {
    name: "Electronics",
    desc: "TVs, mobiles, appliances",
    color: "danger",
    icon: "fa-laptop"
  },
  {
    name: "Motors",
    desc: "Cars, motorbikes, boats",
    color: "info",
    icon: "fa-car"
  },
  {
    name: "Services",
    desc: "Occasions, transport, health",
    color: "success",
    icon: "fa-concierge-bell"
  },
  {
    name: "Jobs",
    desc: "Full-time, part-time, internships",
    color: "link",
    icon: "fa-user-tie"
  },
  {
    name: "Animals",
    desc: "Dogs, cats, bears",
    color: "grey",
    icon: "fa-dog"
  },
  {
    name: "Sport",
    desc: "Bikes, sneakers, fishing rods",
    color: "cyan",
    icon: "fa-bicycle"
  },
  {
    name: "Fashion",
    desc: "Dresses, trousers, shoes",
    color: "purple",
    icon: "fa-tshirt"
  },
  {
    name: "For kids",
    desc: "Toys, strollers, clothing",
    color: "orange",
    icon: "fa-child"
  }
];

const CategoryCards = () => {
  return (
    <div className="columns is-multiline">
      {Categories.map(category => {
        return <Card {...category} />;
      })}
    </div>
  );
};

export default CategoryCards;
