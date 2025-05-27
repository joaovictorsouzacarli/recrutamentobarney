"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Crown, User, Clock } from "lucide-react"

// Simulação de como seria a mensagem que o admin receberia
export default function AdminPanel() {
  const pendingRequests = [
    {
      id: 1,
      nickname: "PlayerExample123",
      guild: "Black Legion",
      interests: ["pvp", "cacada", "dg-grupo"],
      timestamp: "2024-01-15 14:30:25",
      discordUser: "player123#1234",
    },
    {
      id: 2,
      nickname: "GathererPro",
      guild: "",
      interests: ["coleta", "dg-ava", "outros"],
      timestamp: "2024-01-15 14:28:10",
      discordUser: "gatherer#5678",
    },
  ]

  const interestLabels: Record<string, string> = {
    pvp: "PVP",
    cacada: "Caçada",
    "dg-grupo": "DG Grupo",
    "dg-ava": "DG Ava",
    coleta: "Coleta",
    outros: "Outros",
  }

  const roleMapping: Record<string, string> = {
    pvp: "@PVP",
    cacada: "@Caçador",
    "dg-grupo": "@DG-Grupo",
    "dg-ava": "@DG-Solo",
    coleta: "@Coletor",
    outros: "@Membro",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="bg-slate-800/90 border-blue-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Crown className="w-6 h-6" />
              Painel de Administração - Novos Membros
            </CardTitle>
            <CardDescription className="text-slate-300">Solicitações de entrada pendentes de aprovação</CardDescription>
          </CardHeader>
        </Card>

        {pendingRequests.map((request) => (
          <Card key={request.id} className="bg-slate-800/90 border-slate-600/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-slate-200 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  {request.nickname}
                </CardTitle>
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Clock className="w-4 h-4" />
                  {request.timestamp}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-400 text-sm">Discord:</p>
                  <p className="text-slate-200">{request.discordUser}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Guild:</p>
                  <p className="text-slate-200">{request.guild || "Sem guild"}</p>
                </div>
              </div>

              <div>
                <p className="text-slate-400 text-sm mb-2">Interesses:</p>
                <div className="flex flex-wrap gap-2">
                  {request.interests.map((interest) => (
                    <Badge key={interest} variant="secondary" className="bg-purple-600/20 text-purple-300">
                      {interestLabels[interest]}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-slate-400 text-sm mb-2">Cargos sugeridos:</p>
                <div className="flex flex-wrap gap-2">
                  {request.interests.map((interest) => (
                    <Badge key={interest} variant="outline" className="border-green-500/50 text-green-400">
                      {roleMapping[interest]}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="bg-green-600 hover:bg-green-700">✅ Aprovar e Dar Cargos</Button>
                <Button variant="outline" className="border-yellow-500/50 text-yellow-400">
                  ⏸️ Pendente
                </Button>
                <Button variant="outline" className="border-red-500/50 text-red-400">
                  ❌ Rejeitar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
