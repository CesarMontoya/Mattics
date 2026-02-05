"use client"

import * as React from "react"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { MenuStateProvider } from "@/hooks/use-persistent-menu"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/sidebar/breadcrumb"
import { Separator } from "@/components/ui/sidebar/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar/sidebar"

interface BreadcrumbItemType {
    label: string
    href?: string
}

interface SidebarLayoutProps {
    children: React.ReactNode
    breadcrumbs?: BreadcrumbItemType[]
}

export function SidebarLayout({ children, breadcrumbs = [] }: SidebarLayoutProps) {
    return (
        <MenuStateProvider>
            <SidebarProvider>

            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                {breadcrumbs.map((crumb, index) => (
                                    <React.Fragment key={crumb.label}>
                                        <BreadcrumbItem
                                            className={
                                                index === breadcrumbs.length - 1
                                                    ? ""
                                                    : "hidden md:block"
                                            }
                                        >
                                            {crumb.href ? (
                                                <BreadcrumbLink href={crumb.href}>
                                                    {crumb.label}
                                                </BreadcrumbLink>
                                            ) : (
                                                <BreadcrumbPage>
                                                    {crumb.label}
                                                </BreadcrumbPage>
                                            )}
                                        </BreadcrumbItem>
                                        {index < breadcrumbs.length - 1 && (
                                            <BreadcrumbSeparator className="hidden md:block" />
                                        )}
                                    </React.Fragment>
                                ))}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4">
                    {children}
                </div>

            </SidebarInset>
        </SidebarProvider>
        </MenuStateProvider>
    )
}

