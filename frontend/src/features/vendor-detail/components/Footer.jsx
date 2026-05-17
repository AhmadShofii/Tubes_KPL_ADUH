import { Mail, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="vendor-detail-footer">
      <div className="vendor-detail-footer-inner">
        <div className="vendor-detail-footer-brand">
          <h3>Foodora</h3>
          <p>
            Bringing the soul of Indonesian heritage kitchens to your modern
            doorstep.
          </p>
        </div>

        <div className="vendor-detail-footer-column">
          <h4>Explore</h4>
          <ul>
            <li>About Us</li>
            <li>Partner with Us</li>
            <li>Help Center</li>
          </ul>
        </div>

        <div className="vendor-detail-footer-column">
          <h4>Legal</h4>
          <ul>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className="vendor-detail-footer-column">
          <h4>Contact</h4>
          <ul>
            <li>
              <Mail size={16} />
              support@foodora.id
            </li>
            <li>
              <MessageCircle size={16} />
              WhatsApp Business
            </li>
          </ul>
        </div>
      </div>

      <div className="vendor-detail-footer-bottom">
        © {new Date().getFullYear()} Foodora Indonesia. Fresh Heritage.
        Delivered.
      </div>
    </footer>
  );
}