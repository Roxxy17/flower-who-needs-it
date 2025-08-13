"use client"

import { useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"
import FlowerPage from "./flower-page"

export default function WelcomePage() {
  const [step, setStep] = useState(0)
  const [showFlower, setShowFlower] = useState(false)

  const questions = [
    "Apakah kamu capek atau lelah?",
    "Butuh bunga?"
  ]

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <AnimatePresence>
        {!showFlower && (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-sm"
          >
            <Card className="bg-black/90 backdrop-blur-sm border-white/30 text-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Selamat Datang</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center text-xl font-medium">
                  {questions[step]}
                </div>
                {step < questions.length - 1 ? (
                  <Button
                    variant="default"
                    className="w-full"
                    onClick={() => setStep(step + 1)}
                  >
                    Lanjut
                  </Button>
                ) : (
                  <Button
                    variant="default"
                    className="w-full"
                    onClick={() => setShowFlower(true)}
                  >
                    Munculkan Bunga
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showFlower && (
          <motion.div
            key="flower"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <FlowerPage />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
