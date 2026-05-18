import Footer from "./Footer";
import hero from "../assets/hero.png";

export default function AuthLayout({ children }) {
  return (
    <div className="page-wrap">
      <main className="auth-shell">
        <section className="auth-card">

          <div className="auth-left">
            {children}
          </div>

          <div className="auth-right">
            <img src={hero} alt="Foodora" />
          </div>

        </section>
      </main>

      <Footer />
    </div>
  );
}