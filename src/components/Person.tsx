import React from "react";
import { Link } from "react-router-dom";
import { PersonModel } from "../models/PersonModel";

export default function Person(props: { person: PersonModel} ) {
  const { id, name: {title, first, last }, picture: {thumbnail} } = props && props.person;
  return (
    <p className="person">
      <img src={thumbnail} alt={first+last}/><Link to={`/person/${id}`}>{title} {first} {last} </Link>
    </p>
  );
}

