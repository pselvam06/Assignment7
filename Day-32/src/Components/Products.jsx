import React from 'react'

const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 99.99,
    description: "High-quality wireless headphones with noise cancellation.",
    category: "Electronics",
    image: "https://images.pexels.com/photos/1646704/pexels-photo-1646704.jpeg",
    rating: 4.5,
    stock: 50,
    reviews: [
      { user: "Alex", comment: "Great sound quality!", rating: 5 },
      { user: "Sam", comment: "Battery life could be better.", rating: 4 }
    ]
  },
  {
    id: 2,
    name: "Organic Cotton T-Shirt",
    price: 24.99,
    description: "Eco-friendly cotton t-shirt available in multiple colors.",
    category: "Fashion",
    image: "https://images.pexels.com/photos/25749258/pexels-photo-25749258.jpeg",
    rating: 4.2,
    stock: 100,
    reviews: [
      { user: "Taylor", comment: "Very comfortable.", rating: 5 }
    ]
  },
  {
    id: 3,
    name: "Stainless Steel Water Bottle",
    price: 19.99,
    description: "Leak-proof and insulated for hot/cold beverages.",
    category: "Home",
    image: "https://example.com/bottle.jpg",
    rating: 4.7,
    stock: 30,
    reviews: []
  }
];

function Products() {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Our Products</h2>
      <div className="row">
        {products.map(product => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card">
              <img src={product.image} alt={product.name} className="card-img-top" style={{ maxHeight: '250px', objectFit: 'cover' }} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text"><strong>Price:</strong> ${product.price.toFixed(2)}</p>
                <p className="card-text"><strong>Rating:</strong> {product.rating} / 5</p>
                <button className="btn btn-primary">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products
