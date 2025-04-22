"use client"

import { useState } from "react"
import { ArrowUpDown, Check, Download, MoreHorizontal, Plus, Search, Trash, UserCog, X } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"

const users = [
  {
    id: "u-1234",
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    avatar: "/placeholder.svg",
    role: "Admin",
    status: "active",
    lastActive: "2 hours ago",
    joinDate: "2023-01-15",
  },
  {
    id: "u-1235",
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    avatar: "/placeholder.svg",
    role: "Editor",
    status: "active",
    lastActive: "5 hours ago",
    joinDate: "2023-02-20",
  },
  {
    id: "u-1236",
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    avatar: "/placeholder.svg",
    role: "User",
    status: "inactive",
    lastActive: "2 days ago",
    joinDate: "2023-03-10",
  },
  {
    id: "u-1237",
    name: "William Kim",
    email: "william.kim@email.com",
    avatar: "/placeholder.svg",
    role: "Editor",
    status: "active",
    lastActive: "1 day ago",
    joinDate: "2023-03-15",
  },
  {
    id: "u-1238",
    name: "Sofia Rodriguez",
    email: "sofia.rodriguez@email.com",
    avatar: "/placeholder.svg",
    role: "User",
    status: "suspended",
    lastActive: "1 week ago",
    joinDate: "2023-04-05",
  },
  {
    id: "u-1239",
    name: "Liam Johnson",
    email: "liam.johnson@email.com",
    avatar: "/placeholder.svg",
    role: "User",
    status: "active",
    lastActive: "3 hours ago",
    joinDate: "2023-04-10",
  },
  {
    id: "u-1240",
    name: "Emma Wilson",
    email: "emma.wilson@email.com",
    avatar: "/placeholder.svg",
    role: "Admin",
    status: "active",
    lastActive: "Just now",
    joinDate: "2023-04-15",
  },
  {
    id: "u-1241",
    name: "Noah Garcia",
    email: "noah.garcia@email.com",
    avatar: "/placeholder.svg",
    role: "User",
    status: "inactive",
    lastActive: "3 days ago",
    joinDate: "2023-04-20",
  },
]

export default function UsersPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [usersList, setUsersList] = useState(users)

  const filteredUsers = usersList.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = roleFilter === "all" || user.role.toLowerCase() === roleFilter.toLowerCase()
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
      case "inactive":
        return "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
      case "suspended":
        return "bg-rose-500/10 text-rose-500 hover:bg-rose-500/20"
      default:
        return "bg-slate-500/10 text-slate-500 hover:bg-slate-500/20"
    }
  }

  const handleActivate = (id: string) => {
    setUsersList(usersList.map((user) => (user.id === id ? { ...user, status: "active" } : user)))
    toast({
      title: "User activated",
      description: `User ${id} has been activated`,
    })
  }

  const handleSuspend = (id: string) => {
    setUsersList(usersList.map((user) => (user.id === id ? { ...user, status: "suspended" } : user)))
    toast({
      title: "User suspended",
      description: `User ${id} has been suspended`,
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Manage your users, their roles and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search users..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="shrink-0">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>

          <div className="mt-6 rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      User
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No users found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-medium">{user.name}</span>
                            <span className="text-xs text-muted-foreground">{user.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-primary/10 text-primary hover:bg-primary/20">
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.lastActive}</TableCell>
                      <TableCell>{user.joinDate}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <UserCog className="mr-2 h-4 w-4" />
                              Edit User
                            </DropdownMenuItem>
                            {user.status !== "active" && (
                              <DropdownMenuItem onClick={() => handleActivate(user.id)}>
                                <Check className="mr-2 h-4 w-4 text-emerald-500" />
                                Activate
                              </DropdownMenuItem>
                            )}
                            {user.status !== "suspended" && (
                              <DropdownMenuItem onClick={() => handleSuspend(user.id)}>
                                <X className="mr-2 h-4 w-4 text-rose-500" />
                                Suspend
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>
                              <Trash className="mr-2 h-4 w-4 text-rose-500" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

