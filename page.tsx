"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Moon, Sun, FileText, Eye, Palette } from "lucide-react"
import { useTheme } from "next-themes"
import CVForm from "@/components/cv-form"
import CVPreview from "@/components/cv-preview"
import { translations, type Language, type CVType, type CVCategory } from "@/lib/translations"
import type { CVData, Template } from "@/lib/types"
import { templates } from "@/lib/templates"

export default function CVGenerator() {
  const { theme, setTheme } = useTheme()
  const [currentStep, setCurrentStep] = useState<"selection" | "form" | "preview">("selection")
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("en")
  const [selectedCVType, setSelectedCVType] = useState<CVType>("canadian")
  const [selectedCategory, setSelectedCategory] = useState<CVCategory>("student")
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [cvData, setCVData] = useState<CVData | null>(null)

  const t = translations[selectedLanguage]
  const isRTL = selectedLanguage === "ar"

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template)
    setCurrentStep("form")
  }

  const handleFormSubmit = (data: CVData) => {
    setCVData(data)
    setCurrentStep("preview")
  }

  const resetToSelection = () => {
    setCurrentStep("selection")
    setSelectedTemplate(null)
    setCVData(null)
  }

  if (currentStep === "form" && selectedTemplate) {
    return (
      <CVForm
        template={selectedTemplate}
        language={selectedLanguage}
        cvType={selectedCVType}
        category={selectedCategory}
        onSubmit={handleFormSubmit}
        onBack={() => setCurrentStep("selection")}
      />
    )
  }

  if (currentStep === "preview" && selectedTemplate && cvData) {
    return (
      <CVPreview
        template={selectedTemplate}
        data={cvData}
        language={selectedLanguage}
        onBack={() => setCurrentStep("form")}
        onEdit={() => setCurrentStep("form")}
        onReset={resetToSelection}
      />
    )
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 ${isRTL ? "rtl" : "ltr"}`}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{t.title}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">{t.subtitle}</p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={selectedLanguage} onValueChange={(value: Language) => setSelectedLanguage(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="ar">العربية</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* CV Type and Category Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {t.cvTypeSelection}
            </CardTitle>
            <CardDescription>{t.cvTypeDescription}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">{t.cvType}</label>
                <Select value={selectedCVType} onValueChange={(value: CVType) => setSelectedCVType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="canadian">{t.canadian}</SelectItem>
                    <SelectItem value="european">{t.european}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t.category}</label>
                <Select value={selectedCategory} onValueChange={(value: CVCategory) => setSelectedCategory(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">{t.student}</SelectItem>
                    <SelectItem value="skilled">{t.skilledWorker}</SelectItem>
                    <SelectItem value="unskilled">{t.unskilledWorker}</SelectItem>
                    <SelectItem value="volunteer">{t.volunteer}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Template Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              {t.templateSelection}
            </CardTitle>
            <CardDescription>{t.templateDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {templates.map((template) => (
                <Card
                  key={template.id}
                  className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 border-2 hover:border-primary"
                  onClick={() => handleTemplateSelect(template)}
                >
                  <CardHeader className="pb-3">
                    <div
                      className="aspect-[3/4] bg-gradient-to-br rounded-lg mb-3 relative overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${template.primaryColor}, ${template.secondaryColor})`,
                      }}
                    >
                      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm">
                        <div className="p-4 space-y-2">
                          <div className="h-2 bg-white/30 rounded w-3/4"></div>
                          <div className="h-1 bg-white/20 rounded w-1/2"></div>
                          <div className="h-1 bg-white/20 rounded w-2/3"></div>
                          <div className="mt-4 space-y-1">
                            <div className="h-1 bg-white/25 rounded w-full"></div>
                            <div className="h-1 bg-white/25 rounded w-4/5"></div>
                            <div className="h-1 bg-white/25 rounded w-3/5"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription className="text-sm">{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {template.features.slice(0, 2).map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <Button className="w-full" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      {t.selectTemplate}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
