const Piechart = ({ fullData }) => {
  console.log(fullData?.statistics?.totalTransactionAmountForAdmin)
  console.log(fullData?.statistics?.totalUser)
  const metrics = [
    fullData?.statistics?.totalUser ? { label: 'Total Users', value: fullData?.statistics?.totalUser } : null,
    fullData?.statistics?.totalTransactionAmountForAdmin ? { label: 'Total Income', value: fullData?.statistics?.totalTransactionAmountForAdmin } : null,
  ];

  // SVG circle properties - matching the exact visual from the image
  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="col-span-full md:col-span-2 border-2 border-[#778beb] rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.2)]">
      <div className="bg-white rounded-3xl p-8 ">
        {/* Metrics Section */}
        <div className="space-y-5">
          {metrics.map((metric, index) => (
            <div key={index} className="flex items-start">
              {/* dinamic color Dot */}
              {
                index === 0 ? (
                  <div className="w-2 h-2 bg-[#778beb] rounded-full mt-2 mr-4 flex-shrink-0"></div>
                ) : null
              }
              {
                index === 1 ? (
                  <div className="w-2 h-2 bg-[#778beb60] rounded-full mt-2 mr-4 flex-shrink-0"></div>
                ) : null
              }

              <div>
                <div className="text-sm text-gray-500 mb-1">{metric?.label}</div>
                <div className="text-3xl font-bold text-gray-900">{metric?.label == "Total Income" && "৳"}{metric?.value}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Piechart