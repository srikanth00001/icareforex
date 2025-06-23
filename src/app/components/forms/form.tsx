import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'select' | 'textarea' | 'checkbox';
  placeholder?: string;
  options?: { value: string; label: string }[];
}

interface Props {
  fields: FormField[];
  onSubmit: (data: any) => void;
  parent: string;
  parentLink: string;
  onCancel: () => void;
  title: string;
  initialValues: any;
}

const FormTemplate: React.FC<Props> = ({
  fields,
  onSubmit,
  parent,
  parentLink,
  onCancel,
  title,
  initialValues,
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState<any>(initialValues);
  const [emailVerified, setEmailVerified] = useState(true);
  const [photo, setPhoto] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      const maxSize = 3 * 1024 * 1024; // 3 MB in bytes
      if (!validTypes.includes(file.type)) {
        alert('Invalid file type. Allowed: *.jpeg, *.jpg, *.png, *.gif');
        return;
      }
      if (file.size > maxSize) {
        alert('File too large. Maximum size is 3 MB.');
        return;
      }
      setPhoto(file);
      setFormData((prev: any) => ({ ...prev, photo: file }));
    }
  };

  const handlePhotoRemove = () => {
    setPhoto(null);
    setFormData((prev: any) => ({ ...prev, photo: null }));
  };

  const handleToggle = () => {
    setEmailVerified(!emailVerified);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-5 w-full  mx-auto">
      <nav className="text-sm text-gray-500 dark:text-white mb-4">
        <a href={parentLink} className="hover:underline">
          {parent}
        </a>{' '}
        • <span>{title}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Profile Photo Card */}
        <div className="bg-white dark:bg-gray-950 rounded-lg shadow p-4 flex flex-col items-start min-h-[300px] justify-center">
          <label className="relative w-32 h-32 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 mx-auto cursor-pointer group">
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
              style={{
                border: '0px',
                clip: 'rect(0px, 0px, 0px, 0px)',
                clipPath: 'inset(50%)',
                height: '1px',
                margin: '0px -1px -1px 0px',
                overflow: 'hidden',
                padding: '0px',
                position: 'absolute',
                width: '1px',
                whiteSpace: 'nowrap',
              }}
            />
            {photo ? (
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="Uploaded"
                  className="w-full h-full rounded-full object-cover"
                />
                <button
                  onClick={handlePhotoRemove}
                  className="absolute top-2 right-2 bg-gray-800 bg-opacity-50 rounded-full p-1 hover:bg-opacity-75 transition-opacity"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="w-8 h-8 text-gray-500 dark:text-white group-hover:opacity-80 transition-opacity"
                  viewBox="0 0 24 24"
                >
                  <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                    <path d="M12 10.25a.75.75 0 0 1 .75.75v1.25H14a.75.75 0 0 1 0 1.5h-1.25V15a.75.75 0 0 1-1.5 0v-1.25H10a.75.75 0 0 1 0-1.5h1.25V11a.75.75 0 0 1 .75-.75" />
                    <path d="M9.778 21h4.444c3.121 0 4.682 0 5.803-.735a4.4 4.4 0 0 0 1.226-1.204c.749-1.1.749-2.633.749-5.697s0-4.597-.749-5.697a4.4 4.4 0 0 0-1.226-1.204c-.72-.473-1.622-.642-3.003-.702c-.659 0-1.226-.49-1.355-1.125A2.064 2.064 0 0 0 13.634 3h-3.268c-.988 0-1.839.685-2.033 1.636c-.129.635-.696 1.125-1.355 1.125c-1.38.06-2.282.23-3.003.702A4.4 4.4 0 0 0 2.75 7.667C2 8.767 2 10.299 2 13.364s0 4.596.749 5.697c.324.476.74.885 1.226 1.204C5.096 21 6.657 21 9.778 21M16 13a4 4 0 1 1-8 0a4 4 0 0 1 8 0m2-3.75a.75.75 0 0 0 0 1.5h1a.75.75 0 0 0 0-1.5z" />
                  </g>
                </svg>
                <span className="text-sm text-gray-500 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors mt-2">
                  Upload photo
                </span>
              </div>
            )}
          </label>
          <p className="text-xs text-gray-500 dark:text-white text-center w-full mb-4 uppercase">
            Allowed *.jpeg, *.jpg, *.png, *.gif <br /> max size of 3 Mb
          </p>
          <div className="w-full">
            <div className="flex justify-between items-center mb-1">
              <label className="text-base font-medium text-gray-700 dark:text-white md:mt-10">
                Email verified
              </label>
              <div
                onClick={handleToggle}
                className={`w-10 h-5 md:mt-10 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ${
                  emailVerified ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                    emailVerified ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </div>
            </div>
            <span className="text-sm text-gray-500 dark:text-white">
              Disabling this will automatically send the user a verification email
            </span>
          </div>
        </div>

        {/* Form Inputs Card */}
        <div className="md:col-span-2 bg-white dark:bg-gray-950 rounded-lg shadow p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                  Full name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                  Phone number
                </label>
                <div className="flex items-center">
                  <select
                    name="countryCode"
                    value={formData.countryCode || 'US'}
                    onChange={handleChange}
                    className="p-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-800 rounded-l focus:outline-none"
                  >
                    <option value="US">🇺🇸</option>
                    <option value="IN">🇮🇳</option>
                    <option value="UK">🇬🇧</option>
                  </select>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber || ''}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-800 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                  Country
                </label>
                <select
                  name="country"
                  value={formData.country || ''}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select country</option>
                  <option value="US">United States</option>
                  <option value="IN">India</option>
                  <option value="UK">United Kingdom</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                  State/Region
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state || ''}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter state/region"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city || ''}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter city"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address || ''}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                  ZIP code
                </label>
                <input
                  type="text"
                  name="zipcode"
                  value={formData.zipcode || ''}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter ZIP code"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company || ''}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter company name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role || ''}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter role"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-gray-700 dark:text-white bg-gray-200 dark:bg-gray-800 rounded hover:bg-gray-300 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-gray-700 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-800 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Create user
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormTemplate;