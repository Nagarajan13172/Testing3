import { useEffect, useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar';

function App() {
    const [user, setUser] = useState([]);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("")
    const [page, setPage] = useState(1)
    const [totalCount, setTotalCount] = useState(0)


    useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedSearch(search.trim());
        setPage(1)
      }, 500)
      return () => clearTimeout(timer)
    }, [search])

    useEffect(() => {
      const fetchUser = async () => {
        if(!debouncedSearch.trim()) {
          setUser([]);
          setTotalCount(0)
          return;
        }
        try {
          const response = await fetch(`https://api.github.com/search/users?q=${debouncedSearch}&page=${page}&per_page=10`)

          const data = await response.json()

          setUser(data.items || [])
          setTotalCount(data.total_count || 0)
        } catch (error) {
          setError("User Not Found")
        }
      }

      fetchUser()
    }, [debouncedSearch, page])

    const totalPages = Math.ceil( totalCount / 10)

  return (
      <div className='container'>
        <div className='container-in'>
      <SearchBar search={search} setSearch={setSearch}/>
        {user.map((use) => (
          <li className="items" key={use?.id}>{use?.login}</li>
        ))}

        {totalPages > 1 && (
          <div>
            <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>Prev</button>
            <span>{page} / {totalPages}</span>
            <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))}>Next</button>
          </div>
        )}
        </div>
        {/* <IndeterminateCheckbox /> */}
      </div>
  )
}

export default App
