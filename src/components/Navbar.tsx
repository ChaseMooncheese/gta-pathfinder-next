"use client";

import "./Navbar.css";
import { useContext, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { AlgorithmContext } from "../context/AlgorithmProvider";
import { SpeedContext } from "../context/SpeedProvider";
import { LatLng } from "leaflet";
import { StartEndNodeContext } from "../context/StartEndNodeProvider";
import {
  Algorithm,
  AlgorithmOptions,
  SpeedOptions,
} from "../types/PathfindingVisualizerTypes";

export default function Navbar(props: {
  visualizeFunction: (
    algorithm: Algorithm,
    startPos: LatLng,
    endPos: LatLng
  ) => void;
}) {
  const { currentAlgorithm, setCurrentAlgorithm } =
    useContext(AlgorithmContext);
  const { currentSpeed, setCurrentSpeed } = useContext(SpeedContext);
  const { startPos, endPos } = useContext(StartEndNodeContext);

  return (
    <nav className="navbar">
      <div className="nav-col">
        <a className="gta-pathfinding-visualizer-title">
          GTA V Pathfinding Visualizer
        </a>
      </div>

      <div className="nav-col">
        <button
          className="visualize-button"
          onClick={() => {
            props.visualizeFunction(currentAlgorithm, startPos, endPos);
          }}
        >
          Visualize!
        </button>
      </div>

      <div className="nav-col">
        <DropDownButton
          text="Algorithms"
          selections={AlgorithmOptions}
          setSelection={setCurrentAlgorithm}
          currSelection={currentAlgorithm}
        />
        <DropDownButton
          text="Speed"
          selections={SpeedOptions}
          setSelection={setCurrentSpeed}
          currSelection={currentSpeed}
        />
      </div>
    </nav>
  );
}

function DropDownButton(props: {
  text: string;
  selections: readonly string[];
  currSelection: string;
  setSelection: Function;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="dropdown-button"
      //onBlur={() => {
      //setOpen(false);
      //}}
    >
      <a
        className="dropdown-button-anchor"
        onClick={() => {
          setOpen(!open);
        }}
      >
        {props.text}
        <AiFillCaretDown />
      </a>

      {open && (
        <DropDownMenu
          setSelection={props.setSelection}
          items={props.selections}
          currSelection={props.currSelection}
        />
      )}
    </div>
  );
}

function DropDownMenu(props: {
  items: readonly string[];
  currSelection: string;
  setSelection: Function;
}) {
  const items = props.items.map((item, index) => {
    const isSelected = item === props.currSelection;
    return (
      <button
        className={
          "dropdown-item-button" +
          (isSelected ? " dropdown-button-selected" : "")
        }
        key={index}
        onClick={() => {
          props.setSelection(item);
        }}
      >
        {item + (isSelected ? " ✔️" : "")}
      </button>
    );
  });

  return <div className="dropdown-menu">{items}</div>;
}
