const categories = [
  {
    title: "Building Materials",
    image: "images/building.jpg",
    href: "/search",
  },
  { title: "Electronics", image: "images/electronic.jpg", href: "/search" },
  {
    title: "Mechanical Parts",
    image: "images/mechanical.jpg",
    href: "/search",
  },
];

export default function Categories() {
  return (
    <div className="flex gap-7 my-3">
      {categories.map((category, index) => (
        <div className="flex flex-col items-center gap-5 border-2 border-gray-200 rounded-lg px-3 py-5" key={index}>
          <a href={category.href}>
            <img
              src={category.image}
              alt={category.title}
              className="w-[300px] h-[300px] object-cover"
            />
          </a>
          <a
            href={category.href}
            className="border-indigo-600 border font-semibold text-gray-700 py-2 px-5 rounded-lg hover:bg-indigo-500 hover:text-white"
          >
            Shop now
          </a>
        </div>
      ))}
    </div>
  );
}
