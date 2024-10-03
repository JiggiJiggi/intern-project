import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">MyWebsite</div>
      <nav className="nav">
        <a href="#services" className="nav-item">Services</a>
        <a href="#resources" className="nav-item">Resources</a>
        <a href="#login" className="nav-item">Login</a>
        <button className="sign-up-button">Get Started</button>
      </nav>
    </header>
  );
};

export default Header;


// import React from "react";
// import Link from "next/link";

// const Header = () => {
//   return (
//     <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
//       <div className="text-xl font-bold">MyApp</div>
//       <nav>
//         <ul className="flex space-x-4">
//           <li>
//             <Link href="/">Home</Link>
//           </li>
//           <li>
//             <Link href="/login">Login</Link>
//           </li>
//           <li>
//             <Link href="/register">Register</Link>
//           </li>
//           <li>
//             <Link href="/ebook">Ebook</Link>
//           </li>
//           <li>
//             <Link href="/comms">Communications</Link>
//           </li>
//         </ul>
//       </nav>
//     </header>
//   );
// };

// export default Header;