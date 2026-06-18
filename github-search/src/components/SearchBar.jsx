import React from 'react'

export default function SearchBar({ search, setSearch }) {
    return (
        <div>
            <input type="text" placeholder='search here...' value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
    )
}
