"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Sword, Target, Users, Zap, Pickaxe, MoreHorizontal, MessageSquare, UserCheck, Clock } from "lucide-react"
import Image from "next/image"

export default function BarneySystem() {
  const [currentView, setCurrentView] = useState<"channel" | "form" | "confirmation" | "admin">("channel")
  const [formData, setFormData] = useState({
    nickname: "",
    discordName: "",
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

  // Mapeamento exato dos cargos do Discord
  const roleMapping: Record<string, string> = {
    pvp: "@PVP",
    cacada: "@Caçador",
    "dg-grupo": "@Dg-grupo",
    "dg-ava": "@Dg-ava",
    coleta: "@Coleta",
    outros: "@Outros",
  }

  // Função para enviar para Discord
  const sendToDiscord = async (data: any) => {
    // SUBSTITUA PELA SUA URL DO WEBHOOK
    const webhookUrl = "https://discord.com/api/webhooks/1376900291437531136/jU9gKJ2zs_B_buN-K8gvs6jiAsc3xfjuq48fHeM2k-0QLLDA3HKuyTEML50RySQvPkaj"

    try {
      const discordMessage = {
        embeds: [
          {
            title: "🦕 Nova Solicitação - Barney e Seus Amigos",
            description: "Um novo amiguinho quer entrar no servidor!",
            color: 0x7c3aed, // Cor roxa
            fields: [
              {
                name: "🎮 Nick no Albion",
                value: data.nickname,
                inline: true,
              },
              {
                name: "💬 Nome no Discord",
                value: data.discordName,
                inline: true,
              },
              {
                name: "⚔️ Guild",
                value: data.guild || "Sem guild",
                inline: true,
              },
              {
                name: "📋 Interesses",
                value: data.interests.map((i: string) => contentOptions.find((opt) => opt.id === i)?.label).join(", "),
                inline: false,
              },
              {
                name: "🏷️ Cargos para Adicionar",
                value: data.interests.map((i: string) => roleMapping[i]).join(", "),
                inline: false,
              },
            ],
            footer: {
              text: `Solicitação enviada em ${new Date().toLocaleString("pt-BR")}`,
            },
            thumbnail: {
              url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Barney_Head_Body-OaC1eKSW3JXZLDDyjblRkddTdKJTMw.webp", // Logo do Barney
            },
          },
        ],
      }

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(discordMessage),
      })

      return response.ok
    } catch (error) {
      console.error("Erro ao enviar para Discord:", error)
      return false
    }
  }

  const handleInterestChange = (interestId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      interests: checked ? [...prev.interests, interestId] : prev.interests.filter((id) => id !== interestId),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const submissionData = {
      ...formData,
      timestamp: new Date().toLocaleString("pt-BR"),
    }

    // Enviar para Discord
    const success = await sendToDiscord(submissionData)

    if (success) {
      setSubmittedData(submissionData)
      setCurrentView("confirmation")
    } else {
      alert("Erro ao enviar solicitação. Tente novamente.")
    }
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
          <div className="bg-[#2f3136] p-4 rounded-lg border-l-4 border-purple-500">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-purple-600 flex items-center justify-center">
                <Image
                  src="/barney-logo.webp"
                  alt="Barney"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-white font-semibold">Barney e Seus Amigos - Staff</p>
                <p className="text-gray-400 text-sm">📌 Mensagem fixada</p>
              </div>
            </div>

            <div className="bg-[#36393f] p-4 rounded border-l-4 border-purple-500">
              <h3 className="text-white font-bold text-xl mb-3 flex items-center gap-2">
                🦕 Bem-vindo ao Barney e Seus Amigos!
                <span className="text-purple-400">💜</span>
              </h3>

              <p className="text-gray-300 mb-4">
                Olá, amiguinho! Para ter acesso completo ao nosso servidor de Albion Online e receber os cargos
                apropriados, preencha nosso formulário de entrada:
              </p>

              <div className="space-y-2 text-gray-300 text-sm">
                <p>
                  📋 <strong>O que você vai preencher:</strong>
                </p>
                <p>• Seu nick no Albion Online</p>
                <p>• Seu nome no Discord</p>
                <p>• Guild atual (se tiver)</p>
                <p>• Tipos de conteúdo que te interessam</p>
              </div>

              <div className="mt-4 p-3 bg-green-600/20 rounded border border-green-500/50">
                <p className="text-green-300 text-sm">
                  ✅ Após preencher, nossa equipe do Barney irá analisar e liberar seus acessos! 🦕💜
                </p>
              </div>

              <div className="mt-4 p-3 bg-purple-600/20 rounded border border-purple-500/50">
                <p className="text-purple-300 text-sm text-center font-semibold">
                  🎵 "Eu te amo, você me ama, somos uma família feliz!" 🎵
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button onClick={() => setCurrentView("form")} className="bg-purple-600 hover:bg-purple-700">
              🦕 Acessar Formulário de Entrada
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // 2. Formulário de entrada
  if (currentView === "form") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-4">
          <Card className="bg-slate-800/90 border-purple-500/20 backdrop-blur-sm">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-24 h-24 rounded-full overflow-hidden bg-purple-600 flex items-center justify-center">
                <Image
                  src="/barney-logo.webp"
                  alt="Barney"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Barney e Seus Amigos
              </CardTitle>
              <CardDescription className="text-slate-300 text-lg">
                Formulário de Entrada - Albion Online 🦕💜
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="bg-purple-600/20 p-4 rounded-lg border border-purple-500/50 text-center">
                <p className="text-purple-300 text-sm">
                  🎵 <em>"Vamos ser amigos e jogar juntos no mundo de Albion!"</em> 🎵
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="nickname" className="text-slate-200 font-medium">
                    Nick no Albion Online *
                  </Label>
                  <Input
                    id="nickname"
                    placeholder="Digite seu nick no jogo, amiguinho..."
                    value={formData.nickname}
                    onChange={(e) => setFormData((prev) => ({ ...prev, nickname: e.target.value }))}
                    className="bg-slate-700/50 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-purple-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discordName" className="text-slate-200 font-medium">
                    Seu nome no Discord *
                  </Label>
                  <Input
                    id="discordName"
                    placeholder="Ex: usuario123 ou @usuario123"
                    value={formData.discordName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, discordName: e.target.value }))}
                    className="bg-slate-700/50 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-purple-500"
                    required
                  />
                  <p className="text-slate-400 text-xs">
                    💡 Digite seu nome de usuário do Discord (sem o #1234 se tiver)
                  </p>
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
                  <Label className="text-slate-200 font-medium">Que conteúdo te interessa, amiguinho? *</Label>
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
                  disabled={!formData.nickname || !formData.discordName || formData.interests.length === 0}
                >
                  🦕 Enviar para o Barney
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button
              onClick={() => setCurrentView("channel")}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-slate-800/90 border-green-500/20 backdrop-blur-sm">
          <CardContent className="text-center space-y-6 pt-8">
            <div className="mx-auto w-24 h-24 rounded-full overflow-hidden bg-green-600 flex items-center justify-center p-2">
              <Image
                src="/barney-logo.webp"
                alt="Barney"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-green-400 mb-4">Solicitação Enviada! 🦕</h2>
              <p className="text-slate-300 text-lg mb-6">
                Obrigado por querer ser nosso amiguinho no <strong>Barney e Seus Amigos</strong>! 💜
              </p>
            </div>

            <div className="bg-slate-700/30 p-6 rounded-lg border border-slate-600/50 space-y-4">
              <div className="flex items-center gap-3 text-slate-300">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span>Seus dados foram enviados para a equipe do Barney</span>
              </div>

              <div className="flex items-center gap-3 text-slate-300">
                <UserCheck className="w-5 h-5 text-blue-400" />
                <span>Um dos amigos do Barney irá analisar sua solicitação</span>
              </div>

              <div className="flex items-center gap-3 text-slate-300">
                <Image src="/barney-logo.webp" alt="Barney" width={20} height={20} className="w-5 h-5 rounded-full" />
                <span>Você receberá os cargos apropriados após aprovação</span>
              </div>
            </div>

            <div className="bg-green-600/20 p-4 rounded-lg border border-green-500/50">
              <p className="text-green-300 font-semibold mb-2">📋 Resumo da sua solicitação:</p>
              <div className="text-left space-y-2 text-slate-300">
                <p>
                  <strong>Nick Albion:</strong> {submittedData?.nickname}
                </p>
                <p>
                  <strong>Discord:</strong> {submittedData?.discordName}
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

            <div className="bg-purple-600/20 p-4 rounded-lg border border-purple-500/50">
              <p className="text-purple-300 text-sm text-center">
                🎵 <em>"Eu te amo, você me ama, logo seremos uma família feliz no Albion!"</em> 🎵
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-slate-400 text-sm">
                ⏱️ <strong>Tempo estimado:</strong> 5-15 minutos
              </p>
              <p className="text-slate-400 text-sm">💬 Fique atento às mensagens do servidor, amiguinho!</p>
            </div>

            <div className="flex gap-3 justify-center">
              <Button onClick={() => setCurrentView("admin")} className="bg-blue-600 hover:bg-blue-700">
                👀 Ver Painel Admin
              </Button>
              <Button
                onClick={() => setCurrentView("channel")}
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                🔄 Voltar ao Início
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // 4. Painel do Admin (simulação)
  return (
    <div className="min-h-screen bg-[#36393f] p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Header do Admin */}
        <div className="bg-[#2f3136] p-4 rounded-lg">
          <h2 className="text-white font-semibold flex items-center gap-2">
            <UserCheck className="w-5 h-5" />
            #admin-recrutamento
          </h2>
          <p className="text-gray-400 text-sm">Canal privado - Apenas equipe do Barney</p>
        </div>

        {/* Simulação da mensagem que chegaria */}
        <div className="bg-[#2f3136] p-4 rounded-lg border-l-4 border-purple-500">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-purple-600 flex items-center justify-center">
              <Image
                src="/barney-logo.webp"
                alt="Barney"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-white font-semibold">Sistema do Barney</p>
              <p className="text-gray-400 text-sm">agora às {new Date().toLocaleTimeString("pt-BR")}</p>
            </div>
          </div>

          <div className="bg-[#36393f] p-4 rounded border-l-4 border-purple-500">
            <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
              🦕 Nova Solicitação - Barney e Seus Amigos
              <Badge className="bg-red-600/20 text-red-300 border-red-500/50">PENDENTE</Badge>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-gray-400 text-sm font-semibold">🎮 Nick no Albion</p>
                <p className="text-white text-lg">{submittedData?.nickname}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm font-semibold">💬 Discord</p>
                <p className="text-white text-lg">{submittedData?.discordName}</p>
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
              <p className="text-gray-400 text-sm font-semibold mb-2">🏷️ Cargos do Discord para Adicionar</p>
              <div className="flex flex-wrap gap-2">
                {submittedData?.interests.map((interest: string) => (
                  <Badge key={interest} className="bg-green-600/20 text-green-300 border-green-500/50">
                    {roleMapping[interest]}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mb-4 p-3 bg-blue-600/20 rounded border border-blue-500/50">
              <p className="text-blue-300 text-sm font-semibold mb-2">📝 Instruções para o Admin:</p>
              <div className="text-blue-200 text-sm space-y-1">
                <p>
                  1. Procure o usuário <strong>{submittedData?.discordName}</strong> no servidor
                </p>
                <p>
                  2. Verifique se o nick <strong>{submittedData?.nickname}</strong> existe no Albion
                </p>
                <p>3. Adicione os cargos listados acima ao usuário</p>
                <p>4. Envie mensagem de boas-vindas (opcional)</p>
              </div>
            </div>

            <div className="mb-4 p-3 bg-purple-600/20 rounded border border-purple-500/50">
              <p className="text-purple-300 text-sm text-center">
                🎵 <em>"Mais um amiguinho quer se juntar à nossa família!"</em> 🎵
              </p>
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
