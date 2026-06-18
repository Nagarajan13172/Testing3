import React from 'react'

export default function CatergoryFilter({category, setCategory}) {
  return (
    <div>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">All</option>

            <option value="beauty">Beauty</option>

            <option value="furniture">Furniture</option>

        </select>
    </div>
  )
}
