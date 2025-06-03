import type { CVData, Template } from "@/lib/types"
import { type Language, translations } from "@/lib/translations"
import { Mail, Phone, MapPin, Globe, Award, Briefcase, GraduationCap, Languages, Heart } from "lucide-react"

interface CVTemplate3Props {
  data: CVData
  template: Template
  language: Language
}

export default function CVTemplate3({ data, template, language }: CVTemplate3Props) {
  const t = translations[language]
  const isRTL = language === "ar"

  return (
    <div className={`w-full h-full bg-white text-gray-900 ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="border-b-4 p-8" style={{ borderColor: template.primaryColor }}>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2" style={{ color: template.primaryColor }}>
            {data.personalInfo.fullName}
          </h1>
          <div className="flex justify-center items-center gap-6 text-sm text-gray-600 flex-wrap">
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span>{data.personalInfo.email}</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>{data.personalInfo.phone}</span>
            </div>
            {data.personalInfo.address && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>
                  {data.personalInfo.city}, {data.personalInfo.country}
                </span>
              </div>
            )}
            {data.personalInfo.website && (
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                <span>{data.personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Profile Summary */}
        {data.profileSummary && (
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold mb-4" style={{ color: template.primaryColor }}>
              {t.profileSummary}
            </h2>
            <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto text-lg">{data.profileSummary}</p>
          </div>
        )}

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Work Experience */}
            {data.workExperience.some((exp) => exp.company || exp.position) && (
              <div>
                <h2
                  className="text-2xl font-bold mb-6 text-center pb-2 border-b-2"
                  style={{ color: template.primaryColor, borderColor: template.primaryColor }}
                >
                  <Briefcase className="h-6 w-6 inline mr-2" />
                  {t.workExperience}
                </h2>
                <div className="space-y-6">
                  {data.workExperience.map(
                    (exp, index) =>
                      (exp.company || exp.position) && (
                        <div key={index} className="text-center">
                          <h3 className="text-xl font-bold" style={{ color: template.primaryColor }}>
                            {exp.position}
                          </h3>
                          <p className="text-lg font-semibold text-gray-600 mb-1">{exp.company}</p>
                          {exp.startDate && (
                            <p className="text-sm text-gray-500 mb-3">
                              {exp.startDate} - {exp.current ? t.present : exp.endDate}
                            </p>
                          )}
                          {exp.description && <p className="text-gray-700 leading-relaxed">{exp.description}</p>}
                          {index < data.workExperience.length - 1 && (
                            <div className="mt-6 flex justify-center">
                              <div className="w-12 h-0.5" style={{ backgroundColor: template.secondaryColor }}></div>
                            </div>
                          )}
                        </div>
                      ),
                  )}
                </div>
              </div>
            )}

            {/* Skills */}
            {(data.skills.technical.length > 0 || data.skills.soft.length > 0) && (
              <div>
                <h2
                  className="text-2xl font-bold mb-6 text-center pb-2 border-b-2"
                  style={{ color: template.primaryColor, borderColor: template.primaryColor }}
                >
                  {t.skills}
                </h2>
                <div className="space-y-6">
                  {data.skills.technical.length > 0 && (
                    <div className="text-center">
                      <h3 className="text-lg font-semibold mb-3" style={{ color: template.secondaryColor }}>
                        {t.technicalSkills}
                      </h3>
                      <div className="flex flex-wrap justify-center gap-2">
                        {data.skills.technical.map((skill, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 rounded-full text-sm font-medium border-2"
                            style={{ borderColor: template.primaryColor, color: template.primaryColor }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {data.skills.soft.length > 0 && (
                    <div className="text-center">
                      <h3 className="text-lg font-semibold mb-3" style={{ color: template.secondaryColor }}>
                        {t.softSkills}
                      </h3>
                      <div className="flex flex-wrap justify-center gap-2">
                        {data.skills.soft.map((skill, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 rounded-full text-sm font-medium border-2"
                            style={{ borderColor: template.secondaryColor, color: template.secondaryColor }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Education */}
            {data.education.some((edu) => edu.institution || edu.degree) && (
              <div>
                <h2
                  className="text-2xl font-bold mb-6 text-center pb-2 border-b-2"
                  style={{ color: template.primaryColor, borderColor: template.primaryColor }}
                >
                  <GraduationCap className="h-6 w-6 inline mr-2" />
                  {t.education}
                </h2>
                <div className="space-y-6">
                  {data.education.map(
                    (edu, index) =>
                      (edu.institution || edu.degree) && (
                        <div key={index} className="text-center">
                          <h3 className="text-xl font-bold" style={{ color: template.primaryColor }}>
                            {edu.degree}
                          </h3>
                          <p className="text-lg font-semibold text-gray-600">{edu.institution}</p>
                          {edu.fieldOfStudy && <p className="text-gray-600 mb-1">{edu.fieldOfStudy}</p>}
                          <div className="text-sm text-gray-500">
                            {edu.startDate && (
                              <span>
                                {edu.startDate} - {edu.endDate}
                              </span>
                            )}
                            {edu.gpa && <span className="ml-4">GPA: {edu.gpa}</span>}
                          </div>
                          {index < data.education.length - 1 && (
                            <div className="mt-6 flex justify-center">
                              <div className="w-12 h-0.5" style={{ backgroundColor: template.secondaryColor }}></div>
                            </div>
                          )}
                        </div>
                      ),
                  )}
                </div>
              </div>
            )}

            {/* Languages */}
            {data.skills.languages.length > 0 && (
              <div>
                <h2
                  className="text-2xl font-bold mb-6 text-center pb-2 border-b-2"
                  style={{ color: template.primaryColor, borderColor: template.primaryColor }}
                >
                  <Languages className="h-6 w-6 inline mr-2" />
                  {t.languages}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {data.skills.languages.map((language, index) => (
                    <div
                      key={index}
                      className="text-center p-3 rounded-lg border"
                      style={{ borderColor: template.secondaryColor }}
                    >
                      <span className="font-semibold" style={{ color: template.primaryColor }}>
                        {language}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {data.certifications.some((cert) => cert.name || cert.issuer) && (
              <div>
                <h2
                  className="text-2xl font-bold mb-6 text-center pb-2 border-b-2"
                  style={{ color: template.primaryColor, borderColor: template.primaryColor }}
                >
                  <Award className="h-6 w-6 inline mr-2" />
                  {t.certifications}
                </h2>
                <div className="space-y-4">
                  {data.certifications.map(
                    (cert, index) =>
                      (cert.name || cert.issuer) && (
                        <div
                          key={index}
                          className="text-center p-4 rounded-lg border"
                          style={{ borderColor: template.secondaryColor }}
                        >
                          <h3 className="font-bold" style={{ color: template.primaryColor }}>
                            {cert.name}
                          </h3>
                          <p className="text-gray-600">{cert.issuer}</p>
                          {cert.date && <p className="text-sm text-gray-500 mt-1">{cert.date}</p>}
                        </div>
                      ),
                  )}
                </div>
              </div>
            )}

            {/* Volunteer Experience */}
            {data.volunteerExperience.some((vol) => vol.organization || vol.role) && (
              <div>
                <h2
                  className="text-2xl font-bold mb-6 text-center pb-2 border-b-2"
                  style={{ color: template.primaryColor, borderColor: template.primaryColor }}
                >
                  <Heart className="h-6 w-6 inline mr-2" />
                  {t.volunteerExperience}
                </h2>
                <div className="space-y-4">
                  {data.volunteerExperience.map(
                    (vol, index) =>
                      (vol.organization || vol.role) && (
                        <div
                          key={index}
                          className="text-center p-4 rounded-lg border"
                          style={{ borderColor: template.secondaryColor }}
                        >
                          <h3 className="font-bold" style={{ color: template.primaryColor }}>
                            {vol.role}
                          </h3>
                          <p className="text-gray-600">{vol.organization}</p>
                          {vol.startDate && (
                            <p className="text-sm text-gray-500 mt-1">
                              {vol.startDate} - {vol.endDate}
                            </p>
                          )}
                          {vol.description && <p className="text-gray-700 mt-2 text-sm">{vol.description}</p>}
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
