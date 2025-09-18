"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Play,
  Headphones,
  Download,
  Search,
  ArrowLeft,
  Clock,
  Star,
  Heart,
  Brain,
  Zap,
  Shield,
  Users,
} from "lucide-react"
import Link from "next/link"

interface Resource {
  id: string
  title: string
  description: string
  type: "video" | "audio" | "guide" | "worksheet"
  category: string
  duration?: string
  language: string[]
  rating: number
  downloads: number
  tags: string[]
  thumbnail?: string
}

const RESOURCES: Resource[] = [
  {
    id: "1",
    title: "Breathing Techniques for Anxiety",
    description: "Learn simple breathing exercises to manage anxiety and panic attacks in real-time.",
    type: "video",
    category: "Anxiety Management",
    duration: "8 min",
    language: ["English", "Hindi", "Marathi"],
    rating: 4.8,
    downloads: 1250,
    tags: ["anxiety", "breathing", "quick-relief"],
  },
  {
    id: "2",
    title: "Progressive Muscle Relaxation",
    description: "Guided audio session to release physical tension and promote deep relaxation.",
    type: "audio",
    category: "Stress Relief",
    duration: "15 min",
    language: ["English", "Tamil", "Telugu"],
    rating: 4.9,
    downloads: 890,
    tags: ["relaxation", "sleep", "tension"],
  },
  {
    id: "3",
    title: "Understanding Depression: A Student's Guide",
    description: "Comprehensive guide covering symptoms, causes, and coping strategies for depression.",
    type: "guide",
    category: "Depression Support",
    language: ["English", "Hindi", "Bengali"],
    rating: 4.7,
    downloads: 2100,
    tags: ["depression", "education", "coping"],
  },
  {
    id: "4",
    title: "Daily Mood Tracker",
    description: "Printable worksheet to track your mood patterns and identify triggers.",
    type: "worksheet",
    category: "Self-Monitoring",
    language: ["English", "Gujarati", "Punjabi"],
    rating: 4.6,
    downloads: 1680,
    tags: ["mood", "tracking", "self-awareness"],
  },
  {
    id: "5",
    title: "Mindfulness Meditation for Students",
    description: "10-minute guided meditation specifically designed for busy college students.",
    type: "audio",
    category: "Mindfulness",
    duration: "10 min",
    language: ["English", "Hindi", "Kannada"],
    rating: 4.8,
    downloads: 1420,
    tags: ["mindfulness", "meditation", "focus"],
  },
  {
    id: "6",
    title: "Managing Academic Stress",
    description: "Practical strategies for handling exam pressure and academic expectations.",
    type: "video",
    category: "Academic Support",
    duration: "12 min",
    language: ["English", "Hindi", "Malayalam"],
    rating: 4.9,
    downloads: 1890,
    tags: ["academic", "stress", "exams"],
  },
]

const CATEGORIES = [
  "All",
  "Anxiety Management",
  "Stress Relief",
  "Depression Support",
  "Academic Support",
  "Mindfulness",
  "Self-Monitoring",
]

const LANGUAGES = [
  "All Languages",
  "English",
  "Hindi",
  "Marathi",
  "Tamil",
  "Telugu",
  "Bengali",
  "Gujarati",
  "Punjabi",
  "Kannada",
  "Malayalam",
]

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedLanguage, setSelectedLanguage] = useState("All Languages")
  const [selectedType, setSelectedType] = useState("all")

  const filteredResources = RESOURCES.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "All" || resource.category === selectedCategory
    const matchesLanguage = selectedLanguage === "All Languages" || resource.language.includes(selectedLanguage)
    const matchesType = selectedType === "all" || resource.type === selectedType

    return matchesSearch && matchesCategory && matchesLanguage && matchesType
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="w-4 h-4" />
      case "audio":
        return <Headphones className="w-4 h-4" />
      case "guide":
        return <BookOpen className="w-4 h-4" />
      case "worksheet":
        return <Download className="w-4 h-4" />
      default:
        return <BookOpen className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "video":
        return "bg-blue-100 text-blue-800"
      case "audio":
        return "bg-green-100 text-green-800"
      case "guide":
        return "bg-purple-100 text-purple-800"
      case "worksheet":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
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
                  <BookOpen className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="font-semibold">Resource Hub</h1>
                  <p className="text-xs text-muted-foreground">Mental Health Resources • Multi-Language</p>
                </div>
              </div>
            </div>
            <Badge variant="secondary">{filteredResources.length} Resources Available</Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Mental Health Resources</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Access evidence-based resources, guided exercises, and educational materials available in multiple regional
            languages
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Play className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-sm font-medium">Video Guides</p>
              <p className="text-xs text-muted-foreground">Interactive Learning</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Headphones className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-sm font-medium">Audio Sessions</p>
              <p className="text-xs text-muted-foreground">Guided Relaxation</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-sm font-medium">Written Guides</p>
              <p className="text-xs text-muted-foreground">In-Depth Information</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Download className="w-6 h-6 text-orange-600" />
              </div>
              <p className="text-sm font-medium">Worksheets</p>
              <p className="text-xs text-muted-foreground">Practical Tools</p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search resources, topics, or techniques..."
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
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-3 py-2 border border-input rounded-md bg-background text-sm"
              >
                {LANGUAGES.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Type Tabs */}
          <Tabs value={selectedType} onValueChange={setSelectedType} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All Types</TabsTrigger>
              <TabsTrigger value="video">Videos</TabsTrigger>
              <TabsTrigger value="audio">Audio</TabsTrigger>
              <TabsTrigger value="guide">Guides</TabsTrigger>
              <TabsTrigger value="worksheet">Worksheets</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredResources.map((resource) => (
            <Card key={resource.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge className={`${getTypeColor(resource.type)} flex items-center gap-1`}>
                    {getTypeIcon(resource.type)}
                    {resource.type}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    {resource.rating}
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
                <CardDescription className="text-sm">{resource.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium">{resource.category}</span>
                  </div>

                  {resource.duration && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Duration</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span className="font-medium">{resource.duration}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Languages</span>
                    <span className="font-medium text-xs">
                      {resource.language.slice(0, 2).join(", ")}
                      {resource.language.length > 2 ? "..." : ""}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Downloads</span>
                    <span className="font-medium">{resource.downloads.toLocaleString()}</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {resource.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button className="w-full mt-4">
                    {resource.type === "video"
                      ? "Watch Now"
                      : resource.type === "audio"
                        ? "Listen Now"
                        : resource.type === "worksheet"
                          ? "Download"
                          : "Read Now"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No resources found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All")
                setSelectedLanguage("All Languages")
                setSelectedType("all")
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Featured Categories */}
        <section className="mt-16">
          <h3 className="text-2xl font-bold mb-8 text-center">Popular Categories</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle className="text-lg">Anxiety Support</CardTitle>
                <CardDescription>Breathing techniques, grounding exercises, and coping strategies</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Depression Help</CardTitle>
                <CardDescription>Understanding symptoms, building resilience, and finding hope</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">Stress Management</CardTitle>
                <CardDescription>Academic pressure, time management, and relaxation techniques</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Social Support</CardTitle>
                <CardDescription>Building connections, communication skills, and peer relationships</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Emergency Resources */}
        <section className="mt-16 bg-destructive/5 rounded-lg p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-destructive" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Need Immediate Help?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              If you're experiencing a mental health crisis or having thoughts of self-harm, please reach out for
              immediate professional support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="destructive" size="lg">
                Crisis Helpline: 1-800-273-8255
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/chat">Chat with AI Support</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/booking">Book Emergency Session</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
