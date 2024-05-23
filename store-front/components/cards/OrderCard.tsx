import { uppercaseFirstLetter } from "@/utils/string";

export default function OrderCard({ order }: { order: any }) {
  return (
    <div className="flex flex-col py-3 px-5 bg-gray-100 my-4 rounded-lg shadow-md">
      <div className="flex justify-between ">
        <div className="flex items-center">
          <h3 className="text-semibold">{order.seller.name}</h3>
          <a
            href={`/seller/${order.seller._id}`}
            className="bg-white border-2 px-2 py-1 rounded-lg text-sm ml-2"
          >
            See shop
          </a>
        </div>
        <span>{order.status}</span>
      </div>
      {order.products.map((product: any, index: number) => (
        <div
          className="flex justify-between p-2 border-t-2 border-b-2 border-gray-200 my-2 items-center"
          key={index}
        >
          <div className="flex">
            <img
              src={product.product.image}
              alt=""
              className="w-20 h-20 object-cover mr-2"
            />
            <div>
              <p>{uppercaseFirstLetter(product.product.name)}</p>
              <p>Quantity: {product.quantity}</p>
            </div>
          </div>
          <span className="text-red-500">
            ${product.product.price * product.quantity}
          </span>
        </div>
      ))}
      <div className="flex justify-end">
        <span className="text-red-500 font-semibold">
          {`Total: $${order.products.reduce((total: number, product: any) => {
            return total + product.product.price * product.quantity;
          }, 0)}`}
        </span>
      </div>
    </div>
  );
}
