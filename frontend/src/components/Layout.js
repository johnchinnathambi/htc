import Navigation from "./Navigation";
import Footer from "./Footer";
import { Helmet } from 'react-helmet';

export default function Layout({ children }) {
  return (
    <>
      <Helmet>
        <title>HTC Accounting</title>
        <meta property='og:title' content='HTC Accounting' key='title' />
      </Helmet>
      <header className="bg-white shadow-sm relative z-10">
        <Navigation />
      </header>
      <main className="main-container">{children}</main>
      <Footer />
    </>
  );
}
