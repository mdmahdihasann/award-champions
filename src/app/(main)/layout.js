import Footer from "@/components/common/Footer";
import Header from "@/components/header/Header";


export default function MainLayout({ children }) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer className="mt-auto" />
      </div>
    </>
  );
}
