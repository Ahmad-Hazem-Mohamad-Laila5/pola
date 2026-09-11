import Banner from "./Banner/page";
import Sneakers from "./Best-sneakers/page";
import Blogs from "./Blogs/page";
import Brands from "./Brands/page";
import Discover from "./Discover/page";
import FollowUs from "./FollowUs/page";
import Hero from "./Hero/page";
import NewArrivals from "./NewArrivals/page";

import ShopBannerCategory from "./ShopBannerCategory/page";

const Index = () => {
  return (
    <>
      <Hero />
      <Discover />
      <Banner />
      <Sneakers />
      <ShopBannerCategory />
      <NewArrivals />
      <Blogs />
      <FollowUs />
      <Brands />
    </>
  );
};

export default Index;
