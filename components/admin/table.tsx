const cellBorder = "border border-gray-300 dark:border-gray-700 px-4 py-2";

export function AdminTable({ className = "", ...props }: React.ComponentProps<"table">) {
    return <table className={`w-full border-collapse border border-gray-200 dark:border-gray-700 ${className}`} {...props} />;
}

export function AdminHeadRow({ className = "", ...props }: React.ComponentProps<"tr">) {
    return <tr className={`bg-gray-100 dark:bg-gray-800 ${className}`} {...props} />;
}

export function AdminRow({ className = "", ...props }: React.ComponentProps<"tr">) {
    return <tr className={`hover:bg-gray-50 dark:hover:bg-gray-800 ${className}`} {...props} />;
}

export function AdminTh({ className = "", ...props }: React.ComponentProps<"th">) {
    return <th className={`${cellBorder} text-left text-gray-700 dark:text-gray-300 ${className}`} {...props} />;
}

export function AdminTd({ className = "", ...props }: React.ComponentProps<"td">) {
    return <td className={`${cellBorder} text-gray-900 dark:text-gray-100 ${className}`} {...props} />;
}
