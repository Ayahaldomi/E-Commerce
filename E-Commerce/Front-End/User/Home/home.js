async function Categories() {
    var requist = await fetch('https://localhost:7000/api/Home/getAllCategories')
    var responce = await requist.json();

    var Categories = document.getElementById('Categories');

    responce.forEach(element => {

        Categories.innerHTML += `

            <div class="col-lg-3 col-sm-6">
                <div class="ltn__banner-item">
                    <div class="ltn__banner-img">
                        <a href="" onclick="catigoryID(${element.categoryId})" ><img src="../img/banner/4.jpg" alt="Banner Image"></a>
                    </div>
                </div>
            </div>
        `
        
    });
}

Categories();

function catigoryID(data){
    localStorage.setItem("categoryID", data);
}


async function TopSales() {
    
    var requist = await fetch('https://localhost:7000/api/Home/TopSales')
    var responce = await requist.json();

    var TopSales = document.getElementById('TopSales');

    responce.forEach(element => {

        TopSales.innerHTML += `
            <div class="col-12">
                <div class="ltn__product-item ltn__product-item-4">
                    <div class="product-img">
                        <a href="product-details.html"><img src="../img/product/2.png" alt="#"></a>
                        
                        <div class="product-badge">
                            <ul>
                                <li class="badge-1">Hot</li>
                            </ul>
                        </div>
                        <div class="product-hover-action product-hover-action-3">
                            <ul>
                                <li>
                                    <a href="#" title="Quick View" data-bs-toggle="modal" data-bs-target="#quick_view_modal">
                                        <i class="icon-magnifier"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" title="Add to Cart" data-bs-toggle="modal" data-bs-target="#add_to_cart_modal">
                                        <i class="icon-handbag"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" title="Quick View" data-bs-toggle="modal" data-bs-target="#quick_view_modal">
                                        <i class="icon-shuffle"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="product-info">
                        <div class="product-ratting">
                            <ul>
                                <li><a href="#"><i class="icon-star"></i></a></li>
                                <li><a href="#"><i class="icon-star"></i></a></li>
                                <li><a href="#"><i class="icon-star"></i></a></li>
                                <li><a href="#"><i class="icon-star"></i></a></li>
                                <li><a href="#"><i class="icon-star"></i></a></li>
                            </ul>
                        </div>
                        <h2 class="product-title"><a href="product-details.html">${element.name}</a></h2>
                        <div class="product-price">
                            <span>$${element.priceWithDiscount > 0 ? (element.price - (element.price * (element.priceWithDiscount / 100))) : element.price}</span>
                            <del>${element.priceWithDiscount > 0 ? '$' + element.price : ''}</del>
                        </div>
                    </div>
                </div>
            </div>
        `
        
    });
}

TopSales();

async function OffSale() {

    var requist = await fetch('https://localhost:7000/api/Home/OffSale')
    var responce = await requist.json();

    var OffSale = document.getElementById('OffSale');

    responce.forEach(element => {
        
        OffSale.innerHTML += `
            <div class="col-12">
                <div class="ltn__product-item ltn__product-item-4">
                    <div class="product-img">
                        <a href="product-details.html"><img src="../img/product/8.png" alt="#"></a>
                        <div class="product-badge">
                            <ul>
                                <li class="badge-2">${element.priceWithDiscount > 0 ? element.priceWithDiscount + '%' : ''}</li>
                            </ul>
                        </div>
                        <div class="product-hover-action product-hover-action-3">
                            <ul>
                                <li>
                                    <a href="#" title="Quick View" data-bs-toggle="modal" data-bs-target="#quick_view_modal">
                                        <i class="icon-magnifier"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" title="Add to Cart" data-bs-toggle="modal" data-bs-target="#add_to_cart_modal">
                                        <i class="icon-handbag"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" title="Quick View" data-bs-toggle="modal" data-bs-target="#quick_view_modal">
                                        <i class="icon-shuffle"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="product-info">
                        <div class="product-ratting">
                            <ul>
                                <li><a href="#"><i class="icon-star"></i></a></li>
                                <li><a href="#"><i class="icon-star"></i></a></li>
                                <li><a href="#"><i class="icon-star"></i></a></li>
                                <li><a href="#"><i class="icon-star"></i></a></li>
                                <li><a href="#"><i class="icon-star"></i></a></li>
                            </ul>
                        </div>
                        <h2 class="product-title"><a href="product-details.html">${element.name}</a></h2>
                        <div class="product-price">
                            <span>$${element.priceWithDiscount > 0 ? (element.price - (element.price * (element.priceWithDiscount / 100))) : element.price}</span>
                            <del>${element.priceWithDiscount > 0 ? '$' + element.price : ''}</del>
                        </div>
                    </div>
                </div>
            </div>

        `
    });
    
}

OffSale();


async function TopProducts() {

    var requist = await fetch('https://localhost:7000/api/Home/TopProducts')
    var responce = await requist.json();

    var TopProducts = document.getElementById('TopProducts');

    responce.forEach(element => {
        
        TopProducts.innerHTML += `
            
        <div class="col-12">
                    <div class="ltn__product-item ltn__product-item-4">
                        <div class="product-img">
                            <a href="product-details.html"><img src="../img/product/7.png" alt="#"></a>
                            <div class="product-badge">
                                <ul>
                                    <li class="badge-2">${element.priceWithDiscount > 0 ? element.priceWithDiscount + '%' : ''}</li>
                                </ul>
                            </div>
                            <div class="product-hover-action product-hover-action-3">
                                <ul>
                                    <li>
                                        <a href="#" title="Quick View" data-bs-toggle="modal" data-bs-target="#quick_view_modal">
                                            <i class="icon-magnifier"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" title="Add to Cart" data-bs-toggle="modal" data-bs-target="#add_to_cart_modal">
                                            <i class="icon-handbag"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" title="Quick View" data-bs-toggle="modal" data-bs-target="#quick_view_modal">
                                            <i class="icon-shuffle"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="product-info">
                            <div class="product-ratting">
                                <ul>
                                    ${generateStars(element.rating)}  <!-- Dynamically generated stars -->
                                    <li class="review-total"> <a href="#"> ( ${element.reviewCount} Reviews )</a></li>

                                </ul>
                            </div>
                            <h2 class="product-title"><a href="product-details.html">${element.name}</a></h2>
                            <div class="product-price">
                                <span>$${element.priceWithDiscount > 0 ? (element.price - (element.price * (element.priceWithDiscount / 100))) : element.price}</span>
                                <del>${element.priceWithDiscount > 0 ? '$' + element.price : ''}</del>
                            </div>
                        </div>
                    </div>
                </div>
        `
    
})};
TopProducts()

function generateStars(rating) {
    let fullStars = Math.floor(rating); // Full stars based on the integer part of the rating
    let halfStar = rating % 1 !== 0; // If there's a decimal part, we need a half star
    let emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Remaining stars are empty

    let starsHTML = '';

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += `<li><a href="#"><i class="fas fa-star"></i></a></li>`; // Full star
    }

    // Add half star if needed
    if (halfStar) {
        starsHTML += `<li><a href="#"><i class="fas fa-star-half-alt"></i></a></li>`; // Half star
    }

    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += `<li><a href="#"><i class="far fa-star"></i></a></li>`; // Empty star
    }

    return starsHTML;
}