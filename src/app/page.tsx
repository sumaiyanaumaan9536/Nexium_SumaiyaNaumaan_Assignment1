"use client"

import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const quotes = [
  { topic: "kindness", text: "No act of kindness, no matter how small, is ever wasted." },
  { topic: "kindness", text: "Be kind, for everyone you meet is fighting a hard battle." },
  { topic: "kindness", text: "Practice kindness all day to everybody and you will realize you're already in heaven now." },
  { topic: "motivation", text: "The future belongs to those who believe in the beauty of their dreams" },
  { topic: "motivation", text: "It always seems impossible until it's done" },
  { topic: "motivation", text: "The only limit to our realization of tomorrow will be our doubts of today" },
  { topic: "success", text: "Success is not final, failure is not fatal: It is the courage to continue that counts" },
  { topic: "success", text: "The road to success and the road to failure are almost exactly the same." },
  { topic: "success", text: "I find that the harder I work, the more luck I seem to have." },
]

export default function Home() {
  const [topic, setTopic] = useState("")
  const [results, setResults] = useState<string[] | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    const trimmedTopic = topic.trim().toLowerCase()

    if (!trimmedTopic) {
      setResults(null)
      return
    }

    const matched = quotes
      .filter((q) => q.topic.toLowerCase() === trimmedTopic)
      .slice(0, 3)
      .map((q) => q.text)

    setResults(matched.length > 0 ? matched : [])
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit()
  }

  const handleReset = () => {
    setTopic("")
    setResults(null)
    inputRef.current?.focus()
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#FDF6F0] px-4 font-sans">
      <div className="w-full max-w-lg space-y-6 bg-white p-8 rounded-2xl shadow-lg border border-[#f3e8e0]">
        <h1 className="text-3xl font-bold text-center text-[#4C3A51]">Quote Generator</h1>
        <p className="text-sm text-center text-[#998f8d]">
          Try topics like: <strong>kindness</strong>, <strong>motivation</strong>, <strong>success</strong>
        </p>

        <div className="flex gap-2">
          <Input
            ref={inputRef}
            placeholder="Enter a topic"
            className="bg-[#faf3eb] border border-[#e8dad0] text-gray-700 placeholder:text-gray-400"
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value)
              if (results) setResults(null)
            }}
            onKeyDown={handleKeyPress}
          />
          <Button onClick={handleSubmit} className="bg-[#C3E0DD] text-gray-800 hover:bg-[#addbd7]">Search</Button>
          {results !== null && (
            <Button variant="secondary" onClick={handleReset} className="bg-[#F6D6D6] text-gray-800 hover:bg-[#f3c7c7]">
              Reset
            </Button>
          )}
        </div>

        <div className="space-y-4">
          {results === null && (
            <p className="text-center text-gray-400 italic">Enter a topic to see quotes.</p>
          )}

          {results && results.length === 0 && (
            <p className="text-center text-red-500 font-medium">
  No quotes found for &quot;{topic.trim()}&quot;
</p>
          )}

          {results && results.length > 0 && results.map((quote, index) => (
            <Card key={index} className="bg-[#F6F0F6] border-l-4 border-[#C9B6E4] shadow-sm">
              <CardContent className="p-4 text-[#4C3A51] text-base">{quote}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}


