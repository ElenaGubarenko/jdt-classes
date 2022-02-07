import { Component } from 'react';

const mysql = require("mysql");
// import mysql from 'mysql'

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "productsdb",
  password: "elenagubarenko1994"
});


class SQLApi extends Component {

  connectDataBase() {
     connection.connect(function(err){
    if (err) {
      return console.error("Error: " + err.message);
    }
    else{
      console.log("Connection success");
    }
 });
  }

  endConnection() { 
    connection.end(function(err) {
  if (err) {
    return console.log("Connection end error: " + err.message);
  }
  console.log("Connection ended");
  });
  }


  insertProducts(products) {
//     const products = [
//   ["1", 111, 111111],
//   ["2", 222, 222222],
//   ["3", 333, 33333]
// ];
const sqlInsertProducts = `INSERT INTO products(skuValue, nameValue, priceValue,  dvdSizeValue, bookWeightValue, furnitureHeightValue, furnitureWidthValue, furnitureLengthValue) VALUES ?`;
 
connection.query(sqlInsertProducts, [products], function(err, results) {
    if(err) console.log(err);
return results
});
  }

  
  getAllProducts() {
    const sqlGetProducts = `SELECT * FROM products`;
 
connection.query(sqlGetProducts, function(err, results) {
    if(err) console.log(err);
  console.log(results);
  return results
});
  }


  deleteProduct() {
  const sqlDelete = "DELETE FROM products WHERE productId=?";
const productId = ["1"]; 
connection.query(sqlDelete, productId, function(err, results) {
    if(err) console.log(err);
    console.log(results);
});
}

} 

const newSQLApi = new SQLApi()

// newSQLApi.connectDataBase()

export default newSQLApi
// module.exports = { newSQLApi }

//   skuValue
// nameValue
// priceValue
// dvdSizeValue
// bookWeightValue
// furnitureHeightValue
// furnitureWidthValue
// furnitureLengthValue

//   insertOneProduct(product) {
//       const sqlInsertOne = `INSERT INTO products(skuValue,
// nameValue ,
// priceValue ) VALUES('111111111', 1111, 11)`;
 
// connection.query(sqlInsertOne, function(err, results) {
//     if(err) console.log(err);
//     console.log(results);
// });
// }
