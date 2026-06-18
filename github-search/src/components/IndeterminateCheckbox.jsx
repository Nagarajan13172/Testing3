import { useEffect, useRef, useState } from "react";

const IndeterminateCheckbox = () => {
  const technologies = [
    "React",
    "Angular",
    "Vue",
    "Svelte",
  ];

  const [selectedItems, setSelectedItems] = useState([]);

  const selectAllRef = useRef(null);

  useEffect(() => {
    if (!selectAllRef.current) return;

    selectAllRef.current.indeterminate =
      selectedItems.length > 0 &&
      selectedItems.length < technologies.length;
  }, [selectedItems]);

  const handleItemChange = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(
        selectedItems.filter(
          (selected) => selected !== item
        )
      );
    } else {
      setSelectedItems([
        ...selectedItems,
        item,
      ]);
    }
  };

  const handleSelectAll = () => {
    if (
      selectedItems.length ===
      technologies.length
    ) {
      setSelectedItems([]);
    } else {
      setSelectedItems(technologies);
    }
  };

  return (
    <div>
      <h2>Indeterminate Checkbox</h2>

      <label>
        <input
          ref={selectAllRef}
          type="checkbox"
          checked={
            selectedItems.length ===
            technologies.length
          }
          onChange={handleSelectAll}
        />
        Select All
      </label>

      <hr />

      {technologies.map((item) => (
        <div key={item}>
          <label>
            <input
              type="checkbox"
              checked={selectedItems.includes(item)}
              onChange={() =>
                handleItemChange(item)
              }
            />
            {item}
          </label>
        </div>
      ))}
    </div>
  );
};

export default IndeterminateCheckbox;