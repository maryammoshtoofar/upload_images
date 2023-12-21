import React from "react";

const TableRow = ({ product }) => {
  return (
    <tr>
      <td>
        <img
          className="thumbnail"
          src={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`}
          alt={product.thumbnail}
        />
      </td>
      <td>
        <div className="images">
          {product.images.map((image) => (
            <img
              key={image}
              className="thumbnail"
              src={`http://localhost:8000/images/products/images/${image}`}
              alt={image}
            />
          ))}
        </div>
      </td>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>{product.quantity}</td>
    </tr>
  );
};

export default TableRow;
