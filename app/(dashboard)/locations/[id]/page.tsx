// "use client"

// import { useState } from "react"
// import Image from "next/image"
// import { useParams, useRouter } from "next/navigation"
// import {
//   ArrowLeft,
//   Calendar,
//   Edit,
//   Globe,
//   MapPin,
//   MessageSquare,
//   Save,
//   Star,
//   ThermometerSun,
//   Trash,
//   Upload,
//   Users,
//   Check,
// } from "lucide-react"

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Separator } from "@/components/ui/separator"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Textarea } from "@/components/ui/textarea"
// import { useToast } from "@/hooks/use-toast"

// // Mock data for a single location
// const locationData = {
//   id: "loc-1234",
//   name: "Bali, Indonesia",
//   description:
//     "Experience the beauty of Bali with its stunning beaches, lush rice terraces, and vibrant culture. Bali is a popular tourist destination known for its highly developed arts, including traditional and modern dance, sculpture, painting, leather, metalworking, and music. The Indonesian International Film Festival is held every year in Bali. Bali is part of the Coral Triangle, the area with the highest biodiversity of marine species.",
//   images: Array(6).fill("/placeholder.svg"),
//   price: "$1,999",
//   rating: 4.8,
//   reviews: 245,
//   category: "Beach",
//   featured: true,
//   location: {
//     address: "Bali, Indonesia",
//     latitude: -8.4095,
//     longitude: 115.1889,
//   },
//   climate: {
//     bestTimeToVisit: "April to October",
//     averageTemperature: "26°C - 33°C",
//     rainySeasons: "November to March",
//   },
//   activities: [
//     "Surfing at Kuta Beach",
//     "Visit Ubud Monkey Forest",
//     "Explore Tegalalang Rice Terraces",
//     "Visit Uluwatu Temple",
//     "Balinese Cooking Classes",
//   ],
//   amenities: ["Airport Transfers", "Guided Tours", "Spa Services", "Restaurant Reservations", "Car Rental"],
// }

// // Mock reviews
// const reviews = [
//   {
//     id: "rev-1",
//     user: {
//       name: "Olivia Martin",
//       avatar: "/placeholder.svg",
//     },
//     rating: 5,
//     date: "2023-05-10",
//     comment:
//       "Amazing experience! The beaches were beautiful and the local culture was fascinating. Would definitely recommend.",
//   },
//   {
//     id: "rev-2",
//     user: {
//       name: "Jackson Lee",
//       avatar: "/placeholder.svg",
//     },
//     rating: 4,
//     date: "2023-05-05",
//     comment: "Great trip overall. The guided tours were excellent, though some of the restaurants were a bit touristy.",
//   },
//   {
//     id: "rev-3",
//     user: {
//       name: "Isabella Nguyen",
//       avatar: "/placeholder.svg",
//     },
//     rating: 5,
//     date: "2023-04-28",
//     comment: "Absolutely stunning location. The rice terraces were breathtaking and the local food was delicious.",
//   },
// ]

// export default function LocationDetailPage() {
//   const params = useParams()
//   const router = useRouter()
//   const { toast } = useToast()
//   const [isEditing, setIsEditing] = useState(false)
//   const [location, setLocation] = useState(locationData)

//   const handleSave = () => {
//     setIsEditing(false)
//     toast({
//       title: "Location updated",
//       description: "The location has been updated successfully",
//     })
//   }

//   const handleDelete = () => {
//     toast({
//       title: "Location deleted",
//       description: "The location has been deleted successfully",
//     })
//     router.push("/locations")
//   }

