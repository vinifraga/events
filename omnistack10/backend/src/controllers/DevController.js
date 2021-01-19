const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");
const { findConnections, sendMessage } = require("../websocket");
// index, show, store, update, destroy

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const response = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name = login, avatar_url, bio } = response.data;

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      const techsArray = parseStringAsArray(techs);

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });

      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray
      );

      sendMessage(sendSocketMessageTo, "new-dev", dev);
    }

    return res.json(dev);
  },

  async update(req, res) {
    const { id } = req.params;
    const data = req.body;

    if (data.techs) {
      data.techs = parseStringAsArray(data.techs);
    }

    const dev = await Dev.findByIdAndUpdate(id, data, { new: true });

    return res.json(dev);
  },

  async destroy(req, res) {
    const { id } = req.params;

    await Dev.findByIdAndDelete(id);

    return res.json({ message: "user removed" });
  }
};
