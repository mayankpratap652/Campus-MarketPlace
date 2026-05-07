import ProductImageUpload from '@/components/admin-view/image-uploader';
import AdminProductTile from '@/components/admin-view/product-tile';
import CommonForm from '@/components/common/form';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { addProductFormElements } from '@/config';
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from '@/store/admin/products-slice';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const initialFormData = {
  image: null,
  title: '',
  description: '',
  category: '',
  brand: '',
  price: '',
  salePrice: '',
  totalStock: '',
  averageReview: 0,
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);

  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  function isFormValid() {
    return Object.keys(formData)
      .filter((key) => key !== 'averageReview')
      .map((key) => formData[key] !== '')
      .every((item) => item);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentEditId == null && !uploadedImageUrl) {
      toast('Please upload an image before submitting.');
      return;
    }

    const updatedFormData = {
      ...formData,
      ...(uploadedImageUrl && { image: uploadedImageUrl }),
    };

    currentEditId !== null
      ? dispatch(editProduct({ id: currentEditId, formData })).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            toast('PRODUCT UPDATED Successfully');
          } else {
            toast('Product Updation Failed');
          }
          setOpenCreateProductsDialog(false);
          setFormData(initialFormData);
          setCurrentEditId(null);
        })
      : dispatch(addNewProduct({ ...formData, image: uploadedImageUrl }))
          .unwrap()
          .then(() => {
            toast('Product Created successfully');
          })
          .catch(() => {
            toast('Product Not Created');
          });

    setOpenCreateProductsDialog(false);
    setUploadedImageUrl('');
    setFormData(initialFormData);
  };

  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        toast('PRODUCT Deleted Successfully');
      }
    });
  }

  return (
    <Fragment>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen p-6 w-full"
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between px-4">
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">🛍️ Manage Products</h1>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => setOpenCreateProductsDialog(true)}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-5 rounded-full shadow-md"
            >
              + Add Product
            </Button>
          </motion.div>
        </div>

        {/* Product Grid */}
        <motion.div
          className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {productList && productList.length > 0 ? (
            productList.map((productItem, index) => (
              <motion.div
                key={productItem._id || index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 border border-gray-100"
              >
                <AdminProductTile
                  setFormData={setFormData}
                  setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                  setCurrentEditedId={setCurrentEditId}
                  setUploadedImageUrl={setUploadedImageUrl}
                  product={productItem}
                  handleDelete={handleDelete}
                />
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">No products found.</p>
          )}
        </motion.div>
      </motion.div>

      {/* Product Form Panel */}
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent
          side="right"
          className="overflow-auto bg-gradient-to-br from-white via-gray-50 to-gray-100 p-6 rounded-l-lg shadow-xl"
        >
          <SheetHeader>
            <SheetTitle>
              <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight mb-4 flex items-center gap-2">
                🛍️{' '}
                <span className="bg-yellow-300 text-black px-2 py-1 rounded-md shadow-sm">
                  {currentEditId !== null ? 'Update Product' : 'Add New Product'}
                </span>
              </h2>
            </SheetTitle>
          </SheetHeader>

          <div className="border-2 border-dashed border-gray-300 rounded-md p-4 bg-white shadow-inner hover:border-blue-400 transition-all duration-300">
            <ProductImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
              setImageLoadingState={setImageLoadingState}
              imageLoadingState={imageLoadingState}
              isEditMode={currentEditId !== null}
            />
          </div>

          <div className="p-5 mt-4 bg-white shadow-md rounded-lg border border-gray-200">
            <CommonForm
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent shadow-sm transition"
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditId !== null ? 'Update Product' : 'Add New Product'}
              formControls={addProductFormElements}
              onSubmit={handleSubmit}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
