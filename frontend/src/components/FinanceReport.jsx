const FinanceReport = ({ data }) => {
  console.log("data from finance", data);
  const tableData = [];
  const currentYear = new Date().getFullYear();

  for (let i = 0; i < data?.systemTerm; i++) {
    tableData.push({
      year: currentYear + i,
      unit: (
        data.yearlyUnitGenerated *
        (1 - (data?.annualDegradation * i) / 100)
      ).toFixed(2),
      tariff: (i === 0
        ? data.tariff
        : tableData[i - 1]?.tariff * (1 + data?.tariffEscalation / 100)
      ).toFixed(2),
      savings: (
        data.yearlyUnitGenerated *
          (1 - (data?.annualDegradation * i) / 100) *
          (i === 0
            ? data.tariff
            : tableData[i - 1]?.tariff * (1 + data?.tariffEscalation / 100)) -
        data.maintenanceCost
      ).toFixed(2),
    });
  }

  let totalAmountAfterLoan =
    data?.loan *
    Math.pow(1 + data?.interestRate / 100, data?.loanDuration / 12);
  console.log("tableData", tableData);

  return (
    <div className="pb-20">
      {/* Finance Data */}
      <div className="flex flex-col pl-12 mt-10 mb-10 gap-2">
        <div className="flex text-2xl">
          <p className="font-bold w-[400px]">Total Investment: </p>
          <p className="grow">
            Rs.{" "}
            {data?.installationCost +
              data?.maintenanceCost * data?.systemTerm -
              data?.subsidyAmount}
          </p>
        </div>
        <div className="flex text-2xl">
          <p className="font-bold w-[400px]">
            Total amount to pay at installation:{" "}
          </p>
          <p>Rs. {data?.installationCost - data?.subsidyAmount}</p>
        </div>
        <div className="flex text-2xl">
          <p className="font-bold w-[400px]">Installment per month: </p>
          <p>Rs. {(totalAmountAfterLoan / data?.loanDuration).toFixed(2)}</p>
        </div>
        <div className="flex text-2xl">
          <p className="font-bold w-[400px]">Extra amount paid during loan: </p>
          <p>Rs. {(totalAmountAfterLoan - data?.loan).toFixed(2)}</p>
        </div>
      </div>

      {/* Finance Table */}
      <div className="">
        <table className="w-full border border-black">
          <thead className="bg-dark-soft text-white">
            <tr className="font-bold">
              <th className="border-b border-b-[#E4E5EA]">Year</th>
              <th className="border-b border-b-[#E4E5EA]">
                Unit Produced(KWh)
              </th>
              <th className="border-b border-b-[#E4E5EA]">Tariff (Rs./unit)</th>
              <th className="border-b border-b-[#E4E5EA] break-words">
                Savings (Rs./year)
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => {
              return (
                <tr
                  key={item?.year}
                  className={`hover:bg-light-bg ${
                    index % 2 === 0 ? "bg-[#E4E5EA]" : "bg-white"
                  }`}
                >
                  <td className="text-center text-white bg-dark-soft border-b border-b-white font-bold">
                    {item?.year}
                  </td>
                  <td className="border-r border-r-dark-soft text-center">
                    {item?.unit}
                  </td>
                  <td className="border-r border-r-dark-soft text-center">
                    {item?.tariff}
                  </td>
                  <td className="border-r border-r-dark-soft text-center">
                    {item?.savings}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default FinanceReport;
