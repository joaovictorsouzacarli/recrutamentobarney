"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  Sword,
  Target,
  Users,
  Zap,
  Pickaxe,
  MoreHorizontal,
  Crown,
  MessageSquare,
  UserCheck,
  Clock,
  CheckCircle,
} from "lucide-react"

export default function CompleteSystem() {
  const [currentView, setCurrentView] = useState<"channel" | "form" | "confirmation" | "admin">("channel")
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
      discordUser: "player123#1234",
    })
    setCurrentView("confirmation")
  }

  // 1. Canal do Discord com link fixo
  if (currentView === "channel") {
    return (
      <div className="min-h-screen bg-[#36393f] p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Header do Canal */}
          <div className="bg-[#2f3136] p-4 rounded-lg">
            <h2 className="text-white font-semibold flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              #recrutamento
            </h2>
            <p className="text-gray-400 text-sm">Canal público onde fica o link de entrada</p>
          </div>

          {/* Mensagem Fixada */}
          <div className="bg-[#2f3136] p-4 rounded-lg border-l-4 border-yellow-500">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold">Albion Brasil - Staff</p>
                <p className="text-gray-400 text-sm">📌 Mensagem fixada</p>
              </div>
            </div>

            <div className="bg-[#36393f] p-4 rounded border-l-4 border-yellow-500">
              <h3 className="text-white font-bold text-xl mb-3">🏰 Bem-vindo ao Albion Brasil!</h3>

              <p className="text-gray-300 mb-4">
                Para ter acesso completo ao servidor e receber os cargos apropriados, preencha nosso formulário de
                entrada:
              </p>

              <div className="bg-purple-600/20 p-4 rounded-lg border border-purple-500/50 mb-4">
                <p className="text-purple-300 font-semibold mb-2">🔗 Link de Entrada:</p>
                <div className="bg-[#2f3136] p-3 rounded font-mono text-purple-400 text-center">
                  https://albionbrasil.com/entrada
                </div>
              </div>

              <div className="space-y-2 text-gray-300 text-sm">
                <p>
                  📋 <strong>O que você vai preencher:</strong>
                </p>
                <p>• Seu nick no Albion Online</p>
                <p>• Guild atual (se tiver)</p>
                <p>• Tipos de conteúdo que te interessam</p>
              </div>

              <div className="mt-4 p-3 bg-green-600/20 rounded border border-green-500/50">
                <p className="text-green-300 text-sm">
                  ✅ Após preencher, nossa equipe de recrutamento irá analisar e liberar seus acessos!
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button onClick={() => setCurrentView("form")} className="bg-purple-600 hover:bg-purple-700">
              🔗 Acessar Formulário de Entrada
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // 2. Formulário de entrada
  if (currentView === "form") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-4">
          {/* URL do formulário */}
          <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-600/50 text-center">
            <p className="text-slate-300 text-sm">
              🌐 <span className="text-purple-400 font-mono">https://albionbrasil.com/entrada</span>
            </p>
          </div>

          <Card className="bg-slate-800/90 border-purple-500/20 backdrop-blur-sm">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Crown className="w-10 h-10 text-slate-900" />
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Formulário de Entrada
              </CardTitle>
              <CardDescription className="text-slate-300 text-lg">
                Preencha seus dados para receber acesso ao servidor
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
                  Enviar Solicitação
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button
              onClick={() => setCurrentView("channel")}
              variant="outline"
              className="border-slate-600 text-slate-300"
            >
              ⬅️ Voltar ao Canal
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // 3. Tela de confirmação para o player
  if (currentView === "confirmation") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-slate-800/90 border-green-500/20 backdrop-blur-sm">
          <CardContent className="text-center space-y-6 pt-8">
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-slate-900" />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-green-400 mb-4">Solicitação Enviada!</h2>
              <p className="text-slate-300 text-lg mb-6">
                Obrigado por se inscrever no <strong>Albion Brasil</strong>!
              </p>
            </div>

            <div className="bg-slate-700/30 p-6 rounded-lg border border-slate-600/50 space-y-4">
              <div className="flex items-center gap-3 text-slate-300">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span>Seus dados foram enviados para nossa equipe de recrutamento</span>
              </div>

              <div className="flex items-center gap-3 text-slate-300">
                <UserCheck className="w-5 h-5 text-blue-400" />
                <span>Um recrutador irá analisar sua solicitação em breve</span>
              </div>

              <div className="flex items-center gap-3 text-slate-300">
                <Crown className="w-5 h-5 text-purple-400" />
                <span>Você receberá os cargos apropriados após aprovação</span>
              </div>
            </div>

            <div className="bg-green-600/20 p-4 rounded-lg border border-green-500/50">
              <p className="text-green-300 font-semibold mb-2">📋 Resumo da sua solicitação:</p>
              <div className="text-left space-y-2 text-slate-300">
                <p>
                  <strong>Nick:</strong> {submittedData?.nickname}
                </p>
                <p>
                  <strong>Guild:</strong> {submittedData?.guild || "Sem guild"}
                </p>
                <p>
                  <strong>Interesses:</strong>{" "}
                  {submittedData?.interests
                    .map((i: string) => contentOptions.find((opt) => opt.id === i)?.label)
                    .join(", ")}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-slate-400 text-sm">
                ⏱️ <strong>Tempo estimado:</strong> 5-15 minutos
              </p>
              <p className="text-slate-400 text-sm">💬 Fique atento às mensagens diretas e notificações do servidor</p>
            </div>

            <div className="flex gap-3 justify-center">
              <Button onClick={() => setCurrentView("admin")} className="bg-blue-600 hover:bg-blue-700">
                👀 Ver Painel Admin
              </Button>
              <Button
                onClick={() => setCurrentView("channel")}
                variant="outline"
                className="border-slate-600 text-slate-300"
              >
                🔄 Voltar ao Início
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // 4. Painel do Admin
  return (
    <div className="min-h-screen bg-[#36393f] p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Header do Admin */}
        <div className="bg-[#2f3136] p-4 rounded-lg">
          <h2 className="text-white font-semibold flex items-center gap-2">
            <UserCheck className="w-5 h-5" />
            #admin-recrutamento
          </h2>
          <p className="text-gray-400 text-sm">Canal privado - Apenas recrutadores e admins</p>
        </div>

        {/* Nova solicitação */}
        <div className="bg-[#2f3136] p-4 rounded-lg border-l-4 border-orange-500">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold">Sistema de Recrutamento</p>
              <p className="text-gray-400 text-sm">agora às {new Date().toLocaleTimeString("pt-BR")}</p>
            </div>
          </div>

          <div className="bg-[#36393f] p-4 rounded border-l-4 border-orange-500">
            <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
              🆕 Nova Solicitação de Entrada
              <Badge className="bg-red-600/20 text-red-300 border-red-500/50">PENDENTE</Badge>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-gray-400 text-sm font-semibold">🎮 Nick no Albion</p>
                <p className="text-white text-lg">{submittedData?.nickname}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm font-semibold">⚔️ Guild</p>
                <p className="text-white text-lg">{submittedData?.guild || "Sem guild"}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-400 text-sm font-semibold mb-2">📋 Interesses</p>
              <div className="flex flex-wrap gap-2">
                {submittedData?.interests.map((interest: string) => (
                  <Badge key={interest} className="bg-purple-600/20 text-purple-300 border-purple-500/50">
                    {contentOptions.find((opt) => opt.id === interest)?.label}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-400 text-sm font-semibold mb-2">🏷️ Cargos Sugeridos</p>
              <div className="flex flex-wrap gap-2">
                {submittedData?.interests.map((interest: string) => {
                  const roleMap: Record<string, string> = {
                    pvp: "@PVP",
                    cacada: "@Caçador",
                    "dg-grupo": "@DG-Grupo",
                    "dg-ava": "@DG-Solo",
                    coleta: "@Coletor",
                    outros: "@Membro",
                  }
                  return (
                    <Badge key={interest} className="bg-green-600/20 text-green-300 border-green-500/50">
                      {roleMap[interest]}
                    </Badge>
                  )
                })}
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Aprovar e Dar Cargos
              </Button>
              <Button variant="outline" className="border-yellow-500/50 text-yellow-400">
                ⏸️ Analisar Depois
              </Button>
              <Button variant="outline" className="border-red-500/50 text-red-400">
                ❌ Rejeitar
              </Button>
            </div>

            <p className="text-gray-500 text-xs mt-3">Solicitação recebida em {submittedData?.timestamp}</p>
          </div>
        </div>

        <div className="text-center">
          <Button onClick={() => setCurrentView("channel")} variant="outline" className="border-gray-600 text-gray-300">
            🔄 Reiniciar Demonstração
          </Button>
        </div>
      </div>
    </div>
  )
}
