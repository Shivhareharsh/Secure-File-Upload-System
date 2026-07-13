import { useState } from "react";
import api from "../services/api";

function UploadHistory({ history, setHistory, loadHistory }) {

  const [search, setSearch] = useState("");

  const handleDelete = async (fileName) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this file?"
    );

    if (!confirmDelete) return;

    try {

      console.log("Deleting file:", fileName);

      const response = await api.delete(
        `/upload/${encodeURIComponent(fileName)}`
      );

      console.log("Delete response:", response.data);

      // Reload history from backend
      if (loadHistory) {

        await loadHistory();

      } else {

        setHistory(
          history.filter(
            (item) => item.fileName !== fileName
          )
        );

      }

      alert("✅ File deleted successfully!");

    } catch (err) {

      console.error("Delete error:", err);

      console.log(
        "Server response:",
        err.response?.data
      );

      alert(
        err.response?.data?.message ||
        "❌ Unable to delete file."
      );

    }

  };

  const filteredHistory = history.filter((file) =>
    file.originalName
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (

    <div className="card shadow-lg border-0 p-4 rounded-4 mt-4">

      <h2 className="text-center mb-4">
        🗂 Upload History
      </h2>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="🔍 Search files..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredHistory.length === 0 ? (

        <p className="text-center text-muted">
          No matching files found.
        </p>

      ) : (

        <div className="table-responsive">

          <table className="table table-bordered table-hover align-middle">

            <thead className="table-dark">

              <tr>
                <th>#</th>
                <th>File Name</th>
                <th>Type</th>
                <th>Size</th>
                <th>Scan</th>
                <th>Uploaded At</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {filteredHistory.map((file, index) => (

                <tr key={index}>

                  <td>{index + 1}</td>

                  <td>{file.originalName}</td>

                  <td>{file.fileType}</td>

                  <td>{file.fileSize}</td>

                  <td>
                    {file.scan === "Clean"
                      ? "🟢 Clean"
                      : "🔴 Infected"}
                  </td>

                  <td>{file.uploadedAt}</td>

                  <td className="d-flex gap-2">

                    <a
                      href={`http://localhost:5001/api/upload/download/${encodeURIComponent(file.fileName)}`}
                      className="btn btn-primary btn-sm"
                      target="_blank"
                      rel="noreferrer"
                    >
                      ⬇ Download
                    </a>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        handleDelete(file.fileName)
                      }
                    >
                      🗑 Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>

  );

}

export default UploadHistory;