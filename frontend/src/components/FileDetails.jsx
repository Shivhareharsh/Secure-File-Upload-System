function FileDetails({
  selectedFile,
}) {

  if (!selectedFile) {

    return (

      <div className="card p-4">

        <h2>
          📄 File Information
        </h2>

        <p>
          No file selected
        </p>

      </div>
    );
  }

  const previewUrl =
    URL.createObjectURL(
      selectedFile
    );

  return (

    <div className="card p-4">

      <h2>
        📄 File Information
      </h2>

      <p>

        <strong>
          Name:
        </strong>

        {" "}
        {selectedFile.name}

      </p>

      <p>

        <strong>
          Type:
        </strong>

        {" "}
        {selectedFile.type}

      </p>

      <p>

        <strong>
          Size:
        </strong>

        {" "}
        {(
          selectedFile.size /
          1024 /
          1024
        ).toFixed(2)}

        {" MB"}

      </p>

      {selectedFile.type.startsWith(
        "image/"
      ) && (

        <img
          src={previewUrl}
          alt="preview"

          style={{

            width: "100%",

            borderRadius:
              "10px",
          }}
        />

      )}

      {selectedFile.type ===
        "application/pdf" && (

        <iframe
          src={previewUrl}

          title="preview"

          width="100%"

          height="400"
        />

      )}

    </div>
  );
}

export default FileDetails;