import { FaFileAlt } from "react-icons/fa";

function FileDetails({ selectedFile }) {
  return (
    <div className="card shadow border-0 rounded-4 h-100">

      <div className="card-body">

        <h3 className="mb-4">
          <FaFileAlt className="me-2 text-primary" />
          File Information
        </h3>

        {!selectedFile ? (
          <div className="text-center py-4">

            <p className="text-muted">
              No file selected
            </p>

          </div>
        ) : (
          <div>

            <p>
              <strong>Name:</strong><br />
              {selectedFile.name}
            </p>

            <hr />

            <p>
              <strong>Type:</strong><br />
              {selectedFile.type}
            </p>

            <hr />

            <p>
              <strong>Size:</strong><br />
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>

            <hr />

            <div className="alert alert-success mb-0">
              ✅ Ready for upload
            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default FileDetails;