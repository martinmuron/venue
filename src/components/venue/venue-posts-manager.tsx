"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Edit, Trash2, ImageIcon, Video, Calendar, Eye } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

type VenuePost = {
  id: string
  title?: string | null
  content: string
  images: string[]
  videoUrl?: string | null
  status: string
  createdAt: string | Date
  updatedAt: string | Date
}

type Venue = {
  id: string
  name: string
  posts: VenuePost[]
}

type VenuePostsManagerProps = {
  venue: Venue
}

export function VenuePostsManager({ venue }: VenuePostsManagerProps) {
  const router = useRouter()
  const [posts, setPosts] = useState<VenuePost[]>(venue.posts)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<VenuePost | null>(null)
  const [loading, setLoading] = useState(false)
  const [uploadingImages, setUploadingImages] = useState(false)
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    images: [] as string[],
    videoUrl: "",
    status: "published" as "published" | "draft",
  })

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      images: [],
      videoUrl: "",
      status: "published",
    })
    setEditingPost(null)
  }

  const openCreateDialog = () => {
    resetForm()
    setIsDialogOpen(true)
  }

  const openEditDialog = (post: VenuePost) => {
    setFormData({
      title: post.title || "",
      content: post.content,
      images: post.images,
      videoUrl: post.videoUrl || "",
      status: post.status as "published" | "draft",
    })
    setEditingPost(post)
    setIsDialogOpen(true)
  }

  const handleImageUpload = async (files: FileList) => {
    setUploadingImages(true)
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData()
        formData.append("file", file)
        
        const response = await fetch("/api/upload/venue-post-image", {
          method: "POST",
          body: formData,
        })
        
        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || "Upload failed")
        }
        
        const result = await response.json()
        return result.url
      })

      const uploadedUrls = await Promise.all(uploadPromises)
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls].slice(0, 5) // Max 5 images
      }))
    } catch (error) {
      console.error("Error uploading images:", error)
      console.error("Upload error:", error)
    } finally {
      setUploadingImages(false)
    }
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = editingPost 
        ? `/api/venues/${venue.id}/posts/${editingPost.id}`
        : `/api/venues/${venue.id}/posts`
      
      const method = editingPost ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title || undefined,
          content: formData.content,
          images: formData.images,
          videoUrl: formData.videoUrl || undefined,
          status: formData.status,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to save post")
      }

      const savedPost = await response.json()

      if (editingPost) {
        setPosts(prev => prev.map(p => p.id === editingPost.id ? savedPost : p))
      } else {
        setPosts(prev => [savedPost, ...prev])
      }

      setIsDialogOpen(false)
      resetForm()
      router.refresh()
    } catch (error) {
      console.error("Error saving post:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (post: VenuePost) => {
    if (!confirm("Are you sure you want to delete this post?")) return

    try {
      const response = await fetch(`/api/venues/${venue.id}/posts/${post.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete post")
      }

      setPosts(prev => prev.filter(p => p.id !== post.id))
      router.refresh()
    } catch (error) {
      console.error("Error deleting post:", error)
    }
  }

  const formatDate = (dateString: string | Date) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString
    return date.toLocaleDateString("cs-CZ", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">

      {/* Create New Post Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">All Posts ({posts.length})</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Create New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPost ? "Edit Post" : "Create New Post"}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <Label htmlFor="title">Title (Optional)</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter post title..."
                />
              </div>

              {/* Content */}
              <div>
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="What's happening at your venue?"
                  rows={5}
                  required
                />
              </div>

              {/* Images */}
              <div>
                <Label>Images (Max 5)</Label>
                <div className="mt-2">
                  <Input
                    type="file"
                    multiple
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
                    disabled={uploadingImages || formData.images.length >= 5}
                  />
                  {uploadingImages && (
                    <p className="text-sm text-blue-600 mt-1">Uploading images...</p>
                  )}
                  <p className="text-sm text-gray-500 mt-1">
                    Max 5MB per image. Supported: JPEG, PNG, WebP
                  </p>
                </div>
                
                {/* Image Preview */}
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {formData.images.map((url, index) => (
                      <div key={index} className="relative">
                        <Image
                          src={url}
                          alt={`Upload ${index + 1}`}
                          width={100}
                          height={100}
                          className="w-full h-20 object-cover rounded"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                          onClick={() => removeImage(index)}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Video URL */}
              <div>
                <Label htmlFor="videoUrl">Video URL (Optional)</Label>
                <Input
                  id="videoUrl"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
                  placeholder="https://youtube.com/watch?v=..."
                />
                <p className="text-sm text-gray-500 mt-1">
                  Supports YouTube links. Other video links will show as external links.
                </p>
              </div>

              {/* Status */}
              <div>
                <Label>Status</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value: "published" | "draft") => 
                    setFormData(prev => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-2">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading || !formData.content}>
                  {loading ? "Saving..." : editingPost ? "Update Post" : "Create Post"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <div className="text-gray-500">
                <ImageIcon className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No posts yet</h3>
                <p className="mb-4">Create your first post to engage with your audience.</p>
                <Button onClick={openCreateDialog}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Post
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          posts.map((post) => (
            <Card key={post.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {post.title && (
                      <CardTitle className="text-lg mb-2">{post.title}</CardTitle>
                    )}
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      {formatDate(post.createdAt)}
                      <Badge variant={post.status === "published" ? "default" : "secondary"}>
                        {post.status}
                      </Badge>
                      {post.images.length > 0 && (
                        <Badge variant="outline">
                          <ImageIcon className="h-3 w-3 mr-1" />
                          {post.images.length} images
                        </Badge>
                      )}
                      {post.videoUrl && (
                        <Badge variant="outline">
                          <Video className="h-3 w-3 mr-1" />
                          Video
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(post)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(post)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-3 line-clamp-3">
                  {post.content}
                </p>
                
                {/* Image Preview */}
                {post.images.length > 0 && (
                  <div className="grid grid-cols-4 gap-1 mb-3">
                    {post.images.slice(0, 4).map((url, index) => (
                      <div key={index} className="relative">
                        <Image
                          src={url}
                          alt={`Post image ${index + 1}`}
                          width={80}
                          height={60}
                          className="w-full h-15 object-cover rounded"
                        />
                        {index === 3 && post.images.length > 4 && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded text-white text-xs">
                            +{post.images.length - 4}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}