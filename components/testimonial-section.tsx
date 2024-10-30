'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    quote: "Simplify is helping me keep my job search organized and stay on top of opportunities!",
    name: "Sarah",
    role: "Operations Intern",
    company: "Goldman Sachs",
    image: "/placeholder.svg?height=60&width=60&text=S",
    logo: "/placeholder.svg?height=40&width=120&text=Goldman+Sachs"
  },
  {
    quote: "I got matched with startups I wouldn't have found myself and signed an offer within a week of applying!",
    name: "Winston",
    role: "Operations Intern",
    company: "FYPM",
    image: "/placeholder.svg?height=60&width=60&text=W",
    logo: "/placeholder.svg?height=40&width=80&text=FYPM"
  },
  {
    quote: "I found a ton of exciting roles at startups I'd never heard of with Simplify!",
    name: "Emmanuel",
    role: "Software Engineer",
    company: "Polydelta",
    image: "/placeholder.svg?height=60&width=60&text=E",
    logo: "/placeholder.svg?height=40&width=100&text=Polydelta"
  },
  {
    quote: "Simplify notified me about Google's APM program the day it opened which was crucial in landing the offer!",
    name: "Grace",
    role: "Associate Product Manager",
    company: "Google",
    image: "/placeholder.svg?height=60&width=60&text=G",
    logo: "/placeholder.svg?height=40&width=100&text=Google"
  },
  {
    quote: "Simplify made it easy to find positions I had the right qualifications for!",
    name: "Harshi",
    role: "Principal TPM",
    company: "Meta",
    image: "/placeholder.svg?height=60&width=60&text=H",
    logo: "/placeholder.svg?height=40&width=80&text=Meta"
  }
]

export function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-24 bg-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Join over 500,000 candidates that hear back 25% more
          <br />
          with Simplify than on other platforms 🎉
        </h2>
        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="flex-shrink-0 w-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                      <div className="ml-4">
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-lg mb-4">"{testimonial.quote}"</p>
                    <div className="flex items-center">
                      <p className="font-semibold mr-2">Joined</p>
                      <Image
                        src={testimonial.logo}
                        alt={testimonial.company}
                        width={100}
                        height={40}
                        className="h-8 w-auto"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
            onClick={nextTestimonial}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}