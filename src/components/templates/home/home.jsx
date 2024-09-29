import Navbar from '../../atoms/navbar/navbar'
import Footer from "../../atoms/footer/footer";
import { Route, Routes } from "react-router-dom";
import { useUser } from "../../../contexts/userContext";

function HomeBase() {
  const { user } = useUser();
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