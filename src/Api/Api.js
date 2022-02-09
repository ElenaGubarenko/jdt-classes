import { Component } from 'react';
// const URL = 'http://localhost:3003'
const URL = 'https://scandiwebtestassignment.netlify.app'


class Api extends Component {

   async fetchHandling  (url = '', config = {}) {
      const response = await fetch(url, config)
  return response.ok ?
    await response.json() :
    console.log('error')
  }

   fetchProducts = ()=> {
  return this.fetchHandling(`${URL}/`)
  }

   postProduct = (product) => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
       body: JSON.stringify(product)
  }
     
  return this.fetchHandling(`${URL}/`, config)
  }


  deleteProductCard = (productId) => {
    // console.log(productId)
   const config = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }
return this.fetchHandling(`${URL}/?id=${productId}`, config)
}

}

const newApi  = new Api()

export default newApi