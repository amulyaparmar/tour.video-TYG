'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Zap, FileText } from "lucide-react"
import Image from "next/image"

export function FeatureSections() {
  return (
    <section className="py-24 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="flex items-center space-x-2">
              <Zap className="w-6 h-6 text-blue-500" />
              <h3 className="text-xl font-semibold text-blue-500">Autofill Applications</h3>
            </div>
            <h2 className="text-4xl font-bold">Autofill repetitive job application questions</h2>
            <p className="text-xl text-gray-600">
              Install the Simplify Copilot extension to autofill your job applications &
              see keywords missing in your resume.
            </p>
            <div className="flex space-x-4">
              <Button size="lg">Add to Brave</Button>
              <Button variant="outline" size="lg">Learn More</Button>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600">30,000,000+ applications submitted</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 transform skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <Card className="relative shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-sm text-gray-500">simplify.com</div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="Airbnb logo"
                      width={40}
                      height={40}
                      className="rounded"
                    />
                    <div>
                      <h4 className="font-semibold">Software Engineer</h4>
                      <p className="text-sm text-gray-500">Airbnb</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <div className="w-1/3 h-4 bg-gray-200 rounded"></div>
                        <div className="w-2/3 h-4 bg-blue-200 rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 mt-24">
          <div className="relative order-2 md:order-1">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 transform skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <Card className="relative shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-sm text-gray-500">simplify.com</div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="Airbnb logo"
                      width={40}
                      height={40}
                      className="rounded"
                    />
                    <div>
                      <h4 className="font-semibold">Software Engineer</h4>
                      <p className="text-sm text-gray-500">Airbnb</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-2 bg-gray-200 rounded w-full"></div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-8 order-1 md:order-2">
            <div className="flex items-center space-x-2">
              <FileText className="w-6 h-6 text-green-500" />
              <h3 className="text-xl font-semibold text-green-500">AI Resume Builder</h3>
            </div>
            <h2 className="text-4xl font-bold">Craft the perfect tailored resume for every job</h2>
            <p className="text-xl text-gray-600">
              Use AI to tailor your resume to fit the job description, see your resume
              ATS score, and identify missing keywords, all in a few clicks.
            </p>
            <Button size="lg">Get a Free Resume</Button>
          </div>
        </div>
      </div>
    </section>
  )
}