"use client";

import React, { useState } from "react";
import { FaUser } from "react-icons/fa6";

interface ProfileFormData {
  title: string;
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  dob: string;
  nationality: string;
  country: string;
  city: string;
  address: string;
  address2: string;
  postalCode: string;
  language: string;
  source: string;
  gender: string;
  usCitizen: string;
  taxId: string;
  politicallyExposed: string;
  idType: string;
  countryOfIssue: string;
  idNumber: string;
  dateOfIssue: string;
  dateOfExpiry: string;
  employmentStatus: string;
  industry: string;
  jobIndustry: string;
  employer: string;
  annualIncome: string;
  sourceOfFunds: string;
  workedInFinancial: string;
  consent: boolean;
}

const profilePageStyles = {
  formGrid: "grid grid-cols-1 md:grid-cols-2 gap-4",
  formGroup: "mb-4",
  label: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",
  input:
    "w-full px-3 py-2 border border-gray-600 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-gray-100",
  select:
    "w-full px-3 py-2 border border-gray-600 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-gray-100",
  quickActionsContainer: "bg-white dark:bg-[#121212] dark:border dark:border-gray-600 shadow rounded-lg p-6",
  quickActionsSection: "mb-6",
  quickActionsTitle: "text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3",
  quickActionsButton:
    "flex-1 flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#032dac] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800 mb-2",
  updateButton: "mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700",
  applicationsContainer: "bg-white dark:bg-[#121212] dark:border dark:border-gray-600 shadow rounded-lg p-6 mt-6",
  applicationItem: "grid grid-cols-1 gap-2 py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0",
  applicationLabel: "text-gray-800 dark:text-gray-200 text-sm",
  applicationButtons: "flex space-x-2",
  applicationButton: "px-3 py-1 text-sm font-medium rounded-md",
  previewButton: "bg-blue-600 text-white hover:bg-blue-700",
  downloadButton: "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600",
  declarationsContainer: "bg-white dark:bg-[#121212] dark:border dark:border-gray-600 shadow rounded-lg p-6",
};

