function SecurityInfo() {
  return (
    <div className="card shadow-lg border-0 p-4 rounded-4">

      <h2 className="text-center mb-4">
        🛡 Security Information
      </h2>

      <table className="table table-bordered">

        <tbody>

          <tr>
            <td>Allowed File Types</td>
            <td>✅ PDF, PNG, JPG</td>
          </tr>

          <tr>
            <td>Maximum File Size</td>
            <td>✅ 5 MB</td>
          </tr>

          <tr>
            <td>Backend Validation</td>
            <td>✅ Enabled</td>
          </tr>

          <tr>
            <td>Virus Scanner</td>
            <td>🦠 ClamAV</td>
          </tr>

          <tr>
            <td>Storage</td>
            <td>📁 Local Uploads Folder</td>
          </tr>

        </tbody>

      </table>

    </div>
  );
}

export default SecurityInfo;