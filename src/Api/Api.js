import { Component } from 'react';
const URL = 'http://localhost:3003'
// const URL = 'https://secret-scrubland-05141.herokuapp.com'
// const URL = 'https://scandiwebtestassignment.netlify.app'
// postgres://hxosorwrbmtmya:2c48b6bede2f3d96569aa6783ab2f47b64158bb5ea084b4bbec6625a5092152b@ec2-52-207-74-100.compute-1.amazonaws.com:5432/d4agqd91qht8g0

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