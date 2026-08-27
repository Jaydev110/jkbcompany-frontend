import Hero from "../Hero";
import CompanyBenefits from "../CompanyBenefits";
import WhyChooseUs from "../WhyChooseUs";
import "./Home.css";

function Home() {
  return (
    <div className="jkb-home">

      {/* Hero */}
      <Hero />

      {/* About / Services preview */}
      <CompanyBenefits />

      {/* Why Choose JKB */}
      <WhyChooseUs />

    </div>
  );
}

export default Home;