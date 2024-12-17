import { useState } from "react";

export interface District {
  key: string;
  label: string;
}

export const districts: District[] = [
  { key: "Bagerhat", label: "Bagerhat" },
  { key: "Bandarban", label: "Bandarban" },
  { key: "Barguna", label: "Barguna" },
  { key: "Barishal", label: "Barishal" },
  { key: "Bhola", label: "Bhola" },
  { key: "Bogra", label: "Bogra" },
  { key: "Brahmanbaria", label: "Brahmanbaria" },
  { key: "Chandpur", label: "Chandpur" },
  { key: "Chapai Nawabganj", label: "Chapai Nawabganj" },
  { key: "Chattogram", label: "Chattogram" },
  { key: "Chuadanga", label: "Chuadanga" },
  { key: "Cox's Bazar", label: "Cox's Bazar" },
  { key: "Cumilla", label: "Cumilla" },
  { key: "Dhaka", label: "Dhaka" },
  { key: "Dinajpur", label: "Dinajpur" },
  { key: "Faridpur", label: "Faridpur" },
  { key: "Feni", label: "Feni" },
  { key: "Gaibandha", label: "Gaibandha" },
  { key: "Gazipur", label: "Gazipur" },
  { key: "Gopalganj", label: "Gopalganj" },
  { key: "Habiganj", label: "Habiganj" },
  { key: "Jamalpur", label: "Jamalpur" },
  { key: "Jashore", label: "Jashore" },
  { key: "Jhalokati", label: "Jhalokati" },
  { key: "Jhenaidah", label: "Jhenaidah" },
  { key: "Joypurhat", label: "Joypurhat" },
  { key: "Khagrachari", label: "Khagrachari" },
  { key: "Khulna", label: "Khulna" },
  { key: "Kishoreganj", label: "Kishoreganj" },
  { key: "Kurigram", label: "Kurigram" },
  { key: "Kushtia", label: "Kushtia" },
  { key: "Lakshmipur", label: "Lakshmipur" },
  { key: "Lalmonirhat", label: "Lalmonirhat" },
  { key: "Madaripur", label: "Madaripur" },
  { key: "Magura", label: "Magura" },
  { key: "Manikganj", label: "Manikganj" },
  { key: "Meherpur", label: "Meherpur" },
  { key: "Moulvibazar", label: "Moulvibazar" },
  { key: "Munshiganj", label: "Munshiganj" },
  { key: "Mymensingh", label: "Mymensingh" },
  { key: "Naogaon", label: "Naogaon" },
  { key: "Narail", label: "Narail" },
  { key: "Narayanganj", label: "Narayanganj" },
  { key: "Narsingdi", label: "Narsingdi" },
  { key: "Natore", label: "Natore" },
  { key: "Netrokona", label: "Netrokona" },
  { key: "Nilphamari", label: "Nilphamari" },
  { key: "Noakhali", label: "Noakhali" },
  { key: "Pabna", label: "Pabna" },
  { key: "Panchagarh", label: "Panchagarh" },
  { key: "Patuakhali", label: "Patuakhali" },
  { key: "Pirojpur", label: "Pirojpur" },
  { key: "Rajbari", label: "Rajbari" },
  { key: "Rajshahi", label: "Rajshahi" },
  { key: "Rangamati", label: "Rangamati" },
  { key: "Rangpur", label: "Rangpur" },
  { key: "Satkhira", label: "Satkhira" },
  { key: "Shariatpur", label: "Shariatpur" },
  { key: "Sherpur", label: "Sherpur" },
  { key: "Sirajganj", label: "Sirajganj" },
  { key: "Sunamganj", label: "Sunamganj" },
  { key: "Sylhet", label: "Sylhet" },
  { key: "Tangail", label: "Tangail" },
  { key: "Thakurgaon", label: "Thakurgaon" },
];

interface DistrictSearchProps {
  onSelect: (district: District) => void;
  errorMessage?: string; // Add error message prop
}

const DistrictSearch: React.FC<DistrictSearchProps> = ({
  onSelect,
  errorMessage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredDistricts = districts.filter((district) =>
    district.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (district: District) => {
    setSelectedDistrict(district);
    setIsOpen(false); // Close dropdown on selection
    setSearchTerm(""); // Reset search term
    onSelect(district); // Notify parent component
  };

  return (
    <div className="relative w-full mx-auto mt-10 min-w-[200px] z-50">
      {/* Label */}
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Select District
      </label>

      {/* Dropdown Button */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex justify-between items-center w-full p-2 border border-gray-300 rounded-md shadow-sm cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <span>
          {selectedDistrict ? selectedDistrict.label : "Select Your District"}
        </span>
        <span className="ml-2 text-gray-500">{isOpen ? "▲" : "▼"}</span>
      </div>

      {/* Dropdown List */}
      {isOpen && (
        <div className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {/* Search Box (Fixed) */}
          <div className="sticky top-0 bg-white z-20 p-2 border-b border-gray-300">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search districts..."
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Districts List (Scrollable) */}
          <ul className="max-h-32 overflow-auto">
            {(filteredDistricts.length > 0 ? filteredDistricts : districts).map(
              (district) => (
                <li
                  key={district.key}
                  onClick={() => handleSelect(district)}
                  className="p-2 cursor-pointer hover:bg-blue-100"
                >
                  {district.label}
                </li>
              )
            )}
          </ul>
        </div>
      )}

      {/* Show error message if there's one */}
      {errorMessage && (
        <p className="text-red-500 text-xs mt-2">{errorMessage}</p>
      )}
    </div>
  );
};

export default DistrictSearch;
