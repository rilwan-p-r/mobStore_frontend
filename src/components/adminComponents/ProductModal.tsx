// ProductModal.tsx
import { useState, useRef, useEffect } from "react";
import { X, Upload } from "lucide-react";
import { useFormik } from "formik";
import { productSchema } from "../../schemas/Product.schema";
import { admAddProduct } from "../../Api/admin/admAddProduct";
import { admEditProduct } from "../../Api/admin/admEditProduct";
import { message } from "antd";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  isEditing?: boolean;
  product?: any;
}

const ProductModal = ({
  isOpen,
  onClose,
  onSubmit,
  isEditing = false,
  product = null,
}: ProductModalProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [showCurrentImage, setShowCurrentImage] = useState(true);
  const inputRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      name: product?.name || "",
      price: product?.price || 0,
      image: null,
    },
    validationSchema: productSchema(isEditing),
    enableReinitialize: true,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", values.price);

      if (values.image) {
        formData.append("image", values.image);
      }

      // Add a flag to indicate if the current image should be removed
      if (isEditing && !showCurrentImage && !values.image) {
        formData.append("removeImage", "true");
      }

      try {
        if (isEditing) {
          await admEditProduct(product?._id, formData);
          message.success("Product updated successfully");
        } else {
          await admAddProduct(formData);
          message.success("Product added successfully");
        }
        formik.resetForm();
        setShowCurrentImage(true);
        onClose();
        onSubmit();
      } catch (error) {
        console.error("Error saving product:", error);
        message.error(isEditing ? "Failed to update product" : "Failed to add product");
      }
    },
  });

  useEffect(() => {
    const isDirty =
      formik.values.name !== (product?.name || "") ||
      formik.values.price !== (product?.price || 0) ||
      formik.values.image !== null ||
      (isEditing && !showCurrentImage);
    setIsFormDirty(isDirty);
  }, [formik.values, product, showCurrentImage, isEditing]);

  useEffect(() => {
    if (isOpen && isEditing) {
      setShowCurrentImage(true);
    }
  }, [isOpen, isEditing]);

  const handleDrag = (e) => {
    e.preventDefault();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleFile = (file) => {
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        formik.setFieldError('image', 'File size must be less than 5MB');
        return;
      }
      if (!file.type.startsWith("image/")) {
        formik.setFieldError('image', 'Please upload a valid image file');
        return;
      }
      formik.setFieldValue("image", file);
    }
  };

  const handleRemoveCurrentImage = () => {
    setShowCurrentImage(false);
    formik.setFieldValue("image", null);
  };

  const isSubmitDisabled = () => {
    if (isEditing) {
      return !isFormDirty || Object.keys(formik.errors).length > 0;
    }
    return (
      !formik.values.image ||
      Object.keys(formik.errors).length > 0 ||
      !formik.dirty
    );
  };

  const renderImageSection = () => {
    if (formik.values.image) {
      return (
        <div className="relative">
          <img
            src={URL.createObjectURL(formik.values.image)}
            alt="Preview"
            className="max-h-48 mx-auto rounded-lg"
          />
          <button
            type="button"
            onClick={() => formik.setFieldValue("image", null)}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      );
    }

    if (isEditing && showCurrentImage && product?.imageUrl) {
      return (
        <div className="relative">
          <img
            src={product?.imageUrl}
            alt="Current"
            className="max-h-48 mx-auto rounded-lg"
          />
          <button
            type="button"
            onClick={handleRemoveCurrentImage}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      );
    }

    return (
      <div
        className="cursor-pointer"
        onClick={() => inputRef.current?.click()}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          {isEditing
            ? "Click to add a new image (optional)"
            : "Drag and drop your image here or click to upload"}
        </p>
        <p className="mt-1 text-xs text-gray-500">
          PNG, JPG, JPEG, WEBP, AVIF, SVG+XML up to 5MB
        </p>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            {isEditing ? "Edit Product" : "Add New Product"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="p-6 space-y-6">
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center ${dragActive
                ? "border-purple-500 bg-purple-50"
                : "border-gray-300 hover:border-purple-500"
              }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
            {renderImageSection()}
          </div>

          {/* Show image error message */}
          {formik.errors.image && (
            <p className="mt-2 text-sm text-red-500">
              {String(formik.errors.image)}
            </p>
          )}

          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Product Name
              </label>
              <input
                type="text"
                id="name"
                {...formik.getFieldProps("name")}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${formik.touched.name && formik.errors.name
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "focus:ring-purple-500 focus:border-purple-500"
                  }`}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="mt-2 text-sm text-red-500">{String(formik.errors.name)}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price (₹)
              </label>
              <input
                type="number"
                id="price"
                {...formik.getFieldProps("price")}
                min="0"
                step="1"
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${formik.touched.price && formik.errors.price
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "focus:ring-purple-500 focus:border-purple-500"
                  }`}
              />
              {formik.touched.price && formik.errors.price && (
                <p className="mt-2 text-sm text-red-500">{String(formik.errors.price)}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md text-sm font-medium text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitDisabled()}
              className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isSubmitDisabled()
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-purple-950 hover:bg-purple-900"
                }`}
            >
              {isEditing ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;