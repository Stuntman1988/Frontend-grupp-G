function myFunction(id) {
    localStorage.setItem('product-id', id);
    fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res => {
            return res.json();
        })
        .then(product => {
            const imageUrl = product.image;
            localStorage.setItem('product-img', imageUrl);
            localStorage.setItem("product-title", product.title);
            localStorage.setItem('product-category', product.category);
            localStorage.setItem('product-description', product.description);
            localStorage.setItem('product-price', product.price);
        })
}


fetch('https://fakestoreapi.com/products')
    .then(res => {
        return res.json();
    })
    .then(data => {
        data.forEach(product => {
            let description = product.description;
            let title = product.title;
            const markup = `
        <div class="col h-100"   
            <div class="product">
                <div class="product-content">
                    <img src="${product.image}" alt="" class="product-img">
                    <h5 class="product-title">${title.length > 20 ? title.substring(0, 20).concat('...') : title}</h5>
                    <p class="product-category">${product.category}</p>
                    <p class="product-description">${description.length > 20 ? description.substring(0, 20).concat('<a href class="more" data-productId=' + product.id + '  data-bs-toggle="modal" data-bs-target="#modal"> ..more</a>') : description}</p>
                    <div class="procuct-price-container">
                        <div class="row" id="pricecon">
                            <div class="col-md-6">
                                <h5 class="product-price">$${product.price}</h5>
                            </div>
                            <div class="col-md-6">
                                <button type="button" onclick="myFunction(${product.id})" data-productId=${product.id}  class="add-to-cart" 
                                data-bs-toggle="modal" data-bs-target="#modalForm">Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`

            const productCol = document.createElement('div');
            productCol.classList.add('col-md-3');
            productCol.innerHTML = markup;

            document.querySelector('#product-row').appendChild(productCol)

            const moreLink = productCol.querySelector('.more');
            moreLink.addEventListener('click', () => {
                fetch(`https://fakestoreapi.com/products/${product.id}`)
                    .then(res => {
                        return res.json();
                    })
                    .then(product => {
                        const modalBody = document.querySelector('.modal-body');
                        modalBody.innerHTML = `
                <div class="product-details">
                <img src="${product.image}" alt="" class="product-img">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-category">${product.category}</p>
                <p class="product-description">${product.description}</p>
                <h5 class="product-price">$${product.price}</h5>
              </div>
                `
                        const productModal = new bootstrap.Modal(document.querySelector('modal'))
                        productModal.show();

                    })
                    .catch(error => {
                        console.error(error);
                    })
            })
        });
    })

function validate() {
    let name = document.getElementById('name').value;
    let street = document.getElementById('street').value;
    let zip = document.getElementById('zip').value;
    let city = document.getElementById('city').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    const zipPattern = /^\d{3}\s\d{2}$/;
    const phonePattern = /^\(?(\d{3})?\)?[-]?\s?(\d{7})$/;
    let valid = 0;



    if (name.length < 2 || name.length > 50) {
        document.getElementById('name-text').innerHTML = "Name too short or too long or blank";
    } else {
        document.getElementById('name-text').innerHTML = "";
        localStorage.setItem("name", name);
        valid++;
    }

    if (street.length <= 0 || street.length > 50) {
        document.getElementById('street-text').innerHTML = "Too many letters";
    } else {
        document.getElementById('street-text').innerHTML = "";
        localStorage.setItem("street", street);
        valid++;
    }

    if (!zipPattern.test(zip)) {
        document.getElementById('zip-text').innerHTML = "Incorrect format";
    } else {
        document.getElementById('zip-text').innerHTML = "";
        localStorage.setItem("zip", zip);
        valid++;
    }

    if (city.length <= 0 || city.length > 50) {
        document.getElementById('city-text').innerHTML = "Too many letters";
    } else {
        document.getElementById('city-text').innerHTML = "";
        localStorage.setItem("city", city);
        valid++;
    }

    if (!email.includes('@') || email.length > 50) {
        document.getElementById('email-text').innerHTML = "Incorrect format";
    } else {
        document.getElementById('email-text').innerHTML = "";
        localStorage.setItem("email", email);
        valid++;
    }

    if (phone <= 0 || !phonePattern.test(phone)) {
        document.getElementById('phone-text').innerHTML = "Incorrect format";
    } else {
        document.getElementById('phone-text').innerHTML = "";
        localStorage.setItem("phone", phone);
        valid++;
    }
    console.log(valid)
    if (valid == 6) {
        window.location.href = "confirmed.html";

    }
}


document.getElementById('confirmed-name').innerHTML = "<b>Name: </b>" + localStorage.getItem("name");
document.getElementById('confirmed-street').innerHTML = "<b>Street: </b>" + localStorage.getItem("street");
document.getElementById('confirmed-zip').innerHTML = "<b>Zip code: </b>" + localStorage.getItem("zip");
document.getElementById('confirmed-city').innerHTML = "<b>City: </b>" + localStorage.getItem("city");
document.getElementById('confirmed-email').innerHTML = "<b>E-mail: </b>" + localStorage.getItem("email");
document.getElementById('confirmed-phone').innerHTML = "<b>Phone: </b>" + localStorage.getItem("phone");

document.getElementById('confirmed-img').setAttribute('src', localStorage.getItem('product-img'));
document.getElementById('confirmed-title').innerHTML = localStorage.getItem('product-title');
document.getElementById('confirmed-category').innerHTML = localStorage.getItem('product-category');
document.getElementById('confirmed-description').innerHTML = localStorage.getItem('product-description');
document.getElementById('confirmed-price').innerHTML = '$' + localStorage.getItem('product-price');


