"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Send, Copy, Check } from "lucide-react"

export default function WebhookIntegration() {
  const [webhookUrl, setWebhookUrl] = useState("")
  const [testData, setTestData] = useState({
    nickname: "PlayerTeste123",
    guild: "Black Legion",
    interests: ["PVP", "Caçada", "DG Grupo"],
  })
  const [isSending, setIsSending] = useState(false)
  const [lastResponse, setLastResponse] = useState("")
  const [copied, setCopied] = useState(false)

  // Função que envia os dados para o Discord
  const sendToDiscord = async (formData: any) => {
    if (!webhookUrl) {
      alert("Configure a URL do Webhook primeiro!")
      return
    }

    setIsSending(true)

    try {
      // Monta a mensagem que será enviada para o Discord
      const discordMessage = {
        embeds: [
          {
            title: "🆕 Novo Membro - Albion Brasil",
            description: "Um novo player quer entrar no servidor!",
            color: 0x7c3aed, // Cor roxa
            fields: [
              {
                name: "🎮 Nick no Albion",
                value: formData.nickname,
                inline: true,
              },
              {
                name: "⚔️ Guild",
                value: formData.guild || "Sem guild",
                inline: true,
              },
              {
                name: "📋 Interesses",
                value: formData.interests.join(", "),
                inline: false,
              },
            ],
            footer: {
              text: `Enviado em ${new Date().toLocaleString("pt-BR")}`,
            },
            thumbnail: {
              url: "https://cdn.discordapp.com/attachments/123/456/albion-logo.png", // Logo do Albion (opcional)
            },
          },
        ],
      }

      // Envia para o Discord
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(discordMessage),
      })

      if (response.ok) {
        setLastResponse("✅ Mensagem enviada com sucesso para o Discord!")
      } else {
        setLastResponse(`❌ Erro: ${response.status} - ${response.statusText}`)
      }
    } catch (error) {
      setLastResponse(`❌ Erro ao enviar: ${error}`)
    }

    setIsSending(false)
  }

  const exampleCode = `// Código para integrar no seu formulário
const sendToDiscord = async (formData) => {
  const webhookUrl = "${webhookUrl || "SUA_WEBHOOK_URL_AQUI"}"
  
  const discordMessage = {
    embeds: [{
      title: "🆕 Novo Membro - Albion Brasil",
      description: "Um novo player quer entrar no servidor!",
      color: 0x7c3aed,
      fields: [
        {
          name: "🎮 Nick no Albion",
          value: formData.nickname,
          inline: true
        },
        {
          name: "⚔️ Guild", 
          value: formData.guild || "Sem guild",
          inline: true
        },
        {
          name: "📋 Interesses",
          value: formData.interests.join(", "),
          inline: false
        }
      ],
      footer: {
        text: \`Enviado em \${new Date().toLocaleString('pt-BR')}\`
      }
    }]
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(discordMessage)
  })
  
  return response.ok
}`

  const copyCode = () => {
    navigator.clipboard.writeText(exampleCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Configuração do Webhook */}
        <Card className="bg-slate-800/90 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-purple-400">🔗 Configuração do Discord Webhook</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-slate-200">URL do Webhook do Discord:</Label>
              <Input
                placeholder="https://discord.com/api/webhooks/123456789/abcdef..."
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="bg-slate-700/50 border-slate-600 text-slate-100 mt-2"
              />
              <p className="text-slate-400 text-sm mt-1">Cole aqui a URL do webhook que você criou no Discord</p>
            </div>
          </CardContent>
        </Card>

        {/* Teste do Webhook */}
        <Card className="bg-slate-800/90 border-slate-600/50">
          <CardHeader>
            <CardTitle className="text-slate-200">🧪 Testar Webhook</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-slate-200">Nick:</Label>
                <Input
                  value={testData.nickname}
                  onChange={(e) => setTestData((prev) => ({ ...prev, nickname: e.target.value }))}
                  className="bg-slate-700/50 border-slate-600 text-slate-100 mt-1"
                />
              </div>
              <div>
                <Label className="text-slate-200">Guild:</Label>
                <Input
                  value={testData.guild}
                  onChange={(e) => setTestData((prev) => ({ ...prev, guild: e.target.value }))}
                  className="bg-slate-700/50 border-slate-600 text-slate-100 mt-1"
                />
              </div>
              <div>
                <Label className="text-slate-200">Interesses:</Label>
                <Input
                  value={testData.interests.join(", ")}
                  onChange={(e) => setTestData((prev) => ({ ...prev, interests: e.target.value.split(", ") }))}
                  className="bg-slate-700/50 border-slate-600 text-slate-100 mt-1"
                />
              </div>
            </div>

            <Button
              onClick={() => sendToDiscord(testData)}
              disabled={!webhookUrl || isSending}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Send className="w-4 h-4 mr-2" />
              {isSending ? "Enviando..." : "Testar Envio"}
            </Button>

            {lastResponse && (
              <div className="p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                <p className="text-slate-200">{lastResponse}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Código de Exemplo */}
        <Card className="bg-slate-800/90 border-slate-600/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-slate-200">💻 Código para Integração</CardTitle>
              <Button onClick={copyCode} variant="outline" size="sm" className="border-slate-600">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copiado!" : "Copiar"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={exampleCode}
              readOnly
              className="bg-slate-900/50 border-slate-600 text-slate-100 font-mono text-sm min-h-[400px]"
            />
          </CardContent>
        </Card>

        {/* Como Funciona */}
        <Card className="bg-slate-800/90 border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-blue-400">📚 Como Funciona:</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-slate-300">
            <div className="flex items-start gap-3">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                1
              </span>
              <p>Player preenche o formulário no seu site/aplicação</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                2
              </span>
              <p>Seu código JavaScript envia os dados para a URL do webhook</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                3
              </span>
              <p>Discord recebe automaticamente e posta no canal configurado</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                4
              </span>
              <p>Admin vê a mensagem e pode dar os cargos manualmente</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
