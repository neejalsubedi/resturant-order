import {forwardRef, useState} from "react";
import {cn} from "@/lib/utils.ts";
import {Eye, EyeOff} from "lucide-react";
import {motion} from "framer-motion";

type OptionType = {
    label: string;
    value: string | number;
};

type InputProps = {
    label?: string;
    name: string;
    type?:
        | "text"
        | "email"
        | "password"
        | "number"
        | "date"
        | "datetime-local"
        | "time"
        | "url"
        | "tel"
        | "search"
        | "color"
        | "month"
        | "week"
        | "file"
        | "checkbox"
        | "radio"
        | "select"
        | "textarea"
        | "switch";
    placeholder?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    labelClassName?: string;
    min?: number | string;
    max?: number | string;
    step?: number;
    minLength?: number;
    maxLength?: number;
    options?: OptionType[];
    value?: any;
    onChange?: (...event: any[]) => void;
} & Omit<
    React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement>,
    "type" | "value" | "onChange"
>;

const Input = forwardRef<HTMLInputElement | HTMLSelectElement, InputProps>(
    (
        {
            label,
            name,
            type = "text",
            placeholder = "",
            error,
            required = false,
            disabled = false,
            className = "",
            labelClassName = "block mb-1 font-medium text-sm",
            min,
            max,
            step,
            minLength,
            maxLength,
            options = [],
            value,
            onChange,
            ...rest
        },
        ref
    ) => {
        const [showPassword, setShowPassword] = useState(false);
        const isPassword = type === "password";
        const inputType = isPassword && showPassword ? "text" : type;

        const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value;

            // Remove leading zeros for number type input
            if (
                type === "number" &&
                newValue.startsWith("0") &&
                newValue.length > 1
            ) {
                e.target.value = newValue.replace(/^0+/, ""); // Remove leading zeros
            }

            // If value is empty, set it to null or a default value
            if (newValue === "") {
                e.target.value = "";
            }

            if (onChange) {
                onChange(e);
            }
        };

        /** textarea renderer */
        if (type === "textarea") {
            return (
                <div className="">
                    {label && (
                        <label htmlFor={name} className={labelClassName}>
                            {label} {required && <span className="text-red-500">*</span>}
                        </label>
                    )}

                    <textarea
                        id={name}
                        name={name}
                        ref={ref as React.Ref<HTMLTextAreaElement>}
                        disabled={disabled}
                        placeholder={placeholder}
                        value={value ?? ""}
                        onChange={onChange}
                        className={cn(
                            "border-input w-full rounded-md border px-3 py-2 text-sm shadow-xs outline-none bg-white disabled:opacity-50",
                            error ? "border-red-500" : "border-gray-300",
                            className
                        )}
                        {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
                    />

                    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
                </div>
            );
        }
        if (type === "switch") {
            return (
                <div className="relative">
                    {label && (
                        <label className={labelClassName}>
                            {label} {required && <span className="text-red-500">*</span>}
                        </label>
                    )}

                    <label
                        className={cn(
                            "inline-flex items-center cursor-pointer select-none",
                            disabled && "cursor-not-allowed opacity-60"
                        )}
                    >
                        <input
                            id={name}
                            name={name}
                            ref={ref as React.Ref<HTMLInputElement>}
                            type="checkbox"
                            className="sr-only"
                            checked={!!value}
                            disabled={disabled}
                            onChange={(e) => {
                                if (onChange) onChange(e);
                            }}
                            aria-invalid={!!error}
                            {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
                        />

                        {/* Track */}
                        <div
                            className={cn(
                                "w-11 h-6 rounded-full transition-colors duration-200",
                                value ? "bg-green-600" : "bg-gray-300"
                            )}
                        />

                        {/* Animated Knob */}
                        <motion.div
                            className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow"
                            animate={{
                                x: value ? 20 : 0,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                            }}
                        />
                    </label>

                    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
                </div>
            );
        }
        return (
            <div className=" relative">
                {label && (
                    <label htmlFor={name} className={labelClassName}>
                        {label} {required && <span className="text-red-500">*</span>}
                    </label>
                )}

                <div className="relative">
                    {type === "select" ? (
                        <select
                            id={name}
                            name={name}
                            ref={ref as React.Ref<HTMLSelectElement>}
                            disabled={disabled}
                            value={value}
                            onChange={onChange}
                            aria-invalid={!!error}
                            className={cn(
                                "file:text-foreground selection:bg-primary selection:text-primary-foreground border-input flex h-10 w-full min-w-0 rounded-md border px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-base",
                                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                                "bg-white placeholder-[#ACA9A9] placeholder-text-xs",
                                error ? "border-red-500" : "border-gray-300",
                                className
                            )}
                            {...(rest as React.SelectHTMLAttributes<HTMLSelectElement>)}
                        >
                            <option value="">Select an option</option>
                            {options.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <>
                            <input
                                id={name}
                                name={name}
                                ref={ref as React.Ref<HTMLInputElement>}
                                type={inputType}
                                placeholder={placeholder}
                                disabled={disabled}
                                min={min}
                                max={max}
                                step={step}
                                minLength={minLength}
                                maxLength={maxLength}
                                value={value}
                                onChange={handleNumberChange} // Use handleNumberChange for number input
                                aria-invalid={!!error}
                                className={cn(
                                    "file:text-foreground selection:bg-primary selection:text-primary-foreground border-input flex h-10 w-full min-w-0 rounded-md border px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                                    "bg-white placeholder-[#ACA9A9]",
                                    error ? "border-red-500" : "border-gray-300",
                                    isPassword ? "pr-10" : "",
                                    className
                                )}
                                {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
                            />

                            {isPassword && (
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
                                </button>
                            )}
                        </>
                    )}
                </div>

                {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            </div>
        );
    }
);

Input.displayName = "Input";
export {Input};
