"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Play } from "lucide-react"
import Image from "next/image"

type VenuePost = {
  id: string
  title?: string
  content: string
  images: string[]
  videoUrl?: string
  createdAt: string
}

type VenuePostsProps = {
  venueId: string
  venueName: string
}

export function VenuePosts({ venueId, venueName }: VenuePostsProps) {
  const [posts, setPosts] = useState<VenuePost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/venues/${venueId}/posts`)
        if (response.ok) {
          const data = await response.json()
          setPosts(data)
        }
      } catch (error) {
        console.error("Error fetching posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [venueId])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getVideoThumbnail = (videoUrl: string) => {
    // Extract YouTube video ID from URL
    const match = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
    if (match) {
      return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`
    }
    return null
  }

  if (loading) {
    return (
      <div className="mt-8">
        <h2 className="text-title-3 text-black mb-4">Recent Updates</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (posts.length === 0) {
    return null
  }

  return (
    <div className="mt-8">
      <h2 className="text-title-3 text-black mb-4">Recent Updates</h2>
      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="text-sm bg-blue-100 text-blue-700">
                    {venueName[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-gray-900">{venueName}</div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(post.createdAt)}
                  </div>
                </div>
              </div>
              {post.title && (
                <h3 className="text-lg font-semibold text-gray-900 mt-3">
                  {post.title}
                </h3>
              )}
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {post.content}
                </p>
              </div>

              {/* Images */}
              {post.images.length > 0 && (
                <div className="mb-4">
                  {post.images.length === 1 ? (
                    <div className="relative w-full h-64 rounded-lg overflow-hidden">
                      <Image
                        src={post.images[0]}
                        alt="Post image"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      {post.images.slice(0, 4).map((image, index) => (
                        <div key={index} className="relative h-32 rounded-lg overflow-hidden">
                          <Image
                            src={image}
                            alt={`Post image ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                          {index === 3 && post.images.length > 4 && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                              <span className="text-white font-medium">
                                +{post.images.length - 4} more
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Video */}
              {post.videoUrl && (
                <div className="mb-4">
                  <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-gray-100">
                    {post.videoUrl.includes("youtube.com") || post.videoUrl.includes("youtu.be") ? (
                      <iframe
                        src={post.videoUrl.replace("watch?v=", "embed/")}
                        title="Post video"
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <div className="text-center">
                          <Play className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                          <a
                            href={post.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Watch Video
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}