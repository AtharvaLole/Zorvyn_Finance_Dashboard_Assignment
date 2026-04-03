"use client";

import API from "@/lib/api";

export default function RecordTable({ records, userRole, refresh }: any) {
  if (!records || records.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-slate-200">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">No Records Found</h3>
          <p className="text-slate-800 font-medium">No financial records available at the moment.</p>
        </div>
      </div>
    );
  }

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "income":
        return "bg-green-100 text-green-800";
      case "expense":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  // 🔴 DELETE
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this record?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/records/${id}`);
      refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to delete record");
    }
  };

  // ✏️ EDIT (simple version)
  const handleEdit = async (record: any) => {
    const newAmount = prompt("Enter new amount", record.amount);

    if (!newAmount) return;

    try {
      await API.put(`/records/${record._id}`, {
        ...record,
        amount: Number(newAmount),
      });
      refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to update record");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-slate-50 to-white border-b-2 border-slate-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 uppercase">Amount</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 uppercase">Type</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 uppercase">Category</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 uppercase">Date</th>

              {/* 🔥 NEW COLUMN */}
              {userRole === "admin" && (
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 uppercase">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {records.map((r: any, index: number) => (
              <tr
                key={r._id}
                className={`hover:bg-slate-50 ${
                  index % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                }`}
              >
                <td className="px-6 py-4">
                  <span className="text-lg font-bold text-slate-900">
                    ₹{r.amount.toLocaleString()}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${getTypeColor(r.type)}`}>
                    {r.type}
                  </span>
                </td>

                <td className="px-6 py-4 text-slate-800 font-semibold">
                  {r.category}
                </td>

                <td className="px-6 py-4 text-slate-800 font-medium">
                  {new Date(r.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>

                {/* 🔥 ACTION BUTTONS */}
                {userRole === "admin" && (
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(r)}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(r._id)}
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 bg-slate-50 border-t">
        <p className="text-sm font-semibold text-slate-800">
          Total Records: <span className="text-blue-700">{records.length}</span>
        </p>
      </div>
    </div>
  );
}