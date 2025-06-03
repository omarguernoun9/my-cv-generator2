import type { CVData, Template } from "@/lib/types"
import { type Language, translations } from "@/lib/translations"
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Calendar,
  Award,
  Briefcase,
  GraduationCap,
  User,
  Languages,
  Heart,
} from "lucide-react"

interface CVTemplate1Props {
  data: CVData
  template: Template
  language: Language
}

export default function CVTemplate1({ data, template, language }: CVTemplate1Props) {
  const t = translations[language]
  const isRTL = language === "ar"

  return (
    <div className={`w-full h-full bg-white text-gray-900 ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      <div className="flex h-full">
        {/* Left Sidebar */}
        <div className="w-1/3 p-6 text-white" style={{ backgroundColor: template.primaryColor }}>
          {/* Profile Photo Placeholder */}
          <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center">
            <User className="h-16 w-16 text-white/60" />
          </div>

          {/* Contact Information */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 border-b border-white/30 pb-2">{t.contact}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span className="break-all">{data.personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{data.personalInfo.phone}</span>
              </div>
              {data.personalInfo.address && (
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5" />
                  <span>
                    {data.personalInfo.address}, {data.personalInfo.city}
                  </span>
                </div>
              )}
              {data.personalInfo.website && (
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span className="break-all">{data.personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {(data.skills.technical.length > 0 || data.skills.soft.length > 0) && (
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4 border-b border-white/30 pb-2">{t.skills}</h3>
              {data.skills.technical.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold mb-2 text-sm">{t.technicalSkills}</h4>
                  <div className="space-y-1">
                    {data.skills.technical.map((skill, index) => (
                      <div key={index} className="text-sm">
                        • {skill}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {data.skills.soft.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2 text-sm">{t.softSkills}</h4>
                  <div className="space-y-1">
                    {data.skills.soft.map((skill, index) => (
                      <div key={index} className="text-sm">
                        • {skill}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Languages */}
          {data.skills.languages.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4 border-b border-white/30 pb-2 flex items-center gap-2">
                <Languages className="h-4 w-4" />
                {t.languages}
              </h3>
              <div className="space-y-1">
                {data.skills.languages.map((language, index) => (
                  <div key={index} className="text-sm">
                    • {language}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2" style={{ color: template.primaryColor }}>
              {data.personalInfo.fullName}
            </h1>
            {data.profileSummary && (
              <div className="mt-4">
                <h2
                  className="text-xl font-semibold mb-3 flex items-center gap-2"
                  style={{ color: template.primaryColor }}
                >
                  <User className="h-5 w-5" />
                  {t.profileSummary}
                </h2>
                <p className="text-gray-700 leading-relaxed">{data.profileSummary}</p>
              </div>
            )}
          </div>

          {/* Work Experience */}
          {data.workExperience.some((exp) => exp.company || exp.position) && (
            <div className="mb-8">
              <h2
                className="text-xl font-semibold mb-4 flex items-center gap-2 border-b-2 pb-2"
                style={{ color: template.primaryColor, borderColor: template.primaryColor }}
              >
                <Briefcase className="h-5 w-5" />
                {t.workExperience}
              </h2>
              <div className="space-y-6">
                {data.workExperience.map(
                  (exp, index) =>
                    (exp.company || exp.position) && (
                      <div key={index} className="relative pl-6">
                        <div
                          className="absolute left-0 top-2 w-2 h-2 rounded-full"
                          style={{ backgroundColor: template.primaryColor }}
                        ></div>
                        <div className="absolute left-0.5 top-4 w-0.5 h-full bg-gray-200"></div>
                        <h3 className="font-semibold text-lg">{exp.position}</h3>
                        <p className="font-medium text-gray-600">{exp.company}</p>
                        {exp.startDate && (
                          <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                            <Calendar className="h-3 w-3" />
                            {exp.startDate} - {exp.current ? t.present : exp.endDate}
                          </p>
                        )}
                        {exp.description && <p className="text-gray-700 mt-2 leading-relaxed">{exp.description}</p>}
                      </div>
                    ),
                )}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education.some((edu) => edu.institution || edu.degree) && (
            <div className="mb-8">
              <h2
                className="text-xl font-semibold mb-4 flex items-center gap-2 border-b-2 pb-2"
                style={{ color: template.primaryColor, borderColor: template.primaryColor }}
              >
                <GraduationCap className="h-5 w-5" />
                {t.education}
              </h2>
              <div className="space-y-4">
                {data.education.map(
                  (edu, index) =>
                    (edu.institution || edu.degree) && (
                      <div key={index} className="relative pl-6">
                        <div
                          className="absolute left-0 top-2 w-2 h-2 rounded-full"
                          style={{ backgroundColor: template.primaryColor }}
                        ></div>
                        <h3 className="font-semibold">{edu.degree}</h3>
                        <p className="font-medium text-gray-600">{edu.institution}</p>
                        {edu.fieldOfStudy && <p className="text-gray-600">{edu.fieldOfStudy}</p>}
                        {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                        <div className="flex gap-4 text-sm text-gray-500 mt-1">
                          {edu.startDate && (
                            <span>
                              {edu.startDate} - {edu.endDate}
                            </span>
                          )}
                        </div>
                      </div>
                    ),
                )}
              </div>
            </div>
          )}

          {/* Volunteer Experience */}
          {data.volunteerExperience.some((vol) => vol.organization || vol.role) && (
            <div className="mb-8">
              <h2
                className="text-xl font-semibold mb-4 flex items-center gap-2 border-b-2 pb-2"
                style={{ color: template.primaryColor, borderColor: template.primaryColor }}
              >
                <Heart className="h-5 w-5" />
                {t.volunteerExperience}
              </h2>
              <div className="space-y-4">
                {data.volunteerExperience.map(
                  (vol, index) =>
                    (vol.organization || vol.role) && (
                      <div key={index} className="relative pl-6">
                        <div
                          className="absolute left-0 top-2 w-2 h-2 rounded-full"
                          style={{ backgroundColor: template.primaryColor }}
                        ></div>
                        <h3 className="font-semibold">{vol.role}</h3>
                        <p className="font-medium text-gray-600">{vol.organization}</p>
                        {vol.startDate && (
                          <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                            <Calendar className="h-3 w-3" />
                            {vol.startDate} - {vol.endDate}
                          </p>
                        )}
                        {vol.description && <p className="text-gray-700 mt-2">{vol.description}</p>}
                      </div>
                    ),
                )}
              </div>
            </div>
          )}

          {/* Certifications */}
          {data.certifications.some((cert) => cert.name || cert.issuer) && (
            <div>
              <h2
                className="text-xl font-semibold mb-4 flex items-center gap-2 border-b-2 pb-2"
                style={{ color: template.primaryColor, borderColor: template.primaryColor }}
              >
                <Award className="h-5 w-5" />
                {t.certifications}
              </h2>
              <div className="space-y-3">
                {data.certifications.map(
                  (cert, index) =>
                    (cert.name || cert.issuer) && (
                      <div key={index} className="relative pl-6">
                        <div
                          className="absolute left-0 top-2 w-2 h-2 rounded-full"
                          style={{ backgroundColor: template.primaryColor }}
                        ></div>
                        <h3 className="font-semibold">{cert.name}</h3>
                        <p className="text-gray-600">{cert.issuer}</p>
                        {cert.date && <p className="text-sm text-gray-500">{cert.date}</p>}
                      </div>
                    ),
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
