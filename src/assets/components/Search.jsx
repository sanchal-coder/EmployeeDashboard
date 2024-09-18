
const Search = ({ SearchKeyword, handleSearch }) =>
(
  <div className='flex justify-center items-center gap-2'>
    <input
      className='border border-gray-400 py-1 px-2 rounded-lg w-2/3'
      onChange={(e) => handleSearch(e.target.value)}
      type="text"
      value={SearchKeyword}
      placeholder='Search Employee with ID'
    />
    <div> <i className="fa-solid fa-magnifying-glass cursor-pointer"></i>
    </div>
  </div>
)
export default Search