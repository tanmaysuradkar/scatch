import Header from '../layout/Header'
import HeroSection from './HeroSection'
import Page2 from './Page2'
import Footer from '../layout/Footer'
import Page3 from './Page3'
import Page4 from './Page4'
import Page5 from './Page5'
import Page6 from './Page6'
import NewsletterSection from './NewsletterSection'
import ScrollToTop from './ScrollToTop'
function Home() {
  return (
   <div className="min-h-screen w-full bg-white">
      <Header />
      <main>
        <HeroSection />
        <Page2 />
          {/* Best Seller Banner */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="lg:col-span-2 lg:h-23 lg:w-[98vw] overflow-hidden relative ml-1.5 bg-gray-900 rounded-3xl flex items-center justify-between p-8 text-center ">
            <div className="flex absolute w-[300%] lg:w-[200%] flex-row lg:flex-row items-center text-center justify-between gap-2 text-white">
              <h2 className="text-2xl font-bold lg:mb-0">BEST SELLER</h2>
              <h2 className="text-2xl font-bold lg:mb-0">OUR BEST SELLER</h2>
              <h2 className="text-2xl font-bold">OUR BEST</h2>
              <h2 className="text-2xl font-bold lg:mb-0">BEST SELLER</h2>
              <h2 className="text-2xl font-bold lg:mb-0">OUR BEST SELLER</h2>
              <h2 className="text-2xl font-bold">OUR BEST</h2>
            </div>
          </div>
        </div>
        <Page3 />
        <Page4 />
        <Page5 />
        <Page6 />
        <NewsletterSection />
      </main>
      <Footer />
      <ScrollToTop/>
    </div>
  )
};

export default Home;
