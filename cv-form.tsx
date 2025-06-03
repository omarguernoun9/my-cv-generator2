"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, Trash2, User, GraduationCap, Briefcase, Award } from "lucide-react"
import type { Template, CVData, CVType, CVCategory } from "@/lib/types"
import { translations, type Language } from "@/lib/translations"

interface CVFormProps {
  template: Template
  language: Language
  cvType: CVType
  category: CVCategory
  onSubmit: (data: CVData) => void
  onBack: () => void
}

export default function CVForm({ template, language, cvType, category, onSubmit, onBack }: CVFormProps) {
  const t = translations[language]
  const isRTL = language === "ar"

  const [formData, setFormData] = useState<CVData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      country: "",
      postalCode: "",
      dateOfBirth: "",
      nationality: "",
      linkedIn: "",
      website: "",
    },
    profileSummary: "",
    education: [
      {
        institution: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        gpa: "",
        description: "",
      },
    ],
    workExperience: [
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
        location: "",
      },
    ],
    skills: {
      technical: [],
      soft: [],
      languages: [],
    },
    certifications: [
      {
        name: "",
        issuer: "",
        date: "",
        expiryDate: "",
        credentialId: "",
      },
    ],
    volunteerExperience: [
      {
        organization: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    references: [
      {
        name: "",
        position: "",
        company: "",
        email: "",
        phone: "",
        relationship: "",
      },
    ],
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Personal Info validation
    if (!formData.personalInfo.fullName.trim()) {
      newErrors["personalInfo.fullName"] = t.required
    }
    if (!formData.personalInfo.email.trim()) {
      newErrors["personalInfo.email"] = t.required
    } else if (!/\S+@\S+\.\S+/.test(formData.personalInfo.email)) {
      newErrors["personalInfo.email"] = t.invalidEmail
    }
    if (!formData.personalInfo.phone.trim()) {
      newErrors["personalInfo.phone"] = t.required
    }

    // Profile Summary validation
    if (!formData.profileSummary.trim()) {
      newErrors["profileSummary"] = t.required
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          institution: "",
          degree: "",
          fieldOfStudy: "",
          startDate: "",
          endDate: "",
          gpa: "",
          description: "",
        },
      ],
    }))
  }

  const removeEducation = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }))
  }

  const addWorkExperience = () => {
    setFormData((prev) => ({
      ...prev,
      workExperience: [
        ...prev.workExperience,
        {
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
          location: "",
        },
      ],
    }))
  }

  const removeWorkExperience = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.filter((_, i) => i !== index),
    }))
  }

  const addSkill = (category: "technical" | "soft" | "languages", skill: string) => {
    if (skill.trim()) {
      setFormData((prev) => ({
        ...prev,
        skills: {
          ...prev.skills,
          [category]: [...prev.skills[category], skill.trim()],
        },
      }))
    }
  }

  const removeSkill = (category: "technical" | "soft" | "languages", index: number) => {
    setFormData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: prev.skills[category].filter((_, i) => i !== index),
      },
    }))
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 ${isRTL ? "rtl" : "ltr"}`}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t.back}
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t.createCV} - {template.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">{t.fillInformation}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {t.personalInformation}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">{t.fullName} *</Label>
                  <Input
                    id="fullName"
                    value={formData.personalInfo.fullName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, fullName: e.target.value },
                      }))
                    }
                    className={errors["personalInfo.fullName"] ? "border-red-500" : ""}
                  />
                  {errors["personalInfo.fullName"] && (
                    <p className="text-red-500 text-sm mt-1">{errors["personalInfo.fullName"]}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email">{t.email} *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.personalInfo.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, email: e.target.value },
                      }))
                    }
                    className={errors["personalInfo.email"] ? "border-red-500" : ""}
                  />
                  {errors["personalInfo.email"] && (
                    <p className="text-red-500 text-sm mt-1">{errors["personalInfo.email"]}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="phone">{t.phone} *</Label>
                  <Input
                    id="phone"
                    value={formData.personalInfo.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, phone: e.target.value },
                      }))
                    }
                    className={errors["personalInfo.phone"] ? "border-red-500" : ""}
                  />
                  {errors["personalInfo.phone"] && (
                    <p className="text-red-500 text-sm mt-1">{errors["personalInfo.phone"]}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="address">{t.address}</Label>
                  <Input
                    id="address"
                    value={formData.personalInfo.address}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, address: e.target.value },
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="city">{t.city}</Label>
                  <Input
                    id="city"
                    value={formData.personalInfo.city}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, city: e.target.value },
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="country">{t.country}</Label>
                  <Input
                    id="country"
                    value={formData.personalInfo.country}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, country: e.target.value },
                      }))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Summary */}
          <Card>
            <CardHeader>
              <CardTitle>{t.profileSummary} *</CardTitle>
              <CardDescription>{t.profileSummaryDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.profileSummary}
                onChange={(e) => setFormData((prev) => ({ ...prev, profileSummary: e.target.value }))}
                rows={4}
                className={errors["profileSummary"] ? "border-red-500" : ""}
              />
              {errors["profileSummary"] && <p className="text-red-500 text-sm mt-1">{errors["profileSummary"]}</p>}
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                {t.education}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.education.map((edu, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">
                      {t.education} {index + 1}
                    </h4>
                    {formData.education.length > 1 && (
                      <Button type="button" variant="outline" size="sm" onClick={() => removeEducation(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>{t.institution}</Label>
                      <Input
                        value={edu.institution}
                        onChange={(e) => {
                          const newEducation = [...formData.education]
                          newEducation[index].institution = e.target.value
                          setFormData((prev) => ({ ...prev, education: newEducation }))
                        }}
                      />
                    </div>
                    <div>
                      <Label>{t.degree}</Label>
                      <Input
                        value={edu.degree}
                        onChange={(e) => {
                          const newEducation = [...formData.education]
                          newEducation[index].degree = e.target.value
                          setFormData((prev) => ({ ...prev, education: newEducation }))
                        }}
                      />
                    </div>
                    <div>
                      <Label>{t.fieldOfStudy}</Label>
                      <Input
                        value={edu.fieldOfStudy}
                        onChange={(e) => {
                          const newEducation = [...formData.education]
                          newEducation[index].fieldOfStudy = e.target.value
                          setFormData((prev) => ({ ...prev, education: newEducation }))
                        }}
                      />
                    </div>
                    <div>
                      <Label>{t.gpa}</Label>
                      <Input
                        value={edu.gpa}
                        onChange={(e) => {
                          const newEducation = [...formData.education]
                          newEducation[index].gpa = e.target.value
                          setFormData((prev) => ({ ...prev, education: newEducation }))
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addEducation}>
                <Plus className="h-4 w-4 mr-2" />
                {t.addEducation}
              </Button>
            </CardContent>
          </Card>

          {/* Work Experience */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                {t.workExperience}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.workExperience.map((work, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">
                      {t.workExperience} {index + 1}
                    </h4>
                    {formData.workExperience.length > 1 && (
                      <Button type="button" variant="outline" size="sm" onClick={() => removeWorkExperience(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>{t.company}</Label>
                      <Input
                        value={work.company}
                        onChange={(e) => {
                          const newWork = [...formData.workExperience]
                          newWork[index].company = e.target.value
                          setFormData((prev) => ({ ...prev, workExperience: newWork }))
                        }}
                      />
                    </div>
                    <div>
                      <Label>{t.position}</Label>
                      <Input
                        value={work.position}
                        onChange={(e) => {
                          const newWork = [...formData.workExperience]
                          newWork[index].position = e.target.value
                          setFormData((prev) => ({ ...prev, workExperience: newWork }))
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>{t.description}</Label>
                    <Textarea
                      value={work.description}
                      onChange={(e) => {
                        const newWork = [...formData.workExperience]
                        newWork[index].description = e.target.value
                        setFormData((prev) => ({ ...prev, workExperience: newWork }))
                      }}
                      rows={3}
                    />
                  </div>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addWorkExperience}>
                <Plus className="h-4 w-4 mr-2" />
                {t.addWorkExperience}
              </Button>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                {t.skills}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Technical Skills */}
              <div>
                <Label className="text-base font-medium">{t.technicalSkills}</Label>
                <div className="flex flex-wrap gap-2 mt-2 mb-2">
                  {formData.skills.technical.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => removeSkill("technical", index)}
                    >
                      {skill} ×
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder={t.addSkill}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addSkill("technical", e.currentTarget.value)
                        e.currentTarget.value = ""
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling as HTMLInputElement
                      addSkill("technical", input.value)
                      input.value = ""
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Soft Skills */}
              <div>
                <Label className="text-base font-medium">{t.softSkills}</Label>
                <div className="flex flex-wrap gap-2 mt-2 mb-2">
                  {formData.skills.soft.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => removeSkill("soft", index)}
                    >
                      {skill} ×
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder={t.addSkill}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addSkill("soft", e.currentTarget.value)
                        e.currentTarget.value = ""
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling as HTMLInputElement
                      addSkill("soft", input.value)
                      input.value = ""
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Languages */}
              <div>
                <Label className="text-base font-medium">{t.languages}</Label>
                <div className="flex flex-wrap gap-2 mt-2 mb-2">
                  {formData.skills.languages.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => removeSkill("languages", index)}
                    >
                      {skill} ×
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder={t.addLanguage}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addSkill("languages", e.currentTarget.value)
                        e.currentTarget.value = ""
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling as HTMLInputElement
                      addSkill("languages", input.value)
                      input.value = ""
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onBack}>
              {t.back}
            </Button>
            <Button type="submit" className="px-8">
              {t.generateCV}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
