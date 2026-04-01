const Record = require("../models/record.model");

exports.getSummary = async () => {
  const result = await Record.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" },
      },
    },
  ]);

  let income = 0,
    expense = 0;

  result.forEach((r) => {
    if (r._id === "income") income = r.total;
    if (r._id === "expense") expense = r.total;
  });

  return {
    totalIncome: income,
    totalExpenses: expense,
    netBalance: income - expense,
  };
};

exports.getCategoryBreakdown = async () => {
  return Record.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" },
      },
    },
  ]);
};

exports.getTrends = async () => {
  return Record.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: {
          month: { $month: "$date" },
          type: "$type",
        },
        total: { $sum: "$amount" },
      },
    },
  ]);
};