//   return (
//     <div className="flex flex-col gap-6">
//       <div className="flex items-center gap-4">
//         <Button variant="outline" size="icon" onClick={() => router.push("/locations")}>
//           <ArrowLeft className="h-4 w-4" />
//           <span className="sr-only">Back</span>
//         </Button>
//         <h1 className="text-3xl font-bold tracking-tight">{location.name}</h1>
//         <div className="ml-auto flex gap-2">
//           {isEditing ? (
//             <Button onClick={handleSave}>
//               <Save className="mr-2 h-4 w-4" />
//               Save Changes
//             </Button>
//           ) : (
//             <Button variant="outline" onClick={() => setIsEditing(true)}>
//               <Edit className="mr-2 h-4 w-4" />
//               Edit
//             </Button>
//           )}
//           <Button variant="destructive" onClick={handleDelete}>
//             <Trash className="mr-2 h-4 w-4" />
//             Delete
//           </Button>
//         </div>
//       </div>

//       <Tabs defaultValue="details" className="space-y-4">
//         <TabsList>
//           <TabsTrigger value="details">Details</TabsTrigger>
//           <TabsTrigger value="gallery">Gallery</TabsTrigger>
//           <TabsTrigger value="reviews">Reviews</TabsTrigger>
//           <TabsTrigger value="bookings">Bookings</TabsTrigger>
//         </TabsList>

//         <TabsContent value="details" className="space-y-4">
//           <div className="grid gap-6 md:grid-cols-2">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Location Information</CardTitle>
//                 <CardDescription>Basic information about the location</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {isEditing ? (
//                   <>
//                     <div className="space-y-2">
//                       <Label htmlFor="name">Name</Label>
//                       <Input
//                         id="name"
//                         value={location.name}
//                         onChange={(e) => setLocation({ ...location, name: e.target.value })}
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="description">Description</Label>
//                       <Textarea
//                         id="description"
//                         rows={5}
//                         value={location.description}
//                         onChange={(e) => setLocation({ ...location, description: e.target.value })}
//                       />
//                     </div>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="space-y-2">
//                         <Label htmlFor="price">Price</Label>
//                         <Input
//                           id="price"
//                           value={location.price.replace("$", "")}
//                           onChange={(e) => setLocation({ ...location, price: `$${e.target.value}` })}
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="category">Category</Label>
//                         <Input
//                           id="category"
//                           value={location.category}
//                           onChange={(e) => setLocation({ ...location, category: e.target.value })}
//                         />
//                       </div>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-1 text-amber-500">
//                         <Star className="h-4 w-4 fill-current" />
//                         <span className="text-sm font-medium">{location.rating}</span>
//                         <span className="text-xs text-muted-foreground">({location.reviews} reviews)</span>
//                       </div>
//                       <Badge variant="outline" className="bg-primary/10 text-primary">
//                         {location.category}
//                       </Badge>
//                     </div>
//                     <p className="text-sm text-muted-foreground">{location.description}</p>
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center text-sm">
//                         <MapPin className="mr-1 h-4 w-4" />
//                         <span>{location.location.address}</span>
//                       </div>
//                       <div className="text-xl font-bold">{location.price}</div>
//                     </div>
//                   </>
//                 )}
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle>Climate & Best Time to Visit</CardTitle>
//                 <CardDescription>Weather information and seasonal recommendations</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {isEditing ? (
//                   <>
//                     <div className="space-y-2">
//                       <Label htmlFor="bestTimeToVisit">Best Time to Visit</Label>
//                       <Input
//                         id="bestTimeToVisit"
//                         value={location.climate.bestTimeToVisit}
//                         onChange={(e) =>
//                           setLocation({
//                             ...location,
//                             climate: { ...location.climate, bestTimeToVisit: e.target.value },
//                           })
//                         }
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="averageTemperature">Average Temperature</Label>
//                       <Input
//                         id="averageTemperature"
//                         value={location.climate.averageTemperature}
//                         onChange={(e) =>
//                           setLocation({
//                             ...location,
//                             climate: { ...location.climate, averageTemperature: e.target.value },
//                           })
//                         }
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="rainySeasons">Rainy Seasons</Label>
//                       <Input
//                         id="rainySeasons"
//                         value={location.climate.rainySeasons}
//                         onChange={(e) =>
//                           setLocation({
//                             ...location,
//                             climate: { ...location.climate, rainySeasons: e.target.value },
//                           })
//                         }
//                       />
//                     </div>
//                   </>
//                 ) : (
//                   <div className="space-y-4">
//                     <div className="flex items-center gap-3">
//                       <Calendar className="h-5 w-5 text-muted-foreground" />
//                       <div>
//                         <p className="font-medium">Best Time to Visit</p>
//                         <p className="text-sm text-muted-foreground">{location.climate.bestTimeToVisit}</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <ThermometerSun className="h-5 w-5 text-muted-foreground" />
//                       <div>
//                         <p className="font-medium">Average Temperature</p>
//                         <p className="text-sm text-muted-foreground">{location.climate.averageTemperature}</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <Globe className="h-5 w-5 text-muted-foreground" />
//                       <div>
//                         <p className="font-medium">Rainy Seasons</p>
//                         <p className="text-sm text-muted-foreground">{location.climate.rainySeasons}</p>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </div>

