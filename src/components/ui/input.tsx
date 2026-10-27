import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "cn"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full min-w-0 rounded-[3px] border border-input bg-surface px-3.5 py-2 text-base text-ink transition-[border-color,box-shadow] outline-none placeholder:text-graphite/60 focus-visible:border-cobalt focus-visible:ring-3 focus-visible:ring-cobalt/15 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted disabled:text-graphite aria-invalid:border-rose aria-invalid:ring-3 aria-invalid:ring-rose/15 md:text-[15px]",
        className
      )}
      {...props}
    />
  )
}

export { Input }
