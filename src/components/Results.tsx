import Image from 'next/image'
import illustration from '../assets/images/illustration-empty.svg'

type ResultProps = {
  repayment: string | null;
  repaymentOvertime: string | null;
  isClicked: boolean;
}

const Results: React.FC<ResultProps> = ({repayment, repaymentOvertime, isClicked}) => {

  return (
    <div className='relative flex flex-col items-center justify-center'>
      {!isClicked ? (
         <div className='flex flex-col items-center self-center justify-self-center mx-4'>
         <Image src={illustration} alt='illustration empty' />
         <h3 className='text-white font-jakarta text-lg font-semibold'>Results Shown Here</h3>
         <p className='text-slate-400 text-center text-sm pt-2'>
           Complete the form and click "calculate repayments" to see what your monthly repayments will be.
         </p>
       </div>
      ) : (
        <div className='pt-10 mx-8 -translate-y-10  flex flex-col'>
          <h1 className='text-white text-xl font-semibold font-jakarta mb-2'>Your Results</h1>
          <p className='text-slate-400 text-sm'>
            Your results are shown below based on the information you provided. To adjust the results,
            edit the form and click "calculate repayments" again.
          </p>
        <div className='bg-[#0c1c33] w-full mt-8 p-8 rounded-lg border-t-2 border-Lime'>
          <div className='border-b-[1px] border-slate-200/20'>
            <h3 className='text-slate-400 text-sm'>Your monthly repayments</h3>
            <h1 className='text-Lime text-4xl font-bold py-4'>£ {repayment}</h1>
          </div>
            <p className='text-slate-500 text-sm pt-4 pb-2'>Total you'll pay over the term</p>
            <h1 className='text-white text-2xl font-bold'>£ {repaymentOvertime}</h1>
        </div>
      </div>
      )}
    </div>
  )
}

export default Results