module.exports.sendError = (res, error) => {
    res.status(500).json({ status: "server error", error: error });
};

module.exports.sendNotFound = (res) => {
    res.status(404).json({ status: "not found" });
};
