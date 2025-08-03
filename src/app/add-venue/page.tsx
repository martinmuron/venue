"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { VENUE_TYPES } from "@/types"
import { 
  Upload, 
  X, 
  MapPin, 
  Users, 
  Euro, 
  Palette, 
  Phone, 
  Mail, 
  Globe, 
  Video,
  Plus,
  Minus,
  CheckCircle,
  AlertCircle
} from "lucide-react"

const venueFormSchema = z.object({
  // Account fields
  userName: z.string().min(2, "Name must have at least 2 characters"),
  userEmail: z.string().email("Invalid email"),
  userPassword: z.string().min(6, "Password must have at least 6 characters"),
  userPhone: z.string().optional(),
  
  // Venue fields
  name: z.string().min(2, "Name must have at least 2 characters"),
  description: z.string().optional(),
  address: z.string().min(5, "Address must have at least 5 characters"),
  capacitySeated: z.string().optional(),
  capacityStanding: z.string().optional(),
  venueType: z.string().optional(),
  contactEmail: z.string().email("Invalid email").optional().or(z.literal("")),
  contactPhone: z.string().optional(),
  websiteUrl: z.string().optional(),
  videoUrl: z.string().optional(),
})

type VenueFormData = z.infer<typeof venueFormSchema>

const AMENITIES_OPTIONS = [
  "WiFi",
  "Parking",
  "Air Conditioning",
  "Multimedia Equipment",
  "Catering Options",
  "Bar",
  "Terrace",
  "Elevator",
  "Wheelchair Access",
  "Sound System",
  "Stage/Podium",
  "Projectors",
  "Security System",
  "Cloakroom",
  "Kitchen"
]

function isValidYouTubeUrl(url: string): boolean {
  if (!url) return true // Optional field
  const patterns = [
    /^https?:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]+/,
    /^https?:\/\/(www\.)?youtu\.be\/[\w-]+/,
    /^https?:\/\/(www\.)?youtube\.com\/embed\/[\w-]+/
  ]
  return patterns.some(pattern => pattern.test(url))
}

