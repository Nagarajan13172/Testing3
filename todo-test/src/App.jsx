import { useEffect, useMemo, useState } from 'react'

import './App.css'
import ProductList from './components/ProductList'
import SearchBar from './components/SearchBar'
import CatergoryFilter from './components/CatergoryFilter'
import Pagination from './components/Pagination'


function App() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [error , setError] = useState(null)

  const pagePerProduct = 10;


  useEffect(() => {

    const fetchProduct = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");

        const data = await response.json()

        setProducts(data.products)
      } catch (error) {
        setError("Failed to fetch products")
      }
    }

    fetchProduct();
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [search, category])


  const filteredProduct = useMemo(() => {
    return products.filter((product) => product.title.toLowerCase().includes(search.toLowerCase())).filter((product) => {
      if(category === 'all') 
        return true;

      return product.category === category
    })
  })

  const totalPage = Math.ceil(
    filteredProduct.length / pagePerProduct
  )

  const currentProduct = filteredProduct.slice(
    (currentPage - 1) * pagePerProduct ,
    currentPage * pagePerProduct
  )

  return (
    <>

      <SearchBar search={search} setSearch={setSearch}/>

      <CatergoryFilter category={category} setCategory={setCategory}/>

      <ProductList products={currentProduct}/>

      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={totalPage}/>

    </>
  )
}

export default App