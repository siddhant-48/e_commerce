import Admin from "./Admin";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";

function MainAdmin() {
  const [productCount, setProductCount] = useState(0);
  useEffect(() => {
    async function fetchProductCount() {
      try {
        const response = await fetch("http://localhost:5000/products/count");
        if (!response.ok) {
          throw new Error("Failed to fetch product count");
        }
        const data = await response.json();
        setProductCount(data.totalProducts);
      } catch (error) {
        console.error("Error fetching product count:", error);
      }
    }

    fetchProductCount();
  }, []);
  return (
    <>
      <main className="main-container">
        <div className="main-title">
          <h3>DASHBOARD</h3>
        </div>

        <div className="main-cards">
          <div className="card">
            <div className="card-inner">
              <h3>PRODUCTS</h3>
              <Link to="/admin/products">
                <BsFillArchiveFill className="card_icon" />
              </Link>
            </div>
            <h1>{productCount}</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <h3>CATEGORIES</h3>
              <Link to="/admin/products">
                <BsFillGrid3X3GapFill className="card_icon" />
              </Link>
            </div>
            <h1>12</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <h3>CUSTOMERS</h3>
              <Link to="/admin/products">
                <BsPeopleFill className="card_icon" />
              </Link>
            </div>
            <h1>33</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <h3>ALERTS</h3>
              <Link to="/admin/products">
                <BsFillBellFill className="card_icon" />
              </Link>
            </div>
            <h1>42</h1>
          </div>
        </div>
      </main>
      {/* <div className="pt-10">
        <Admin />
      </div> */}
    </>
  );
}
export default MainAdmin;
