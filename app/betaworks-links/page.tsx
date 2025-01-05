"use client"

import { useEffect } from "react"
import { redirect } from "next/navigation"

export function BetaWorksLinksAndDemoTYG() {
  useEffect(() => {
    redirect("https://docs.google.com/document/d/10msjZ_CUk5ZUn2GvCpIuw63Muer-Ux1MWv3nLj_6rnY/edit?usp=sharing")
  }, [])

  return null
}

export default BetaWorksLinksAndDemoTYG