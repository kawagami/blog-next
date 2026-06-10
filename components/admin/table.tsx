const cellBorder = "border border-stone-300 dark:border-stone-700 px-4 py-2";

export function AdminTable({ className = "", ...props }: React.ComponentProps<"table">) {
    return <table className={`w-full border-collapse border border-stone-200 dark:border-stone-700 ${className}`} {...props} />;
}

export function AdminHeadRow({ className = "", ...props }: React.ComponentProps<"tr">) {
    return <tr className={`bg-stone-100 dark:bg-stone-800 ${className}`} {...props} />;
}

export function AdminRow({ className = "", ...props }: React.ComponentProps<"tr">) {
    return <tr className={`hover:bg-stone-50 dark:hover:bg-stone-800 ${className}`} {...props} />;
}

export function AdminTh({ className = "", ...props }: React.ComponentProps<"th">) {
    return <th className={`${cellBorder} text-left text-stone-700 dark:text-stone-300 ${className}`} {...props} />;
}

export function AdminTd({ className = "", ...props }: React.ComponentProps<"td">) {
    return <td className={`${cellBorder} text-stone-900 dark:text-stone-100 ${className}`} {...props} />;
}
