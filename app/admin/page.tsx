"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  BarChart3,
  Users,
  MessageSquare,
  Calendar,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Shield,
  Brain,
  ArrowLeft,
  Download,
  Filter,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"

// Sample data for analytics
const monthlyUsageData = [
  { month: "Jan", chatSessions: 245, appointments: 89, resources: 156, community: 78 },
  { month: "Feb", chatSessions: 312, appointments: 102, resources: 189, community: 94 },
  { month: "Mar", chatSessions: 398, appointments: 134, resources: 234, community: 112 },
  { month: "Apr", chatSessions: 445, appointments: 156, resources: 267, community: 145 },
  { month: "May", chatSessions: 523, appointments: 178, resources: 298, community: 167 },
  { month: "Jun", chatSessions: 612, appointments: 203, resources: 334, community: 189 },
]

const severityDistribution = [
  { name: "Low", value: 45, color: "#10b981" },
  { name: "Medium", value: 35, color: "#f59e0b" },
  { name: "High", value: 15, color: "#f97316" },
  { name: "Crisis", value: 5, color: "#ef4444" },
]

const topConcerns = [
  { concern: "Academic Stress", count: 234, percentage: 28 },
  { concern: "Anxiety", count: 198, percentage: 24 },
  { concern: "Depression", count: 156, percentage: 19 },
  { concern: "Social Issues", count: 123, percentage: 15 },
  { concern: "Sleep Problems", count: 89, percentage: 11 },
  { concern: "Other", count: 34, percentage: 4 },
]

const interventionMetrics = [
  { metric: "Early Interventions", current: 89, previous: 67, change: 33 },
  { metric: "Crisis Responses", current: 12, previous: 18, change: -33 },
  { metric: "Referrals Made", current: 156, previous: 134, change: 16 },
  { metric: "Follow-ups Completed", current: 203, previous: 189, change: 7 },
]

