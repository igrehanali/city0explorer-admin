"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";
import Image from "next/image";

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
import { addLocation } from "@/lib/services/location-service";

export default function AddLocationPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
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
      console.log(locationData);
      await addLocation(locationData, validImages);

      toast({
        title: "Location added",
        description: "The location has been added successfully.",
      });
      router.push("/locations");
    } catch (error) {
      console.error("Error adding location:", error);
      toast({
        title: "Error",
        description: "An error occurred while adding the location.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Add Location</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Location Details</CardTitle>
            <CardDescription>
              Add a new travel destination to your platform
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
                  name="name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select name="category" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beach">Beach</SelectItem>
                    <SelectItem value="city">City</SelectItem>
                    <SelectItem value="island">Island</SelectItem>
                    <SelectItem value="mountain">Mountain</SelectItem>
                    <SelectItem value="Places">Places</SelectItem>
                    <SelectItem value="Hotels">Hotels</SelectItem>
                    <SelectItem value="restaurant ">restaurant </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter location description"
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  name="price"
                  placeholder="Enter price"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bestTimeToVisit">Best Time to Visit</Label>
                <Input
                  id="bestTimeToVisit"
                  name="bestTimeToVisit"
                  placeholder="e.g., April to October"
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  type="number"
                  name="latitude"
                  step="any"
                  placeholder="Enter latitude"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  type="number"
                  name="longitude"
                  step="any"
                  placeholder="Enter longitude"
                  required
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
                            <Image
                              src={URL.createObjectURL(selectedImages[index])}
                              alt={`Preview ${index + 1}`}
                              fill
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
                Add Location
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
