import ProductFilter from "@/components/shopping-view/filter";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import ProductDetailsDialog from "@/components/shopping-view/products-details";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/products-slice";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function ShoppingListing() {
  const dispatch = useDispatch();

  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );

  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const categorySearchParam = searchParams.get("category");

  // ✅ FIXED SORT
  function handleSort(value) {
    console.log("Selected sort:", value);
    setSort(value);
  }

  const handleFilter = (category, value) => {
    setFilters((prev) => {
      const updated = { ...prev };

      if (!updated[category]) updated[category] = [];

      if (updated[category].includes(value)) {
        updated[category] = updated[category].filter(
          (item) => item !== value
        );
      } else {
        updated[category].push(value);
      }

      if (updated[category].length === 0) {
        delete updated[category];
      }

      return updated;
    });
  };

  function handleGetProductDetails(id) {
    dispatch(fetchProductDetails(id));
  }

  function handleAddtoCart(id, stock) {
    let items = cartItems.items || [];

    const existing = items.find((item) => item.productId === id);

    if (existing && existing.quantity + 1 > stock) return;

    dispatch(
      addToCart({
        userId: user?.id,
        productId: id,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
      }
    });
  }

  // init — sessionStorage se filters lo, ya URL category se set karo
  useEffect(() => {
    setSort("price-lowtohigh");
    const savedFilters = JSON.parse(sessionStorage.getItem("filters"));
    if (savedFilters && Object.keys(savedFilters).length > 0) {
      setFilters(savedFilters);
    } else if (categorySearchParam) {
      setFilters({ category: [categorySearchParam] });
    } else {
      setFilters({});
    }
  }, [categorySearchParam]);

  // update URL + save to sessionStorage
  useEffect(() => {
    const query = new URLSearchParams();
    Object.keys(filters).forEach((key) => {
      filters[key].forEach((val) => query.append(key, val));
    });
    setSearchParams(query);
    sessionStorage.setItem("filters", JSON.stringify(filters));
  }, [filters]);

  // API CALL
  useEffect(() => {
    if (sort !== null) {
      dispatch(
        fetchAllFilteredProducts({
          filterParams: filters, // ✅ FIXED NAME
          sortParams: sort,
        })
      );
    }
  }, [dispatch, sort, filters]);

  useEffect(() => {
    if (productDetails) setOpenDetailsDialog(true);
  }, [productDetails]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 p-4 md:p-6">

      {/* Sidebar */}
      <div className="rounded-xl border p-4">
        <h2 className="font-bold text-lg mb-3">Filters</h2>
        <ProductFilter filters={filters} handleFilter={handleFilter} />
      </div>

      {/* Products */}
      <div>
        <div className="flex justify-between p-4 border-b">
          <h2 className="text-xl font-bold">All Products</h2>
          <span>{productList?.length} Products</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
          {productList?.length > 0 ? (
            productList.map((item) => (
              <ShoppingProductTile
                key={item._id} // ✅ FIXED
                product={item}
                handleGetProductDetails={handleGetProductDetails}
                handleAddToCart={handleAddtoCart}
              />
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>

      {/* Details */}
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}
export default ShoppingListing;