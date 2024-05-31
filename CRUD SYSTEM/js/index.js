var products = [];

if (localStorage.getItem("productsContainer")!= null) {
    
    products = JSON.parse((localStorage.getItem("productsContainer")));
    showProducts() 
}

var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescriptionInput = document.getElementById("productDescription");
var productImageInput = document.getElementById("productImage");

function addProduct() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    description: productDescriptionInput.value,
    image: "images/1.jpg",
  };

  products.push(product);

  localStorage.setItem("productsContainer", JSON.stringify(products));
  clearForm();
  showProducts();
}

function updateProduct() {
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        description: productDescriptionInput.value,
        image: "images/1.jpg",
      };
    
products.splice(updateIndex,1,product);
  localStorage.setItem("productsContainer", JSON.stringify(products));
  clearForm()
  showProducts()
  document.getElementById('btnUpdate').style.display='none';
  document.getElementById('btnAdd').style.display='block';

}


function deleteItem(i) {
    products.splice(i,1);
    localStorage.setItem("productsContainer", JSON.stringify(products));
    showProducts()
}
function updateItem(i) {
    updateIndex =i;
    document.getElementById('btnUpdate').style.display='block';
    document.getElementById('btnAdd').style.display='none';

    productNameInput.value= products[i].name
    productPriceInput.value= products[i].price
    productCategoryInput.value= products[i].category
    productDescriptionInput.value= products[i].description
    // products.splice(i,1,);
  
}

function clearForm() {
  productNameInput.value = "";
  productPriceInput.value = null;
  productCategoryInput.value = null;
  productDescriptionInput.value = null;
  productImageInput.value = null;
}

function showProducts() {
  var table = document.getElementById("table");

  var cartona = "";
  for (let i = 0; i < products.length; i++) {
    cartona += `
        <tr>
        <td>${i}</td>
        <td>${products[i].name}</td>
        <td>${products[i].price}</td>
        <td>${products[i].category}</td>
        <td>${products[i].description}</td>
        <td>
          <img src="${products[i].image}" alt="item" class="" width="100px" />
        </td>
        <td>
          <button  onclick="updateItem(${i})" class="btn btn-sm btn-outline-warning">Update</button>
          <button onclick="deleteItem(${i})" class="btn btn-sm btn-outline-danger">Delete</button>
        </td>
      </tr>
        `;
  }

  table.innerHTML = cartona;
}
