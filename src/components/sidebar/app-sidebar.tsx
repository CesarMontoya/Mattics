"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/sidebar/nav-main"
import { NavProjects } from "@/components/sidebar/nav-projects"
import { NavSecondary } from "@/components/sidebar/nav-secondary"
import { NavUser } from "@/components/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar/sidebar"

const data = {
  user: {
    name: "Usuario",
    email: "usuario@mattics.com",
    avatar: "/avatars/user.jpg",
  },
  navMain: [
    {
      title: "Matemáticas 7",
      url: "/matematicas-7",
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: "Números Naturales",
          url: "#",
          items: [
            { title: "Sistema Decimal", url: "#" },
            { title: "Adición de Números Naturales", url: "/matematicas-7/adicion-naturales" },
            { title: "Sustracción de Números Naturales", url: "#" },
            { title: "Multiplicación de Números Naturales", url: "#" },
            { title: "División de Números Naturales", url: "#" },
            { title: "Potenciación de Números Naturales", url: "#" },
            { title: "Radicación de Números Naturales", url: "#" },
            { title: "Logaritmación de Números Naturales", url: "#" },
          ],
        },
        {
          title: "Números Enteros",
          url: "#",
        },
        {
          title: "Números Racionales",
          url: "#",
        },
      ],
    },
    {
      title: "Matemáticas 8",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Álgebra",
          url: "#",
        },
      ],
    },
  ],

  navSecondary: [
    {
      title: "Soporte",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Guías de Estudio",
      url: "#",
      icon: Frame,
    },
    {
      name: "Exámenes",
      url: "#",
      icon: PieChart,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Mattics</span>
                  <span className="truncate text-xs">Aprendizaje Activo</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
    </Sidebar>
  )
}

