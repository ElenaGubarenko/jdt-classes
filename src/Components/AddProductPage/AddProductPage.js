import styles from './AddProductPage.module.css'
import operations from '../../Redux/operations/operations';
import routes from '../../Routes/routes'
import { NavLink } from 'react-router-dom';
import selectors from '../../Redux/selectors/selectors'
import newApi from '../../Api/Api'
import { Component } from 'react';
import { connect } from 'react-redux';
// import newSQLApi from '../../server/index';
// const newSQLApi = require('../../server/index')

class AddProductPage extends Component {
  state = {
    selectValue: 'Type Switcher',
    skuValue: '',
    nameValue: '',
    priceValue: '',
    dvdSizeValue: '',
    bookWeightValue: '',
    furnitureHeightValue: '',
    furnitureWidthValue: '',
    furnitureLengthValue: '',
    productExist: false,
    validationOk: false,
    errorMessage: '',
  }

//   componentDidMount() {
//   // newSQLApi.connectDataBase()
// }

  componentDidUpdate(_, prevState) {
    if (prevState.skuValue !== this.state.skuValue) {
      this.checkProduct()
    }
    if (prevState.skuValue !== this.state.skuValue || prevState.nameValue !== this.state.nameValue || prevState.priceValue !== this.state.priceValue || prevState.dvdSizeValue !== this.state.dvdSizeValue) {
      this.checkInput([this.state.skuValue, this.state.nameValue, this.state.priceValue, this.state.dvdSizeValue])
    }

    if (prevState.skuValue !== this.state.skuValue || prevState.nameValue !== this.state.nameValue || prevState.priceValue !== this.state.priceValue || prevState.bookWeightValue !== this.state.bookWeightValue) {
      this.checkInput([this.state.skuValue, this.state.nameValue, this.state.priceValue, this.state.bookWeightValue])
    }

    if (prevState.skuValue !== this.state.skuValue || prevState.nameValue !== this.state.nameValue || prevState.priceValue !== this.state.priceValue || prevState.furnitureHeightValue !== this.state.furnitureHeightValue ||
      prevState.furnitureWidthValue !== this.state.furnitureWidthValue ||
      prevState.furnitureLengthValue !== this.state.furnitureLengthValue) {
      this.checkInput([this.state.skuValue, this.state.nameValue, this.state.priceValue, this.state.furnitureHeightValue, this.state.furnitureWidthValue, this.state.furnitureLengthValue])
    }
  }

  checkInput = ([...values]) => {
    values.map(value => {
      if (value === '' || value === ' ' || this.state.selectValue === 'Type Switcher') {
        return this.setState({
          validationOk: false
        })
      }
      if (value !== '' || value !== ' ' || this.state.selectValue !== 'Type Switcher') {
        return this.setState({
          validationOk: true
        })
      }
    })
  }


  handleInput = e => {
    const { value, name } = e.target
    this.setState({
      [name]: value,
    })
  }

  checkProduct = () => {
    if (this.props.products.length !== 0) {
      const isProductExist = this.props.products[0].filter(product => {
        return product.skuValue === this.state.skuValue
      })
    
      if (isProductExist.length !== 0) {
        this.setState({
          productExist: true,
        })
        this.setState({
          errorMessage: 'This product already exists'
        })
      }

      if (isProductExist.length === 0) {
        this.setState({
          productExist: false,
        })
      }
    }
  }


  addProduct = () => {
    let productCard

    if (this.state.selectValue === 'DVD' && !this.state.productExist && this.state.validationOk) {
     
      productCard = {
        category: this.state.selectValue,
        skuValue: this.state.skuValue,
        nameValue: this.state.nameValue,
        priceValue: this.state.priceValue,
        dvdSizeValue: this.state.dvdSizeValue
      }

      // productCard = [
      //   this.state.skuValue,this.state.nameValue,this.state.priceValue, this.state.dvdSizeValue
      // ]
      
      newApi.postProduct(productCard)
      // newSQLApi.insertProducts(productCard)
      this.props.addStatusSuccess()
    }

    if (this.state.selectValue === 'Book' && !this.state.productExist && this.state.validationOk) {

      productCard = {
        category: this.state.selectValue,
        skuValue: this.state.skuValue,
        nameValue: this.state.nameValue,
        priceValue: this.state.priceValue, bookWeightValue: this.state.bookWeightValue
      }
  
  //  productCard = [
  //       this.state.skuValue,this.state.nameValue,this.state.priceValue,null, this.state.bookWeightValue
  //     ]

      newApi.postProduct(productCard)
      //  newSQLApi.insertProducts(productCard)
      this.props.addStatusSuccess()

    }

    if (this.state.selectValue === 'Furniture' && !this.state.productExist && this.state.validationOk) {

      productCard = {
        category: this.state.selectValue,
        skuValue: this.state.skuValue,
        nameValue: this.state.nameValue,
        priceValue: this.state.priceValue, furnitureHeightValue: this.state.furnitureHeightValue,
        furnitureWidthValue: this.state.furnitureWidthValue,
        furnitureLengthValue: this.state.furnitureLengthValue
      }
      
      // productCard = [
      //   this.state.skuValue,
      //   this.state.nameValue,
      //   this.state.priceValue,
      //   null,
      //   null,
      //   this.state.furnitureHeightValue,
      //   this.state.furnitureWidthValue,
      //   this.state.furnitureLengthValue
      // ]

      newApi.postProduct(productCard)
      //  newSQLApi.insertProducts(productCard)
      this.props.addStatusSuccess()
    }

    if (this.state.productExist) {
      this.setState({
        errorMessage: 'This product already exists'
      })
    }
  }