export default function AddVenuePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [images, setImages] = useState<File[]>([])
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [amenities, setAmenities] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<VenueFormData>({
    resolver: zodResolver(venueFormSchema),
  })

  const videoUrl = watch("videoUrl")
  const isYouTubeUrlValid = isValidYouTubeUrl(videoUrl || "")

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    
    if (images.length + files.length > 10) {
      alert("You can upload a maximum of 10 images")
      return
    }

    // Check file sizes (max 5MB per image)
    const oversizedFiles = files.filter(file => file.size > 5 * 1024 * 1024)
    if (oversizedFiles.length > 0) {
      alert("Some images are larger than 5MB. Please resize them.")
      return
    }

    // Check file types
    const invalidFiles = files.filter(file => !file.type.startsWith('image/'))
    if (invalidFiles.length > 0) {
      alert("You can only upload images")
      return
    }

    const newImages = [...images, ...files]
    setImages(newImages)

    // Create preview URLs
    const newUrls = files.map(file => URL.createObjectURL(file))
    setImageUrls(prev => [...prev, ...newUrls])
  }

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    const newUrls = imageUrls.filter((_, i) => i !== index)
    
    // Revoke the URL to prevent memory leaks
    URL.revokeObjectURL(imageUrls[index])
    
    setImages(newImages)
    setImageUrls(newUrls)
  }

  const toggleAmenity = (amenity: string) => {
    setAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    )
  }

  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result)
        } else {
          reject(new Error('Failed to convert image to base64'))
        }
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const uploadImages = async (): Promise<string[]> => {
    if (images.length === 0) return []

    try {
      // Convert images to base64 for storage
      // In production, you'd want to upload to a proper image service
      const base64Images = await Promise.all(
        images.map(file => convertImageToBase64(file))
      )
      return base64Images
    } catch (error) {
      console.error('Error converting images:', error)
      // Fallback to placeholder URLs
      return images.map((_, index) => 
        `https://images.unsplash.com/photo-${Date.now() + index}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`
      )
    }
  }

  const onSubmit = async (data: VenueFormData) => {
    if (data.videoUrl && !isYouTubeUrlValid) {
      alert("Please enter a valid YouTube URL")
      return
    }

    setIsSubmitting(true)
    
    try {
      // Upload images first
      const uploadedImageUrls = await uploadImages()

      // Prepare data for API
      const submitData = {
        // Account data
        userName: data.userName,
        userEmail: data.userEmail,
        userPassword: data.userPassword,
        userPhone: data.userPhone,
        
        // Venue data
        name: data.name,
        description: data.description,
        address: data.address,
        capacitySeated: data.capacitySeated ? parseInt(data.capacitySeated) : undefined,
        capacityStanding: data.capacityStanding ? parseInt(data.capacityStanding) : undefined,
        venueType: data.venueType,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone,
        websiteUrl: data.websiteUrl,
        videoUrl: data.videoUrl,
        amenities,
        images: uploadedImageUrls,
      }

      const response = await fetch("/api/venues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      })

      const result = await response.json()

      if (response.ok) {
        // Show success message
        alert(`Congratulations! Your account and venue "${data.name}" have been successfully created. You can now log in and manage your venue.`)
        
        // Redirect to login page with success message
        router.push(`/login?message=account-created&venue=${encodeURIComponent(data.name)}`)
      } else {
        throw new Error(result.error || "Error creating account and venue")
      }
    } catch (error) {
      console.error("Error creating account and venue:", error)
      alert("An error occurred while creating the account and venue. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-title-1 text-black mb-3 sm:mb-2 leading-tight">
            Add a venue on Venue
          </h1>
          <p className="text-base sm:text-body text-gray-600 leading-relaxed">
            Create an account and add your event space. Become part of the largest platform 
            for event spaces in the city and start accepting bookings today.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mt-4">
            <p className="text-sm sm:text-callout text-blue-800">
              💡 <strong>Tip:</strong> By filling out this form, you will create an account and add a space at the same time. 
              After submitting, you will be able to log in and manage your space.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
          {/* Account Creation */}
          <Card>
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Users className="h-5 w-5 flex-shrink-0" />
                Create account
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-4 pt-0">
              <div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0">
                <div>
                  <label className="block text-sm sm:text-callout font-medium text-black mb-2">
                    Your name *
                  </label>
                  <Input
                    {...register("userName")}
                    placeholder="John Doe"
                    className="h-11 sm:h-12"
                  />
                  {errors.userName && (
                    <p className="text-xs sm:text-caption text-red-600 mt-1">{errors.userName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm sm:text-callout font-medium text-black mb-2">
                    Your phone
                  </label>
                  <Input
                    type="tel"
                    {...register("userPhone")}
                    placeholder="+420 123 456 789"
                    className="h-11 sm:h-12"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm sm:text-callout font-medium text-black mb-2">
                  Your e-mail *
                </label>
                <Input
                  type="email"
                  {...register("userEmail")}
                  placeholder="john@email.com"
                  className="h-11 sm:h-12"
                />
                {errors.userEmail && (
                  <p className="text-xs sm:text-caption text-red-600 mt-1">{errors.userEmail.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm sm:text-callout font-medium text-black mb-2">
                  Password *
                </label>
                <Input
                  type="password"
                  {...register("userPassword")}
                  placeholder="At least 6 characters"
                  className="h-11 sm:h-12"
                />
                {errors.userPassword && (
                  <p className="text-xs sm:text-caption text-red-600 mt-1">{errors.userPassword.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <MapPin className="h-5 w-5 flex-shrink-0" />
                Basic information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div>
                <label className="block text-sm sm:text-callout font-medium text-black mb-2">
                  Venue name *
                </label>
                <Input
                  {...register("name")}
                  placeholder="Name of your venue"
                  className="h-11 sm:h-12"
                />
                {errors.name && (
                  <p className="text-xs sm:text-caption text-red-600 mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm sm:text-callout font-medium text-black mb-2">
                  Venue description
                </label>
                <Textarea
                  {...register("description")}
                  placeholder="Describe your space, its atmosphere and possibilities of use..."
                  rows={4}
                  className="min-h-[88px] sm:min-h-[96px] resize-y"
                />
                <p className="text-xs sm:text-caption text-gray-500 mt-1">
                  A good description will help clients better understand if your space is suitable for their event.
                </p>
              </div>

              <div>
                <label className="block text-sm sm:text-callout font-medium text-black mb-2">
                  Address *
                </label>
                <Input
                  {...register("address")}
                  placeholder="Street number, City"
                  className="h-11 sm:h-12"
                />
                {errors.address && (
                  <p className="text-xs sm:text-caption text-red-600 mt-1">{errors.address.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm sm:text-callout font-medium text-black mb-2">
                  Venue type
                </label>
                <Select onValueChange={(value) => setValue("venueType", value)} defaultValue="">
                  <SelectTrigger className="h-11 sm:h-12">
                    <SelectValue placeholder="Select venue type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(VENUE_TYPES).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Capacity */}
          <Card>
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Users className="h-5 w-5 flex-shrink-0" />
                Capacity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0">
                <div>
                  <label className="block text-sm sm:text-callout font-medium text-black mb-2">
                    Capacity (seated)
                  </label>
                  <Input
                    type="number"
                    {...register("capacitySeated")}
                    placeholder="50"
                    min="1"
                    className="h-11 sm:h-12"
                  />
                </div>

                <div>
                  <label className="block text-sm sm:text-callout font-medium text-black mb-2">
                    Capacity (standing)
                  </label>
                  <Input
                    type="number"
                    {...register("capacityStanding")}
                    placeholder="100"
                    min="1"
                    className="h-11 sm:h-12"
                  />
                </div>
              </div>


            </CardContent>
          </Card>

          {/* Amenities */}
          <Card>
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Palette className="h-5 w-5 flex-shrink-0" />
                Amenities and services
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm sm:text-body text-gray-600 mb-4">
                Select the amenities and services your space offers:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
                {AMENITIES_OPTIONS.map((amenity) => (
                  <label
                    key={amenity}
                    className={`flex items-center gap-2 p-3 sm:p-3 rounded-lg border cursor-pointer transition-colors min-h-[44px] sm:min-h-[48px] ${
                      amenities.includes(amenity)
                        ? "border-black bg-gray-50"
                        : "border-gray-200 hover:border-gray-300 active:border-gray-400"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={amenities.includes(amenity)}
                      onChange={() => toggleAmenity(amenity)}
                      className="sr-only"
                    />
                    <span className="text-sm sm:text-callout leading-tight">{amenity}</span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Phone className="h-5 w-5 flex-shrink-0" />
                Contact information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0">
                <div>
                  <label className="block text-sm sm:text-callout font-medium text-black mb-2">
                    E-mail
                  </label>
                  <Input
                    type="email"
                    {...register("contactEmail")}
                    placeholder="info@venue.com"
                    className="h-11 sm:h-12"
                  />
                  {errors.contactEmail && (
                    <p className="text-xs sm:text-caption text-red-600 mt-1">{errors.contactEmail.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm sm:text-callout font-medium text-black mb-2">
                    Phone
                  </label>
                  <Input
                    type="tel"
                    {...register("contactPhone")}
                    placeholder="+420 123 456 789"
                    className="h-11 sm:h-12"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm sm:text-callout font-medium text-black mb-2">
                  Website
                </label>
                <Input
                  type="url"
                  {...register("websiteUrl")}
                  placeholder="https://www.venue.com"
                  className="h-11 sm:h-12"
                />
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Upload className="h-5 w-5 flex-shrink-0" />
                Photos (max. 10)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center min-h-[120px] sm:min-h-[140px] flex items-center justify-center">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                    disabled={images.length >= 10}
                  />
                  <label
                    htmlFor="image-upload"
                    className={`cursor-pointer w-full ${images.length >= 10 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <Upload className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm sm:text-body text-gray-600 mb-1">
                      {images.length >= 10 
                        ? "You have reached the maximum number of images (10)"
                        : "Click to select images"
                      }
                    </p>
                    <p className="text-xs sm:text-caption text-gray-500">
                      Max. 5MB per image • JPG, PNG, WEBP
                    </p>
                  </label>
                </div>

                {imageUrls.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-sm sm:text-callout font-medium text-black">
                      Image preview ({imageUrls.length}/10):
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                      {imageUrls.map((url, index) => (
                        <div key={index} className="relative">
                          <img
                            src={url}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 sm:h-32 object-cover rounded-lg border border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors min-h-[28px] min-w-[28px] sm:min-h-[32px] sm:min-w-[32px] flex items-center justify-center"
                            aria-label={`Remove image ${index + 1}`}
                          >
                            <X className="h-3 w-3 sm:h-4 sm:w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Video */}
          <Card>
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Video className="h-5 w-5 flex-shrink-0" />
                Video (YouTube)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div>
                <label className="block text-sm sm:text-callout font-medium text-black mb-2">
                  YouTube URL
                </label>
                <div className="relative">
                  <Input
                    {...register("videoUrl")}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="h-11 sm:h-12 pr-10"
                  />
                  {videoUrl && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {isYouTubeUrlValid ? (
                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                      )}
                    </div>
                  )}
                </div>
                <p className="text-xs sm:text-caption text-gray-500 mt-1 leading-relaxed">
                  Add a YouTube video to better present your space. 
                  Supported formats: youtube.com/watch?v=..., youtu.be/..., youtube.com/embed/...
                </p>
                {videoUrl && !isYouTubeUrlValid && (
                  <p className="text-xs sm:text-caption text-red-600 mt-1">
                    Invalid YouTube URL. Please check the format.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.back()}
              disabled={isSubmitting}
              className="w-full sm:w-auto order-2 sm:order-1 min-h-[44px] sm:min-h-[48px]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:flex-1 order-1 sm:order-2 min-h-[44px] sm:min-h-[48px]"
            >
              {isSubmitting ? "Creating account and venue..." : "Create account and add venue"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
} 