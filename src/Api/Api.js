import { Component } from 'react';
const URL = 'http://localhost:3003'


class Api extends Component {

   async fetchHandling  (url = '', config = {}) {
      const response = await fetch(url, config)
  return response.ok ?
    await response.json() :
    console.log('error')
  }

   fetchProducts = ()=> {
  return this.fetchHandling(`${URL}/products`)
  }

   postProduct = (product) => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
       body: JSON.stringify(product)
  }
     
  return this.fetchHandling(`${URL}/products`, config)
  }

   deleteProductCard = (id) => {
   const config = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  }
return this.fetchHandling(`${URL}/products/${id}`, config)
}

}

const newApi  = new Api()

export default newApi