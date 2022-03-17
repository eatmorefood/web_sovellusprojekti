import './App.css';
//import { useEffect, useState } from 'react';
//import axios from 'axios';
import Header from './components/Header.js';
import Footer from './components/Footer.js';


function App() {
/*
  const [products, setProducts ] = useState([]);
  const [filteredResults, resultsFiltering] = useState([]);
  const [delProd, ApiDelete] = useState('')
  const [addedProduct, setAddedProduct] = useState('')
  const [modifiedProduct, setModifiedProduct] = useState('')
  const [ref, setRef] = useState(false)
  const [editorModeOn, setEditorMode] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const [cartItems, getCartItems ] = useState([]);
  const [addedCartItems, addCartItems] = useState([]);
  const [itemId, deleteCartItem] = useState([]); // delete from cart by id
  //const [totalSum, getTotalSum] = useState(''); // delete from cart by id

// GET PRODUCT DATA //
  useEffect(() => {
    const getData = async () => {
      const results = await axios.get('http://localhost:8080/products')
      setProducts(results.data);
      resultsFiltering(results.data);
    }
    getData();
  }, [ref])

  useEffect(() => {
    resultsFiltering(filteredResults)
  }, [filteredResults])


  function refresh(){
    const getData = async () => {
      const results = await axios.get('http://localhost:8080/products')
      setProducts(results.data);
      resultsFiltering(results.data);
    }
    getData();
  }

// DELETION //
  const deleteProduct = (index) => {
    ApiDelete(index)
  }
  useEffect(() => {
    if (delProd !== '') {
        const productDeletion = async () => {
        await axios.delete(`http://localhost:8080/products/${delProd}`)
      }
      productDeletion();
      setTimeout(() => {refresh();}, 500);
      alert("Product deleted!");
    }
  }, [delProd])


// ADDITION //
  const addingProduct = (newProduct) => {
    setAddedProduct(newProduct)
  }
  useEffect(() => {
    if (addedProduct !== '') {
        const productAddition = async () => {
          await axios.post('http://localhost:8080/products', { addedProduct })
          setRef(!ref)
        }
      productAddition()
      setTimeout(() => {refresh();}, 500);
      alert("Product added!");
    }
  }, [addedProduct])


// MODIFY PRODUCT //
  const modifyProduct = (param) => {
    let clone = [...products]
    let itemId = clone.findIndex(x => x.id == param.id)
    if (itemId !== -1) {
      setModifiedProduct(param)
    } else {
      alert("Error! No matching product ID!")
    }
  }
  useEffect(() => {
    if (modifiedProduct !== '') {
        const productModification = async () => {
          await axios.put(`http://localhost:8080/products/${modifiedProduct.id}`, { modifiedProduct })
        }
      productModification()
      setTimeout(() => {refresh();}, 500);
      alert("Product modified!");
    }
  }, [modifiedProduct])


// FILTER PRODUCTS USING SEARCH //
  const filterProducts = (inputFieldContent) => {
    if (inputFieldContent !==''){
      resultsFiltering(() => products.filter(p => p.description.toLowerCase().includes(inputFieldContent.toLowerCase())));
    } else {
      resultsFiltering(products);
    }
  }

// FILTER PRODUCTS BY CATEGORY USING DROPDOWN SELECTION //
  const filterByCategory = (dropdownValue) => {
    if (dropdownValue !==""){
      resultsFiltering(() => products.filter(p => p.category.toLowerCase().includes(dropdownValue.toLowerCase())));
    } else {
      resultsFiltering(products);
    }
  }

// GET SHOPPING CART ITEMS
  useEffect(() => {
    const getData = async () => {
      const results = await axios.get('http://localhost:8080/cart')
      getCartItems(results.data);
    }
    getData();
    //setTimeout(() => {refreshSum();}, 100);
  }, [])
  useEffect(() => {
    getCartItems(cartItems);
  }, [cartItems])

  // GET SHOPPING CART TOTAL SUM
  function refreshSum(){
    const getData = async () => {
      const results = await axios.get('http://localhost:8080/cart/sum')
      getTotalSum(results.data);
    }
    getData();
  }
  useEffect(() => {
    getTotalSum(totalSum);
  }, [totalSum])


  // ADD CART ITEMS //
  const setAddedCartItem = (data) => {
    addCartItems(data)
 
    if (addedCartItems !== '') {
        const addToCart = async () => {
          let results = await axios.post('http://localhost:8080/cart', { addedCartItems })
          getCartItems(results.data);
        }
      addToCart();
      //setTimeout(() => {refreshSum();}, 100);
    }
  };
  useEffect(() => {
    getCartItems(cartItems);
  }, [cartItems])

  // DELETE CART ITEM //
  const deleteFromCart = (index) => {
    deleteCartItem(index)
  }
  useEffect(() => {
    if (itemId !== '') {
        const cartDeletion = async () => {
        let results = await axios.delete(`http://localhost:8080/cart/${itemId}`)
        getCartItems(results.data);
      }
      cartDeletion();
     // setTimeout(() => {refreshSum();}, 100);
    }
  }, [itemId])


  let cartContent = '';
  if( cartVisible == true ) {
    cartContent = <Cart data={ cartItems } toggleCart = { cartVisibility } removeItem= { deleteFromCart } 
    //getSum= { totalSum }
    />;
  }
  function cartVisibility(){
    setCartVisible(!cartVisible) 
  }
  let allCategories = products;
  let output = <ProductView data= { filteredResults } addToCart= { setAddedCartItem } />;


  if( editorModeOn == true && cartVisible == true ) {
    setCartVisible(!cartVisible) 
  } else if (editorModeOn == true) {
    output = <AdminView data={ filteredResults }
    deleteProduct={ deleteProduct }
    modifyProduct={ modifyProduct }
    addProduct={ addingProduct } />;
  }

*/
  return (
    <div className="App">
        <Header />

      <div className="content">
        <img src="https://post.healthline.com/wp-content/uploads/2020/09/healthy-eating-ingredients-732x549-thumbnail.jpg"></img>
        <img src="https://post.healthline.com/wp-content/uploads/2020/09/healthy-eating-ingredients-732x549-thumbnail.jpg"></img>
        <img src="https://post.healthline.com/wp-content/uploads/2020/09/healthy-eating-ingredients-732x549-thumbnail.jpg"></img>
        <img src="https://post.healthline.com/wp-content/uploads/2020/09/healthy-eating-ingredients-732x549-thumbnail.jpg"></img>
        <img src="https://post.healthline.com/wp-content/uploads/2020/09/healthy-eating-ingredients-732x549-thumbnail.jpg"></img>
        <img src="https://post.healthline.com/wp-content/uploads/2020/09/healthy-eating-ingredients-732x549-thumbnail.jpg"></img>
        <img src="https://post.healthline.com/wp-content/uploads/2020/09/healthy-eating-ingredients-732x549-thumbnail.jpg"></img>
      </div>
      <Footer />
    </div>
  );
}

export default App;