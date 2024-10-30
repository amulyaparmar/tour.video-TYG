'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Home, MessageSquare } from "lucide-react"

export function VirtualLeasingAgentSection() {
  return (
    <section className="py-24 bg-white">
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
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <Clock className="w-12 h-12 text-blue-500 mb-4" />
                <h4 className="text-xl font-semibold mb-2">24/7 Virtual Agent</h4>
                <p className="text-gray-600">
                  Your top performer, cloned and working round the clock. No coffee breaks needed. (75% more qualified leads than traditional tours)
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Home className="w-12 h-12 text-blue-500 mb-4" />
                <h4 className="text-xl font-semibold mb-2">Remote Closing Machine</h4>
                <p className="text-gray-600">
                  Run tours from your couch. Or beach. Or wherever. Close 25% more deals without putting on real pants.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <MessageSquare className="w-12 h-12 text-blue-500 mb-4" />
                <h4 className="text-xl font-semibold mb-2">Smart Follow-ups That Actually Work</h4>
                <p className="text-gray-600">
                  None of that "just checking in" nonsense. Share personalized tours that make prospects think "take my money already."
                </p>
              </CardContent>
            </Card>
          </div>
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
          <Button size="lg" className="text-lg px-8">
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