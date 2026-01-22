import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  onClear?: () => void;
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, onClear, error, value, ...props }, ref) => {
    const hasValue = value && String(value).length > 0;

    return (
      <div className="relative w-full">
        {icon && (
          <div className={cn(
            "absolute left-3 top-1/2 -translate-y-1/2 transition-colors",
            error ? "text-red-400" : "text-slate-400"
          )}>
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          className={cn(
            "flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-50",
            error 
              ? "border-red-500 focus-visible:ring-red-500/10 focus-visible:border-red-500" 
              : "border-slate-200 focus-visible:ring-blue-500/10 focus-visible:border-blue-500",
            icon && "pl-10",
            onClear && hasValue && "pr-10",
            className
          )}
          ref={ref}
          {...props}
        />
        {onClear && hasValue && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
