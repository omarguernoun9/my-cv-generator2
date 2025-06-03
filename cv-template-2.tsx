import type { CVData, Template } from "@/lib/types"
import { type Language, translations } from "@/lib/translations"
import { Mail, Phone, MapPin, Globe, Award, Briefcase, GraduationCap, User, Languages, Heart } from "lucide-react"

interface CVTemplate2Props {
  data: CVData
  template: Template
  language: Language
}

export default function CVTemplate2({ data, template, language }: CVTemplate2Props) {
  const t = translations[language]
  const isRTL = language === "ar"

  return (
    <div className={`w-full h-full bg-white text-gray-900 ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      {/* Header Section */}
      <div
        className="p-8 text-white"
        style={{ background: `linear-gradient(135deg, ${template.primaryColor}, ${template.secondaryColor})` }}
      >
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
            <User className="h-12 w-12 text-white/80" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{data.personalInfo.fullName}</h1>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{data.personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{data.personalInfo.phone}</span>
              </div>
              {data.personalInfo.address && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {data.personalInfo.city}, {data.personalInfo.country}
                  </span>
                </div>
              )}
              {data.personalInfo.website && (
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>{data.personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Profile Summary */}
        {data.profileSummary && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2" style={{ color: template.primaryColor }}>
              <User className="h-6 w-6" />
              {t.profileSummary}
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg border-l-4" style={{ borderColor: template.primaryColor }}>
              <p className="text-gray-700 leading-relaxed">{data.profileSummary}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Work Experience */}
            {data.workExperience.some((exp) => exp.company || exp.position) && (
              <div>
                <h2
                  className="text-2xl font-bold mb-6 flex items-center gap-2"
                  style={{ color: template.primaryColor }}
                >
                  <Briefcase className="h-6 w-6" />
                  {t.workExperience}
                </h2>
                <div className="space-y-6">
                  {data.workExperience.map(
                    (exp, index) =>
                      (exp.company || exp.position) && (
                        <div key={index} className="bg-white border rounded-lg p-6 shadow-sm">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="text-xl font-semibold" style={{ color: template.primaryColor }}>
                                {exp.position}
                              </h3>
                              <p className="text-lg font-medium text-gray-600">{exp.company}</p>
                            </div>
                            {exp.startDate && (
                              <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                {exp.startDate} - {exp.current ? t.present : exp.endDate}
                              </div>
                            )}
                          </div>
                          {exp.description && <p className="text-gray-700 leading-relaxed">{exp.description}</p>}
                        </div>
                      ),
                  )}
                </div>
              </div>
            )}

            {/* Education */}
            {data.education.some((edu) => edu.institution || edu.degree) && (
              <div>
                <h2
                  className="text-2xl font-bold mb-6 flex items-center gap-2"
                  style={{ color: template.primaryColor }}
                >
                  <GraduationCap className="h-6 w-6" />
                  {t.education}
                </h2>
                <div className="space-y-4">
                  {data.education.map(
                    (edu, index) =>
                      (edu.institution || edu.degree) && (
                        <div key={index} className="bg-white border rounded-lg p-6 shadow-sm">
                          <h3 className="text-lg font-semibold" style={{ color: template.primaryColor }}>
                            {edu.degree}
                          </h3>
                          <p className="font-medium text-gray-600">{edu.institution}</p>
                          {edu.fieldOfStudy && <p className="text-gray-600">{edu.fieldOfStudy}</p>}
                          <div className="flex justify-between items-center mt-2">
                            {edu.startDate && (
                              <span className="text-sm text-gray-500">
                                {edu.startDate} - {edu.endDate}
                              </span>
                            )}
                            {edu.gpa && (
                              <span className="text-sm font-medium" style={{ color: template.primaryColor }}>
                                GPA: {edu.gpa}
                              </span>
                            )}
                          </div>
                        </div>
                      ),
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Skills */}
            {(data.skills.technical.length > 0 || data.skills.soft.length > 0) && (
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4" style={{ color: template.primaryColor }}>
                  {t.skills}
                </h3>
                {data.skills.technical.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-gray-700">{t.technicalSkills}</h4>
                    <div className="flex flex-wrap gap-2">
                      {data.skills.technical.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-white px-3 py-1 rounded-full text-sm border"
                          style={{ borderColor: template.primaryColor, color: template.primaryColor }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {data.skills.soft.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-700">{t.softSkills}</h4>
                    <div className="flex flex-wrap gap-2">
                      {data.skills.soft.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-white px-3 py-1 rounded-full text-sm border"
                          style={{ borderColor: template.secondaryColor, color: template.secondaryColor }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Languages */}
            {data.skills.languages.length > 0 && (
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: template.primaryColor }}>
                  <Languages className="h-5 w-5" />
                  {t.languages}
                </h3>
                <div className="space-y-2">
                  {data.skills.languages.map((language, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="font-medium">{language}</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((dot) => (
                          <div
                            key={dot}
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: template.primaryColor }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {data.certifications.some((cert) => cert.name || cert.issuer) && (
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: template.primaryColor }}>
                  <Award className="h-5 w-5" />
                  {t.certifications}
                </h3>
                <div className="space-y-3">
                  {data.certifications.map(
                    (cert, index) =>
                      (cert.name || cert.issuer) && (
                        <div
                          key={index}
                          className="bg-white p-3 rounded border-l-4"
                          style={{ borderColor: template.primaryColor }}
                        >
                          <h4 className="font-semibold text-sm">{cert.name}</h4>
                          <p className="text-xs text-gray-600">{cert.issuer}</p>
                          {cert.date && <p className="text-xs text-gray-500 mt-1">{cert.date}</p>}
                        </div>
                      ),
                  )}
                </div>
              </div>
            )}

            {/* Volunteer Experience */}
            {data.volunteerExperience.some((vol) => vol.organization || vol.role) && (
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: template.primaryColor }}>
                  <Heart className="h-5 w-5" />
                  {t.volunteerExperience}
                </h3>
                <div className="space-y-3">
                  {data.volunteerExperience.map(
                    (vol, index) =>
                      (vol.organization || vol.role) && (
                        <div
                          key={index}
                          className="bg-white p-3 rounded border-l-4"
                          style={{ borderColor: template.primaryColor }}
                        >
                          <h4 className="font-semibold text-sm">{vol.role}</h4>
                          <p className="text-xs text-gray-600">{vol.organization}</p>
                          {vol.startDate && (
                            <p className="text-xs text-gray-500 mt-1">
                              {vol.startDate} - {vol.endDate}
                            </p>
                          )}
                        </div>
                      ),
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
