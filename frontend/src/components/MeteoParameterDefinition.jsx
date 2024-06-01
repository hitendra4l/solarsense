const MeteoParameterDefinition = () => {
  return (
    <div className="flex flex-col gap-6 mt-16">
      <h4 className="text-3xl font-semibold">Parameter Definitions</h4>
      <div className="w-full flex flex-col gap-4">
        <div className="flex items-center border-b border-b-light-soft pb-2">
          <p className="w-[100px] font-bold">GHI</p>
          <p className="w-[calc(100%-100px)]">
            {`[Global horizontal irradiation] The total solar irradiance incident
            (direct plus diffuse) on a horizontal plane at the surface of the
            earth under all sky conditions. An alternative term for the total
            solar irradiance is the "Global Horizontal Irradiance" or GHI.`}
          </p>
        </div>

        <div className="flex items-center border-b border-b-light-soft pb-2">
          <p className="w-[100px] font-bold">DNI</p>
          <p className="w-[calc(100%-100px)]">
            {`[Direct Normal Irradiance] The direct solar irradiance incident to a
            horizontal plane normal (perpendicular) to the direction of the sun's
            position under all sky conditions.`}
          </p>
        </div>

        <div className="flex items-center border-b border-b-light-soft pb-2">
          <p className="w-[100px] font-bold">DIF</p>
          <p className="w-[calc(100%-100px)]">
            {`The diffuse (light energy scattered out of the direction of the sun) solar irradiance incident on a horizontal plane at the surface of the earth under all sky conditions.`}
          </p>
        </div>

        <div className="flex items-center border-b border-b-light-soft pb-2">
          <p className="w-[100px] font-bold">D2G</p>
          <p className="w-[calc(100%-100px)]">
            {`Ratio of diffuse horizontal irradiation and global horizontal irradiation (DIF/GHI)`}
          </p>
        </div>

        <div className="flex items-center border-b border-b-light-soft pb-2">
          <p className="w-[100px] font-bold">ALB</p>
          <p className="w-[calc(100%-100px)]">
            {`The all sky rate of reflectivity of the earth's surface; the ratio of the solar energy reflected by the surface of the earth compared to the total solar energy incident reaching the surface of the earth.`}
          </p>
        </div>

        <div className="flex items-center border-b border-b-light-soft pb-2">
          <p className="w-[100px] font-bold">TEMP</p>
          <p className="w-[calc(100%-100px)]">
            {`The average temperature at the earth's surface.`}
          </p>
        </div>

        <div className="flex items-center border-b border-b-light-soft pb-2">
          <p className="w-[100px] font-bold">WS</p>
          <p className="w-[calc(100%-100px)]">
            {`The average of wind speed at 10 meters above the surface of the earth.`}
          </p>
        </div>

        <div className="flex items-center border-b border-b-light-soft pb-2">
          <p className="w-[100px] font-bold">RH</p>
          <p className="w-[calc(100%-100px)]">
            {`The ratio of actual partial pressure of water vapor to the partial pressure at saturation, expressed in percent.`}
          </p>
        </div>

        <div className="flex items-center border-b border-b-light-soft pb-2">
          <p className="w-[100px] font-bold">PREC</p>
          <p className="w-[calc(100%-100px)]">
            {`The bias corrected sum of total precipitation at the surface of the earth.`}
          </p>
        </div>

        <div className="flex items-center border-b border-b-light-soft pb-2">
          <p className="w-[100px] font-bold">Tilt</p>
          <p className="w-[calc(100%-100px)]">
            {`The optimum, or maximum, solar irradiance incident on an equator facing surface is obtained with the surface tilted at the optimal angle.`}
          </p>
        </div>
      </div>
    </div>
  );
};
export default MeteoParameterDefinition;
