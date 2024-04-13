import Footer from "../../../../components/share/Footer";
import Singup from "../../../../components/register/Signup";
import { PublicRoute } from "../../../../components/route/PublicRoute";
import Navbar from "../../../../components/share/Navbar/Navbar";

export default function Home() {
  return (
    <>
      <PublicRoute>
        <Navbar />
        <Singup />
        <Footer />
      </PublicRoute>
    </>
  );
}
