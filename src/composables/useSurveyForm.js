import { reactive } from 'vue'

export function useSurveyForm() {
  const formData = reactive({
    // I. General Information
    general: {
      dateOfInterview: '',
      timeOfInterview: '',
      enumeratorName: '',
      barangay: '',
      municipalityCity: '', // was: municipality
      provinceRegion: '', // was: province
      householdControlNumber: '',
      typeOfRespondent: '',
      typeOfRespondentOther: '',
      latitude: null,
      longitude: null,
    },

    // II. Respondent Identification
    respondent: {
      name: '',
      relationshipToOFW: [],
      sex: '',
      age: '',
      dateOfBirth: '',
      civilStatus: '',
      religion: '',
      contactNumber: '',
      alternativeContact: '',
      email: '',
      completeHomeAddress: '', // was: homeAddress
    },

    // III. Household Demographic Profile
    household: {
      headName: '',
      respondentRelationToHead: '',
      totalMembers: 0,
      totalDependents: 0,
      numChildren: 0,
      numSenior: 0,
      numPWD: 0,
      numPregnant: 0,
      roster: [],
    },

    // IV. OFW Profile
    ofwProfile: {
      name: '',
      sex: '',
      age: '',
      civilStatus: '',
      education: '',
      technicalSkills: '',
      passportNumber: '',
      dmwRegistration: '',
      owaStatus: '',
      philHealthStatus: '',
      sssStatus: '',
      pagIbigStatus: '',
    },

    // V. Migration History / Employment Abroad
    migration: {
      currentStatus: '',
      country: '',
      city: '',
      jobTitle: '',
      industry: '',
      deploymentType: '',
      documentationStatus: '',
      recruitmentChannel: '',
      recruitmentAgency: '',
      dateFirstDeployment: '',
      dateLatestDeployment: '',
      yearsWorkedAbroad: '',
      contractsCompleted: '',
      reasonForGoing: [],
    },

    // VI. Present Status of OFW
    presentStatus: {
      presentLocation: '',
      employmentStatus: '',
      reasonForReturn: [],
      dateOfReturn: '',
      currentLivelihood: [],
      planningToGoAbroadAgain: '',
    },

    // VII. Household Socio-Economic Profile
    socioEconomic: {
      housingType: '',
      houseConstruction: '',
      electricity: false,
      waterSource: '',
      toiletFacility: '',
      primaryIncomeSource: '',
      avgMonthlyIncome: '',
      monthlyRemittance: '',
      remittanceFrequency: '',
      remittanceUses: [],
      hasSavings: false,
      hasDebts: false,
      totalDebt: '',
      debtReason: [],
    },

    // VIII. Employment & Livelihood Status
    livelihood: {
      employedMembers: 0,
      unemployedMembers: 0,
      underemployedMembers: 0,
      mainOccupations: [],
      interestedInLocalLivelihood: false,
      preferredLivelihood: [],
      skillsTrainingNeeded: '',
    },

    // IX. Education Status of Children
    education: {
      allChildrenEnrolled: false,
      outOfSchoolCount: 0,
      reasonsForDropout: [],
      educationalNeeds: [],
    },

    // X. Health & Psychosocial Status
    health: {
      chronicIllness: false,
      illnessSpecify: '',
      disability: false,
      psychosocialConcerns: false,
      concernsList: [],
      willingForCounseling: '',
      healthAccess: '',
    },

    // XI. Social Protection & Government Assistance
    assistance: {
      receivedFrom: [],
      typeOfAssistance: [],
      sufficient: '',
      awareOfReintegration: false,
    },

    // XII. Present Problems & Issues
    problems: {
      majorProblems: [],
      mostUrgent: '',
      migrationRelatedIssues: [],
    },

    // XIII. Reintegration Status & Readiness
    reintegration: {
      hasPlan: '',
      preferredType: '',
      startedBusiness: false,
      businessType: '',
      businessStatus: '',
      barriers: [],
    },

    // XIV. Training, Employment, & Livelihood Needs
    needs: {
      immediateAssistance: [],
      preferredSkillsTraining: [],
      preferredEmploymentSector: '',
      willingCooperative: '',
      interestedFamilyCircle: '',
    },

    // XV. Case-Specific Risk Screening
    risk: {
      ongoingCase: [],
      needsUrgentReferral: false,
      referralTo: [],
      priorityLevel: '',
    },

    // XVI. Community Participation & Support Networks
    community: {
      memberOfGroups: [],
      willingToParticipate: [],
    },

    // XVII. Financial Literacy & Asset Building
    financial: {
      keepsBudget: false,
      hasSavingsProduct: [],
      attendedLiteracySessions: false,
      wantsCoaching: false,
    },

    // XVIII. Open-Ended Questions
    openEnded: {
      changesFromMigration: '',
      biggestChallenges: '',
      supportNeeded: '',
      futurePlans: '',
      otherComments: '',
    },

    // XIX. Enumerator's Assessment
    enumerator: {
      socioEconomicStatus: '',
      housingCondition: '',
      familyFunctioning: '',
      recommendedInterventions: [],
      narrativeRemarks: '',
    },

    // XX. Consent & Data Privacy
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

  const resetForm = () => Object.assign(formData, JSON.parse(JSON.stringify(formData)))

  return { formData, resetForm }
}
