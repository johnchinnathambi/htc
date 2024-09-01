import Navigation from "./Navigation";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Helmet>
        <title>HTC Accounting</title>
        <meta property="og:title" content="HTC Accounting" key="title" />
      </Helmet>
      <div className="flex min-h-screen relative w-full">
        <div className="main-sidebar w-72 fixed left-0 top-0 z-[999] min-w-0">
          <aside className="flex h-screen w-full flex-col overflow-y-hidden bg-slate-800 duration-100 ease-linear dark:bg-slate-900 lg:static lg:translate-x-0 -translate-x-full">
            <Navigation />
          </aside>
        </div>
        <div className="main-wrapper flex flex-col w-full ml-72">
          <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
            <Header />
          </header>
          <main className="main-container p-4 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
