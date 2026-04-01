const service = require("../services/dashboard.service");

exports.summary = async (req, res) => {
  res.json(await service.getSummary());
};

exports.categories = async (req, res) => {
  res.json(await service.getCategoryBreakdown());
};

exports.trends = async (req, res) => {
  res.json(await service.getTrends());
};