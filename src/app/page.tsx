"use client";

import MortgageCalculator from "@/components/MortgageCalculator";
import Results from "@/components/Results";
import { useState } from "react";

export default function Home() {
  const [repayment, setRepayment] = useState<string | null>(null);
  const [repaymentOvertime, setRepaymentOvertime] = useState<string | null>(null);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  return (
    <div className="md:w-[46%] md:h-[55%] bg-White grid md:grid-cols-2 grid-cols-1 md:rounded-3xl overflow-hidden">
      <div className="md:p-8 px-6">
        <MortgageCalculator
          setRepayment={setRepayment}
          setRepaymentOvertime={setRepaymentOvertime}
          setIsClicked={setIsClicked}
         />
      </div>
      <div className="bg-slate-900 md:rounded-bl-[80px] flex py-10">
        <Results
        repayment={repayment}
        repaymentOvertime={repaymentOvertime}
        isClicked={isClicked}
         />
        </div>
    </div>
  );
}
