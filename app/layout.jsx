import "@/assets/styles/globals.css";

export const metadata = {
  title: 'HRU Referees',
  description: 'MRGSZ Játékvezetői Bizottság',
  keywords: 'referee, hru, játékvezető',
};

const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
};

export default MainLayout;
