const Record = require("../models/record.model");

exports.createRecord = async (req, res) => {
  const record = await Record.create({
    ...req.body,
    createdBy: req.user.id,
  });
  res.status(201).json(record);
};

exports.getRecords = async (req, res) => {
  const { page = 1, limit = 10, type, category } = req.query;

  const filter = { isDeleted: false };
  if (type) filter.type = type;
  if (category) filter.category = category;

  const records = await Record.find(filter)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json(records);
};

exports.updateRecord = async (req, res) => {
  const record = await Record.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(record);
};

exports.deleteRecord = async (req, res) => {
  await Record.findByIdAndUpdate(req.params.id, { isDeleted: true });
  res.json({ message: "Record deleted" });
};