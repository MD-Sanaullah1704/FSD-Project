const Footer = () => {
  return (
    <footer className="border-t border-slate-100 dark:border-[#12355a] bg-white dark:bg-[#08233e] py-8 mt-auto transition-colors">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
        <p>© {new Date().getFullYear()} JobSphere. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#privacy" className="hover:text-brand-navy dark:hover:text-brand-cyan transition">
            Privacy Policy
          </a>
          <a href="#terms" className="hover:text-brand-navy dark:hover:text-brand-cyan transition">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;