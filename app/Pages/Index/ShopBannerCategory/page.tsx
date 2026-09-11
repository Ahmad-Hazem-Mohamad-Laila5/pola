import categpry1 from "@/public/Shop-banner-category-1.jpg";
import categpry2 from "@/public/Shop-banner-category-2.jpg";
import categpry3 from "@/public/Shop-banner-category-3.jpg";
import Image from "next/image";
import Link from "next/link";
const ShopBannerCategory = () => {
  const types = [
    "SHOP BY SPORTS",
    "Fitness & Yoga",
    "Football",
    "Tennis",
    "Swimwear",
    "Basketball",
    "Athletics",
    "Dancewear",
    "Boxing",
  ];
  return (
    <>
      <div className="px-[5%] lg:px-[10%] py-10 lg:py-20">
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="">
            <div className="discover-img relative">
              <Image
                src={categpry1}
                alt="ca"
                className=" w-full h-full rounded"
              />
              <button className="btn btn-left bg-white absolute bottom-5 left-5 z-10 font-semibold">
                <span>Shop Now</span>
              </button>
            </div>
            <div className=" mt-5">
              <h2 className=" text-3xl md:text-4xl font-semibold text-gray-700">
                LEGGINGS
              </h2>
            </div>
          </div>
          <div className="shop-cate-banner p-10">
            <h2 className=" text-5xl font-semibold mb-5">SHOP BY SPORTS</h2>
            <div className=" flex flex-col gap-1 mt-10">
              {/*  */}
              {types.map((item, idx) => (
                <Link
                  href={"#"}
                  key={idx}
                  className=" text-gray-500 font-medium text-lg hover:text-black transition-all duration-300 hover:translate-x-1"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
          <div className="">
            <div className="discover-img relative">
              <Image
                src={categpry2}
                alt="ca"
                className=" w-full h-full rounded"
              />
              <button className=" btn btn-left bg-white absolute bottom-5 left-5 z-10 font-semibold">
                <span>Shop Now</span>
              </button>
            </div>
            <div className="mt-5">
              <h2 className=" text-3xl md:text-4xl font-semibold text-gray-700">
                JACKETS & COATS
              </h2>
            </div>
          </div>
          <div className="">
            <div className="discover-img relative">
              <Image
                src={categpry3}
                alt="ca"
                className=" w-full h-full rounded"
              />
              <button className=" btn btn-left bg-white absolute bottom-5 left-5 z-10 font-semibold">
                <span>Shop Now</span>
              </button>
            </div>
            <div className="mt-5">
              <h2 className=" text-3xl md:text-4xl font-semibold text-gray-700">
                TOPS
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopBannerCategory;
