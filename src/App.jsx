import Card from "./components/Card"
import "./styles/estilos.css"
import React, {useState, useEffect} from "react"
import axios from "axios"
import ReactPaginate from "react-paginate"

function App() {
  const [cocktails, setCocktails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage] = useState(10)
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([])
  const [productosFiltrados, setProductosFiltrados] = useState([])

  const consumientoApi = async () => {
    const response = await axios.get( `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}&p=${currentPage + 1}`)
    setCocktails(response.data.drinks);
  }

  useEffect(() => {
    const filtracion = cocktails.filter(producto => categoriasSeleccionadas.includes(producto.strCategory))
    setProductosFiltrados(filtracion)
    consumientoApi()
  },[searchTerm, categoriasSeleccionadas])

  const pageCount = Math.ceil(cocktails.length / perPage)

  const changePage = ({selected})  => {
    setCurrentPage(selected)
  }

  const filteredCocktails = cocktails.slice(currentPage * perPage, (currentPage + 1) * perPage)
  console.log(filteredCocktails)

  const handleCategoriaSeleccionada = (e) => {
    const {value, checked} = e.target 

    if(checked){
      setCategoriasSeleccionadas([...categoriasSeleccionadas, value])
    }
    else{
      setCategoriasSeleccionadas(categoriasSeleccionadas.filter(cat => cat !== value))
    }
  }

  return (
    <div className="App">
      <h1 className="text-center mt-3">TheCocktailDB</h1>

      <div className="div__up"> 
       
      <input
          type="text"
          className="form-control"
          placeholder="ingrese su coctel"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
       
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-lg-2">
            <div className="filtro">
              <h2 className="formato">Categoria de bebidas</h2>

              <div className="form-check"> 
                <label htmlFor="">
                  <input type="checkbox" onChange={handleCategoriaSeleccionada} value="Ordinary Drink" />
                  Ordinary Drink
                </label>
              </div>
              <div className="form-check"> 
                <label htmlFor="">
                  <input type="checkbox" onChange={handleCategoriaSeleccionada} value="Other / Unknown" />
                  Other / Unknown
                </label>
              </div>
              <div className="form-check"> 
                <label htmlFor="">
                  <input type="checkbox" onChange={handleCategoriaSeleccionada} value="Cocktail" />
                  Cocktail
                </label>
              </div>
              <div className="form-check"> 
                <label htmlFor="">
                  <input type="checkbox" onChange={handleCategoriaSeleccionada} value="Coffee / Tea" />
                  Coffee / Tea
                </label>
              </div>
              <div className="form-check"> 
                <label htmlFor="">
                  <input type="checkbox" onChange={handleCategoriaSeleccionada} value="Shot" />
                  Shot
                </label>
              </div>
              <div className="form-check"> 
                <label htmlFor="">
                  <input type="checkbox" onChange={handleCategoriaSeleccionada} value="Punch / Party Drink" />
                  Punch / Party Drink
                </label>
              </div>

              

            </div>
          </div>
          <div className="col-12 col-lg-10">
            <div className="container lento">  
                <div className="row">

                  {
                    productosFiltrados.length === 0 ? (
                      filteredCocktails.map((cock) => {
                        return <Card key={cock.idDrink} info={cock} />
                      })
                    ) : (
                      productosFiltrados.map((cock) => {
                        return <Card key={cock.idDrin} info={cock} />
                      })
                    )
                  }

                </div>
            </div>

           
          </div>

          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"pagination"}
            previousLinkClassName={"previous-page"}
            nextLinkClassName={"next-page"}
            disabledClassName={"pagination-disabled"}
            activeClassName={"pagination-active"}
          />     

        </div>
      </div>

    </div>
  )
}

export default App
