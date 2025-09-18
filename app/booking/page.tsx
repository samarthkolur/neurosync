"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, Shield, ArrowLeft, CheckCircle, Phone, Video, MapPin } from "lucide-react"
import Link from "next/link"

interface Counselor {
  id: string
  name: string
  specialization: string[]
  languages: string[]
  availability: string[]
  type: "campus" | "external"
  rating: number
  experience: string
}

interface TimeSlot {
  time: string
  available: boolean
}

const COUNSELORS: Counselor[] = [
  {
    id: "1",
    name: "Dr. Priya Sharma",
    specialization: ["Anxiety", "Depression", "Academic Stress"],
    languages: ["English", "Hindi", "Marathi"],
    availability: ["Mon", "Wed", "Fri"],
    type: "campus",
    rating: 4.8,
    experience: "8 years",
  },
  {
    id: "2",
    name: "Dr. Rajesh Kumar",
    specialization: ["Relationship Issues", "Social Anxiety", "Career Counseling"],
    languages: ["English", "Hindi", "Tamil"],
    availability: ["Tue", "Thu", "Sat"],
    type: "campus",
    rating: 4.9,
    experience: "12 years",
  },
  {
    id: "3",
    name: "Ms. Anita Patel",
    specialization: ["Trauma", "PTSD", "Grief Counseling"],
    languages: ["English", "Gujarati", "Hindi"],
    availability: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    type: "external",
    rating: 4.7,
    experience: "6 years",
  },
]

const TIME_SLOTS: TimeSlot[] = [
  { time: "09:00 AM", available: true },
  { time: "10:00 AM", available: false },
  { time: "11:00 AM", available: true },
  { time: "02:00 PM", available: true },
  { time: "03:00 PM", available: true },
  { time: "04:00 PM", available: false },
  { time: "05:00 PM", available: true },
]

