"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  MessageSquare,
  Heart,
  ArrowLeft,
  Plus,
  Search,
  Filter,
  Clock,
  Shield,
  Star,
  ThumbsUp,
  MessageCircle,
  Eye,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"

interface Post {
  id: string
  title: string
  content: string
  author: {
    name: string
    avatar?: string
    isVolunteer: boolean
    joinedDate: string
  }
  category: string
  tags: string[]
  timestamp: Date
  likes: number
  replies: number
  views: number
  isAnonymous: boolean
  isModerated: boolean
}

interface SupportGroup {
  id: string
  name: string
  description: string
  memberCount: number
  category: string
  isPrivate: boolean
  moderator: string
  lastActivity: Date
}

const SAMPLE_POSTS: Post[] = [
  {
    id: "1",
    title: "Dealing with exam anxiety - what works for you?",
    content:
      "I've been struggling with severe anxiety during exams. My heart races, I can't focus, and sometimes I blank out completely. Has anyone found techniques that actually help? I've tried breathing exercises but they don't seem to work when I'm really panicked.",
    author: {
      name: "Anonymous Student",
      isVolunteer: false,
      joinedDate: "2024-01-15",
    },
    category: "Academic Stress",
    tags: ["anxiety", "exams", "coping-strategies"],
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    likes: 12,
    replies: 8,
    views: 45,
    isAnonymous: true,
    isModerated: true,
  },
  {
    id: "2",
    title: "Feeling isolated in college - anyone else?",
    content:
      "I'm in my second year but still feel like I don't belong here. Everyone seems to have their friend groups already formed. I try to join activities but I always feel like an outsider. Sometimes I wonder if I should just transfer.",
    author: {
      name: "Priya M.",
      avatar: "/diverse-students-studying.png",
      isVolunteer: false,
      joinedDate: "2023-09-10",
    },
    category: "Social Connection",
    tags: ["loneliness", "friendship", "belonging"],
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    likes: 18,
    replies: 15,
    views: 67,
    isAnonymous: false,
    isModerated: true,
  },
  {
    id: "3",
    title: "Tips for managing depression during semester",
    content:
      "As someone who's been through multiple depressive episodes during college, I wanted to share what's helped me. Remember, these are just my experiences - please seek professional help if you need it.",
    author: {
      name: "Rahul K.",
      avatar: "/volunteer-community-garden.png",
      isVolunteer: true,
      joinedDate: "2022-03-20",
    },
    category: "Depression Support",
    tags: ["depression", "self-care", "tips"],
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    likes: 34,
    replies: 22,
    views: 128,
    isAnonymous: false,
    isModerated: true,
  },
]

