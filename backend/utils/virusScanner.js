const NodeClam = require("clamscan");

const scanner = new NodeClam().init({
  removeInfected: false,
  quarantineInfected: false,
  scanLog: null,
  debugMode: false,

  clamdscan: {
    socket: false,
    host: "127.0.0.1",
    port: 3310,
    timeout: 60000,
    localFallback: true,
  },
});

const scanFile = async (filePath) => {
  try {
    const clamscan = await scanner;

    const { isInfected, viruses } =
      await clamscan.scanFile(filePath);

    return {
      isInfected,
      viruses,
    };

  } catch (err) {
    console.error(err);

    return {
      isInfected: false,
      viruses: [],
    };
  }
};

module.exports = scanFile;