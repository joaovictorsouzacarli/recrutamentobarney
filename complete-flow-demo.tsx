"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Sword, Target, Users, Zap, Pickaxe, MoreHorizontal, Crown, MessageSquare, UserCheck } from "lucide-react"

export default function CompleteFlowDemo() {
  const [currentView, setCurrentView] = useState<"form" | "discord" | "admin">("form")
  const [formData, setFormData] = useState({
    nickname: "",
    guild: "",
    interests: [] as string[],
  })
  const [submittedData, setSubmittedData] = useState<any>(null)

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
    setSubmittedData({
      ...formData,
      timestamp: new Date().toLocaleString("pt-BR"),
      discordUser: "player123#1234", // Simulado
    })
    setCurrentView("discord")
  }

  // Simulação do formulário
  if (currentView === "form") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-4">
          {/* Simulação da URL */}
          <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-600/50 text-center">
            <p className="text-slate-300 text-sm">
              🔗 <span className="text-purple-400 font-mono">https://seusite.com/albion-welcome</span>
            </p>
            <p className="text-slate-400 text-xs mt-1">Link fixo que você compartilha com os players</p>
          </div>

          <Card className="bg-slate-800/90 border-purple-500/20 backdrop-blur-sm">
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

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 text-lg"
                  disabled={!formData.nickname || formData.interests.length === 0}
                >
                  Enviar para Administração
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button
              onClick={() => setCurrentView("discord")}
              variant="outline"
              className="border-slate-600 text-slate-300"
            >
              ⏭️ Simular Envio (Pular para Discord)
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Simulação da mensagem no Discord
  if (currentView === "discord") {
    return (
      <div className="min-h-screen bg-[#36393f] p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Header do Discord */}
          <div className="bg-[#2f3136] p-4 rounded-lg">
            <h2 className="text-white font-semibold flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              #admin-novos-membros
            </h2>
            <p className="text-gray-400 text-sm">Canal privado - Só admins podem ver</p>
          </div>

          {/* Mensagem do Webhook */}
          <div className="bg-[#2f3136] p-4 rounded-lg border-l-4 border-purple-500">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold">Formulário Albion</p>
                <p className="text-gray-400 text-sm">hoje às {new Date().toLocaleTimeString("pt-BR")}</p>
              </div>
            </div>

            <div className="bg-[#36393f] p-4 rounded border-l-4 border-purple-500">
              <h3 className="text-white font-bold text-lg mb-3">🆕 Novo Membro - Albion Brasil</h3>
              <p className="text-gray-300 mb-4">Um novo player quer entrar no servidor!</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-400 text-sm font-semibold">🎮 Nick no Albion</p>
                  <p className="text-white">{submittedData?.nickname || formData.nickname || "PlayerTeste123"}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm font-semibold">⚔️ Guild</p>
                  <p className="text-white">
                    {submittedData?.guild || formData.guild || "Black Legion" || "Sem guild"}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-400 text-sm font-semibold mb-2">📋 Interesses</p>
                <div className="flex flex-wrap gap-2">
                  {(submittedData?.interests || formData.interests || ["pvp", "cacada"]).map((interest: string) => (
                    <Badge key={interest} className="bg-purple-600/20 text-purple-300 border-purple-500/50">
                      {contentOptions.find((opt) => opt.id === interest)?.label || interest}
                    </Badge>
                  ))}
                </div>
              </div>

              <p className="text-gray-500 text-xs">
                Enviado em {submittedData?.timestamp || new Date().toLocaleString("pt-BR")}
              </p>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Button onClick={() => setCurrentView("form")} variant="outline" className="border-gray-600 text-gray-300">
              ⬅️ Voltar ao Formulário
            </Button>
            <Button onClick={() => setCurrentView("admin")} className="bg-green-600 hover:bg-green-700">
              👨‍💼 Ver como Admin
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Simulação da visão do Admin
  return (
    <div className="min-h-screen bg-[#36393f] p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Header do Admin */}
        <div className="bg-[#2f3136] p-4 rounded-lg">
          <h2 className="text-white font-semibold flex items-center gap-2">
            <UserCheck className="w-5 h-5" />
            Visão do Administrador
          </h2>
          <p className="text-gray-400 text-sm">O que o admin vê e pode fazer</p>
        </div>

        {/* Ações do Admin */}
        <div className="bg-[#2f3136] p-6 rounded-lg">
          <h3 className="text-white font-bold mb-4">🎯 Ações do Administrador:</h3>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-[#36393f] rounded">
              <span className="text-2xl">👀</span>
              <div>
                <p className="text-white font-semibold">Ver solicitação</p>
                <p className="text-gray-400 text-sm">
                  Nick: {submittedData?.nickname || "PlayerTeste123"} | Guild: {submittedData?.guild || "Black Legion"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-[#36393f] rounded">
              <span className="text-2xl">🏷️</span>
              <div>
                <p className="text-white font-semibold">Dar cargos baseados nos interesses</p>
                <div className="flex gap-2 mt-2">
                  <Badge className="bg-red-600/20 text-red-300">@PVP</Badge>
                  <Badge className="bg-green-600/20 text-green-300">@Caçador</Badge>
                  <Badge className="bg-blue-600/20 text-blue-300">@DG-Grupo</Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-[#36393f] rounded">
              <span className="text-2xl">✅</span>
              <div>
                <p className="text-white font-semibold">Aprovar entrada</p>
                <p className="text-gray-400 text-sm">Player ganha acesso total ao servidor</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-[#36393f] rounded">
              <span className="text-2xl">💬</span>
              <div>
                <p className="text-white font-semibold">Enviar mensagem de boas-vindas</p>
                <p className="text-gray-400 text-sm">Opcional: dar boas-vindas pessoalmente</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button onClick={() => setCurrentView("form")} variant="outline" className="border-gray-600 text-gray-300">
            🔄 Reiniciar Demonstração
          </Button>
        </div>
      </div>
    </div>
  )
}