const SUPPORT_GROUPS: SupportGroup[] = [
  {
    id: "1",
    name: "Anxiety Support Circle",
    description:
      "A safe space for students dealing with anxiety disorders. Share experiences, coping strategies, and support each other.",
    memberCount: 156,
    category: "Anxiety",
    isPrivate: false,
    moderator: "Dr. Sarah Chen",
    lastActivity: new Date(Date.now() - 30 * 60 * 1000),
  },
  {
    id: "2",
    name: "Academic Stress Warriors",
    description: "For students struggling with academic pressure, perfectionism, and study-related stress.",
    memberCount: 203,
    category: "Academic",
    isPrivate: false,
    moderator: "Prof. Amit Sharma",
    lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "3",
    name: "International Students Connect",
    description: "Support group for international students dealing with cultural adjustment and homesickness.",
    memberCount: 89,
    category: "Cultural",
    isPrivate: true,
    moderator: "Maya Patel",
    lastActivity: new Date(Date.now() - 4 * 60 * 60 * 1000),
  },
]

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("discussions")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showNewPostForm, setShowNewPostForm] = useState(false)
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "",
    isAnonymous: false,
  })

  const categories = ["All", "Academic Stress", "Social Connection", "Depression Support", "Anxiety", "General"]

  const filteredPosts = SAMPLE_POSTS.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  const handleNewPost = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle new post submission
    setShowNewPostForm(false)
    setNewPost({ title: "", content: "", category: "", isAnonymous: false })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="font-semibold">Peer Support Community</h1>
                  <p className="text-xs text-muted-foreground">Moderated • Safe Space • Anonymous Options</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                248 Online
              </Badge>
              <Button size="sm" onClick={() => setShowNewPostForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Community Guidelines Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-900 mb-1">Community Guidelines</h3>
              <p className="text-sm text-blue-800">
                This is a safe, moderated space. Be respectful, supportive, and remember that everyone's experience is
                valid. Trained volunteers and mental health professionals monitor discussions.
              </p>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="groups">Support Groups</TabsTrigger>
            <TabsTrigger value="resources">Peer Resources</TabsTrigger>
          </TabsList>

          {/* Discussions Tab */}
          <TabsContent value="discussions" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search discussions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-input rounded-md bg-background text-sm"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            {/* New Post Form */}
            {showNewPostForm && (
              <Card>
                <CardHeader>
                  <CardTitle>Share Your Experience</CardTitle>
                  <CardDescription>
                    Your post will be reviewed by moderators before being published to ensure a safe environment.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleNewPost} className="space-y-4">
                    <div>
                      <Input
                        placeholder="Post title..."
                        value={newPost.title}
                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Textarea
                        placeholder="Share your thoughts, experiences, or questions..."
                        value={newPost.content}
                        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                        rows={4}
                        required
                      />
                    </div>
                    <div className="flex gap-4">
                      <select
                        value={newPost.category}
                        onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                        className="px-3 py-2 border border-input rounded-md bg-background text-sm"
                        required
                      >
                        <option value="">Select category...</option>
                        {categories.slice(1).map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={newPost.isAnonymous}
                          onChange={(e) => setNewPost({ ...newPost, isAnonymous: e.target.checked })}
                        />
                        <span className="text-sm">Post anonymously</span>
                      </label>
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit">Post</Button>
                      <Button type="button" variant="outline" onClick={() => setShowNewPostForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Discussion Posts */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {post.isAnonymous
                              ? "?"
                              : post.author.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{post.isAnonymous ? "Anonymous" : post.author.name}</h3>
                            {post.author.isVolunteer && (
                              <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                                <Star className="w-3 h-3 mr-1" />
                                Volunteer
                              </Badge>
                            )}
                            {post.isModerated && (
                              <Badge variant="outline" className="text-xs">
                                <Shield className="w-3 h-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {getTimeAgo(post.timestamp)}
                            <Badge variant="outline" className="text-xs">
                              {post.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-lg mt-3">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-3">{post.content}</p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          {post.likes}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {post.replies}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {post.views}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Heart className="w-4 h-4 mr-1" />
                          Support
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Reply
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Support Groups Tab */}
          <TabsContent value="groups" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Support Groups</h2>
              <p className="text-muted-foreground">
                Join moderated groups focused on specific mental health topics and connect with peers who understand.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SUPPORT_GROUPS.map((group) => (
                <Card key={group.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      {group.isPrivate && (
                        <Badge variant="outline" className="text-xs">
                          <Shield className="w-3 h-3 mr-1" />
                          Private
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{group.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Members</span>
                        <span className="font-medium">{group.memberCount}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Moderator</span>
                        <span className="font-medium">{group.moderator}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Last Activity</span>
                        <span className="font-medium">{getTimeAgo(group.lastActivity)}</span>
                      </div>
                      <Badge variant="secondary" className="w-fit">
                        {group.category}
                      </Badge>
                      <Button className="w-full mt-4">{group.isPrivate ? "Request to Join" : "Join Group"}</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Peer Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Peer-Created Resources</h2>
              <p className="text-muted-foreground">
                Resources, tips, and guides created by fellow students and peer volunteers.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Study Break Activities</CardTitle>
                  <CardDescription>Quick 5-minute activities to reset your mind during study sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary">Student Tips</Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      4.8
                    </div>
                  </div>
                  <Button className="w-full">View Resource</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Dorm Room Meditation</CardTitle>
                  <CardDescription>Simple meditation techniques you can do in small spaces</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary">Peer Guide</Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      4.9
                    </div>
                  </div>
                  <Button className="w-full">View Resource</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Budget-Friendly Self-Care</CardTitle>
                  <CardDescription>Self-care ideas that don't break a student budget</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary">Community Created</Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      4.7
                    </div>
                  </div>
                  <Button className="w-full">View Resource</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Crisis Support Banner */}
        <div className="mt-12 bg-destructive/5 border border-destructive/20 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-destructive mt-1" />
            <div>
              <h3 className="font-medium text-destructive mb-2">Need Immediate Support?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                If you're in crisis or having thoughts of self-harm, please reach out for professional help immediately.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="destructive" size="sm">
                  Crisis Helpline: 1-800-273-8255
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/chat">Chat with AI Support</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/booking">Book Emergency Session</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
