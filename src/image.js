import React from "react";

export default function Image(props) {
  return (
    <article className="">
      <img
        src={props.secure_url}
        alt={props.url}
        loadung="lazy"
        className="object-fit rounded-3xl"
      />
    </article>
  );
}
