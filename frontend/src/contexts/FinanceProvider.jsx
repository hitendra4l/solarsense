import { useState } from "react";
import { financeContext } from "./useFinanceState";

const FinanceProvider = ({ children }) => {
  const [systemSize, setSystemSize] = useState(0);
  const [annualDegradation, setAnnualDegradation] = useState(0.7);
  const [tariff, setTariff] = useState(9);
  const [tariffEscalation, setTariffEscalation] = useState(3);
  const [subsidyAmount, setSubsidyAmount] = useState(50000);
  const [loan, setLoan] = useState(0);
  const [interestRate, setInterestRate] = useState(10);
  const [loanDuration, setLoanDuration] = useState(12);
  const [showFinanceReport, setShowFinanceReport] = useState(false);
  const [installationCost, setInstallationCost] = useState("0");
  const [systemTerm, setSystemTerm] = useState("25");
  const [maintenanceCost, setMaintenanceCost] = useState("0");
  const [yearlyUnitGenerated, setYearlyUnitGenerated] = useState("0");

  return (
    <financeContext.Provider
      value={{
        systemSize,
        setSystemSize,
        annualDegradation,
        setAnnualDegradation,
        tariff,
        setTariff,
        tariffEscalation,
        setTariffEscalation,
        subsidyAmount,
        setSubsidyAmount,
        loan,
        setLoan,
        interestRate,
        setInterestRate,
        loanDuration,
        setLoanDuration,
        showFinanceReport,
        setShowFinanceReport,
        installationCost,
        setInstallationCost,
        systemTerm,
        setSystemTerm,
        maintenanceCost,
        setMaintenanceCost,
        yearlyUnitGenerated,
        setYearlyUnitGenerated,
      }}
    >
      {children}
    </financeContext.Provider>
  );
};

export default FinanceProvider;
