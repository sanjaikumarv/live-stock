import AbilityProvider from "../../lib/contexts/AbilityContext";
import AuthProvider from "../../lib/contexts/AuthContext";
import PopupProvider from "../../lib/contexts/PopupContext";
import Footer from "../Home/Footer/Footer";
import Header from "../Home/Header";

export default function Layout({ children }) {
  return (
    <PopupProvider>
      <AuthProvider>
        <AbilityProvider>
          <Header />
          {children}

          <Footer />
        </AbilityProvider>
      </AuthProvider>
    </PopupProvider>
  );
}
