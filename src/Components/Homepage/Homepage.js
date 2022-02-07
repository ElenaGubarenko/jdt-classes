import styles from './Homepage.module.css'
import { NavLink } from 'react-router-dom';
import routes from '../../Routes/routes'
import selectors from '../../Redux/selectors/selectors'
import operations from '../../Redux/operations/operations';
import newApi from '../../Api/Api'
// import newSQLApi from '../../server';
import { Component } from 'react';
import { connect } from 'react-redux';
// const newSQLApi = require('../../server/index');

class Homepage extends Component {
  state = { 
    checkboxesToDelete: [],
    updatedProducts: [],
  }

  componentDidUpdate() {
  this.check()
  }

componentDidMount() {
    // this.check()
    newApi.fetchProducts().then(result => {
      if (result.length !== 0) {
        this.setState({
          updatedProducts: [...result],
        })
      this.props.addProductCard(result)
      }
    })
  }
  

  check = () => {
   if (this.props.addStatus) {
   newApi.fetchProducts().then(result => {
      // console.log("result", result)
     if (result.length !== 0) {
       this.setState({
         updatedProducts: [...result]
       }) 
       this.props.addProductCard(result)
       this.props.addStatusError()
     } 
    })
}
  }
  
  
   handleCheckbox = (e) => {
     if (e.target.checked) {     
       this.setState({
         checkboxesToDelete: [...this.state.checkboxesToDelete, e.target.id]
       }
       )
}
     if (!e.target.checked) {
       const filteredCheckboxes = this.state.checkboxesToDelete.filter((element) => {
          return element !== e.target.id 
      })    
       this.setState({                checkboxesToDelete: filteredCheckboxes
    })
    }
  }


   massDelete = () => {
    this.state.checkboxesToDelete.map(id => 
      newApi.deleteProductCard(id)
     )
     this.props.addStatusSuccess()
  }

  render() {
   
      
  return (
    <><div className={styles.Header}>
      <h2 className={styles.Title}>Product List</h2>
      <div className={styles.ButtonDiv}>
        <NavLink className={styles.Add} to={routes.addProductPage}>ADD</NavLink>
      <button className={styles.ButtonDelete} onClick={this.massDelete} type='button' id='delete-product-btn'>MASS DELETE</button>
      </div>
    </div>
      <div className={styles.ProductsList}>
        {
          this.state.updatedProducts ?
        this.state.updatedProducts.map(product => {
          return <div key={product.id} id={product.id} className={styles.ProductCard}>
            <div  className={styles.Checkbox} >
              <input onChange={this.handleCheckbox}
                id={product.id}
                className='.delete-checkbox'
                type='checkbox'></input>
            </div>
          <ul className={styles.CardUl}>
                      <li key={product.skuValue}>{ product.skuValue}</li>
            <li key={ product.nameValue}>{ product.nameValue}</li>
            <li key={product.priceValue}>{product.priceValue} $</li>
            {product.category === 'DVD' ?
              <li key={ product.dvdSizeValue}>Size: { product.dvdSizeValue}</li> :null
            }
             {product.category === 'Book' ?
              <li key={ product.bookWeightValue}>Weight: { product.bookWeightValue}</li> :null
            }
            {product.category === 'Furniture' ?
              <li key={ product.furnitureLengthValue}>Dimension: {`${product.furnitureLengthValue}x${product.furnitureWidthValue}x${product.furnitureHeightValue}`}</li> :null
            }
            </ul>
            </div>
        }
            ) :
            null
}
       </div>
    </>
    
  )
}    
  }
  
const mapStateToProps = state => ({
  products: selectors.products(state),
  addStatus: selectors.addStatus(state)
})

const mapDispatchToProps = dispatch => ({
  addStatusSuccess: () => dispatch(operations.addStatusSuccess()),
   addStatusError: () => dispatch(operations.addStatusError()),
   addProductCard: (productCard) => dispatch(operations.addProductCard(productCard)),

})

export default connect(mapStateToProps, mapDispatchToProps) (Homepage)
  
