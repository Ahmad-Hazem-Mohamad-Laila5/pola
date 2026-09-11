import Image from "next/image";
import DiscoverImg1 from "@/public/Discover-1.jpg";
import DiscoverImg2 from "@/public/Discover-2.jpg";
import DiscoverImg3 from "@/public/Discover-3.jpg";
const Discover = () => {
  return (
    <>
      <div className="px-[5%] lg:px-[10%] py-10 lg:py-20">
        <div className=" flex flex-col lg:flex-row justify-between gap-8">
          <div className=" w-full lg:w-2/3">
            <div className="">
              <h2 className=" text-4xl font-semibold text-gray-700">
                FOOTWEAR, FOR EXERCISE.
              </h2>
              <p className=" text-lg text-gray-600 my-2">
                Innovation & Confort.
              </p>
              <div className=" flex items-center gap-3 mb-5">
                <button className="def-btn font-semibold cursor-pointer py-2  border-s-2 border-r-2 border-transparent px-3 hover:border-black transition-all duration-300 rounded">
                  Shop Men
                </button>
                <button className="def-btn font-semibold cursor-pointer py-2 border-s-2 border-r-2 border-transparent px-3 hover:border-black transition-all duration-300 rounded">
                  Shop Women
                </button>
              </div>
              <Image
                src={DiscoverImg1}
                alt="DiscoverImg1"
                className=" w-full h-full rounded"
              />
            </div>
          </div>
          <div className=" w-full lg:w-1/1">
            <div className=" flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className=" w-full lg:w-1/2">
                <div className="discover-img relative">
                  <Image
                    src={DiscoverImg2}
                    alt="DiscoverImg2"
                    className=" w-full h-full rounded"
                  />
                  <button className="btn btn-left bg-white absolute bottom-5 left-5 z-10 font-semibold">
                    <span>Discover</span>
                  </button>
                </div>
                <div className="mt-5">
                  <h2 className=" text-3xl md:text-4xl font-semibold text-gray-700">
                    WINTER GEAR
                  </h2>
                  <p className=" text-md md:text-lg text-gray-600 my-2">
                    Discover our selection of smart gearing
                  </p>
                </div>
              </div>
              <div className=" w-full lg:w-1/2">
                <div className="discover-img relative">
                  <Image
                    src={DiscoverImg3}
                    alt="DiscoverImg2"
                    className=" w-full h-full rounded"
                  />
                  <button className="btn btn-left bg-white absolute bottom-5 left-5 z-10 font-semibold">
                    <span>Discover</span>
                  </button>
                </div>
                <div className="mt-5">
                  <h2 className=" text-3xl md:text-4xl font-semibold text-gray-700">
                    WINTER GEAR
                  </h2>
                  <p className=" text-md md:text-lg text-gray-600 my-2">
                    Discover our selection of smart gearing
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Discover;
