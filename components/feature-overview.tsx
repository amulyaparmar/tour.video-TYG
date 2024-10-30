'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Facebook, MessageCircle, Calendar, Bot, BarChart2, Code2, Infinity } from "lucide-react"
import Image from "next/image"

export function FeatureOverview() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-2 mb-4 bg-blue-100 text-blue-700 rounded-full">
            <Infinity className="w-4 h-4 mr-2" />
            And More
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Everything you'd expect
            <br />
            from a great leasing agent and more
          </h2>
          <p className="text-xl text-gray-600">
            We are transforming how buyers buy and sellers sell high ticket purchases online
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-2xl font-semibold mb-4">Loved by our property managers</h3>
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">110+</span>
              </div>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200" />
                    <div className="ml-4 bg-white p-4 rounded-lg shadow">
                      <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-2xl font-semibold mb-4">Convert More Paid Traffic into signed leases</h3>
              <div className="flex space-x-4 mb-4">
                <Facebook className="w-8 h-8 text-blue-600" />
                <Image src="/placeholder.svg?height=32&width=32&text=TikTok" width={32} height={32} alt="TikTok" className="rounded" />
                <Image src="/placeholder.svg?height=32&width=32&text=Google" width={32} height={32} alt="Google Ads" className="rounded" />
              </div>
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-gray-200 mr-4" />
                <div>
                  <h4 className="font-semibold">Take a Virtual Tour!</h4>
                  <p className="text-sm text-gray-600">Experience our properties from anywhere</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Cloneable Templates</h3>
              <div className="relative h-40 bg-gray-200 rounded-lg mb-4">
                <div className="absolute bottom-0 right-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  5+
                </div>
              </div>
              <p className="text-sm text-gray-600">Easily create and customize tour templates</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Embed & Integrate</h3>
              <p className="mb-4 text-sm">In 5 minutes</p>
              <div className="bg-gray-800 text-gray-200 p-4 rounded-lg mb-4">
                <code>&lt;script src="https://example.com/embed.js"&gt;&lt;/script&gt;</code>
              </div>
              <div className="flex space-x-4">
                <Image src="/placeholder.svg?height=24&width=80&text=Entrata" width={80} height={24} alt="Entrata" className="rounded" />
                <Image src="/placeholder.svg?height=24&width=80&text=Yardi" width={80} height={24} alt="Yardi" className="rounded" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Share Personalized Tours</h3>
              <div className="relative h-40 bg-gray-200 rounded-lg mb-4">
                <div className="absolute top-2 left-2 flex space-x-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  ))}
                </div>
                <Button variant="outline" size="sm">Share</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { icon: <Infinity className="w-6 h-6" />, title: "Multi-Source Attribution" },
            { icon: <BarChart2 className="w-6 h-6" />, title: "Robust Analytics" },
            { icon: <Calendar className="w-6 h-6" />, title: "Scheduler" },
            { icon: <MessageCircle className="w-6 h-6" />, title: "AI Chat" },
            { icon: <Bot className="w-6 h-6" />, title: "AI Followup" },
          ].map((item, index) => (
            <Card key={index}>
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                {item.icon}
                <h4 className="mt-2 font-semibold">{item.title}</h4>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg">
            + much more
          </Button>
        </div>
      </div>
    </section>
  )
}