import { useEffect, useState } from "react";
import api from "../services/api";

import Header from "../components/Header";
import UploadBox from "../components/UploadBox";
import FileDetails from "../components/FileDetails";
import SecurityInfo from "../components/SecurityInfo";
import UploadHistory from "../components/UploadHistory";

function Home() {
  const [selectedFile, setSelectedFile] = useState(null);

  const [history, setHistory] = useState([]);

  const [uploadStatus, setUploadStatus] = useState({
    fileTypeValid: false,
    fileSizeValid: false,
    uploaded: false,
    virusScan: "Not Started",
  });

  // Load upload history from backend
  const loadHistory = async () => {
    try {
      const response = await api.get("/history");
      setHistory(response.data);
    } catch (err) {
      console.error("Unable to load history", err);
    }
  };

  // Load history when page opens
  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div className="bg-dark min-vh-100">
      <Header />

      <div className="container py-4">
        <UploadBox
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          uploadStatus={uploadStatus}
          setUploadStatus={setUploadStatus}
          loadHistory={loadHistory}
        />

        <div className="row mt-4">
          <div className="col-lg-6 mb-4">
            <FileDetails selectedFile={selectedFile} />
          </div>

          <div className="col-lg-6 mb-4">
            <SecurityInfo uploadStatus={uploadStatus} />
          </div>
        </div>

        <UploadHistory
          history={history}
          setHistory={setHistory}
          loadHistory={loadHistory}
        />
      </div>
    </div>
  );
}

export default Home;