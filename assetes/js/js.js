const baseUrl = `https://e-commerce-api-academlo.herokuapp.com/api`;

let editingID = null;

function getProducts() {
    axios.get(`https://e-commerce-api-academlo.herokuapp.com/api/products`)
        .then(function (response) {
            const products = response.data;
            console.log(products);
            printProducts(products);
        })
        .catch(function (error) {
            console.log(error);
        })
}



function printProducts(products){
    const container = document.getElementById("Products-container");
    html = ``;
    products.forEach(products => {
        html += `<div class="col-md-6 col-lg-4 mt-3">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${products.name}</h5>
                            <img src="${products.image}" style="width: 100%;" alt="${products.name}">
                            <p class="card-text">${products.price}</p>
                        </div>
                        <div class="text-end">
                            <button class="btn btn-danger" onclick="deleteProduct(${products.id})">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                            <button class="btn btn-primary" onclick="editProduct(${products.id})">
                                <i class="fas fa-pen"></i>
                            </button>
                        </div>
                    </div>
                </div>`
    });

    container.innerHTML = html;
}



function createProduct() {
    const newProduct = {
        name: document.getElementById("name").value,
        price: document.getElementById("price").value,
        image: document.getElementById("img").value

    }

    axios.post(`https://e-commerce-api-academlo.herokuapp.com/api/products`, newProduct)
        .then(function (response) {
            console.log(response);
            alert('Se creo la tarea correctamente');
            

        })
        .catch(function (error) {
            alert('No se pudo crear la tarea');
            console.log(error);
        })
}


function deleteProduct(id) {
    const confirmation = confirm('¿Estás seguro de eliminar la tarea?');
    if(!confirmation){
        return
    }
    axios.delete(`https://e-commerce-api-academlo.herokuapp.com/api/products/${id}`)
        .then(function () {
            alert('La tarea se eliminó correctamente');
            getTasks();
        })
        .catch(function (error) {
            alert('No se pudo eliminar la tarea');
        })
}

function editProduct(id){

    axios.get(`${baseUrl}/products/${id}`)
        .then(function(response){
            editingID = id;
            const product = response.data;
            document.getElementById("name").value = product.name;
            document.getElementById("price").value = product.price;
            document.getElementById("img").value = product.image;
        })
        .catch(function(){
            alert("No se edito el producto")
        })
}

function updateProduct() {
    const productEdited = {
        name: document.getElementById('name').value,
        price: document.getElementById('price').value,
        image: document.getElementById('img').value
    }

    axios.put(`${baseUrl}/products/${editingID}`, productEdited)
        .then(function (response) {
            alert('Se editó la tarea correctamente');
            getProducts();
        })
        .catch(function (error) {
            alert('No se pudo editar la tarea');
        })
}

getProducts();


