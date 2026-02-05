import * as React from "react"
import { ChevronRight, type LucideIcon } from "lucide-react"
import { useMenuState } from "@/hooks/use-persistent-menu"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/sidebar/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
    isActive?: boolean
    items?: any[]
  }[]
}) {
  const { openItems, setOpen } = useMenuState()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            open={openItems[item.title] ?? item.isActive}
            onOpenChange={(open) => setOpen(item.title, open)}
          >
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={item.title}>
                <a href={item.url}>
                  <item.icon />
                  <span className="font-semibold">{item.title}</span>
                </a>
              </SidebarMenuButton>
              {item.items?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRight />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem: any) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          {subItem.items?.length ? (
                            <Collapsible
                              key={subItem.title}
                              open={openItems[subItem.title]}
                              onOpenChange={(open) => setOpen(subItem.title, open)}
                            >
                              <div className="flex flex-col">
                                <div className="flex items-center w-full">
                                  <SidebarMenuSubButton asChild>
                                    <a href={subItem.url}>
                                      <span>{subItem.title}</span>
                                    </a>
                                  </SidebarMenuSubButton>
                                  <CollapsibleTrigger asChild>
                                    <button className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground ml-auto data-[state=open]:rotate-90 transition-transform">
                                      <ChevronRight className="h-3.5 w-3.5" />
                                    </button>
                                  </CollapsibleTrigger>
                                </div>
                                <CollapsibleContent>
                                  <SidebarMenuSub>
                                    {subItem.items.map((deepItem: any) => (
                                      <SidebarMenuSubItem key={deepItem.title}>
                                        <SidebarMenuSubButton asChild>
                                          <a href={deepItem.url}>
                                            <span className="text-xs opacity-80">{deepItem.title}</span>
                                          </a>
                                        </SidebarMenuSubButton>
                                      </SidebarMenuSubItem>
                                    ))}
                                  </SidebarMenuSub>
                                </CollapsibleContent>
                              </div>
                            </Collapsible>
                          ) : (
                            <SidebarMenuSubButton asChild>
                              <a href={subItem.url}>
                                <span>{subItem.title}</span>
                              </a>
                            </SidebarMenuSubButton>
                          )}
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

