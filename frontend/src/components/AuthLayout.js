import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <>
      <Helmet>
        <title>HTC Accounting</title>
        <meta property="og:title" content="HTC Accounting" key="title" />
      </Helmet>
      <main className="main-container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
