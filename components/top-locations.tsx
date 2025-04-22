"use client"

import Image from "next/image"
import { Star } from "lucide-react"

import { Progress } from "@/components/ui/progress"

const locations = [
  {
    id: 1,
    name: "Bali, Indonesia",
    image: "/placeholder.svg",
    bookings: 245,
    rating: 4.8,
    percentage: 85,
  },
  {
    id: 2,
    name: "Paris, France",
    image: "/placeholder.svg",
    bookings: 189,
    rating: 4.7,
    percentage: 75,
  },
  {
    id: 3,
    name: "Santorini, Greece",
    image: "/placeholder.svg",
    bookings: 176,
    rating: 4.9,
    percentage: 70,
  },
  {
    id: 4,
    name: "Tokyo, Japan",
    image: "/placeholder.svg",
    bookings: 154,
    rating: 4.6,
    percentage: 65,
  },
  {
    id: 5,
    name: "New York, USA",
    image: "/placeholder.svg",
    bookings: 132,
    rating: 4.5,
    percentage: 55,
  },
]

export function TopLocations() {
  return (
    <div className="space-y-4">
      {locations.map((location) => (
        <div key={location.id} className="flex items-center gap-4">
          <Image
            src={location.image || "/placeholder.svg"}
            alt={location.name}
            width={48}
            height={48}
            className="rounded-md object-cover"
          />
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="font-medium">{location.name}</p>
              <div className="flex items-center text-amber-500">
                <Star className="mr-1 h-3 w-3 fill-current" />
                <span className="text-xs">{location.rating}</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{location.bookings} bookings</span>
              <span className="font-medium">{location.percentage}%</span>
            </div>
            <Progress value={location.percentage} className="h-1" />
          </div>
        </div>
      ))}
    </div>
  )
}

