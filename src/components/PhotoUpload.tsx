import { useState } from "react";
import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";

interface PhotoUploadProps {
  onPhotoSelect: (file: File) => void;
}

const PhotoUpload = ({ onPhotoSelect }: PhotoUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onPhotoSelect(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <label
        className={cn(
          "flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer",
          "hover:bg-gray-50 transition-colors duration-200",
          preview ? "border-gray-300" : "border-gray-400"
        )}
      >
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handlePhotoChange}
        />
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-contain rounded-lg"
          />
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-4 text-gray-500" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        )}
      </label>
    </div>
  );
};

export default PhotoUpload;