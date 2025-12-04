import Navbar from '../../atoms/navbar/navbar';
import Footer from "../../atoms/footer/Footer";
import PropTypes from 'prop-types';
import Alert from '../../atoms/alert/alert';


function HomeBase({ children, aside }) {
  return (
    <div className="min-h-screen w-full flex flex-col bg-neutral-100">
      <Navbar />
      <Alert />
      <div className="flex flex-col lg:flex-row justify-center flex-1">
        {aside && (
          <aside className="w-full lg:w-4/12 mt-4 sticky top-8">
            {aside}
          </aside>
        )}
        <main className={`flex flex-col main-content ${aside ? 'lg:w-7/12' : 'w-full'}`}>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default HomeBase;