import IconInfo from "./Icons/IconInfo";
export const TextField = ({
  helperText,
  label,
  endIcon,
  startIcon,
  isError,
  ...inputProps
}) => {
  let labelClass = "text-preset-4 text-neutral-950";

  const pl = startIcon ? "pl-10" : "pl-4";
  const pr = endIcon ? "pr-10" : "pr-4";
  const inputBorderColorClass = isError
    ? "border-red-500"
    : "border-neutral-300";
  const inputClass = `w-full ${pl} ${pr} py-3 border ${inputBorderColorClass} rounded-md placeholder:text-neutral-500  text-neutral-950 disabled:bg-neutral-50 disabled:text-neutral-300 disabled:placeholder:text-neutral-300`;

  const helperTextColorClass = isError ? "text-red-500" : "text-neutral-600";
  let helperClass = `${helperTextColorClass}`;

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className={labelClass}>{label}</label>}
      <div className="relative">
        {startIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
            {startIcon}
          </div>
        )}
        <input className={inputClass} {...inputProps} />
        {endIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
            {endIcon}
          </div>
        )}
      </div>

      {helperText && (
        <div className="flex flex-row align-center gap-1">
          <span className="">
            <IconInfo size={16} className={helperClass} />
          </span>

          <span className={`${helperClass} text-preset-5`}>{helperText}</span>
        </div>
      )}
    </div>
  );
};
