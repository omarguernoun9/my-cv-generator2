"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Edit, RotateCcw, FileText, Share2 } from "lucide-react"
import type { Template, CVData } from "@/lib/types"
import { translations, type Language } from "@/lib/translations"
import { generatePDF, generateWord } from "@/lib/export"
import CVTemplate1 from "@/components/templates/cv-template-1"
import CVTemplate2 from "@/components/templates/cv-template-2"
import CVTemplate3 from "@/components/templates/cv-template-3"

interface CVPreviewProps {
  template: Template
  data: CVData
  language: Language
  onBack: () => void
  onEdit: () => void
  onReset: () => void
}

const templateComponents = {
  "modern-professional": CVTemplate1,
  "creative-designer": CVTemplate2,
  "classic-corporate": CVTemplate3,
  "minimalist-clean": CVTemplate1,
  "academic-research": CVTemplate2,
  "tech-developer": CVTemplate3,
  "healthcare-medical": CVTemplate1,
  "sales-marketing": CVTemplate2,
  "executive-leadership": CVTemplate3,
  "student-graduate": CVTemplate1,
}

export default function CVPreview({ template, data, language, onBack, onEdit, onReset }: CVPreviewProps) {
  const t = translations[language]
  const isRTL = language === "ar"
  const [isExporting, setIsExporting] = useState(false)

  const TemplateComponent = templateComponents[template.id as keyof typeof templateComponents] || CVTemplate1

  const handleExportPDF = async () => {
    setIsExporting(true)
    try {
      await generatePDF(data, template, language)
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setIsExporting(false)
    }
  }

  const handleExportWord = async () => {
    setIsExporting(true)
    try {
      await generateWord(data, template, language)
    } catch (error) {
      console.error("Error generating Word document:", error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 ${isRTL ? "rtl" : "ltr"}`}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t.back}
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t.cvPreview}</h1>
              <p className="text-gray-600 dark:text-gray-300">
                {template.name} - {data.personalInfo.fullName}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={onEdit}>
              <Edit className="h-4 w-4 mr-2" />
              {t.edit}
            </Button>
            <Button variant="outline" onClick={onReset}>
              <RotateCcw className="h-4 w-4 mr-2" />
              {t.startOver}
            </Button>
            <Button onClick={handleExportPDF} disabled={isExporting}>
              <Download className="h-4 w-4 mr-2" />
              {isExporting ? t.exporting : t.downloadPDF}
            </Button>
            <Button variant="outline" onClick={handleExportWord} disabled={isExporting}>
              <FileText className="h-4 w-4 mr-2" />
              {isExporting ? t.exporting : t.downloadWord}
            </Button>
          </div>
        </div>

        {/* CV Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Preview Panel */}
          <div className="lg:col-span-3">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-white min-h-[1123px] w-full" style={{ aspectRatio: "210/297" }}>
                  <TemplateComponent data={data} template={template} language={language} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t.exportOptions}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" onClick={handleExportPDF} disabled={isExporting}>
                  <Download className="h-4 w-4 mr-2" />
                  {isExporting ? t.exporting : t.downloadPDF}
                </Button>
                <Button variant="outline" className="w-full" onClick={handleExportWord} disabled={isExporting}>
                  <FileText className="h-4 w-4 mr-2" />
                  {isExporting ? t.exporting : t.downloadWord}
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="h-4 w-4 mr-2" />
                  {t.share}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t.templateInfo}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">{template.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{template.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {template.features.map((feature, index) => (
                      <span key={index} className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t.quickActions}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full" onClick={onEdit}>
                  <Edit className="h-4 w-4 mr-2" />
                  {t.editCV}
                </Button>
                <Button variant="outline" className="w-full" onClick={onReset}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  {t.chooseNewTemplate}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
