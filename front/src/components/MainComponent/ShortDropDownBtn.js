import { React, useState, useEffect } from "react";

const ShortDropDownBtn = (props) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (item) => {
    setSelectedItem(item === selectedItem ? null : item);
    console.log("item selected " + item);

    handleToggle();

    props.onCheckboxChange(item);
  };

  return (
    <>
      <i
        className={`shortDDB fa-solid fa-greater-than ${
          isOpen ? "fa-rotate-270" : "fa-rotate-90"
        }`}
        onClick={handleToggle}
      ></i>
      {props.type === "abs" && isOpen && (
        <div className="items_dropdown">
          {props.items.map((item, index) => (
            <div className="align_item_dropdown" key={index}>
              <li key={index}>
                <a>{item}</a>
                <input
                  type="checkbox"
                  checked={item === selectedItem}
                  onChange={() => handleCheckboxChange(item)}
                />
              </li>
            </div>
          ))}
        </div>
      )}
      {props.type === "rela" && isOpen && (
        <div className="items_dropdown relative">
          {props.items.map((item, index) => (
            <div className="align_item_dropdown">
              <li key={index}>
                <a>{item}</a>
                <input
                  type="checkbox"
                  checked={item === selectedItem}
                  onChange={() => handleCheckboxChange(item)}
                />
              </li>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ShortDropDownBtn;
