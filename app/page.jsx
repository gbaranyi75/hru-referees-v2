//import connectDB from "@/config/database";
import Hero from "@/components/Hero";
import InfoBoxes from '@/components/InfoBoxes';

const HomePage = async () => {
  //await connectDB();
  return (
    <>
      <Hero />
      <InfoBoxes />
    </>
  );
};
export default HomePage;
