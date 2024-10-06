import Navbar from '../../atoms/navbar/navbar'
import Footer from "../../atoms/footer/footer";
import PropTypes from 'prop-types';

HomeBase.propTypes = {
  children: PropTypes.node.isRequired,
};

function HomeBase({children}) {
  return (
    <div className="h-auto w-full flex flex-col bg-neutral-100"> 
      <main className="main-content">
      <Navbar />
      {children}
      </main>
      <Footer />
    </div>
  );
}

export default HomeBase;