import { useState } from "react";
import api from "../services/api";

function UploadHistory({
  history,
  setHistory,
  loadHistory,
}) {

  const [search, setSearch] =
    useState("");

  const handleDelete =
    async (fileName) => {

      const confirmDelete =
        window.confirm(
          "Delete this file?"
        );

      if (!confirmDelete)
        return;

      try {

        await api.delete(
          `/${encodeURIComponent(
            fileName
          )}`
        );

        if (loadHistory) {

          await loadHistory();

        } else {

          setHistory(

            history.filter(

              (item) =>
                item.fileName !==
                fileName
            )
          );
        }

        alert(
          "✅ Deleted successfully"
        );

      } catch (error) {

        console.error(error);

        alert(

          error.response?.data
            ?.message ||

            "❌ Unable to delete file."
        );
      }
    };

  const filteredHistory =
    Array.isArray(history)

      ? history.filter((file) =>

          file.originalName
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
        )

      : [];

  return (

    <div className="card shadow-lg border-0 p-4 rounded-4 mt-4">

      <h2 className="text-center mb-4">

        🗂 Upload History

      </h2>

      <input

        type="text"

        className="form-control mb-4"

        placeholder="🔍 Search"

        value={search}

        onChange={(e) =>

          setSearch(
            e.target.value
          )
        }
      />

      {filteredHistory.length ===
      0 ? (

        <p className="text-center">

          No files found.

        </p>

      ) : (

        <div className="table-responsive">

          <table className="table table-bordered">

            <thead>

              <tr>

                <th>#</th>

                <th>
                  File Name
                </th>

                <th>Type</th>

                <th>Size</th>

                <th>Scan</th>

                <th>
                  Uploaded
                </th>

                <th>
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredHistory.map(

                (
                  file,
                  index
                ) => (

                  <tr key={index}>

                    <td>

                      {index + 1}

                    </td>

                    <td>

                      {
                        file.originalName
                      }

                    </td>

                    <td>

                      {
                        file.fileType
                      }

                    </td>

                    <td>

                      {
                        file.fileSize
                      }

                    </td>

                    <td>

                      🟢 Clean

                    </td>

                    <td>

                      {
                        file.uploadedAt
                      }

                    </td>

                    <td>

                      <a

                        href={`/api/upload/download/${encodeURIComponent(
                          file.fileName
                        )}`}

                        className="btn btn-primary btn-sm me-2"

                        target="_blank"

                        rel="noreferrer"
                      >

                        ⬇ Download

                      </a>

                      <button

                        className="btn btn-danger btn-sm"

                        onClick={() =>
                          handleDelete(
                            file.fileName
                          )
                        }
                      >

                        🗑 Delete

                      </button>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}

export default UploadHistory;