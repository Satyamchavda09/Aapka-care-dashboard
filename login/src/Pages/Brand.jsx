/** @format */
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "../components/BrandForm";
import { selectAllBrand, brandDeleted } from "../features/brand/brandSlice";
import { toast } from "react-toastify";
export default function Brand() {
  const [showForm, setShowForm] = useState(false);
  const [currentBrand, setCurrentBrand] = useState(null);
  const close = useRef();
  const dispatch = useDispatch();
  const brand = useSelector(selectAllBrand);

  const Close = (e) => {
    if (close.current === e.target) {
      setShowForm(false);
    }
  };

  const handleEdit = (brand) => {
    setCurrentBrand(brand);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this brand?")) {
      dispatch(brandDeleted(id));
      toast.error("Brand deleted successfully!");
    }
  };

  const handleAddBrand = () => {
    setCurrentBrand(null);
    setShowForm(true);
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 ml-0 p-4 bg-zinc-50">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="font-medium text-3xl">Brands</h1>
            <span className="text-gray-600">Manage your blog Brand here</span>
          </div>
          <button
            className="bg-blue-600 rounded text-white px-4 py-2 hover:bg-blue-700 transition-colors"
            onClick={handleAddBrand}>
            + Add Brand
          </button>
        </div>

        <div className="p-5 my-4 bg-white rounded-xl shadow-sm flex gap-2">
          <input
            type="text"
            className="border-2 border-zinc-200 focus:border-blue-500 rounded w-full p-2 outline-none"
            placeholder="Search categories..."
          />
          <button className="bg-green-600 text-white px-4 rounded hover:bg-green-700">
            Search
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
          {brand.map((brand) => (
            <div
              key={brand.id}
              className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-4">
                {brand.image && (
                  <div className="flex-shrink-0">
                    <img
                      src={URL.createObjectURL(brand.image)}
                      alt={brand.name}
                      className="h-16 w-16 object-cover rounded"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h1 className="font-medium text-lg">{brand.name}</h1>
                  <p className="text-sm text-gray-500 mt-1">{brand.slug}</p>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-3">
                <button
                  className="text-amber-400 hover:text-amber-600"
                  onClick={() => handleEdit(brand)}>
                  <i className="ri-pencil-line text-xl"></i>
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  teg
                  onClick={() => handleDelete(brand.id)}>
                  <i className="ri-delete-bin-line text-lg"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        {showForm && (
          <>
            <div
              className="fixed inset-0 bg-black/20 z-40"
              onClick={() => setShowForm(false)}
            />
            <div
              ref={close}
              onClick={Close}
              className="fixed inset-0 flex items-center justify-center z-50">
              <Form
                onClose={() => setShowForm(false)}
                brandToEdit={currentBrand}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