//           <div className="grid gap-6 md:grid-cols-2">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Activities</CardTitle>
//                 <CardDescription>Popular activities at this location</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 {isEditing ? (
//                   <div className="space-y-2">
//                     <Label htmlFor="activities">Activities (one per line)</Label>
//                     <Textarea
//                       id="activities"
//                       rows={5}
//                       value={location.activities.join("\n")}
//                       onChange={(e) =>
//                         setLocation({
//                           ...location,
//                           activities: e.target.value.split("\n").filter((item) => item.trim() !== ""),
//                         })
//                       }
//                     />
//                   </div>
//                 ) : (
//                   <ul className="space-y-2">
//                     {location.activities.map((activity, index) => (
//                       <li key={index} className="flex items-center gap-2">
//                         <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
//                           <span className="text-xs font-medium text-primary">{index + 1}</span>
//                         </div>
//                         <span>{activity}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle>Amenities</CardTitle>
//                 <CardDescription>Services and amenities included</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 {isEditing ? (
//                   <div className="space-y-2">
//                     <Label htmlFor="amenities">Amenities (one per line)</Label>
//                     <Textarea
//                       id="amenities"
//                       rows={5}
//                       value={location.amenities.join("\n")}
//                       onChange={(e) =>
//                         setLocation({
//                           ...location,
//                           amenities: e.target.value.split("\n").filter((item) => item.trim() !== ""),
//                         })
//                       }
//                     />
//                   </div>
//                 ) : (
//                   <ul className="grid grid-cols-2 gap-2">
//                     {location.amenities.map((amenity, index) => (
//                       <li key={index} className="flex items-center gap-2">
//                         <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
//                           <Check className="h-3 w-3 text-primary" />
//                         </div>
//                         <span className="text-sm">{amenity}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </CardContent>
//             </Card>
//           </div>
//         </TabsContent>

