import React from "react";
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

const profileTabStyles = {
  formGrid: "grid grid-cols-1 md:grid-cols-2 gap-4",
  formGroup: "mb-4",
  label: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",
  input:
    "w-full px-3 py-2 border border-gray-600 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-gray-100",
  select:
    "w-full px-3 py-2 border border-gray-600 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-gray-100 appearance-none pr-10",
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
  declarationsContainer: "bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-600 p-6 rounded-lg shadow",
};

interface ProfileTabProps {
  formData: ProfileFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleUpdate: (section: string) => void;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ formData, handleInputChange, handleUpdate }) => {
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3 flex flex-col gap-6">
          <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-600 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              General Information
            </h3>
            <div className={profileTabStyles.formGrid}>
              <div className={profileTabStyles.formGroup}>
                <label htmlFor="title" className={profileTabStyles.label}>
                  Title
                </label>
                <div className="relative">
                  <select
                    id="title"
                    name="title"
                    className={profileTabStyles.select}
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
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className={profileTabStyles.formGroup}>
                <label htmlFor="nationality" className={profileTabStyles.label}>
                  Nationality
                </label>
                <div className="relative">
                  <select
                    id="nationality"
                    name="nationality"
                    className={profileTabStyles.select}
                    value={formData.nationality}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled hidden>
                      Select Nationality
                    </option>
                    <option value="Indian">Indian</option>
                    <option value="Emirati">Emirati</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className={profileTabStyles.formGroup}>
                <label htmlFor="country" className={profileTabStyles.label}>
                  Country
                </label>
                <div className="relative">
                  <select
                    id="country"
                    name="country"
                    className={profileTabStyles.select}
                    value={formData.country}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled hidden>
                      Select Country
                    </option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="India">India</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className={profileTabStyles.formGroup}>
                <label htmlFor="language" className={profileTabStyles.label}>
                  Language
                </label>
                <div className="relative">
                  <select
                    id="language"
                    name="language"
                    className={profileTabStyles.select}
                    value={formData.language}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled hidden>
                      Select Language
                    </option>
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className={profileTabStyles.formGroup}>
                <label htmlFor="gender" className={profileTabStyles.label}>
                  Gender
                </label>
                <div className="relative">
                  <select
                    id="gender"
                    name="gender"
                    className={profileTabStyles.select}
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
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className={profileTabStyles.formGroup}>
                <label htmlFor="usCitizen" className={profileTabStyles.label}>
                  US Citizen
                </label>
                <div className="relative">
                  <select
                    id="usCitizen"
                    name="usCitizen"
                    className={profileTabStyles.select}
                    value={formData.usCitizen}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled hidden>
                      Select Yes/No
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className={profileTabStyles.formGroup}>
                <label htmlFor="politicallyExposed" className={profileTabStyles.label}>
                  Politically Exposed?
                </label>
                <div className="relative">
                  <select
                    id="politicallyExposed"
                    name="politicallyExposed"
                    className={profileTabStyles.select}
                    value={formData.politicallyExposed}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled hidden>
                      Select Yes/No
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-4">
              ID Details
            </h3>
            <div className={profileTabStyles.formGrid}>
              <div className={profileTabStyles.formGroup}>
                <label htmlFor="idType" className={profileTabStyles.label}>
                  ID Type
                </label>
                <div className="relative">
                  <select
                    id="idType"
                    name="idType"
                    className={profileTabStyles.select}
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
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => handleUpdate('generalInfo')}
                className={profileTabStyles.updateButton}
              >
                Update
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-600 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Employment Info
            </h3>
            <div className={profileTabStyles.formGrid}>
              <div className={profileTabStyles.formGroup}>
                <label htmlFor="employmentStatus" className={profileTabStyles.label}>
                  Employment Status
                </label>
                <div className="relative">
                  <select
                    id="employmentStatus"
                    name="employmentStatus"
                    className={profileTabStyles.select}
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
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className={profileTabStyles.formGroup}>
                <label htmlFor="industry" className={profileTabStyles.label}>
                  Industry
                </label>
                <div className="relative">
                  <select
                    id="industry"
                    name="industry"
                    className={profileTabStyles.select}
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
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => handleUpdate('employmentInfo')}
                className={profileTabStyles.updateButton}
              >
                Update
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-600 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Financial Info
            </h3>
            <div className={profileTabStyles.formGrid}>
              <div className={profileTabStyles.formGroup}>
                <label htmlFor="annualIncome" className={profileTabStyles.label}>
                  Annual Income
                </label>
                <div className="relative">
                  <select
                    id="annualIncome"
                    name="annualIncome"
                    className={profileTabStyles.select}
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
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className={profileTabStyles.formGroup}>
                <label htmlFor="sourceOfFunds" className={profileTabStyles.label}>
                  Source of Funds
                </label>
                <div className="relative">
                  <select
                    id="sourceOfFunds"
                    name="sourceOfFunds"
                    className={profileTabStyles.select}
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
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className={profileTabStyles.formGroup}>
                <label htmlFor="workedInFinancial" className={profileTabStyles.label}>
                  Worked in Financial?
                </label>
                <div className="relative">
                  <select
                    id="workedInFinancial"
                    name="workedInFinancial"
                    className={profileTabStyles.select}
                    value={formData.workedInFinancial}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled hidden>
                      Select Yes/No
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => handleUpdate('financialInfo')}
                className={profileTabStyles.updateButton}
              >
                Update
              </button>
            </div>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className={profileTabStyles.quickActionsContainer}>
            <h3 className={profileTabStyles.quickActionsTitle}>Quick actions</h3>
            <div className={profileTabStyles.quickActionsSection}>
              <p className="font-medium text-gray-700 dark:text-gray-200 mb-2">Client</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <button className={profileTabStyles.quickActionsButton}>Portal Access</button>
                <button className={profileTabStyles.quickActionsButton}>Reset Password</button>
              </div>
            </div>
            <div className={profileTabStyles.quickActionsSection}>
              <p className="font-medium text-gray-700 dark:text-gray-200 mb-2">Forex</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <button className={profileTabStyles.quickActionsButton}>Add Transaction</button>
              </div>
            </div>
            <div className={profileTabStyles.quickActionsSection}>
              <p className="font-medium text-gray-700 dark:text-gray-200 mb-2">Trading Accounts</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <button className={profileTabStyles.quickActionsButton}>Create MTS</button>
                <button className={profileTabStyles.quickActionsButton}>Change Access</button>
                <button className={profileTabStyles.quickActionsButton}>Link MTS</button>
                <button className={profileTabStyles.quickActionsButton}>Reset MTS</button>
                <button className={profileTabStyles.quickActionsButton}>MTS Type</button>
                <button className={profileTabStyles.quickActionsButton}>Change Leverage</button>
              </div>
            </div>
            <div className={profileTabStyles.quickActionsSection}>
              <p className="font-medium text-gray-700 dark:text-gray-200 mb-2">IB</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <button className={profileTabStyles.quickActionsButton}>Link to IB</button>
                <button className={profileTabStyles.quickActionsButton}>Convert to IB</button>
              </div>
            </div>
            <div className={profileTabStyles.quickActionsSection}>
              <p className="font-medium text-gray-700 dark:text-gray-200 mb-2">Communication</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <button className={profileTabStyles.quickActionsButton}>Send Email</button>
              </div>
            </div>
          </div>

          <div className={profileTabStyles.applicationsContainer}>
            <h3 className={profileTabStyles.quickActionsTitle}>Applications</h3>
            <div className={profileTabStyles.applicationItem}>
              <span className={profileTabStyles.applicationLabel}>Individual Application</span>
              <div className={profileTabStyles.applicationButtons}>
                <button className={`${profileTabStyles.applicationButton} ${profileTabStyles.previewButton}`}>
                  Preview
                </button>
                <button className={`${profileTabStyles.applicationButton} ${profileTabStyles.downloadButton}`}>
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${profileTabStyles.declarationsContainer} w-full mt-6`}>
        <h3 className={profileTabStyles.quickActionsTitle}>Declarations</h3>
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
    </>
  );
};

export default ProfileTab;