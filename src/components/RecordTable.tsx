export default function RecordTable({ records }: any) {
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
      case 'income':
        return 'bg-green-100 text-green-800';
      case 'expense':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-slate-50 to-white border-b-2 border-slate-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {records.map((r: any, index: number) => (
              <tr 
                key={r._id} 
                className={`hover:bg-slate-50 transition-colors duration-150 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-lg font-bold text-slate-900">
                    ₹{r.amount.toLocaleString()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-3 py-1 rounded-full text-sm font-bold ${getTypeColor(r.type)}`}>
                    {r.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-slate-800 font-semibold">
                    {r.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-slate-800 font-medium">
                    {new Date(r.date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Table Footer with Record Count */}
      <div className="px-6 py-3 bg-gradient-to-r from-slate-50 to-white border-t border-slate-200">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-800">
            Total Records: <span className="text-blue-700 font-bold">{records.length}</span>
          </p>
          <p className="text-sm font-medium text-slate-800">
            Showing {records.length} {records.length === 1 ? 'record' : 'records'}
          </p>
        </div>
      </div>
    </div>
  );
}