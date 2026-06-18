import React from 'react'

export default function ProductsCard({ product }) {
    return (
        <div>
            <h1>{product.title}</h1>

            <p>{product.description}</p>

            <p>{product.category}</p>

            <p>{product.price}</p>

            <p>{product.tags}</p>

            <div>
                <h1>Reviews</h1>

                {product.reviews.map((review, index) => (
                    <div key={index}>
                        <span >{review.rating}</span>
                        <span>{review.comment}</span>
                    </div>

                ))}
            </div>

        </div>
    )
}