const peakUsageHours = [
  { hour: "6AM", usage: 12 },
  { hour: "8AM", usage: 45 },
  { hour: "10AM", usage: 78 },
  { hour: "12PM", usage: 89 },
  { hour: "2PM", usage: 134 },
  { hour: "4PM", usage: 156 },
  { hour: "6PM", usage: 189 },
  { hour: "8PM", usage: 234 },
  { hour: "10PM", usage: 198 },
  { hour: "12AM", usage: 67 },
]

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("6months")
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  const formatChange = (change: number) => {
    const isPositive = change > 0
    return (
      <div className={`flex items-center gap-1 ${isPositive ? "text-green-600" : "text-red-600"}`}>
        {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        <span className="text-xs font-medium">{Math.abs(change)}%</span>
      </div>
    )
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
                  <BarChart3 className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="font-semibold">Admin Dashboard</h1>
                  <p className="text-xs text-muted-foreground">Mental Health Analytics • Anonymous Data</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Shield className="w-3 h-3 mr-1" />
                HIPAA Compliant
              </Badge>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="arts">Arts & Sciences</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="medicine">Medicine</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,847</div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">Active this month</p>
                {formatChange(12)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chat Sessions</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">612</div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">This month</p>
                {formatChange(18)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">203</div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">This month</p>
                {formatChange(14)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Crisis Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">This month</p>
                {formatChange(-33)}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="usage">Usage Patterns</TabsTrigger>
            <TabsTrigger value="concerns">Top Concerns</TabsTrigger>
            <TabsTrigger value="interventions">Interventions</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Usage Trends</CardTitle>
                  <CardDescription>Monthly usage across all platform features</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyUsageData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="chatSessions" stroke="#8884d8" strokeWidth={2} />
                      <Line type="monotone" dataKey="appointments" stroke="#82ca9d" strokeWidth={2} />
                      <Line type="monotone" dataKey="resources" stroke="#ffc658" strokeWidth={2} />
                      <Line type="monotone" dataKey="community" stroke="#ff7300" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Severity Distribution</CardTitle>
                  <CardDescription>Distribution of mental health concern severity levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={severityDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${name} ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {severityDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Peak Usage Hours</CardTitle>
                <CardDescription>When students are most likely to seek support</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={peakUsageHours}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="usage" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Usage Patterns Tab */}
          <TabsContent value="usage" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Feature Adoption</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">AI Chat Support</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-muted rounded-full">
                        <div className="w-4/5 h-2 bg-primary rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Resource Hub</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-muted rounded-full">
                        <div className="w-3/5 h-2 bg-primary rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">67%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Appointment Booking</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-muted rounded-full">
                        <div className="w-2/5 h-2 bg-primary rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Peer Support</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-muted rounded-full">
                        <div className="w-1/3 h-2 bg-primary rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">34%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">User Demographics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Undergraduate</span>
                      <span>72%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full">
                      <div className="w-3/4 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Graduate</span>
                      <span>23%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full">
                      <div className="w-1/4 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Faculty/Staff</span>
                      <span>5%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full">
                      <div className="w-1/12 h-2 bg-purple-500 rounded-full"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Language Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">English</span>
                    <Badge variant="secondary">68%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Hindi</span>
                    <Badge variant="secondary">15%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tamil</span>
                    <Badge variant="secondary">8%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Telugu</span>
                    <Badge variant="secondary">5%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Other</span>
                    <Badge variant="secondary">4%</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Top Concerns Tab */}
          <TabsContent value="concerns" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Most Common Mental Health Concerns</CardTitle>
                <CardDescription>Based on anonymous data from chat sessions and assessments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topConcerns.map((concern, index) => (
                    <div key={concern.concern} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="font-medium">{concern.concern}</h3>
                          <p className="text-sm text-muted-foreground">{concern.count} cases reported</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-32 h-2 bg-muted rounded-full">
                          <div
                            className="h-2 bg-primary rounded-full"
                            style={{ width: `${concern.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium w-12">{concern.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Interventions Tab */}
          <TabsContent value="interventions" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Intervention Metrics</CardTitle>
                  <CardDescription>Tracking preventive and responsive interventions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {interventionMetrics.map((metric) => (
                      <div key={metric.metric} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h3 className="font-medium">{metric.metric}</h3>
                          <p className="text-2xl font-bold">{metric.current}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">vs last period</p>
                          {formatChange(metric.change)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Response Times</CardTitle>
                  <CardDescription>Average response times for different severity levels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div>
                      <span className="text-sm font-medium">Low Severity</span>
                      <p className="text-xs text-muted-foreground">General support</p>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      2.3 hours
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <span className="text-sm font-medium">Medium Severity</span>
                      <p className="text-xs text-muted-foreground">Moderate distress</p>
                    </div>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      45 minutes
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <div>
                      <span className="text-sm font-medium">High Severity</span>
                      <p className="text-xs text-muted-foreground">Significant distress</p>
                    </div>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                      12 minutes
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <div>
                      <span className="text-sm font-medium">Crisis</span>
                      <p className="text-xs text-muted-foreground">Immediate intervention</p>
                    </div>
                    <Badge variant="secondary" className="bg-red-100 text-red-800">
                      3 minutes
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">Monthly Summary Report</CardTitle>
                  <CardDescription>Comprehensive overview of platform usage and outcomes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">PDF</Badge>
                    <Button size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">Intervention Effectiveness</CardTitle>
                  <CardDescription>Analysis of intervention outcomes and success rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">Excel</Badge>
                    <Button size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">Trend Analysis</CardTitle>
                  <CardDescription>Long-term trends and predictive insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">PDF</Badge>
                    <Button size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">Resource Utilization</CardTitle>
                  <CardDescription>Usage patterns of educational resources and materials</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">CSV</Badge>
                    <Button size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">Demographics Report</CardTitle>
                  <CardDescription>Anonymous demographic analysis and insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">PDF</Badge>
                    <Button size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">Custom Report Builder</CardTitle>
                  <CardDescription>Create custom reports with specific metrics and filters</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Brain className="w-4 h-4 mr-2" />
                    Build Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Privacy Notice */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-medium text-blue-900 mb-2">Data Privacy & Compliance</h3>
              <p className="text-sm text-blue-800 mb-4">
                All data displayed in this dashboard is anonymized and aggregated to protect student privacy. Individual
                identities cannot be determined from this information. The platform complies with FERPA, HIPAA, and
                institutional data protection policies.
              </p>
              <div className="flex gap-2">
                <Badge variant="outline" className="border-blue-300 text-blue-800">
                  FERPA Compliant
                </Badge>
                <Badge variant="outline" className="border-blue-300 text-blue-800">
                  HIPAA Compliant
                </Badge>
                <Badge variant="outline" className="border-blue-300 text-blue-800">
                  Anonymized Data
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
