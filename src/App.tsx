import { AssistDock } from "@/components/assist/AssistDock";
import { EnquiryModal } from "@/components/enquiry/EnquiryModal";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollManager } from "@/components/layout/ScrollManager";
import { EnquiryProvider } from "@/context/EnquiryContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { HomePage } from "@/pages/HomePage";
import { PackagePage } from "@/pages/PackagePage";
import { useLanguage } from "@/context/LanguageContext";
import { MotionConfig } from "framer-motion";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function SkipLink() {
  const { t } = useLanguage();
  return (
    <a className="skip-link" href="#main">
      {t.skip}
    </a>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <EnquiryProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <MotionConfig reducedMotion="user">
            <ScrollManager />
            <SkipLink />
            <Navbar />
            <main id="main">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/packages/:slug" element={<PackagePage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
            <AssistDock />
            <EnquiryModal />
          </MotionConfig>
        </BrowserRouter>
      </EnquiryProvider>
    </LanguageProvider>
  );
}
