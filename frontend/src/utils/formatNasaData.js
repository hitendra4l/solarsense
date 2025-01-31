export const formatNasaData = (data) => {
  const MONTHS = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  let nasaData = {
    ghi: 0,
    dni: 0,
    d2g: 0,
    dif: 0,
    alb: 0,
    temp: 0,
    windSpeed: 0,
    precipitation: 0,
    rh: 0,
  };

  for (let i = 0; i < 12; i++) {
    const parameterData = data?.properties.parameter;

    if (parameterData) {
      nasaData.ghi += parameterData.ALLSKY_SFC_SW_DWN[MONTHS[i]] || 0;
      nasaData.dni += parameterData.ALLSKY_SFC_SW_DNI[MONTHS[i]] || 0;
      nasaData.dif += parameterData.ALLSKY_SFC_SW_DIFF[MONTHS[i]] || 0;
      nasaData.alb += parameterData.ALLSKY_SRF_ALB[MONTHS[i]] || 0;
      nasaData.temp += parameterData.TS[MONTHS[i]] || 0;
      nasaData.windSpeed += parameterData.WS10M[MONTHS[i]] || 0;
      nasaData.precipitation += parameterData.PRECTOTCORR_SUM[MONTHS[i]] || 0;
      nasaData.rh += parameterData.RH2M[MONTHS[i]] || 0;
    }
  }

  nasaData = {
    ghi: (nasaData.ghi / 12).toFixed(2),
    dni: (nasaData.dni / 12).toFixed(2),
    d2g: (nasaData.dif / nasaData.ghi).toFixed(2),
    dif: (nasaData.dif / 12).toFixed(2),
    alb: (nasaData.alb / 12).toFixed(2),
    temp: (nasaData.temp / 12).toFixed(2),
    windSpeed: (nasaData.windSpeed / 12).toFixed(2),
    precipitation: (nasaData.precipitation / 12).toFixed(2),
    rh: (nasaData.rh / 12).toFixed(2),
  };

  return nasaData;
};

export const formatNasaDataForMeteo = (data) => {
  let nasaData = [
    { month: "JAN" },
    { month: "FEB" },
    { month: "MAR" },
    { month: "APR" },
    { month: "MAY" },
    { month: "JUN" },
    { month: "JUL" },
    { month: "AUG" },
    { month: "SEP" },
    { month: "OCT" },
    { month: "NOV" },
    { month: "DEC" },
    { month: "ANN" },
  ];

  for (let i = 0; i < 13; i++) {
    const parameterData = data?.properties.parameter;

    if (parameterData) {
      const monthName = nasaData[i].month;
      nasaData[i].ghi = parameterData.ALLSKY_SFC_SW_DWN[monthName] || 0;
      nasaData[i].dni = parameterData.ALLSKY_SFC_SW_DNI[monthName] || 0;
      nasaData[i].dif = parameterData.ALLSKY_SFC_SW_DIFF[monthName] || 0;
      nasaData[i].d2g = (nasaData[i].dif / nasaData[i].ghi).toFixed(2);
      nasaData[i].alb = parameterData.ALLSKY_SRF_ALB[monthName] || 0;
      nasaData[i].temp = parameterData.TS[monthName] || 0;
      nasaData[i].windSpeed = parameterData.WS10M[monthName] || 0;
      nasaData[i].precipitation = parameterData.PRECTOTCORR_SUM[monthName] || 0;
      nasaData[i].rh = parameterData.RH2M[monthName] || 0;
      nasaData[i].tilt =
        parameterData.SI_TILTED_AVG_OPTIMAL_ANG[monthName] || 0;
    }
  }

  nasaData[12].tilt = "N/A";
  nasaData[12].month = "ANNUAL";

  return nasaData;
};

export const formatNasaDataForCharts = (nasaData) => {
  if (!nasaData) {
    return [];
  }
  const data = [];
  const MONTHS = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  for (let i = 0; i < 12; i++) {
    const monthName = MONTHS[i];
    data.push(nasaData[monthName]);
  }

  return data;
};
