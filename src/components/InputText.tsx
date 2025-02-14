import React from 'react'

type Props = {
  icon: React.ReactNode | string,
  type: string,
  position: string,
  classes: string,
  inputClassName: string,
  id: string,
  name: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: number
}

const InputText = ({...props}: Props) => {
  return (
    <div className="relative overflow-hidden mt-2 group">
        <div className={`${props.classes} absolute ${props.position} ml-[1px] group-focus-within:bg-Lime`}>
          {props.icon}
        </div>
          <input 
            type={props.type}
            id={props.id} 
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            className={`${props.inputClassName} py-1.5 rounded-md w-full font-medium border text-left focus:border-Lime focus:outline-Lime focus:outline-1`}
          />
        </div>
  )
}

export default InputText