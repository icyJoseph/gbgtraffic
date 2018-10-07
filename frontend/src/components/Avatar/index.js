import React from "react";
import { map, pipe } from "../../functional";

const split = str => str.split("");
const toDec = str => parseInt(str, 16);
const scale = val => val * Math.round(255 / 16);

export const Pixel = ({ red, green, blue }) => (
  <div
    style={{
      flex: "0 0 6px",
      height: "6px",
      background: `rgba(${red}, ${green}, ${blue}, 1)`
    }}
  />
);

export const Avatar = ({ id = "", expiry }) => {
  const valid = new Date() < new Date(expiry);
  if (!valid) {
    return null;
  }
  const joint = id.split("-").join("");
  const rawData = pipe(
    split,
    arr => map(arr, toDec),
    arr => map(arr, scale)
  )(joint);

  const pixels = Array.from({ length: 16 }, (_, i) => rawData.slice(i, i + 3));
  return (
    <div
      style={{
        display: "inline-flex",
        flexWrap: "wrap",
        width: "24px"
      }}
    >
      {pixels.map(([red, green, blue], index) => (
        <Pixel key={index} {...{ red, green, blue }} />
      ))}
    </div>
  );
};

export default Avatar;
