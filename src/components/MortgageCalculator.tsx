"use client";

import { BsCurrencyPound } from "react-icons/bs";
import { MdOutlinePercent } from "react-icons/md";
import InputText from "./InputText";

import iconCalculator from '../assets/images/icon-calculator.svg'
import Image from "next/image";
import { useState } from "react";

interface MortgageCalculatorProps {
  setRepayment: (repayment: string | null) => void;
  setRepaymentOvertime: (repaymentOvertime: string | null) => void;
  setIsClicked: (isCliked: boolean) => void
}

const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({setRepayment, setRepaymentOvertime, setIsClicked}) => {
  const [formData, setFormData] = useState({
    amount: 0,
    term: 0,
    interestRate: 0,
    mortgageType: ""
  });

  const [error, setError] = useState({
    errAmount: "",
    errTerm: "",
    errInterestRate: "",
  })

  const [isError, setIsError] = useState({
    setIsErrAmount: false,
    setIsErrTerm: false,
    setIsErrInterestRate: false,
  })


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.amount || isNaN(formData.amount)) {
      setIsError((prev) => ({ ...prev, setIsErrAmount: true }));
      setError((prev) => ({ ...prev, errAmount: "This field is required" }));
      return
    } else {
      setIsError((prev) => ({ ...prev, setIsErrAmount: false }));
      setError((prev) => ({ ...prev, errAmount: "" }));
    }

    if (!formData.term || isNaN(formData.term)) {
      setIsError((prev) => ({ ...prev, setIsErrTerm: true }));
      setError((prev) => ({ ...prev, errTerm: "This field is required" }));
      return
    } else {
      setIsError((prev) => ({ ...prev, setIsErrTerm: false }));
      setError((prev) => ({ ...prev, errTerm: "" }));
    }

    if (!formData.interestRate || isNaN(formData.interestRate)) {
      setIsError((prev) => ({ ...prev, setIsErrInterestRate: true }));
      setError((prev) => ({ ...prev, errInterestRate: "This field is required" }));
      return
    } else {
      setIsError((prev) => ({ ...prev, setIsErrInterestRate: false }));
      setError((prev) => ({ ...prev, errInterestRate: "" }));
    }

    // Calculation
    const interest = (formData.interestRate / 100) / 12;
    const numOfPayments = formData.term * 12;
    const factor = Math.pow(1 + interest, numOfPayments);
    const principalPlusInterest = (formData.amount * interest * factor) / (factor - 1);
    const interestOnly = formData.amount * interest

    const totalPayment = (principalPlusInterest * numOfPayments).toFixed(2);
    const totalPaymentToString = parseFloat(totalPayment).toLocaleString();

    let monthlyRepayments
    if (formData.mortgageType === 'repayment') {
      console.log('monthly repayment:', principalPlusInterest.toFixed(2))
      monthlyRepayments = parseFloat(principalPlusInterest.toFixed(2)).toLocaleString();
    } else {
      console.log('interest only:', interestOnly.toFixed(2))
      monthlyRepayments = parseFloat(interestOnly.toFixed(2)).toLocaleString();
    }

    setRepayment(monthlyRepayments); // Store the result in state
    setRepaymentOvertime(totalPaymentToString)
    setIsClicked(true)
  }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleReset = () => {
    setFormData({
      amount: 0,
      term: 0,
      interestRate: 0,
      mortgageType: "",
    });
    setIsClicked(false);
    setIsError({
      setIsErrAmount: false,
      setIsErrTerm: false,
      setIsErrInterestRate: false,
    });
    setError({
      errAmount: "",
      errTerm: "",
      errInterestRate: "",
    });

  }  
  return (
<div className='pt-2'>
    <div className="md:flex md:justify-between pb-6 pt-10 md:pt-0">
      <h3 className="font-jakarta font-semibold text-xl ">Mortgage Calculator</h3>
      <button onClick={handleReset} className="text-sm hover:underline pt-2 md:pt-0">Clear all</button>
    </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="text-xs text-slate-500">Mortgage Amount</label>
          <InputText
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            position="top-[1px] left-0"
            classes={`p-2.5 rounded-l-md ${isError.setIsErrAmount ? "bg-red-500 text-white" : "bg-sky-100"}`}
            inputClassName={`pl-12 ${isError.setIsErrAmount ? "border-red-500": "border-slate-500"}`}
            icon={<BsCurrencyPound/>}
          />
          <p className="text-red-500 text-xs">{error.errAmount}</p>

          {/* morgate term */}
          <div className="md:flex pt-4 md:justify-between gap-4">
            <div>
              <label className="text-xs text-slate-500">Morgtage Term</label>
            <InputText
              type="number"
              id="term"
              name="term"
              value={formData.term}
              onChange={handleChange}
              position="top-[1px] right-0"
              icon="years"
              inputClassName={`pl-2 ${isError.setIsErrTerm ? "border-red-500" : "border-slate-500"}`}
              classes={`p-2 font-jakarta text-sm font-medium mr-[1px] rounded-r-md border ${isError.setIsErrTerm ? "bg-red-500 text-white" : "bg-sky-100"}`}
          />
          <p className="text-red-500 text-xs">{error.errTerm}</p>
            </div>
            <div>
            <label className="text-xs text-slate-500">Interest rate</label>
            <InputText
              type="float"
              id="interestRate"
              name="interestRate"
              value={formData.interestRate}
              onChange={handleChange}
              position="right-[1px] top-[1px]"
              classes={`p-2.5 rounded-r-md ${isError.setIsErrInterestRate ? "bg-red-500 text-white" : "bg-sky-100"}`}
              inputClassName={`pl-2 ${isError.setIsErrInterestRate ? "border-red-500" : "border-slate-500"}`}
              icon={<MdOutlinePercent />}
          />
          <p className="text-red-500 text-xs">{error.errInterestRate}</p>
            </div>
          </div>  

          {/* Mortgage Type */}
          <div className="pt-4 flex flex-col items-start">
            <p className="text-xs text-slate-500">Morgage Type</p>
            <div className="border border-slate-500 w-full py-2 px-4 rounded-md mt-2 group peer-checked:bg-Lime">
              <input 
                type="radio"
                className=""
                name="mortgageType"
                id="repayment"
                value='repayment'
                onChange={handleChange}
                checked={formData.mortgageType === 'repayment'}
              />
              <label htmlFor="repayment" className="font-jakarta font-semibold pl-3 cursor-pointer peer-checked:bg-Lime">
                Repayment
              </label>
            </div>

            <div className="border border-slate-500 w-full py-2 px-4 rounded-md mt-2 group">
              <input 
                type="radio"
                name="mortgageType"
                className=""
                id="interestOnly"
                value='interestOnly'
                onChange={handleChange}
                checked={formData.mortgageType === 'interestOnly'}
              />
              <label htmlFor="interestOnly" className="font-jakarta font-semibold pl-3 cursor-pointer">Interest Only</label>
            </div>
          </div>
          

        </div>
        
        <button type="submit" className="flex bg-Lime hover:bg-Lime/80 mt-8 mb-10 md:mb-0 py-2 px-8 rounded-full font-jakarta font-semibold place-self-center md:place-self-start" >
          <Image src={iconCalculator} alt="calculator" className="mr-2"/>
          Calculate Repayments
          </button>
          
      </form>
    </div>
  )
}

export default MortgageCalculator