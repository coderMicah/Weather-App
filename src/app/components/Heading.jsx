"use client"
function Heading({ children }) {
  return (
    <h2 className="text-lg md:text-2xl font-semibold py-2 md:py-4 text-slate-900 dark:text-white">
      {children}
    </h2>
  );
}

export default Heading;
