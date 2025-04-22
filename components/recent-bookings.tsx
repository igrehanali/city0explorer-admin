"use client"

import { useState } from "react"
import { Check, MoreHorizontal, X } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"

const bookings = [
  {
    id: "B-1234",
    customer: {
      name: "Olivia Martin",
      email: "olivia.martin@email.com",
      avatar: "/placeholder.svg",
    },
    location: "Bali, Indonesia",
    date: "2023-05-15",
    amount: "$1,999.00",
    status: "confirmed",
  },
  {
    id: "B-1235",
    customer: {
      name: "Jackson Lee",
      email: "jackson.lee@email.com",
      avatar: "/placeholder.svg",
    },
    location: "Paris, France",
    date: "2023-05-16",
    amount: "$1,249.00",
    status: "processing",
  },
  {
    id: "B-1236",
    customer: {
      name: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      avatar: "/placeholder.svg",
    },
    location: "Tokyo, Japan",
    date: "2023-05-17",
    amount: "$2,499.00",
    status: "confirmed",
  },
  {
    id: "B-1237",
    customer: {
      name: "William Kim",
      email: "william.kim@email.com",
      avatar: "/placeholder.svg",
    },
    location: "New York, USA",
    date: "2023-05-18",
    amount: "$1,799.00",
    status: "cancelled",
  },
  {
    id: "B-1238",
    customer: {
      name: "Sofia Rodriguez",
      email: "sofia.rodriguez@email.com",
      avatar: "/placeholder.svg",
    },
    location: "Barcelona, Spain",
    date: "2023-05-19",
    amount: "$1,599.00",
    status: "confirmed",
  },
]

export function RecentBookings() {
  const { toast } = useToast()
  const [bookingsList, setBookingsList] = useState(bookings)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
      case "processing":
        return "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
      case "cancelled":
        return "bg-rose-500/10 text-rose-500 hover:bg-rose-500/20"
      default:
        return "bg-slate-500/10 text-slate-500 hover:bg-slate-500/20"
    }
  }

  const handleApprove = (id: string) => {
    setBookingsList(bookingsList.map((booking) => (booking.id === id ? { ...booking, status: "confirmed" } : booking)))
    toast({
      title: "Booking approved",
      description: `Booking ${id} has been approved`,
    })
  }

  const handleCancel = (id: string) => {
    setBookingsList(bookingsList.map((booking) => (booking.id === id ? { ...booking, status: "cancelled" } : booking)))
    toast({
      title: "Booking cancelled",
      description: `Booking ${id} has been cancelled`,
    })
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookingsList.map((booking) => (
          <TableRow key={booking.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={booking.customer.avatar} alt={booking.customer.name} />
                  <AvatarFallback>{booking.customer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">{booking.customer.name}</span>
                  <span className="text-xs text-muted-foreground">{booking.customer.email}</span>
                </div>
              </div>
            </TableCell>
            <TableCell>{booking.location}</TableCell>
            <TableCell>{booking.date}</TableCell>
            <TableCell>{booking.amount}</TableCell>
            <TableCell>
              <Badge variant="outline" className={getStatusColor(booking.status)}>
                {booking.status}
              </Badge>
            </TableCell>
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
                  <DropdownMenuItem onClick={() => handleApprove(booking.id)}>
                    <Check className="mr-2 h-4 w-4 text-emerald-500" />
                    Approve
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleCancel(booking.id)}>
                    <X className="mr-2 h-4 w-4 text-rose-500" />
                    Cancel
                  </DropdownMenuItem>
                  <DropdownMenuItem>View details</DropdownMenuItem>
                  <DropdownMenuItem>Send email</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

