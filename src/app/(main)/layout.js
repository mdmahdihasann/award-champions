import Footer from "@/components/common/Footer";
import Header from "@/components/header/Header";


export default function MainLayout({ children }) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="min-h-[calc(100vh-140px)] mt-[5.2rem]">
          {children}
        </main>
        <Footer className="mt-auto" />
      </div>
    </>
  );
}
