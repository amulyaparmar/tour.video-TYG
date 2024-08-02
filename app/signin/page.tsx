"use client"
import { useEffect } from 'react';

export default function SignInPage() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.href = 'https://app.usetour.com/signin';
    }
  }, []);

  return null;
}