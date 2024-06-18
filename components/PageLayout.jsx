const PageLayout = ({ children }) => {
  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-7xl py-5 text-center text-gray-600">
        {children}
      </div>
    </section>
  );
};
export default PageLayout;
