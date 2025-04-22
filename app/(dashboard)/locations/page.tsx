"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Edit,
  Eye,
  Globe,
  MapPin,
  MoreHorizontal,
  Plus,
  Search,
  Star,
  Trash,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

import { useEffect } from "react";
import {
  getAllLocations,
  deleteLocation,
} from "@/lib/services/location-service";

export default function LocationsPage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [deleteLocationId, setDeleteLocationId] = useState<string | null>(null);
  const [locations, setLocations] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const locationsData = await getAllLocations();
      setLocations(locationsData);
    } catch (error) {
      console.error("Error fetching locations:", error);
      toast({
        title: "Error",
        description: "Failed to fetch locations.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredLocations = locations.filter((location) => {
    const matchesSearch = location.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase().trim());

    const matchesCategory =
      categoryFilter === "all" ||
      location.category.toLowerCase() === categoryFilter.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (id: string) => {
    try {
      await deleteLocation(id);
      await fetchLocations();
      toast({
        title: "Location deleted",
        description: "The location has been deleted successfully.",
      });
      setDeleteLocationId(null);
    } catch (error) {
      console.error("Error deleting location:", error);
      toast({
        title: "Error",
        description: "An error occurred while deleting the location.",
        variant: "destructive",
      });
    }
  };

  const handleFeature = (id: string) => {
    toast({
      title: "Location featured",
      description: `Location ${id} has been featured`,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Locations</h1>
        <Button asChild>
          <Link href="/locations/add">
            <Plus className="mr-2 h-4 w-4" />
            Add Location
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Location Management</CardTitle>
          <CardDescription>
            Manage your travel destinations and locations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search locations..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="beach">Beach</SelectItem>
                <SelectItem value="city">City</SelectItem>
                <SelectItem value="island">Island</SelectItem>
                <SelectItem value="mountain">Mountain</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <rect width="7" height="7" x="3" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="14" rx="1" />
                  <rect width="7" height="7" x="3" y="14" rx="1" />
                </svg>
                <span className="sr-only">Grid view</span>
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <line x1="8" x2="21" y1="6" y2="6" />
                  <line x1="8" x2="21" y1="12" y2="12" />
                  <line x1="8" x2="21" y1="18" y2="18" />
                  <line x1="3" x2="3.01" y1="6" y2="6" />
                  <line x1="3" x2="3.01" y1="12" y2="12" />
                  <line x1="3" x2="3.01" y1="18" y2="18" />
                </svg>
                <span className="sr-only">List view</span>
              </Button>
            </div>
          </div>

          {viewMode === "grid" ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredLocations.map((location) => (
                <Card key={location.id} className="overflow-hidden">
                  <div className="relative aspect-video rounded-t-lg overflow-hidden">
                    <img
                      src={location.images?.[0] || "/placeholder.svg"}
                      alt={location.name}
                      width={400}
                      height={200}
                      className="object-cover"
                    />
                    {location.featured && (
                      <Badge className="absolute right-2 top-2 bg-primary">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardHeader className="p-4">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{location.name}</CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="-mt-1 -mr-2"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link href={`/locations/${location.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </Link>
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() => setDeleteLocationId(location.id)}
                          >
                            <Trash className="mr-2 h-4 w-4 text-rose-500" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardDescription className="line-clamp-2 mt-2">
                      {location.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm font-medium">
                          {location.rating}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({location.reviews} reviews)
                        </span>
                      </div>
                      <div className="font-bold">
                        ${location.price.toLocaleString()}
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-xs text-muted-foreground">
                      <MapPin className="mr-1 h-3 w-3" />
                      <span>{location.category}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {filteredLocations.map((location) => (
                <Card key={location.id} className="overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative h-48 w-full sm:h-auto sm:w-48">
                      <img
                        src={location.images?.[0] || "/placeholder.svg"}
                        alt={location.name}
                        className="object-cover"
                      />
                      {location.featured && (
                        <Badge className="absolute right-2 top-2 bg-primary">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col">
                      <CardHeader className="p-4">
                        <div className="flex items-start justify-between">
                          <CardTitle>{location.name}</CardTitle>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="-mt-1 -mr-2"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                onClick={() => handleDelete(location.id)}
                              >
                                <Trash className="mr-2 h-4 w-4 text-rose-500" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <CardDescription className="mt-2">
                          {location.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex flex-1 flex-col justify-end p-4 pt-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-amber-500">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="text-sm font-medium">
                              {location.rating}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              ({location.reviews} reviews)
                            </span>
                          </div>
                          <div className="font-bold">
                            ${location.price.toLocaleString()}
                          </div>
                        </div>
                        <div className="mt-2 flex items-center text-xs text-muted-foreground">
                          <MapPin className="mr-1 h-3 w-3" />
                          <span>{location.category}</span>
                          <Globe className="ml-3 mr-1 h-3 w-3" />
                          <span>{location.id}</span>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog
        open={!!deleteLocationId}
        onOpenChange={() => setDeleteLocationId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              location and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteLocationId && handleDelete(deleteLocationId)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
