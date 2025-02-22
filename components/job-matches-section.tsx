'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Home, MessageSquare } from "lucide-react"
import Image from "next/image"

export function JobMatchesSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Look, here's the deal: Your best leasing agent can't be everywhere at once.
            <br />
            But what if they could?
          </h2>
          <p className="text-xl text-gray-600">
            We've helped 130+ property managers close deals while they sleep.
          </p>
        </div>
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center">The Secret Sauce 🤫</h3>
       
        </div>
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold mb-8">The Numbers Don't Lie</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <p className="text-4xl font-bold text-blue-500">1,100,000+</p>
              <p className="text-xl">tours delivered</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-500">130+</p>
              <p className="text-xl">property managers crushing it</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-500">$0</p>
              <p className="text-xl">to get started (30-day free test drive)</p>
            </div>
          </div>
        </div>
        <div className="text-center">
          <Button size="lg" className="text-lg px-8 bg-black text-white">
            Book a 15-min Demo →
          </Button>
          <p className="mt-4 text-sm text-gray-600 italic">
            (Warning: May cause severe FOMO in competitors)
          </p>
        </div>
      </div>
    </section>
  )
}