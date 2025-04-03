"use client"

import { useEffect } from "react"
import { redirect } from "next/navigation"

export function DemoTYG() {
  useEffect(() => {
    redirect("https://drive.google.com/file/d/1cJG8R0FbMlFgU8oF3O6_gfIajgb4PKlp/view?usp=sharing")
  }, [])

  return null
}

export default DemoTYG