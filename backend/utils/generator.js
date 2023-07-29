const axios = require("axios").default;

// Generate new posts with faker
module.exports.getImage = async function (thems) {
    try {
        let response = await axios.get(
            "https://loremflickr.com/json/g/640/480/" + thems.join() + "/all"
        );
        // console.log(response.data.file);
        return response.data.file;
    } catch (error) {
        console.log(error);
    }
};

module.exports.getRandomInt = function (min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
};