export default function BookingPage() {
  const [step, setStep] = useState(1)
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(null)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [sessionType, setSessionType] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    concern: "",
    urgency: "",
    previousTherapy: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleCounselorSelect = (counselor: Counselor) => {
    setSelectedCounselor(counselor)
    setStep(2)
  }

  const handleDateTimeSelect = () => {
    if (selectedDate && selectedTime && sessionType) {
      setStep(3)
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  const getNextAvailableDate = () => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split("T")[0]
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Appointment Confirmed!</h1>
            <p className="text-muted-foreground mb-8">
              Your confidential counseling session has been scheduled successfully.
            </p>

            <Card className="text-left mb-8">
              <CardHeader>
                <CardTitle>Appointment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{selectedCounselor?.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedCounselor?.specialization.join(", ")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{selectedDate}</p>
                    <p className="text-sm text-muted-foreground">{selectedTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {sessionType === "video" ? (
                    <Video className="w-5 h-5 text-muted-foreground" />
                  ) : sessionType === "phone" ? (
                    <Phone className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                  )}
                  <div>
                    <p className="font-medium">
                      {sessionType === "video" ? "Video Call" : sessionType === "phone" ? "Phone Call" : "In-Person"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {sessionType === "in-person" ? "Campus Counseling Center" : "Link will be sent via email"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
              <h3 className="font-medium text-blue-900 mb-2">What happens next?</h3>
              <ul className="text-sm text-blue-800 space-y-1 text-left">
                <li>• You&apos;ll receive a confirmation email with session details</li>
                <li>• A reminder will be sent 24 hours before your appointment</li>
                <li>• All sessions are completely confidential</li>
                <li>• You can reschedule or cancel up to 2 hours before</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/chat">Continue Chat Support</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/resources">Browse Resources</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
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
              <div>
                <h1 className="font-semibold">Book Counseling Session</h1>
                <p className="text-xs text-muted-foreground">Confidential • Professional • Secure</p>
              </div>
            </div>
            <Badge variant="secondary">
              <Shield className="w-3 h-3 mr-1" />
              Encrypted
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              1
            </div>
            <div className={`w-12 h-0.5 ${step >= 2 ? "bg-primary" : "bg-muted"}`}></div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              2
            </div>
            <div className={`w-12 h-0.5 ${step >= 3 ? "bg-primary" : "bg-muted"}`}></div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              3
            </div>
          </div>
        </div>

        {/* Step 1: Select Counselor */}
        {step === 1 && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Choose Your Counselor</h2>
              <p className="text-muted-foreground">Select a counselor who matches your needs and preferences</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {COUNSELORS.map((counselor) => (
                <Card key={counselor.id} className="cursor-pointer hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{counselor.name}</CardTitle>
                        <CardDescription>{counselor.experience} experience</CardDescription>
                      </div>
                      <Badge variant={counselor.type === "campus" ? "default" : "secondary"}>
                        {counselor.type === "campus" ? "On Campus" : "External"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium mb-1">Specializations</p>
                        <div className="flex flex-wrap gap-1">
                          {counselor.specialization.map((spec) => (
                            <Badge key={spec} variant="outline" className="text-xs">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Languages</p>
                        <p className="text-sm text-muted-foreground">{counselor.languages.join(", ")}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Available</p>
                        <p className="text-sm text-muted-foreground">{counselor.availability.join(", ")}</p>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium">★ {counselor.rating}</span>
                        </div>
                        <Button size="sm" onClick={() => handleCounselorSelect(counselor)}>
                          Select
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Select Date & Time */}
        {step === 2 && selectedCounselor && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Schedule Your Session</h2>
              <p className="text-muted-foreground">Choose your preferred date, time, and session type</p>
            </div>

            <div className="max-w-2xl mx-auto">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Selected Counselor
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{selectedCounselor.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedCounselor.specialization.join(", ")}</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setStep(1)}>
                      Change
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Select Date
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Input
                      type="date"
                      min={getNextAvailableDate()}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Select Time
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      {TIME_SLOTS.map((slot) => (
                        <Button
                          key={slot.time}
                          variant={selectedTime === slot.time ? "default" : "outline"}
                          size="sm"
                          disabled={!slot.available}
                          onClick={() => setSelectedTime(slot.time)}
                          className="text-xs"
                        >
                          {slot.time}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Session Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <Button
                      variant={sessionType === "video" ? "default" : "outline"}
                      onClick={() => setSessionType("video")}
                      className="flex flex-col gap-2 h-auto py-4"
                    >
                      <Video className="w-5 h-5" />
                      <span className="text-xs">Video Call</span>
                    </Button>
                    <Button
                      variant={sessionType === "phone" ? "default" : "outline"}
                      onClick={() => setSessionType("phone")}
                      className="flex flex-col gap-2 h-auto py-4"
                    >
                      <Phone className="w-5 h-5" />
                      <span className="text-xs">Phone Call</span>
                    </Button>
                    <Button
                      variant={sessionType === "in-person" ? "default" : "outline"}
                      onClick={() => setSessionType("in-person")}
                      className="flex flex-col gap-2 h-auto py-4"
                      disabled={selectedCounselor.type !== "campus"}
                    >
                      <MapPin className="w-5 h-5" />
                      <span className="text-xs">In Person</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center mt-8">
                <Button onClick={handleDateTimeSelect} disabled={!selectedDate || !selectedTime || !sessionType}>
                  Continue to Details
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Personal Details */}
        {step === 3 && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Personal Information</h2>
              <p className="text-muted-foreground">
                Help us prepare for your session (all information is confidential)
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="concern">Primary Concern *</Label>
                  <Textarea
                    id="concern"
                    placeholder="Briefly describe what you&apos;d like to discuss (this helps the counselor prepare)"
                    required
                    value={formData.concern}
                    onChange={(e) => setFormData({ ...formData, concern: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="urgency">How urgent is your need for support?</Label>
                  <Select
                    value={formData.urgency}
                    onValueChange={(value) => setFormData({ ...formData, urgency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select urgency level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - General support and guidance</SelectItem>
                      <SelectItem value="medium">Medium - Noticeable impact on daily life</SelectItem>
                      <SelectItem value="high">High - Significant distress, need support soon</SelectItem>
                      <SelectItem value="crisis">Crisis - Immediate support needed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="previousTherapy">Have you had counseling or therapy before?</Label>
                  <Select
                    value={formData.previousTherapy}
                    onValueChange={(value) => setFormData({ ...formData, previousTherapy: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no">No, this is my first time</SelectItem>
                      <SelectItem value="yes-helpful">Yes, and it was helpful</SelectItem>
                      <SelectItem value="yes-mixed">Yes, with mixed results</SelectItem>
                      <SelectItem value="yes-unhelpful">Yes, but it wasn&apos;t helpful</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Privacy & Confidentiality</h3>
                      <p className="text-sm text-muted-foreground">
                        All information shared is strictly confidential and protected by professional ethics codes. Your
                        data is encrypted and only accessible to your assigned counselor.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  <Button type="button" variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button type="submit">Confirm Appointment</Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
