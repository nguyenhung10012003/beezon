export default function SearchBox() {
  return (
    <div className="flex justify-center mt-10">
      <form className="flex flex-col md:flex-row gap-3 ">
        <div className="flex">
          <input
            id="key"
            type="text"
            name="key"
            placeholder="Search for products or suppliers"
            className="w-full md:w-80 px-3 h-10 rounded-l border-2 border-sky-600 focus:outline-none focus:border-sky-600"
          />
          <button
            type="submit"
            className="bg-sky-600 text-white rounded-r px-2 md:px-3 py-0 md:py-1"
          >
            Search
          </button>
        </div>
        <select
          id="type"
          name="type"
          className="w-full h-10 border-2 border-sky-600 focus:outline-none focus:border-sky-600
          text-gray-800 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
        >
          <option value="all" selected={true}>All</option>
          <option value="products">Products</option>
          <option value="suppliers">Suppliers</option>
        </select>
      </form>
    </div>
  )
}