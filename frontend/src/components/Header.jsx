import { FaLock, FaShieldAlt } from "react-icons/fa";

function Header() {
  return (
    <header className="container-fluid py-4 mb-4">
      <div className="card bg-dark text-white shadow-lg border-0 rounded-4">
        <div className="card-body text-center">

          <div className="mb-3">
            <FaLock size={45} className="text-warning" />
          </div>

          <h1 className="display-4 fw-bold">
            Secure File Upload System
          </h1>

          <p className="lead text-secondary">
            Secure • Fast • Production Ready
          </p>

          <span className="badge bg-success fs-6 px-3 py-2">
            <FaShieldAlt className="me-2" />
            Secure
          </span>

        </div>
      </div>
    </header>
  );
}

export default Header;