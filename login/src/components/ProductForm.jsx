/** @format */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { productAdded, productUpdated } from "../features/product/productSlice";
import { toast } from "react-toastify";
export default function Form({ onClose, productToEdit }) {
  const dispatch = useDispatch();
  const [name, setName] = useState(productToEdit?.name || "");
  const [slug, setSlug] = useState(productToEdit?.slug || "");
  const [image, setImage] = useState(productToEdit?.image || null);
  const [imagePreview, setImagePreview] = useState(
    productToEdit?.image ? URL.createObjectURL(productToEdit.image) : null
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (productToEdit) {
      dispatch(
        productUpdated({
          id: productToEdit.id,
          name,
          slug,
          image,
        })
      );
      toast.success("Product updated successfully!");
    } else {
      dispatch(
        productAdded({
          id: Date.now().toString(),
          name,
          slug,
          image,
        })
      );
      toast.success("Product added successfully!");
    }

    onClose();
  };
  

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl">
        &times;
      </button>

      <h1 className="text-2xl font-bold mb-6 text-center">
        {productToEdit ? "Edit Product" : "Add Product"}
      </h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image</label>
          {imagePreview && (
            <div className="mb-2">
              <img
                src={imagePreview}
                alt="Preview"
                className="h-20 w-20 object-cover rounded"
              />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            className="w-full p-2 border rounded"
            onChange={handleImageChange}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors">
          {productToEdit ? "Update" : "Add"} Product
        </button>
      </form>
    </div>
  );
}
