"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Mock data for a single location
const locationData = {
  id: "loc-1234",
  name: "Bali, Indonesia",
  description:
    "Experience the beauty of Bali with its stunning beaches, lush rice terraces, and vibrant culture. Bali is a popular tourist destination known for its highly developed arts, including traditional and modern dance, sculpture, painting, leather, metalworking, and music.",
  images: Array(6).fill("/placeholder.svg"),
  price: "1999",
  rating: 4.8,
  reviews: 245,
  category: "Beach",
  featured: true,
  location: {
    address: "Bali, Indonesia",
    latitude: -8.4095,
    longitude: 115.1889,
  },
  climate: {
    bestTimeToVisit: "April to October",
    averageTemperature: "26°C - 33°C",
    rainySeasons: "November to March",
  },
};

import { getLocation, updateLocation } from "@/lib/services/location-service";

export default function EditLocationPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState<any>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const newImages = [...selectedImages];
      newImages[index] = file;
      setSelectedImages(newImages);
    }
  };

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const locationData = await getLocation(params.id as string);
        setLocation(locationData);
      } catch (error) {
        console.error("Error fetching location:", error);
        toast({
          title: "Error",
          description: "Failed to fetch location data.",
          variant: "destructive",
        });
      }
    };

    if (params.id) {
      fetchLocation();
    }
  }, [params.id, toast]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const locationData = {
        name: formData.get("name") as string,
        category: formData.get("category") as string,
        description: formData.get("description") as string,
        price: Number(formData.get("price")),
        climate: {
          bestTimeToVisit: formData.get("bestTimeToVisit") as string,
        },
        location: {
          latitude: Number(formData.get("latitude")),
          longitude: Number(formData.get("longitude")),
        },
      };

      const validImages = selectedImages.filter(Boolean);
      await updateLocation(params.id as string, locationData, validImages);

      toast({
        title: "Location updated",
        description: "The location has been updated successfully.",
      });
      router.push("/locations");
    } catch (error) {
      console.error("Error updating location:", error);
      toast({
        title: "Error",
        description: "An error occurred while updating the location.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Edit Location</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Location Details</CardTitle>
            <CardDescription>
              Update the travel destination details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter location name"
                  required
                  defaultValue={location.name}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select defaultValue={location.category.toLowerCase()} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beach">Beach</SelectItem>
                    <SelectItem value="city">City</SelectItem>
                    <SelectItem value="island">Island</SelectItem>
                    <SelectItem value="mountain">Mountain</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter location description"
                className="min-h-[100px]"
                required
                defaultValue={location.description}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="Enter price"
                  required
                  defaultValue={location.price}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bestTimeToVisit">Best Time to Visit</Label>
                <Input
                  id="bestTimeToVisit"
                  placeholder="e.g., April to October"
                  required
                  defaultValue={location.climate.bestTimeToVisit}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  type="number"
                  step="any"
                  placeholder="Enter latitude"
                  required
                  defaultValue={location.location.latitude}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  type="number"
                  step="any"
                  placeholder="Enter longitude"
                  required
                  defaultValue={location.location.longitude}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Images</Label>
              <div className="grid gap-4 sm:grid-cols-3">
                {Array(3)
                  .fill(null)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="relative aspect-video cursor-pointer rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50"
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        {selectedImages[index] ? (
                          <div className="relative h-full w-full">
                            <img
                              src={
                                selectedImages[index]
                                  ? URL.createObjectURL(selectedImages[index])
                                  : ""
                              }
                              alt={`Preview ${index + 1}`}
                              className="object-cover rounded-lg"
                            />
                          </div>
                        ) : location?.images?.[index] ? (
                          <div className="relative h-full w-full">
                            <img
                              src={location.images[index]}
                              alt={`Location ${index + 1}`}
                              className="object-cover rounded-lg"
                            />
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-1">
                            <Upload className="h-8 w-8 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              Upload Image
                            </span>
                          </div>
                        )}
                      </div>
                      <input
                        type="file"
                        className="absolute inset-0 opacity-0"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, index)}
                      />
                    </div>
                  ))}
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && (
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                )}
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
