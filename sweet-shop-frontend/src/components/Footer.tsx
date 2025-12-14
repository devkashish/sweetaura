const Footer = () => {
  return (
    <footer className="bg-rose-400 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 text-center">

        <h3 className="text-2xl font-heading font-semibold tracking-wide">
          Sweetaura
        </h3>

        <p className="mt-3 text-rose-50 text-sm max-w-md mx-auto">
          Handcrafted sweets inspired by tradition,
          made with love, purity, and a modern touch.
        </p>

        <div className="mt-6 text-xs text-rose-100">
          © {new Date().getFullYear()} Sweetaura · All rights reserved
        </div>

      </div>
    </footer>
  );
};

export default Footer;
