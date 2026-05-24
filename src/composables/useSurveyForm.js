// src/composables/useSurveyForm.js
import { reactive } from 'vue'

export function useSurveyForm() {
  const formData = reactive({
    // ── I. General Information ─────────────────────────────
    general: {
      dateOfInterview: '',
      timeOfInterview: '',
      enumeratorName: '',
      barangay: '',
      municipalityCity: '',
      provinceRegion: '',
      householdControlNumber: '',
      typeOfRespondent: '',
      typeOfRespondentOther: '',
      latitude: null,
      longitude: null,
    },

    // ── II. Respondent Identification ──────────────────────
    respondent: {
      name: '',
      relationshipToOFW: '', // single string (SectionRespondent uses radio, not array)
      sex: '',
      age: '',
      dateOfBirth: '',
      civilStatus: '',
      religion: '',
      contactNumber: '',
      alternativeContact: '',
      email: '',
      completeHomeAddress: '',
    },

    // ── III. Household Demographic Profile ─────────────────
    household: {
      householdHeadName: '', // SectionHousehold saves as householdHeadName
      relationshipToHead: '', // SectionHousehold saves as relationshipToHead
      totalHouseholdMembers: null, // SectionHousehold saves as totalHouseholdMembers
      totalDependents: null,
      children017: null, // SectionHousehold saves as children017
      seniorCitizens: null, // SectionHousehold saves as seniorCitizens
      personsWithDisability: null, // SectionHousehold saves as personsWithDisability
      pregnantLactating: null, // SectionHousehold saves as pregnantLactating
      roster: [],
    },

    // ── IV. OFW Profile ────────────────────────────────────
    ofwProfile: {
      nameOfOFW: '', // SectionOFWProfile saves as nameOfOFW
      sex: '',
      age: null,
      civilStatus: '',
      educationalAttainment: '', // SectionOFWProfile saves as educationalAttainment
      technicalSkills: '',
      passportNumber: '',
      dmwRegistrationNumber: '', // SectionOFWProfile saves as dmwRegistrationNumber
      owwaStatus: '', // SectionOFWProfile saves as owwaStatus
      philhealthStatus: '', // SectionOFWProfile saves as philhealthStatus
      sssStatus: '',
      pagibigStatus: '', // SectionOFWProfile saves as pagibigStatus
    },

    // ── V. Migration History ───────────────────────────────
    migration: {
      currentStatus: '',
      countryDestination: '', // SectionMigration saves as countryDestination
      cityArea: '', // SectionMigration saves as cityArea
      jobTitle: '',
      industrySector: [], // SectionMigration saves as industrySector (array)
      otherIndustry: '',
      deploymentType: '',
      documentationStatus: '',
      recruitmentChannel: '',
      recruitmentAgency: '',
      firstDeploymentDate: '', // SectionMigration saves as firstDeploymentDate
      latestDeploymentDate: '', // SectionMigration saves as latestDeploymentDate
      yearsWorkedAbroad: null,
      contractsCompleted: null,
      averageContractDuration: '', // SectionMigration saves as averageContractDuration
      reasonForGoing: [], // array
    },

    // ── VI. Present Status of OFW ──────────────────────────
    presentStatus: {
      presentLocation: '',
      abroadEmploymentStatus: [], // SectionPresentStatus saves as abroadEmploymentStatus
      reasonForReturn: [],
      dateOfReturn: '',
      currentLivelihood: [],
      planningToGoAbroad: '', // SectionPresentStatus saves as planningToGoAbroad
    },

    // ── VII. Socio-Economic Profile ────────────────────────
    socioEconomic: {
      housingUnit: '', // SectionSocioEconomic saves as housingUnit
      houseConstruction: [], // array (not string)
      electricity: '', // string 'Yes'/'No' (not boolean)
      waterSource: [], // array (not string)
      toiletFacility: [], // array (not string)
      primaryIncomeSource: [], // array (not string)
      averageMonthlyIncome: '', // SectionSocioEconomic saves as averageMonthlyIncome
      monthlyRemittance: [], // array (not string)
      remittanceFrequency: [], // array (not string)
      remittanceUses: [],
      hasSavings: '', // string 'Yes'/'No' (not boolean)
      hasDebts: '', // string 'Yes'/'No' (not boolean)
      totalDebt: [], // array (not string)
      debtReason: [],
    },

    // ── VIII. Livelihood Status ────────────────────────────
    livelihood: {
      employedMembers: null,
      unemployedMembers: null,
      underemployedMembers: null,
      mainOccupations: [],
      interestedInLivelihood: '', // SectionLivelihood saves as interestedInLivelihood
      preferredLivelihood: [],
      skillsTrainingNeeded: '',
    },

    // ── IX. Education Status ───────────────────────────────
    education: {
      allChildrenEnrolled: '', // string 'Yes'/'No' (not boolean)
      numberOutOfSchool: null, // SectionEducation saves as numberOutOfSchool
      nonEnrollmentReasons: [], // SectionEducation saves as nonEnrollmentReasons
      educationalNeeds: [],
      notApplicable: false,
    },

    // ── X. Health & Psychosocial Status ───────────────────
    health: {
      hasChronicIllness: '', // string 'Yes'/'No' (not boolean)
      chronicIllnessSpecify: '', // SectionHealth saves as chronicIllnessSpecify
      hasDisability: '', // string 'Yes'/'No' (not boolean)
      hasPsychosocialConcerns: '', // string 'Yes'/'No' (not boolean)
      psychosocialConcerns: [], // array of selected concerns
      willingForPsychosocialSupport: '', // SectionHealth saves as willingForPsychosocialSupport
      healthAccess: [], // array (not string)
    },

    // ── XI. Social Protection & Assistance ────────────────
    assistance: {
      receivedAssistanceFrom: [], // SectionAssistance saves as receivedAssistanceFrom
      typeOfAssistance: [],
      assistanceSufficient: '', // SectionAssistance saves as assistanceSufficient
      awareOfReintegrationPrograms: '', // SectionAssistance saves as awareOfReintegrationPrograms
    },

    // ── XII. Problems & Issues ─────────────────────────────
    problems: {
      majorProblems: [],
      mostUrgentConcern: '', // SectionProblems saves as mostUrgentConcern
      migrationIssues: [], // SectionProblems saves as migrationIssues
    },

    // ── XIII. Reintegration Status ─────────────────────────
    reintegration: {
      hasReintegrationPlan: '', // SectionReintegration saves as hasReintegrationPlan
      preferredReintegrationType: [], // SectionReintegration saves as preferredReintegrationType (array)
      hasStartedLivelihood: '', // SectionReintegration saves as hasStartedLivelihood
      livelihoodType: '', // SectionReintegration saves as livelihoodType
      livelihoodStatus: '', // SectionReintegration saves as livelihoodStatus
      mainBarriers: [], // SectionReintegration saves as mainBarriers (array)
    },

    // ── XIV. Training, Employment & Needs ─────────────────
    needs: {
      immediateAssistance: [],
      preferredSkillsTraining: [],
      preferredLocalEmployment: '', // SectionNeeds saves as preferredLocalEmployment
      willingToJoinCooperative: '', // SectionNeeds saves as willingToJoinCooperative
      interestedInFamilyCircle: '', // SectionNeeds saves as interestedInFamilyCircle
    },

    // ── XV. Risk Screening ─────────────────────────────────
    risk: {
      ongoingCase: [],
      needsUrgentReferral: '', // string 'Yes'/'No' (not boolean)
      referredTo: [], // SectionRisk saves as referredTo (array)
      priorityLevel: '',
    },

    // ── XVI. Community Participation ───────────────────────
    community: {
      communityGroups: [], // SectionCommunity saves as communityGroups
      willingToParticipate: [],
      otherParticipation: '', // SectionCommunity saves as otherParticipation
    },

    // ── XVII. Financial Literacy ───────────────────────────
    financial: {
      keepsFamilyBudget: '', // string 'Yes'/'No' (SectionFinancial saves as keepsFamilyBudget)
      savingsProducts: [], // SectionFinancial saves as savingsProducts (array)
      attendedFinancialLiteracy: '', // string 'Yes'/'No' (SectionFinancial saves as attendedFinancialLiteracy)
      wantsFinancialCoaching: '', // string 'Yes'/'No' (SectionFinancial saves as wantsFinancialCoaching)
    },

    // ── XVIII. Open-Ended Questions ────────────────────────
    openEnded: {
      changesFromMigration: '',
      biggestChallenges: '',
      mostNeededSupport: '', // SectionOpenEnded saves as mostNeededSupport
      futurePlans: '',
      otherComments: '',
    },

    // ── XIX. Enumerator's Assessment ──────────────────────
    enumerator: {
      socioEconomicStatus: '',
      housingCondition: '',
      familyFunctioning: '',
      recommendedInterventions: [],
      needsFollowUp: false, // SectionEnumerator saves as needsFollowUp (boolean)
      narrativeRemarks: '',
    },

    // ── XX. Consent & Data Privacy ─────────────────────────
    consent: {
      consentAgreement: '',
      respondentName: '',
      respondentDate: '',
      respondentSignature: '',
      enumeratorName: '',
      enumeratorDate: '',
      enumeratorSignature: '',
    },
  })

  // ── Reset: wipe every field back to its initial empty value ──
  const resetForm = () => {
    // General
    Object.assign(formData.general, {
      dateOfInterview: '',
      timeOfInterview: '',
      enumeratorName: '',
      barangay: '',
      municipalityCity: '',
      provinceRegion: '',
      householdControlNumber: '',
      typeOfRespondent: '',
      typeOfRespondentOther: '',
      latitude: null,
      longitude: null,
    })

    // Respondent
    Object.assign(formData.respondent, {
      name: '',
      relationshipToOFW: '',
      sex: '',
      age: '',
      dateOfBirth: '',
      civilStatus: '',
      religion: '',
      contactNumber: '',
      alternativeContact: '',
      email: '',
      completeHomeAddress: '',
    })

    // Household
    Object.assign(formData.household, {
      householdHeadName: '',
      relationshipToHead: '',
      totalHouseholdMembers: null,
      totalDependents: null,
      children017: null,
      seniorCitizens: null,
      personsWithDisability: null,
      pregnantLactating: null,
      roster: [],
    })

    // OFW Profile
    Object.assign(formData.ofwProfile, {
      nameOfOFW: '',
      sex: '',
      age: null,
      civilStatus: '',
      educationalAttainment: '',
      technicalSkills: '',
      passportNumber: '',
      dmwRegistrationNumber: '',
      owwaStatus: '',
      philhealthStatus: '',
      sssStatus: '',
      pagibigStatus: '',
    })

    // Migration
    Object.assign(formData.migration, {
      currentStatus: '',
      countryDestination: '',
      cityArea: '',
      jobTitle: '',
      industrySector: [],
      otherIndustry: '',
      deploymentType: '',
      documentationStatus: '',
      recruitmentChannel: '',
      recruitmentAgency: '',
      firstDeploymentDate: '',
      latestDeploymentDate: '',
      yearsWorkedAbroad: null,
      contractsCompleted: null,
      averageContractDuration: '',
      reasonForGoing: [],
    })

    // Present Status
    Object.assign(formData.presentStatus, {
      presentLocation: '',
      abroadEmploymentStatus: [],
      reasonForReturn: [],
      dateOfReturn: '',
      currentLivelihood: [],
      planningToGoAbroad: '',
    })

    // Socio-Economic
    Object.assign(formData.socioEconomic, {
      housingUnit: '',
      houseConstruction: [],
      electricity: '',
      waterSource: [],
      toiletFacility: [],
      primaryIncomeSource: [],
      averageMonthlyIncome: '',
      monthlyRemittance: [],
      remittanceFrequency: [],
      remittanceUses: [],
      hasSavings: '',
      hasDebts: '',
      totalDebt: [],
      debtReason: [],
    })

    // Livelihood
    Object.assign(formData.livelihood, {
      employedMembers: null,
      unemployedMembers: null,
      underemployedMembers: null,
      mainOccupations: [],
      interestedInLivelihood: '',
      preferredLivelihood: [],
      skillsTrainingNeeded: '',
    })

    // Education
    Object.assign(formData.education, {
      allChildrenEnrolled: '',
      numberOutOfSchool: null,
      nonEnrollmentReasons: [],
      educationalNeeds: [],
      notApplicable: false,
    })

    // Health
    Object.assign(formData.health, {
      hasChronicIllness: '',
      chronicIllnessSpecify: '',
      hasDisability: '',
      hasPsychosocialConcerns: '',
      psychosocialConcerns: [],
      willingForPsychosocialSupport: '',
      healthAccess: [],
    })

    // Assistance
    Object.assign(formData.assistance, {
      receivedAssistanceFrom: [],
      typeOfAssistance: [],
      assistanceSufficient: '',
      awareOfReintegrationPrograms: '',
    })

    // Problems
    Object.assign(formData.problems, {
      majorProblems: [],
      mostUrgentConcern: '',
      migrationIssues: [],
    })

    // Reintegration
    Object.assign(formData.reintegration, {
      hasReintegrationPlan: '',
      preferredReintegrationType: [],
      hasStartedLivelihood: '',
      livelihoodType: '',
      livelihoodStatus: '',
      mainBarriers: [],
    })

    // Needs
    Object.assign(formData.needs, {
      immediateAssistance: [],
      preferredSkillsTraining: [],
      preferredLocalEmployment: '',
      willingToJoinCooperative: '',
      interestedInFamilyCircle: '',
    })

    // Risk
    Object.assign(formData.risk, {
      ongoingCase: [],
      needsUrgentReferral: '',
      referredTo: [],
      priorityLevel: '',
    })

    // Community
    Object.assign(formData.community, {
      communityGroups: [],
      willingToParticipate: [],
      otherParticipation: '',
    })

    // Financial
    Object.assign(formData.financial, {
      keepsFamilyBudget: '',
      savingsProducts: [],
      attendedFinancialLiteracy: '',
      wantsFinancialCoaching: '',
    })

    // Open-Ended
    Object.assign(formData.openEnded, {
      changesFromMigration: '',
      biggestChallenges: '',
      mostNeededSupport: '',
      futurePlans: '',
      otherComments: '',
    })

    // Enumerator
    Object.assign(formData.enumerator, {
      socioEconomicStatus: '',
      housingCondition: '',
      familyFunctioning: '',
      recommendedInterventions: [],
      needsFollowUp: false,
      narrativeRemarks: '',
    })

    // Consent
    Object.assign(formData.consent, {
      consentAgreement: '',
      respondentName: '',
      respondentDate: '',
      respondentSignature: '',
      enumeratorName: '',
      enumeratorDate: '',
      enumeratorSignature: '',
    })
  }

  return { formData, resetForm }
}