  isFilled = (value, inputId) => {
    if (value === '' || value === ' ') {
      // dispatch(operations.addStatusError())
      return this.setState({
        errorMessage: `Please, submit required data: ${inputId}`
      })
     
    }
    if (value !== '' || value !== ' ') {
      return this.setState({
        errorMessage: ''
      })
    }
  }


  render() {
    return (
      <>
        <div className={styles.Header}>
          <p className={styles.ErrorMessage}>{this.state.errorMessage}</p>
          <h2 className={styles.Title}>Product Add</h2>
          <div className={styles.ButtonDiv}>
            <NavLink className={styles.AddProduct} onClick={this.addProduct}
              to={
                !this.state.productExist && this.state.validationOk ? routes.homepage : routes.addProductPage}
            
            >Save</NavLink>
            <NavLink
              to={routes.homepage}>Cancel</NavLink>  </div>
        </div>

        <form className={styles.Form} id='product_form'>
          <label className={styles.Label}>SKU
            <input
              name='skuValue'
              className={styles.Input}
              required
              onChange={this.handleInput}
              value={this.state.skuValue}
              onBlur={() => this.isFilled(this.state.skuValue, 'sku')}
              title='Please, submit required data'
              type='text'
              id='sku'></input>
          </label>
         <label className={styles.Label}>Name
            <input
                 name='nameValue'
              className={styles.Input}
              onChange={this.handleInput}
              value={this.state.nameValue}
              onBlur={() => this.isFilled(this.state.nameValue, 'name')}
              title='Please, submit required data'
              type='text'
              required
              id='name'></input>
          </label>
        
          <label className={styles.Label}>Price ($)
            <input
                 name='priceValue'
              className={styles.Input}
              onChange={this.handleInput}
              value={this.state.priceValue}
              onBlur={() => this.isFilled(this.state.priceValue, 'price')}
              title='Please, submit required data'
              type='number'
              required id='price'
            >
              </input>
          </label>
         
          <label className={styles.Label}>Type Switcher
            <select
               name='selectValue'
              className={styles.Input}
              title='Please, submit required data'
              required
              value={this.state.selectValue}
              onChange={this.handleInput}
              id='productType'>
              <option disabled selected value='Type Switcher'>Type Switcher</option>
              <option value='DVD'>DVD</option>
              <option value='Book'>Book</option>
              <option value='Furniture'>Furniture</option>
            </select>
          </label>
          
          {this.state.selectValue === 'DVD' ?
            <>
              <label className={styles.Label}>Size (MB)
                <input
                  name='dvdSizeValue'
                  className={styles.Input}
                  onChange={this.handleInput}
                  value={this.state.dvdSizeValue}
                  onBlur={() => this.isFilled(this.state.dvdSizeValue, 'size')}
                  title='Please, provide the data of indicated type'
                  type='number'
                  required id='size'></input>
              </label>
              <p>"Please, provide dvd size in MB format"</p>
            </>
            : null
          }
          {this.state.selectValue === 'Book' ?
            <>
              <label className={styles.Label}>Weight (KG)
                <input
                   name='bookWeightValue'
                  className={styles.Input}
                  onChange={this.handleInput}
                  value={this.state.bookWeightValue}
                  onBlur={() => this.isFilled(this.state.bookWeightValue, 'weight')}
                  title='Please, provide the data of indicated type'
                  type='number'
                  required id='weight'></input>
              </label>
              <p>"Please, provide book weight in KG format"</p>
            </>
            : null
          }
          {this.state.selectValue === 'Furniture' ?
            <>
              <label className={styles.Label}>Height (CM)
                <input
                   name='furnitureHeightValue'
                  className={styles.Input}
                  onChange={this.handleInput}
                  value={this.state.furnitureHeightValue}
                  onBlur={() => this.isFilled(this.state.furnitureHeightValue, 'height')}
                  title='Please, provide the data of indicated type'
                  type='number'
                  required id='height'></input>
              </label>
              <label className={styles.Label}>Width (CM)
                <input
                  name='furnitureWidthValue'
                  className={styles.Input}
                  onChange={this.handleInput}
                  value={this.state.furnitureWidthValue}
                  onBlur={() => this.isFilled(this.state.furnitureWidthValue, 'width')}
                  title='Please, provide the data of indicated type'
                  type='number'
                  required id='width'></input>
              </label>
              <label className={styles.Label}>Length (CM)
                <input
                    name='furnitureLengthValue'
                  className={styles.Input}
                  onChange={this.handleInput}
                  value={this.state.furnitureLengthValue}
                  onBlur={() => this.isFilled(this.state.furnitureLengthValue, 'length')}
                  title='Please, provide the data of indicated type'
                  type='number'
                  required id='length'></input>
              </label>
              <p>"Please, provide dimensions in HxWxL format"</p>
            </>
            : null
          }
        </form>
      </>
    )
  }
}


const mapStateToProps = state => ({
  products: selectors.products(state)
})

const mapDispatchToProps = dispatch => ({
  addStatusSuccess: () => dispatch(operations.addStatusSuccess()),
   addStatusError: () => dispatch(operations.addStatusError()),
   addProductCard: (productCard) => dispatch(operations.addProductCard(productCard)),

})

export default connect(mapStateToProps, mapDispatchToProps) (AddProductPage)

  

