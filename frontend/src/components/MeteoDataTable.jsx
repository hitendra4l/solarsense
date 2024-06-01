const MeteoDataTable = ({ data }) => {
  return (
    <div>
      <table className="border border-black w-full">
        <thead className="bg-dark-soft text-white">
          <tr className="font-bold">
            <th className="p-2 text-center break-words border-b border-b-white">
              Month
            </th>
            <th className="p-2 text-center break-words">
              GHI (KWh/m<sup>2</sup>/day)
            </th>
            <th className="p-2 text-center break-words">
              DNI (KWh/m<sup>2</sup>/day)
            </th>
            <th className="p-2 text-center break-words">
              DIF (KWh/m<sup>2</sup>/day)
            </th>
            <th className="p-2 text-center break-words">D2G</th>
            <th className="p-2 text-center break-words">ALB</th>
            <th className="p-2 text-center break-words">TEMP (°C)</th>
            <th className="p-2 text-center break-words">WS (m/s)</th>
            <th className="p-2 text-center break-words">RH (%)</th>
            <th className="p-2 text-center break-words">PREC (mm)</th>
            <th className="p-2 text-center break-words">Tilt(°)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className={`hover:bg-light-bg ${
                index % 2 === 0 ? "bg-[#E4E5EA]" : "bg-white"
              }`}
            >
              <td className="text-center text-white bg-dark-soft border-b border-b-white font-bold">
                {item.month}
              </td>
              <td className="border-r border-r-dark-soft py-1 text-center">
                {item?.ghi}
              </td>
              <td className="border-r border-r-dark-soft py-1 text-center">
                {item?.dni}
              </td>
              <td className="border-r border-r-dark-soft py-1 text-center">
                {item?.dif}
              </td>
              <td className="border-r border-r-dark-soft py-1 text-center">
                {item?.d2g}
              </td>
              <td className="border-r border-r-dark-soft py-1 text-center">
                {item?.alb}
              </td>
              <td className="border-r border-r-dark-soft py-1 text-center">
                {item?.temp}
              </td>
              <td className="border-r border-r-dark-soft py-1 text-center">
                {item?.windSpeed}
              </td>
              <td className="border-r border-r-dark-soft py-1 text-center">
                {item?.rh}
              </td>
              <td className="border-r border-r-dark-soft py-1 text-center">
                {item?.precipitation}
              </td>
              <td className="border-r border-r-dark-soft py-1 text-center">
                {item?.tilt}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default MeteoDataTable;
