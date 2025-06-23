"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";

interface FormField {
  name: string;
  label: string;
  type: "text" | "textarea" | "select";
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  formFields: FormField[];
  onSubmit: (formData: Record<string, any>) => void;
  onFieldChange?: (fieldName: string, value: string) => void;
  initialData?: Record<string, any>;
}

const EditModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  formFields,
  onSubmit,
  onFieldChange,
  initialData = {},
}) => {
  const [formData, setFormData] = useState<Record<string, any>>(initialData);
  const [showReasonField, setShowReasonField] = useState((initialData?.action || "") === "cancel");
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize formData when the modal opens or initialData changes
  useEffect(() => {
    if (isOpen && !isInitialized) {
      console.log("Initializing formData with initialData:", initialData);
      setFormData(initialData || {});
      setShowReasonField((initialData?.action || "") === "cancel");
      setIsInitialized(true);
    }
  }, [isOpen, initialData, isInitialized]);

  // Reset isInitialized when modal closes
  useEffect(() => {
    if (!isOpen) {
      console.log("Modal closed, resetting isInitialized");
      setIsInitialized(false);
      setFormData({});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    console.log(`Field changed: ${name} = ${value}`);
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      console.log("Updated formData:", newData);
      if (name === "action" && value === "cancel") {
        setShowReasonField(true);
      } else if (name === "action" && value !== "cancel") {
        setShowReasonField(false);
      }
      return newData;
    });
    if (onFieldChange) {
      onFieldChange(name, value);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Submitting formData:", formData);
    onSubmit(formData);
    onClose();
  };

  const handleCancel = () => {
    console.log("Cancel button clicked, closing modal");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="bg-white dark:bg-black border rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h2>
          <button
            onClick={handleCancel}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <form
          onSubmit={handleSubmit}
          className="p-4 text-gray-900 dark:text-gray-100 max-h-[60vh] overflow-y-auto"
        >
          {formFields.map((field) => (
            <div key={field.name} className="mb-4">
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </label>
              {field.type === "select" && field.options ? (
                <select
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] ?? ""}
                  onChange={handleChange}
                  required={field.required}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>
                    Select {field.label}
                  </option>
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : field.type === "textarea" ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] ?? ""}
                  onChange={handleChange}
                  required={field.required}
                  placeholder={field.placeholder}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                />
              ) : (
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  value={formData[field.name] ?? ""}
                  onChange={handleChange}
                  required={field.required}
                  placeholder={field.placeholder}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
          ))}
          {showReasonField && (
            <div className="mb-4">
              <label
                htmlFor="cancelReason"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Reason for Cancellation
                <span className="text-red-500">*</span>
              </label>
              <textarea
                id="cancelReason"
                name="cancelReason"
                value={formData.cancelReason ?? ""}
                onChange={handleChange}
                placeholder="Please provide a reason for cancellation"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            </div>
          )}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;