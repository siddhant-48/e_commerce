import Line from "./Line";
import ProductList from "./ProductList";

function Services() {
  return (
    <>
      <Line />
      <div className="main-pill">
        <div className="cartFiller-base-cartFillerHeading">
          {" "}
          You may also like:{" "}
        </div>
        <div className="pills-base-pillsContainer pills-base-pillsDesktopContainer">
          <div
            className="pills-base-pill pills-base-activePill"
            id="cart-filler-pill-All"
            data-key="All"
          >
            <div className="pills-base-textStyle">All</div>
          </div>
          {/* fashion */}
          <div
            className="pills-base-pill  pills-base-normalPill"
            id="pill-fashion"
            data-key="Fashion"
          >
            <div className="pills-base-textStyle">Fashion</div>
          </div>
          {/* jewelery */}
          <div
            className="pills-base-pill  pills-base-normalPill"
            id="pill-jewelery"
            data-key="Jewelery"
          >
            <div className="pills-base-textStyle">Jewelery</div>
          </div>
          {/* electonics */}
          <div
            className="pills-base-pill  pills-base-normalPill"
            id="pill-electronics"
            data-key="Electonics"
          >
            <div className="pills-base-textStyle">Electronics</div>
          </div>
          {/* grocery */}
          <div
            className="pills-base-pill  pills-base-normalPill"
            id="pill-grocery"
            data-key="Grocery"
          >
            <div className="pills-base-textStyle">Grocery</div>
          </div>
        </div>
      </div>

      <ProductList />
    </>
  );
}
export default Services;
