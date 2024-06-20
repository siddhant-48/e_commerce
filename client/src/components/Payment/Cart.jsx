import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/reducers/cartSlice"; // Import the remove action

function Cart() {
  // Accessing products
  const allItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  // Remove item
  const handleDelete = (id) => {
    dispatch(removeFromCart({ id }));
  };

  return (
    <div className="flex p-4">
      <div className="w-3/5 p-4 border rounded shadow">
        {/* Map through all products */}
        {allItems.map((product) => (
          <div
            key={product.id}
            className="flex justify-between items-center mb-4"
          >
            <div>
              <p>{product.name}</p>
              <p>Quantity: {product.productQuantity}</p>
              <p>Total Price: {product.productPrice}</p>
            </div>
            <button
              onClick={() => handleDelete(product.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* 40% component */}
      <div className="w-2/5 p-4 border rounded shadow">
        {/*checkout impleemntation*/}
        <h2>Checkout</h2>
      </div>
    </div>
  );
}

export default Cart;
