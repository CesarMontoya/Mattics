import * as React from "react"
import { cn } from "@/lib/utils"

interface PageContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    title?: string
    description?: string
    icon?: React.ReactNode
    coverImage?: string
    coverGradient?: string
}

export function PageContent({
    children,
    className,
    title,
    description,
    icon,
    ...props
}: PageContentProps) {
    return (
        <main
            className={cn(
                "flex-1 overflow-y-auto bg-slate-50/50 dark:bg-zinc-950/50 pb-20",
                className
            )}
            {...props}
        >
            <div className="mx-auto w-full max-w-[850px] px-6 md:px-10 lg:px-16">
                <div className="flex flex-col">
                    {/* Header Area (Adjusted for no cover) */}
                    <div className="flex flex-col gap-4 mb-10 mt-10 md:mt-16">
                        {icon && (
                            <div className="inline-flex items-center justify-center bg-background rounded-2xl p-4 shadow-sm border border-border w-fit">
                                <div className="text-4xl md:text-5xl">
                                    {icon}
                                </div>
                            </div>
                        )}
                        <div className="flex flex-col gap-2">
                            {title && (
                                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                                    {title}
                                </h1>
                            )}
                            {description && (
                                <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                                    {description}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Page Content */}
                    <div className="flex flex-col gap-8">
                        {children}
                    </div>
                </div>
            </div>
        </main>
    )
}


