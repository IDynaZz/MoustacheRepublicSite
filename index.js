
    let cartItems = [];

    function getProductData() {
        fetch("https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product")
        .then(response => response.json())
        .then(data => {
        const productContainer = document.getElementById("productContainer");
        productContainer.innerHTML = '';

        const productImage = document.createElement("img");
        productImage.src = "./assets/classic-tee.jpg";
        productImage.alt = "Classic Tee";

        const productInfo = document.createElement("div");
        productInfo.classList.add("product-info");

        const productTitle = document.createElement("div");
        productTitle.classList.add("product-title");
        productTitle.textContent = data.title;

        const productPrice = document.createElement("div");
        productPrice.classList.add("product-price");
        productPrice.textContent = `$${data.price.toFixed(2)}`;

        const productDescription = document.createElement("div");
        productDescription.classList.add("product-description");
        productDescription.textContent = data.description;

        const sizeLabel = document.createElement("div");
        sizeLabel.classList.add("size-label");
        sizeLabel.innerHTML = 'SIZE<span>*</span>';

        const sizeSelection = document.createElement("div");
        sizeSelection.classList.add("size-selection");

        const sizes = ["S", "M", "L"];
        sizes.forEach(size => {
            const sizeLabel = document.createElement("label");
            sizeLabel.classList.add("size-button");
            sizeLabel.textContent = size;
            
            sizeLabel.addEventListener("click", () => {
            const sizeButtons = document.querySelectorAll(".size-button");
            sizeButtons.forEach(btn => btn.classList.remove("selected"));
            sizeLabel.classList.add("selected");
            });

            sizeSelection.appendChild(sizeLabel);
        });

        const addToCartButton = document.createElement("button");
        addToCartButton.classList.add("add-to-cart-button");
        addToCartButton.textContent = "Add to Cart";
        addToCartButton.addEventListener("click", () => {
            const selectedSize = document.querySelector(".size-button.selected");
            if (!selectedSize) {
            alert("Please select a size before adding to cart.");
            return;
            }

            const item = {
            title: data.title,
            size: selectedSize.textContent,
            image: productImage.src,
            price: data.price,
            quantity: 1,
            };
            addToCart(item);
        });

        productInfo.appendChild(productTitle);
        productInfo.appendChild(productPrice);
        productInfo.appendChild(productDescription);
        productInfo.appendChild(sizeLabel);
        productInfo.appendChild(sizeSelection);
        productInfo.appendChild(addToCartButton);
        productContainer.appendChild(productImage);
        productContainer.appendChild(productInfo);
        })
        .catch(error => {
            console.error("Error fetching product data:", error);
        });
    }

    window.onload = getProductData;

    function toggleCartDropdown() {
        const cartDropdown = document.getElementById("cartDropdown");
        cartDropdown.style.display = cartDropdown.style.display === "block" ? "none" : "block";
    }

    function addToCart(itemData) {

        const existingCartItem = cartItems.find(item => item.title === itemData.title && item.size === itemData.size);

        if (existingCartItem) {
            existingCartItem.quantity += 1;
        } 
        
        else {
            cartItems.push(itemData);
        }

        const cartItemsList = document.getElementById("cartItemsList");
        cartItemsList.innerHTML = '';
        cartItems.forEach(cartItem => {
        const listItem = document.createElement("li");

        const itemImage = document.createElement("img");
        itemImage.src = cartItem.image;
        itemImage.alt = "Classic Tee Mini Image";
        listItem.appendChild(itemImage);

        const itemDetails = document.createElement("div");
        itemDetails.classList.add("cart-details");
        itemDetails.innerHTML += `${cartItem.title}<br/>${cartItem.quantity}x<span>$${cartItem.price.toFixed(2)}</span><br/>Size: ${cartItem.size}`;
        listItem.appendChild(itemDetails);

        cartItemsList.appendChild(listItem);
        });

        const cartCountSpan = document.getElementById("cartCount");
        const currentCount = parseInt(cartCountSpan.textContent);
        cartCountSpan.textContent = currentCount + 1; 
    }