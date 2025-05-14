import React, { useState } from "react";
import { SearchIcon } from "../../assets/icons/Icon";
interface SearchInterface {
  query: Record<string, any>;
  setQuery: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

const Search: React.FC<SearchInterface> = ({ query, setQuery }) => {
  const [searchText, setSearchText] = useState<string>("");

  const diabledSearch =
    (query && Object.keys(query)?.length > 0) || searchText !== "";
  const handleSearch = () => {
    if ((query && Object.keys(query)?.length > 0) || searchText !== "") {
      if (query?.search !== "" || searchText !== "") {
        setQuery((pre) => ({ ...pre, search: searchText }));
      }
    }
  };
  return (
    <div className="flex_center_y  border border-grey-100 rounded-lg flex-1 sm:py-3 p-2 sm:px-4 gap-2">
      <span
        onClick={() => {
          if (diabledSearch) {
            handleSearch();
          }
        }}
        className={diabledSearch ? "cursor-pointer" : ""}
      >
        <SearchIcon />
      </span>
      <input
        type="text"
        placeholder="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        className={`outline-none border-0 shadow-none flex-1 placeholder:text-sm placeholder:text-natural-100 `}
      />
    </div>
  );
};

export default Search;
