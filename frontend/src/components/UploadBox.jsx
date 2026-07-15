import { useState } from "react";
import { uploadFile } from "../services/uploadService";
import "./UploadBox.css";

function UploadBox({
  selectedFile,
  setSelectedFile,
  loadHistory,
}) {

  const [message, setMessage] =
    useState("");

  const [progress, setProgress] =
    useState(0);

  const handleFileChange = (
    event
  ) => {

    setSelectedFile(
      event.target.files[0]
    );

    setMessage("");

    setProgress(0);
  };

  const handleUpload = async () => {

    if (!selectedFile) {

      setMessage(
        "Please select a file."
      );

      return;
    }

    try {

      const result =
        await uploadFile(
          selectedFile,

          (event) => {

            const percent =
              Math.round(
                (event.loaded * 100) /
                event.total
              );

            setProgress(percent);
          }
        );

      setMessage(
        result.message ||
          "File uploaded successfully."
      );

      setSelectedFile(null);

      if (loadHistory) {

        await loadHistory();
      }

    } catch (error) {

      console.error(error);

      setMessage(

        error.response?.data
          ?.message ||

          "Backend did not respond."
      );
    }
  };

  return (

    <div className="upload-container">

      <label className="choose-file-btn">

        📁 Choose File

        <input
          type="file"
          hidden
          onChange={
            handleFileChange
          }
        />

      </label>

      {selectedFile && (

        <p className="file-name">

          Selected:
          {" "}
          {selectedFile.name}

        </p>

      )}

      <button
        className="upload-btn"
        onClick={handleUpload}
      >

        🚀 Upload File

      </button>

      <div className="progress mt-3">

        <div
          className="progress-bar"

          role="progressbar"

          style={{

            width: `${progress}%`,
          }}
        >

          {progress}%

        </div>

      </div>

      {message && (

        <p className="message">

          {message}

        </p>

      )}

    </div>
  );
}

export default UploadBox;