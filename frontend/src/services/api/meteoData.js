import axios from "axios";

export const nasaData = async ({ latitude, longitude }) => {
  try {
    // console.log("data to send", { latitude, longitude });
    const { data } = await axios.get(
      `https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=SI_EF_TILTED_SURFACE,ALLSKY_SFC_SW_DIFF,ALLSKY_SFC_SW_DWN,ALLSKY_SFC_SW_DNI,ALLSKY_SRF_ALB,ALLSKY_KT,TS,RH2M,WS10M,PRECTOTCORR_SUM&community=RE&longitude=${longitude}&latitude=${latitude}&format=JSON&start=2001&end=2022`
    );
    // console.log("data received", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
