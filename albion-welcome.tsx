"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Sword, Target, Users, Zap, Pickaxe, MoreHorizontal, Crown, Send } from "lucide-react"

export default function Component() {
  const [formData, setFormData] = useState({
    nickname: "",
    guild: "",
    interests: [] as string[],
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const contentOptions = [
    { id: "pvp", label: "PVP", icon: Sword },
    { id: "cacada", label: "Caçada", icon: Target },
    { id: "dg-grupo", label: "DG Grupo", icon: Users },
    { id: "dg-ava", label: "DG Ava", icon: Zap },
    { id: "coleta", label: "Coleta", icon: Pickaxe },
    { id: "outros", label: "Outros", icon: MoreHorizontal },
  ]

  const handleInterestChange = (interestId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      interests: checked ? [...prev.interests, interestId] : prev.interests.filter((id) => id !== interestId),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simular envio para Discord
    console.log("Enviando para Discord:", formData)
    setIsSubmitted(true)

    // Aqui seria feita a integração real com Discord
    // sendToDiscordWebhook(formData)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-slate-800/90 border-green-500/20 backdrop-blur-sm">
          <CardContent className="text-center space-y-6 pt-8">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center">
              <Send className="w-10 h-10 text-slate-900" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-green-400 mb-2">Formulário Enviado!</h2>
              <p className="text-slate-300">
                Suas informações foram enviadas para nossa equipe de administração.
                <br />
                Aguarde alguns minutos para receber seus cargos no servidor!
              </p>
            </div>
            <Button
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Enviar Outro Formulário
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-slate-800/90 border-purple-500/20 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <Crown className="w-10 h-10 text-slate-900" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Bem-vindo ao Albion Brasil!
          </CardTitle>
          <CardDescription className="text-slate-300 text-lg">
            Complete seu perfil para receber os cargos apropriados
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nick no jogo */}
            <div className="space-y-2">
              <Label htmlFor="nickname" className="text-slate-200 font-medium">
                Nick no Albion Online *
              </Label>
              <Input
                id="nickname"
                placeholder="Digite seu nick no jogo..."
                value={formData.nickname}
                onChange={(e) => setFormData((prev) => ({ ...prev, nickname: e.target.value }))}
                className="bg-slate-700/50 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-purple-500"
                required
              />
            </div>

            {/* Guild */}
            <div className="space-y-2">
              <Label htmlFor="guild" className="text-slate-200 font-medium">
                Guild que veio
              </Label>
              <Input
                id="guild"
                placeholder="Nome da sua guild ou deixe vazio se não tem"
                value={formData.guild}
                onChange={(e) => setFormData((prev) => ({ ...prev, guild: e.target.value }))}
                className="bg-slate-700/50 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-purple-500"
              />
            </div>

            {/* Interesses */}
            <div className="space-y-4">
              <Label className="text-slate-200 font-medium">Que conteúdo te interessa? *</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {contentOptions.map((option) => {
                  const IconComponent = option.icon
                  return (
                    <div
                      key={option.id}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-slate-700/30 border border-slate-600/50 hover:bg-slate-700/50 transition-colors"
                    >
                      <Checkbox
                        id={option.id}
                        checked={formData.interests.includes(option.id)}
                        onCheckedChange={(checked) => handleInterestChange(option.id, checked as boolean)}
                        className="border-slate-500 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                      />
                      <IconComponent className="w-5 h-5 text-purple-400" />
                      <Label htmlFor={option.id} className="text-slate-200 cursor-pointer flex-1">
                        {option.label}
                      </Label>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Botão de envio */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 text-lg"
              disabled={!formData.nickname || formData.interests.length === 0}
            >
              Enviar para Administração
            </Button>
          </form>

          {/* Informações adicionais */}
          <div className="mt-6 p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
            <p className="text-slate-300 text-sm text-center">
              📋 Suas informações serão enviadas para nossa equipe de administração
              <br />🎯 Você receberá os cargos baseados nos seus interesses
              <br />
              ⏱️ Processo leva alguns minutos para ser concluído
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
