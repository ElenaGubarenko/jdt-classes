// import { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from "./Routes/routes"
import Container from "./Components/Container"
import Homepage from './Components/Homepage'
import AddProductPage from './Components/AddProductPage'
import Footer from './Components/Footer'
import { useEffect, useState } from "react"
import selectors from './Redux/selectors/selectors'
import { useSelector, useDispatch } from 'react-redux';
import Api from './Api/Api'
import operations from './Redux/operations/operations';

function App() {
  // const products = useSelector(selectors.products)
  // const dispatch = useDispatch()
  
  // useEffect(() => { 
  //   Api.fetchProducts().then(result => {
  //     console.log("result", result)
  //     if (result.length !== 0) {
  //       // setDataLength(data)
  //       dispatch(operations.addProductCard(result))
  //       // setUpdatedProducts(result)
  //     }
  //   })
  // }, []) 

  return (
    <>
      <Container>
         <BrowserRouter>        
            <Switch>
              <Route path={routes.homepage} exact component={Homepage} />
              <Route path={routes.addProductPage} component={AddProductPage}/>
            </Switch> 
        </BrowserRouter>
        <Footer/>
     </Container>
    </>
  );
}

export default App;
