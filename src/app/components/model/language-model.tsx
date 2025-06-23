import React, { useState } from "react";

interface Field {
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
  langKey?: string;
}

interface LanguageInputTemplateProps {
  fields: Field[];
  onSubmit: (data: Record<string, string>) => void;
  onCancel: () => void;
  initialValues?: Record<string, string>;
  title: string;
  description: string;
  languages?: { key: string; label: string }[];
}

const LanguageInputTemplate: React.FC<LanguageInputTemplateProps> = ({
  fields,
  onSubmit,
  onCancel,
  initialValues = {},
  title,
  description,
  languages = [
    { key: "en", label: "English" },
    { key: "ta", label: "Tamil" },
  ],
}) => {
  const [formData, setFormData] = useState<Record<string, string>>(initialValues);
  const [activeLang, setActiveLang] = useState<string>(languages[0].key);

  const handleInputChange = (fieldName: string, value: string) => {
    const langSuffix = activeLang === languages[0].key ? "" : `_${activeLang}`;
    const key = `${fieldName}${langSuffix}`;
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    // Validate required fields for the primary language
    for (const field of fields) {
      if (field.required && !formData[field.name]) {
        alert(`${field.label} is required`);
        return;
      }
    }
    onSubmit(formData);
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        {title}
      </h2>

      <div className="mb-4">
        <p className="text-gray-700 dark:text-gray-300 mb-2">{description}</p>
        <div className="flex space-x-2 mb-2">
          {languages.map((lang) => (
            <button
              key={lang.key}
              onClick={() => setActiveLang(lang.key)}
              className={`px-3 py-1 rounded-md ${
                activeLang === lang.key
                  ? "bg-teal-500 text-white"
                  : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>

        {fields.map((field) => {
          const langSuffix = activeLang === languages[0].key ? "" : `_${activeLang}`;
          const fieldKey = `${field.name}${langSuffix}`;
          return (
            <div key={fieldKey} className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                {field.label} ({languages.find((lang) => lang.key === activeLang)?.label})
              </label>
              <input
                type="text"
                value={formData[fieldKey] || ""}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-end space-x-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-100 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default LanguageInputTemplate;