import { useState } from "react";
import api from "../services/api";

function UploadBox({
  selectedFile,
  setSelectedFile,
  uploadStatus,
  setUploadStatus,
  loadHistory,
}) {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
    ];

    const maxSize = 5 * 1024 * 1024;

    const typeValid = allowedTypes.includes(file.type);
    const sizeValid = file.size <= maxSize;

    if (!typeValid) {
      alert("Only PDF, PNG and JPG files are allowed.");
      return;
    }

    if (!sizeValid) {
      alert("File size must be less than 5 MB.");
      return;
    }

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));

    setUploadStatus({
      fileTypeValid: true,
      fileSizeValid: true,
      uploaded: false,
      virusScan: "Not Started",
    });

    setMessage("");
    setProgress(0);
  };

  const handleUpload = async () => {
    console.log("Upload button clicked");

    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setUploading(true);

      console.log("Sending request to backend...");

      const response = await api.post(
        "/upload",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) /
                progressEvent.total
            );

            setProgress(percentCompleted);
          },
        }
      );

      console.log("Success:");
      console.log(response.data);

      setMessage(
        `${response.data.message}\n\nVirus Scan: ${response.data.scan}`
      );

      setUploadStatus({
        fileTypeValid: true,
        fileSizeValid: true,
        uploaded: true,
        virusScan: response.data.scan,
      });

      await loadHistory();

    } catch (error) {

      console.log("========== ERROR ==========");
      console.log(error);

      if (error.response) {

        console.log("Status:", error.response.status);
        console.log("Response:", error.response.data);

        setMessage(error.response.data.message);

        setUploadStatus((prev) => ({
          ...prev,
          uploaded: false,
          virusScan: "Failed",
        }));

      } else if (error.request) {

        console.log("No response received");
        console.log(error.request);

        setMessage("Backend did not respond.");

      } else {

        console.log("Error:", error.message);

        setMessage("Unable to connect to backend.");

      }

    } finally {

      setUploading(false);

      setTimeout(() => {
        setProgress(0);
      }, 2000);

    }
  };

  return (
    <div className="card shadow-lg border-0 p-4 rounded-4">

      <h2 className="text-center mb-4">
        📤 Upload File
      </h2>

      <input
        type="file"
        className="form-control mb-3"
        onChange={handleFileChange}
      />

      <button
        className="btn btn-primary w-100"
        onClick={handleUpload}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload File"}
      </button>

      {uploading && (

        <div className="mt-3">

          <div className="progress">

            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              style={{ width: `${progress}%` }}
            >
              {progress}%
            </div>

          </div>

        </div>

      )}

      {preview && (

        <div className="mt-4 text-center">

          <h5>Preview</h5>

          {selectedFile.type === "application/pdf" ? (

            <a
              href={preview}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
            >
              📄 Open PDF
            </a>

          ) : (

            <img
              src={preview}
              alt="Preview"
              className="img-fluid rounded"
              style={{
                maxHeight: "250px",
                border: "1px solid #ccc",
              }}
            />

          )}

        </div>

      )}

      {message && (

        <div
          className="alert alert-info mt-3"
          style={{ whiteSpace: "pre-line" }}
        >
          {message}
        </div>

      )}

    </div>
  );
}

export default UploadBox;