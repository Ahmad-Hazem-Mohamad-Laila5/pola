const Banner = () => {
  return (
    <>
      <div className=" px-[5%] lg:px-[10%] py-10 lg:py-20">
        <div className="banner">
          <div className="banner-content flex items-center h-full p-[5%]">
            <div className="">
              <h2 className=" text-5xl md:text-6xl font-semibold text-gray-800">
                LEISURE IN STYLE
              </h2>
              <p className=" text-lg text-gray-600 my-2">
                Everyday ensembles for women.
              </p><div className="banner-btn flex flex-wrap mt-5 gap-4">
              <button className="btn bg-white font-semibold btn-left">
                <span className="">SHOP WOMEN'S JUMPSUIT</span>
              </button>
              <button className=" btn bg-white font-semibold btn-left">
                <span>SHOP WOMEN'S CLOTHING</span>
              </button>
            </div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
