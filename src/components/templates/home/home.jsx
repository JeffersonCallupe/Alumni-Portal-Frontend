import Navbar from '../../atoms/navbar/navbar'
import Footer from "../../atoms/footer/footer";
import { Route, Routes } from "react-router-dom";

function HomeBase() {
  return (
    <div className="h-screen w-full flex flex-col"> 
      <main className="main-content h-screen">
      <Navbar />
        <Routes>
          <Route path="/home/*" element={<HomeBase />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default HomeBase;