'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MessageSquare, PhoneCall } from "lucide-react"
import Image from "next/image"

export function MissionStatement() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <span className="text-blue-600 font-semibold">OUR MISSION</span>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <Card className="w-full max-w-md mx-auto">
              <CardContent className="p-6">
                <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
                  <p className="font-semibold">Hey, I'm Mariana! 👋</p>
                  <p className="text-sm text-gray-600">How can I help?</p>
                </div>
                <div className="flex items-center mb-6">
                  <Image
                    src="https://framerusercontent.com/images/XaY2nTyVDSeArcqdPnBa54kE.png"
                    alt="Mariana"
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                  <div className="ml-4 space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule a Tour
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Ask a Question
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <PhoneCall className="w-4 h-4 mr-2" />
                      Talk Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Don't wait for your competitors to build a better tour
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Use guided video, CTAs, special offers, and testimonials to convert 150% more of your website visitors today.
            </p>
            <div className="space-x-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                Book 1:1 Consultation
              </Button>
              <Button size="lg" variant="outline">
                Try it out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}