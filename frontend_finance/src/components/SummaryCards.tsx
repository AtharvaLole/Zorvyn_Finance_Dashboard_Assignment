export default function SummaryCards({ data }: any) {
  const cards = [
    {
      title: "Total Income",
      value: data.totalIncome || 0,
      icon: "income",
      bgGradient: "from-green-50 to-green-100",
      textColor: "text-green-800",
      borderColor: "border-green-200"
    },
    {
      title: "Total Expenses",
      value: data.totalExpenses || 0,
      icon: "expense",
      bgGradient: "from-red-50 to-red-100",
      textColor: "text-red-800",
      borderColor: "border-red-200"
    },
    {
      title: "Net Balance",
      value: data.netBalance || 0,
      icon: "balance",
      bgGradient: "from-blue-50 to-blue-100",
      textColor: "text-blue-800",
      borderColor: "border-blue-200"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-4">
      {cards.map((card, index) => (
        <Card 
          key={index}
          title={card.title}
          value={card.value}
          icon={card.icon}
          bgGradient={card.bgGradient}
          textColor={card.textColor}
          borderColor={card.borderColor}
        />
      ))}
    </div>
  );
}

function Card({ title, value, icon, bgGradient, textColor, borderColor }: any) {
  const getIcon = () => {
    switch (icon) {
      case "income":
        return (
          <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      case "expense":
        return (
          <svg className="w-6 h-6 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const formattedValue = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);

  const isPositive = title === "Net Balance" ? value >= 0 : title === "Total Income";
  const trendIcon = title === "Net Balance" ? (value >= 0 ? "↑" : "↓") : title === "Total Income" ? "↑" : "↓";
  const trendColor = title === "Net Balance" ? (value >= 0 ? "text-green-700" : "text-red-700") : title === "Total Income" ? "text-green-700" : "text-red-700";

  return (
    <div className={`bg-gradient-to-br ${bgGradient} rounded-2xl shadow-lg p-6 border ${borderColor} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-1">
            {title}
          </p>
          <h2 className="text-3xl font-bold text-slate-900">
            {formattedValue}
          </h2>
        </div>
        <div className={`w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center ${textColor}`}>
          {getIcon()}
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200">
        <span className={`text-sm font-semibold ${trendColor} flex items-center gap-1`}>
          <span className="text-lg">{trendIcon}</span>
          {title === "Net Balance" ? (
            value >= 0 ? "Positive Balance" : "Negative Balance"
          ) : (
            title === "Total Income" ? "Money In" : "Money Out"
          )}
        </span>
        <span className="text-xs font-semibold text-slate-800">
          Current Period
        </span>
      </div>
    </div>
  );
}