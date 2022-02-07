// import { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from "./Routes/routes"
import Container from "./Components/Container"
import Homepage from './Components/Homepage'
import AddProductPage from './Components/AddProductPage'
import Footer from './Components/Footer'
// import { useEffect, useState } from "react"
// import selectors from './Redux/selectors/selectors'
// import { useSelector, useDispatch } from 'react-redux';
// import Api from './Api/Api'
// import operations from './Redux/operations/operations';
// import newSQLApi from './server';
// const newSQLApi = require('./server/index')

function App() {

// try {
//   // newSQLApi.connectDataBase()
  
// newSQLApi.getAllProducts().then(result=>console.log(result))
// //  console.log(sqlResult)
// } catch (e) {
//   console.log(e)
// }

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
