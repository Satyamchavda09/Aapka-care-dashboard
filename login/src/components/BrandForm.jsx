/** @format */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { brandAdded, brandUpdated } from "../features/brand/brandSlice";
import { toast } from "react-toastify";

export default function Form({ onClose, brandToEdit  }) {
  
  
  const dispatch = useDispatch();
  const [name, setName] = useState(brandToEdit?.name || "");
  const [slug, setSlug] = useState(brandToEdit?.slug || "");
  const [image, setImage] = useState(brandToEdit?.image || null);
  const [imagePreview, setImagePreview] = useState(
    brandToEdit?.image ? URL.createObjectURL(brandToEdit.image) : null
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

    if (brandToEdit) {
      dispatch(
        brandUpdated({
          id: brandToEdit.id,
          name,
          slug,
          image,
        })
      );
      toast.success("Brand updated successfully!");
    } else {
      dispatch(
        brandAdded({
          id: Date.now().toString(),
          name,
          slug,
          image,
        })
      );
      toast.success("Brand added successfully!");
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
        {brandToEdit ? "Edit Brand" : "Add Brand"}
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
          {brandToEdit ? "Update" : "Add"} Brand
        </button>
      </form>
    </div>
  );
}
