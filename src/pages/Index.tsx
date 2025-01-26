import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import PhotoUpload from "@/components/PhotoUpload";
import LocationDisplay from "@/components/LocationDisplay";
import FormSubmitButton from "@/components/FormSubmitButton";
import type { FormData, LocationData } from "@/types/form";

const CATEGORIES = [
  "Nature",
  "Urban",
  "Architecture",
  "People",
  "Events",
  "Other",
];

const Index = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    photo: null,
    description: "",
    category: "",
    coordinates: {
      latitude: null,
      longitude: null,
    },
    address: "",
  });

  const handlePhotoSelect = (file: File) => {
    setFormData((prev) => ({ ...prev, photo: file }));
  };

  const handleLocationDetection = async () => {
    if (!navigator.geolocation) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Geolocation is not supported by your browser",
      });
      return;
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;

      // Fetch address using reverse geocoding
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();

      setFormData((prev) => ({
        ...prev,
        coordinates: { latitude, longitude },
        address: data.display_name || "Address not found",
      }));

      toast({
        title: "Success",
        description: "Location detected successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to detect location",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Here you would typically send the data to your API
      // const response = await fetch('your-api-endpoint', {
      //   method: 'POST',
      //   body: JSON.stringify(formData),
      // });

      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Success",
        description: "Form submitted successfully",
      });

      // Reset form
      setFormData({
        photo: null,
        description: "",
        category: "",
        coordinates: {
          latitude: null,
          longitude: null,
        },
        address: "",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit form",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">
          Upload Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <PhotoUpload onPhotoSelect={handlePhotoSelect} />

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Enter a description..."
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Category</label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, category: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleLocationDetection}
              className="w-full"
            >
              <MapPin className="mr-2 h-4 w-4" />
              Detect Location
            </Button>

            <LocationDisplay
              location={{
                coordinates: formData.coordinates,
                address: formData.address,
              }}
            />
          </div>

          <FormSubmitButton isLoading={isLoading} />
        </form>
      </div>
    </div>
  );
};

export default Index;