//         <TabsContent value="gallery" className="space-y-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>Image Gallery</CardTitle>
//               <CardDescription>Manage location images</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
//                 {location.images.map((image, index) => (
//                   <div key={index} className="group relative aspect-square overflow-hidden rounded-md border">
//                     <Image
//                       src={image || "/placeholder.svg"}
//                       alt={`${location.name} - Image ${index + 1}`}
//                       fill
//                       className="object-cover transition-transform group-hover:scale-105"
//                     />
//                     {isEditing && (
//                       <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
//                         <Button variant="outline" size="icon" className="h-8 w-8 rounded-full bg-background">
//                           <Trash className="h-4 w-4" />
//                           <span className="sr-only">Delete image</span>
//                         </Button>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//                 {isEditing && (
//                   <div className="flex aspect-square items-center justify-center rounded-md border border-dashed">
//                     <Button variant="outline" className="h-auto flex-col gap-1 p-4">
//                       <Upload className="h-4 w-4" />
//                       <span className="text-xs">Upload</span>
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="reviews" className="space-y-4">
//           <Card>
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <div>
//                   <CardTitle>Customer Reviews</CardTitle>
//                   <CardDescription>Reviews and ratings from customers</CardDescription>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="flex items-center gap-1 text-amber-500">
//                     <Star className="h-5 w-5 fill-current" />
//                     <span className="text-lg font-bold">{location.rating}</span>
//                   </div>
//                   <span className="text-sm text-muted-foreground">({location.reviews} reviews)</span>
//                 </div>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {reviews.map((review) => (
//                   <div key={review.id} className="space-y-2">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <Avatar className="h-8 w-8">
//                           <AvatarImage src={review.user.avatar} alt={review.user.name} />
//                           <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
//                         </Avatar>
//                         <div>
//                           <p className="font-medium">{review.user.name}</p>
//                           <p className="text-xs text-muted-foreground">{review.date}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-1 text-amber-500">
//                         {Array.from({ length: 5 }).map((_, i) => (
//                           <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-current" : "text-muted"}`} />
//                         ))}
//                       </div>
//                     </div>
//                     <p className="text-sm">{review.comment}</p>
//                     <Separator />
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="bookings" className="space-y-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>Booking Statistics</CardTitle>
//               <CardDescription>Overview of bookings for this location</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="grid gap-4 sm:grid-cols-3">
//                 <div className="rounded-lg border p-3">
//                   <div className="flex items-center gap-2">
//                     <Calendar className="h-4 w-4 text-muted-foreground" />
//                     <span className="text-sm font-medium">Total Bookings</span>
//                   </div>
//                   <p className="mt-2 text-2xl font-bold">245</p>
//                   <p className="text-xs text-muted-foreground">+12% from last month</p>
//                 </div>
//                 <div className="rounded-lg border p-3">
//                   <div className="flex items-center gap-2">
//                     <Users className="h-4 w-4 text-muted-foreground" />
//                     <span className="text-sm font-medium">Avg. Group Size</span>
//                   </div>
//                   <p className="mt-2 text-2xl font-bold">3.2</p>
//                   <p className="text-xs text-muted-foreground">+0.3 from last month</p>
//                 </div>
//                 <div className="rounded-lg border p-3">
//                   <div className="flex items-center gap-2">
//                     <MessageSquare className="h-4 w-4 text-muted-foreground" />
//                     <span className="text-sm font-medium">Review Rate</span>
//                   </div>
//                   <p className="mt-2 text-2xl font-bold">78%</p>
//                   <p className="text-xs text-muted-foreground">+5% from last month</p>
//                 </div>
//               </div>

//               <div className="mt-6 flex items-center justify-center">
//                 <p className="text-center text-muted-foreground">Detailed booking information will be displayed here</p>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

"use client";

import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react"; // Import Lucide React icon

interface LocationDetailsProps {
  name: string;
  category: string;
  description: string;
  price: number;
  climate: {
    bestTimeToVisit: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
  images: string[];
}

const locationData: LocationDetailsProps = {
  name: "Marvin Travis",
  category: "mountain",
  description: "Voluptates eligendi",
  price: 17,
  climate: {
    bestTimeToVisit: "Asperiores dolorem d",
  },
  location: {
    latitude: 29,
    longitude: 9,
  },
  images: ["https://i.ibb.co/tyzYWy0/ship9.png"],
};

export default function LocationDetailsPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Images</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {locationData.images.map((src, idx) => (
              <div
                key={idx}
                className="relative aspect-video cursor-pointer rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
              >
                <Image
                  src={src}
                  alt={`Location image ${idx + 1}`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Location Title Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold">
            {locationData.name}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground capitalize">
            {locationData.category}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-muted-foreground">
            {locationData.description}
          </p>
        </CardContent>
      </Card>

      {/* Location Info Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Location Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="text-xl text-muted-foreground" />{" "}
            {/* Lucide MapPin icon */}
            <p className="text-sm">
              Latitude: {locationData.location.latitude}, Longitude:{" "}
              {locationData.location.longitude}
            </p>
          </div>
          <div>
            <p className="font-semibold">Best Time to Visit:</p>
            <p>{locationData.climate.bestTimeToVisit}</p>
          </div>
        </CardContent>
      </Card>

      {/* Price Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Price</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <p className="text-lg font-semibold">${locationData.price}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