const ProfileTab = () => {
  const [formData, setFormData] = useState<ProfileFormData>({
    title: "",
    firstName: "Srikanth",
    lastName: "M",
    mobile: "+971564931164",
    email: "srikanth@gmail.com",
    dob: "",
    nationality: "",
    country: "United Arab Emirates",
    city: "Enter City",
    address: "Address",
    address2: "Address Line 2",
    postalCode: "Postal Code",
    language: "English",
    source: "FOREX_LIVE",
    gender: "",
    usCitizen: "",
    taxId: "",
    politicallyExposed: "",
    idType: "",
    countryOfIssue: "",
    idNumber: "",
    dateOfIssue: "",
    dateOfExpiry: "",
    employmentStatus: "",
    industry: "",
    jobIndustry: "",
    employer: "",
    annualIncome: "",
    sourceOfFunds: "",
    workedInFinancial: "",
    consent: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdate = (section: string) => {
    console.log(`Updating ${section} with data:`, formData);
    alert("Profile update initiated (check console for data)");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:w-2/3 flex flex-col gap-6">
        <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-600 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            General Information
          </h3>
          <div className={profilePageStyles.formGrid}>
            <div className={profilePageStyles.formGroup}>
              <label htmlFor="title" className={profilePageStyles.label}>
                Title
              </label>
              <select
                id="title"
                name="title"
                className={profilePageStyles.select}
                value={formData.title}
                onChange={handleInputChange}
              >
                <option value="" disabled hidden>
                  Select Title
                </option>
                <option value="Mr">Mr.</option>
                <option value="Ms">Ms.</option>
                <option value="Mrs">Mrs.</option>
                <option value="Dr">Dr.</option>
              </select>
            </div>
            <div className={profilePageStyles.formGroup}>
              <label htmlFor="firstName" className={profilePageStyles.label}>
                First name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className={profilePageStyles.input}
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter First Name"
              />
            </div>
            <div className={profilePageStyles.formGroup}>
              <label htmlFor="lastName" className={profilePageStyles.label}>
                Last name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className={profilePageStyles.input}
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter Last Name"
              />
            </div>
            <div className={profilePageStyles.formGroup}>
              <label htmlFor="mobile" className={profilePageStyles.label}>
                Mobile
              </label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                className={profilePageStyles.input}
                value={formData.mobile}
                onChange={handleInputChange}
                placeholder="+1234567890"
              />
            </div>
            <div className={profilePageStyles.formGroup}>
              <label htmlFor="email" className={profilePageStyles.label}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={profilePageStyles.input}
                value={formData.email}
                onChange={handleInputChange}
                placeholder="example@domain.com"
              />
            </div>
            <div className={profilePageStyles.formGroup}>
              <label htmlFor="dob" className={profilePageStyles.label}>
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                className={profilePageStyles.input}
                value={formData.dob}
                onChange={handleInputChange}
                placeholder="YYYY-MM-DD"
              />
            </div>
            <div className={profilePageStyles.formGroup}>
              <label htmlFor="nationality" className={profilePageStyles.label}>
                Nationality
              </label>
              <select
                id="nationality"
                name="nationality"
                className={profilePageStyles.select}
                value={formData.nationality}
                onChange={handleInputChange}
              >
                <option value="" disabled hidden>
                  Select Nationality
                </option>
                <option value="Indian">Indian</option>
                <option value="Emirati">Emirati</option>
              </select>
            </div>
            <div className={profilePageStyles.formGroup}>
              <label htmlFor="country" className={profilePageStyles.label}>
                Country
              </label>
              <select
                id="country"
                name="country"
                className={profilePageStyles.select}
                value={formData.country}
                onChange={handleInputChange}
              >
                <option value="" disabled hidden>
                  Select Country
                </option>
                <option value="United Arab Emirates">United Arab Emirates</option>
                <option value="India">India</option>
              </select>
            </div>
            <div className={profilePageStyles.formGroup}>
              <label htmlFor="city" className={profilePageStyles.label}>
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className={profilePageStyles.input}
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Enter City"
              />
            </div>
            <div className={profilePageStyles.formGroup}>
              <label htmlFor="address" className={profilePageStyles.label}>
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className={profilePageStyles.input}
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter Street Address"
              />
            </div>
            <div className={profilePageStyles.formGroup}>
              <label htmlFor="address2" className={profilePageStyles.label}>
                Address Line 2
              </label>
              <input
                type="text"
                id="address2"
                name="address2"
                className={profilePageStyles.input}
                value={formData.address2}
                onChange={handleInputChange}
                placeholder="Apartment, Suite, etc. (optional)"
              />
            </div>
            <div className={profilePageStyles.formGroup}>
              <label htmlFor="postalCode" className={profilePageStyles.label}>
                Postal Code
              </label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                className={profilePageStyles.input}
                value={formData.postalCode}
                onChange={handleInputChange}
                placeholder="Enter Postal Code"
              />
            </div>
            <div className={profilePageStyles.formGroup}>
              <label htmlFor="language" className={profilePageStyles.label}>
                Language
              </label>
              <select
                id="language"
                name="language"
                className={profilePageStyles.select}
                value={formData.language}
                onChange={handleInputChange}
              >
                <option value="" disabled hidden>
                  Select Language
                </option>
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
              </select>
            </div>
            <div className={profilePageStyles.formGroup}>
              <label htmlFor="source" className={profilePageStyles.label}>
                Source
              </label>
              <input
                type="text"
                id="source"
                name="source"
                className={profilePageStyles.input}
                value={formData.source}
                onChange={handleInputChange}
                placeholder="Enter Source (e.g., FOREX_LIVE)"
              />
            </div>
            <div className={profilePageStyles.formGroup}>
              <label htmlFor="gender" className={profilePageStyles.label}>
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                className={profilePageStyles.select}
                value={formData.gender}
                onChange={handleInputChange}
              >
                <option value="" disabled hidden>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className={profilePageStyles.formGroup}>
              <label htmlFor="usCitizen" className={profilePageStyles.label}>
                US Citizen
              </label>
              <select
                id="usCitizen"
                name="usCitizen"
                className={profilePageStyles.select}
                value={formData.usCitizen}
                onChange={handleInputChange}
              >
                <option value="" disabled hidden>
                  Select Yes/No
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className={profilePageStyles.formGroup}>
              <label htmlFor="taxId" className={profilePageStyles.label}>
                Tax Identification Number
              </label>
              <input
                type="text"
                id="taxId"
                name="taxId"
                className={profilePageStyles.input}
                value={formData.taxId}
                onChange={handleInputChange}
                placeholder="Enter Tax ID"
              />
            </div>
            <div className={profilePageStyles.formGroup}>
              <label htmlFor="politicallyExposed" className={profilePageStyles.label}>
                Politically Exposed?
              </label>
              <select
                id="politicallyExposed"
                name="politicallyExposed"
                className={profilePageStyles.select}
                value={formData.politicallyExposed}
                onChange={handleInputChange}
              >
                <option value="" disabled hidden>
                  Select Yes/No
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-4">
            ID Details
          </h3>
          <div className={profilePageStyles.formGrid}>
            <div className={profilePageStyles.formGroup}>
              <label htmlFor="idType" className={profilePageStyles.label}>
                ID Type
              </label>
              <select
                id="idType"
                name="idType"
                className={profilePageStyles.select}
                value={formData.idType}
                onChange={handleInputChange}
              >
                <option value="" disabled hidden>
                  Select ID Type
                </option>
                <option value="Passport">Passport</option>
                <option value="National ID">National ID</option>
                <option value="Driver's License">Driver's License</option>
              </select>
            </div>
            <div className={profilePageStyles.formGroup}>
              <label htmlFor="countryOfIssue" className={profilePageStyles.label}>
                Country of Issue
              </label>
              <input
                type="text"
                id="countryOfIssue"
                name="countryOfIssue"
                className={profilePageStyles.input}
                value={formData.countryOfIssue}
                onChange={handleInputChange}
                placeholder="Enter Country of Issue"
              />
            </div>
            <div className={profilePageStyles.formGroup}>
              <label htmlFor="idNumber" className={profilePageStyles.label}>
                ID Number
              </label>
              <input
                type="text"
                id="idNumber"
                name="idNumber"
                className={profilePageStyles.input}
                value={formData.idNumber}
                onChange={handleInputChange}
                placeholder="Enter ID Number"
              />
            </div>
            <div className={profilePageStyles.formGroup}>
              <label htmlFor="dateOfIssue" className={profilePageStyles.label}>
                Date of Issue
              </label>
              <input
                type="date"
                id="dateOfIssue"
                name="dateOfIssue"
                className={profilePageStyles.input}
                value={formData.dateOfIssue}
                onChange={handleInputChange}
                placeholder="YYYY-MM-DD"
              />
            </div>
            <div className={profilePageStyles.formGroup}>
              <label htmlFor="dateOfExpiry" className={profilePageStyles.label}>
                Date of expiry
              </label>
              <input
                type="date"
                id="dateOfExpiry"
                name="dateOfExpiry"
                className={profilePageStyles.input}
                value={formData.dateOfExpiry}
                onChange={handleInputChange}
                placeholder="YYYY-MM-DD"
              />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              onClick={() => handleUpdate('generalInfo')}
              className={profilePageStyles.updateButton}
            >
              Update
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-600 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Employment Info
          </h3>
          <div className={profilePageStyles.formGrid}>
            <div className={profilePageStyles.formGroup}>
              <label htmlFor="employmentStatus" className={profilePageStyles.label}>
                Employment Status
              </label>
              <select
                id="employmentStatus"
                name="employmentStatus"
                className={profilePageStyles.select}
                value={formData.employmentStatus}
                onChange={handleInputChange}
              >
                <option value="" disabled hidden>
                  Select Employment Status
                </option>
                <option value="Employed">Employed</option>
                <option value="Self-Employed">Self-Employed</option>
                <option value="Unemployed">Unemployed</option>
                <option value="Student">Student</option>
                <option value="Retired">Retired</option>
              </select>
            </div>
            <div className={profilePageStyles.formGroup}>
              <label htmlFor="industry" className={profilePageStyles.label}>
                Industry
              </label>
              <select
                id="industry"
                name="industry"
                className={profilePageStyles.select}
                value={formData.industry}
                onChange={handleInputChange}
              >
                <option value="" disabled hidden>
                  Select Industry
                </option>
                <option value="Technology">Technology</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
              </select>
            </div>
            <div className={profilePageStyles.formGroup}>
              <label htmlFor="jobIndustry" className={profilePageStyles.label}>
                Job Industry
              </label>
              <input
                type="text"
                id="jobIndustry"
                name="jobIndustry"
                className={profilePageStyles.input}
                value={formData.jobIndustry}
                onChange={handleInputChange}
                placeholder="Enter Job Industry"
              />
            </div>
            <div className={profilePageStyles.formGroup}>
              <label htmlFor="employer" className={profilePageStyles.label}>
                Employer
              </label>
              <input
                type="text"
                id="employer"
                name="employer"
                className={profilePageStyles.input}
                value={formData.employer}
                onChange={handleInputChange}
                placeholder="Enter Employer Name"
              />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              onClick={() => handleUpdate('employmentInfo')}
              className={profilePageStyles.updateButton}
            >
              Update
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-600 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Financial Info
          </h3>
          <div className={profilePageStyles.formGrid}>
            <div className={profilePageStyles.formGroup}>
              <label htmlFor="annualIncome" className={profilePageStyles.label}>
                Annual Income
              </label>
              <select
                id="annualIncome"
                name="annualIncome"
                className={profilePageStyles.select}
                value={formData.annualIncome}
                onChange={handleInputChange}
              >
                <option value="" disabled hidden>
                  Select Income Range
                </option>
                <option value="<25k">Less than $25,000</option>
                <option value="25k-50k">$25,000 - $50,000</option>
                <option value="50k-100k">$50,000 - $100,000</option>
                <option value=">100k">More than $100,000</option>
              </select>
            </div>
            <div className={profilePageStyles.formGroup}>
              <label htmlFor="sourceOfFunds" className={profilePageStyles.label}>
                Source of Funds
              </label>
              <select
                id="sourceOfFunds"
                name="sourceOfFunds"
                className={profilePageStyles.select}
                value={formData.sourceOfFunds}
                onChange={handleInputChange}
              >
                <option value="" disabled hidden>
                  Select Source of Funds
                </option>
                <option value="Salary">Salary</option>
                <option value="Savings">Savings</option>
                <option value="Investment">Investment Income</option>
                <option value="Business">Business Profits</option>
              </select>
            </div>
            <div className={profilePageStyles.formGroup}>
              <label htmlFor="workedInFinancial" className={profilePageStyles.label}>
                Worked in Financial?
              </label>
              <select
                id="workedInFinancial"
                name="workedInFinancial"
                className={profilePageStyles.select}
                value={formData.workedInFinancial}
                onChange={handleInputChange}
              >
                <option value="" disabled hidden>
                  Select Yes/No
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              onClick={() => handleUpdate('financialInfo')}
              className={profilePageStyles.updateButton}
            >
              Update
            </button>
          </div>
        </div>
      </div>

      <div className="lg:w-1/3">
        <div className={profilePageStyles.quickActionsContainer}>
          <h3 className={profilePageStyles.quickActionsTitle}>Quick actions</h3>
          <div className={profilePageStyles.quickActionsSection}>
            <p className="font-medium text-gray-700 dark:text-gray-200 mb-2">Client</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <button className={profilePageStyles.quickActionsButton}>Portal Access</button>
              <button className={profilePageStyles.quickActionsButton}>Reset Password</button>
            </div>
          </div>
          <div className={profilePageStyles.quickActionsSection}>
            <p className="font-medium text-gray-700 dark:text-gray-200 mb-2">Forex</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <button className={profilePageStyles.quickActionsButton}>Add Transaction</button>
            </div>
          </div>
          <div className={profilePageStyles.quickActionsSection}>
            <p className="font-medium text-gray-700 dark:text-gray-200 mb-2">Trading Accounts</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <button className={profilePageStyles.quickActionsButton}>Create MTS</button>
              <button className={profilePageStyles.quickActionsButton}>Change Access</button>
              <button className={profilePageStyles.quickActionsButton}>Link MTS</button>
              <button className={profilePageStyles.quickActionsButton}>Reset MTS</button>
              <button className={profilePageStyles.quickActionsButton}>MTS Type</button>
              <button className={profilePageStyles.quickActionsButton}>Change Leverage</button>
            </div>
          </div>
          <div className={profilePageStyles.quickActionsSection}>
            <p className="font-medium text-gray-700 dark:text-gray-200 mb-2">IB</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <button className={profilePageStyles.quickActionsButton}>Link to IB</button>
              <button className={profilePageStyles.quickActionsButton}>Convert to IB</button>
            </div>
          </div>
          <div className={profilePageStyles.quickActionsSection}>
            <p className="font-medium text-gray-700 dark:text-gray-200 mb-2">Communication</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <button className={profilePageStyles.quickActionsButton}>Send Email</button>
            </div>
          </div>
        </div>

        <div className={profilePageStyles.applicationsContainer}>
          <h3 className={profilePageStyles.quickActionsTitle}>Applications</h3>
          <div className={profilePageStyles.applicationItem}>
            <span className={profilePageStyles.applicationLabel}>Individual Application</span>
            <div className={profilePageStyles.applicationButtons}>
              <button className={`${profilePageStyles.applicationButton} ${profilePageStyles.previewButton}`}>
                Preview
              </button>
              <button className={`${profilePageStyles.applicationButton} ${profilePageStyles.downloadButton}`}>
                Download
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={profilePageStyles.declarationsContainer}>
        <h3 className={profilePageStyles.quickActionsTitle}>Declarations</h3>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="consent"
            name="consent"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            checked={formData.consent}
            onChange={handleInputChange}
          />
          <label htmlFor="consent" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
            By clicking here I give my consent for I Care Forex to contact me for marketing purposes. You can opt out at any time. For further details please see our Marketing and Communication Policy Statement.
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;