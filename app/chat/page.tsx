"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Brain, Send, Bot, User, AlertTriangle, Phone, Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  severity?: "low" | "medium" | "high" | "crisis"
  suggestions?: string[]
}

const CRISIS_KEYWORDS = ["suicide", "kill myself", "end it all", "hurt myself", "self harm"]
const HIGH_SEVERITY_KEYWORDS = ["panic", "anxiety attack", "can't breathe", "overwhelming", "breakdown"]
const MEDIUM_SEVERITY_KEYWORDS = ["stressed", "anxious", "depressed", "worried", "sad"]

const AI_RESPONSES = {
  crisis: {
    message:
      "I'm very concerned about what you're sharing. Your safety is the most important thing right now. Please reach out to a crisis counselor immediately.",
    suggestions: ["Call Crisis Helpline: 1-800-273-8255", "Contact Campus Emergency: 911", "Reach Campus Counselor"],
  },
  high: {
    message:
      "It sounds like you're going through a really difficult time. These feelings can be overwhelming, but you don't have to face them alone.",
    suggestions: ["Try breathing exercises", "Book counseling session", "Connect with peer support"],
  },
  medium: {
    message:
      "I understand you're feeling stressed. These are common experiences for students, and there are effective ways to manage these feelings.",
    suggestions: ["Explore relaxation techniques", "Check wellness resources", "Consider talking to someone"],
  },
  low: {
    message: "Thank you for sharing. It's great that you're being proactive about your mental health.",
    suggestions: ["Browse wellness tips", "Join peer discussions", "Set up regular check-ins"],
  },
}

function analyzeSeverity(message: string): "low" | "medium" | "high" | "crisis" {
  const lowerMessage = message.toLowerCase()

  if (CRISIS_KEYWORDS.some((keyword) => lowerMessage.includes(keyword))) {
    return "crisis"
  }
  if (HIGH_SEVERITY_KEYWORDS.some((keyword) => lowerMessage.includes(keyword))) {
    return "high"
  }
  if (MEDIUM_SEVERITY_KEYWORDS.some((keyword) => lowerMessage.includes(keyword))) {
    return "medium"
  }
  return "low"
}

function generateAIResponse(userMessage: string): Message {
  const severity = analyzeSeverity(userMessage)
  const response = AI_RESPONSES[severity]

  return {
    id: Date.now().toString(),
    content: response.message,
    sender: "ai",
    timestamp: new Date(),
    severity,
    suggestions: response.suggestions,
  }
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "Hello! I'm your AI mental health assistant. I'm here to provide support and connect you with resources. How are you feeling today?",
      sender: "ai",
      timestamp: new Date(),
      severity: "low",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage)
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case "crisis":
        return "bg-destructive text-destructive-foreground"
      case "high":
        return "bg-orange-500 text-white"
      case "medium":
        return "bg-yellow-500 text-black"
      default:
        return "bg-primary text-primary-foreground"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  <Brain className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="font-semibold">AI Mental Health Support</h1>
                  <p className="text-xs text-muted-foreground">Confidential • Available 24/7</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                Online
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-primary" />
                  AI Assistant
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col p-0">
                <ScrollArea ref={scrollAreaRef} className="flex-1 px-6">
                  <div className="space-y-4 pb-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`flex gap-3 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              message.sender === "user" ? "bg-primary" : "bg-muted"
                            }`}
                          >
                            {message.sender === "user" ? (
                              <User className="w-4 h-4 text-primary-foreground" />
                            ) : (
                              <Bot className="w-4 h-4 text-muted-foreground" />
                            )}
                          </div>
                          <div className="space-y-2">
                            <div
                              className={`rounded-lg px-4 py-2 ${
                                message.sender === "user"
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                            </div>
                            {message.suggestions && (
                              <div className="space-y-2">
                                {message.severity === "crisis" && (
                                  <div className="flex items-center gap-2 p-2 bg-destructive/10 rounded-lg border border-destructive/20">
                                    <AlertTriangle className="w-4 h-4 text-destructive" />
                                    <span className="text-xs font-medium text-destructive">Crisis Support Needed</span>
                                  </div>
                                )}
                                <div className="flex flex-wrap gap-2">
                                  {message.suggestions.map((suggestion, index) => (
                                    <Button
                                      key={index}
                                      variant="outline"
                                      size="sm"
                                      className={`text-xs ${getSeverityColor(message.severity)}`}
                                    >
                                      {suggestion}
                                    </Button>
                                  ))}
                                </div>
                              </div>
                            )}
                            <p className="text-xs text-muted-foreground">{message.timestamp.toLocaleTimeString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          <Bot className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="bg-muted rounded-lg px-4 py-2">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
                <div className="border-t border-border p-4">
                  <div className="flex gap-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Share how you're feeling..."
                      className="flex-1"
                      disabled={isTyping}
                    />
                    <Button onClick={handleSendMessage} disabled={isTyping || !inputMessage.trim()}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    This AI assistant provides support but is not a replacement for professional help.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Counseling
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <Phone className="w-4 h-4 mr-2" />
                  Crisis Helpline
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <User className="w-4 h-4 mr-2" />
                  Peer Support
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Privacy Notice</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Your conversations are confidential and encrypted. Data is used anonymously to improve support
                  services.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Emergency Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-xs">
                  <p className="font-medium">Crisis Helpline</p>
                  <p className="text-muted-foreground">1-800-273-8255</p>
                </div>
                <div className="text-xs">
                  <p className="font-medium">Campus Emergency</p>
                  <p className="text-muted-foreground">911</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
