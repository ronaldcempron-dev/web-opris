<!-- src/components/responses/ReportDetailView.vue -->
<template>
  <div class="report-detail">
    <!-- ─── HERO CARD ─── -->
    <div class="hero-card">
      <div class="hero-meta-panel">
        <div class="hero-name">{{ response.respondent_name || 'Unnamed Respondent' }}</div>
        <div class="hero-meta-row">
          <v-icon size="14" class="meta-icon">mdi-calendar-outline</v-icon>
          Submitted {{ formatDate(response.created_at) }}
          <span v-if="response.enumerator_name" class="meta-sep">·</span>
          <v-icon v-if="response.enumerator_name" size="14" class="meta-icon"
            >mdi-account-outline</v-icon
          >
          <span v-if="response.enumerator_name">{{ response.enumerator_name }}</span>
        </div>
        <div v-if="response.latitude" class="hero-gps">
          <v-icon size="13" class="meta-icon">mdi-map-marker-outline</v-icon>
          {{ response.latitude?.toFixed(5) }}, {{ response.longitude?.toFixed(5) }}
        </div>
        <div class="hero-chips">
          <span class="hero-chip">
            <v-icon size="12" style="margin-right: 4px">mdi-briefcase-outline</v-icon>
            OFW Family Profiling
          </span>
          <span class="hero-chip">
            <v-icon size="12" style="margin-right: 4px">mdi-refresh</v-icon>
            Reintegration Assessment
          </span>
          <span class="hero-chip hero-chip--blue">
            <v-icon size="12" style="margin-right: 4px">mdi-check-circle-outline</v-icon>
            {{ filledSections }} / 20 Sections
          </span>
        </div>
      </div>
    </div>

    <!-- ─── TOC PILLS ─── -->
    <div class="section-toc">
      <button
        v-for="s in sectionOrder"
        :key="s.key"
        class="toc-pill"
        :class="{ 'has-data': hasData(s.key) }"
        :title="s.title"
        @click="scrollTo(s.key)"
      >
        {{ s.num }}
      </button>
    </div>

    <!-- ─── SECTIONS ─── -->
    <div v-for="s in sectionOrder" :key="s.key" class="section-block" :id="'sec-' + s.key">
      <div class="section-header" @click="toggle(s.key)">
        <div class="section-icon-wrap">
          <v-icon size="16" color="#3b82f6">{{ s.icon }}</v-icon>
        </div>
        <div class="section-num">{{ s.num }}</div>
        <div class="section-title-text">{{ s.title }}</div>
        <v-icon size="18" class="chevron" :class="{ open: openSections[s.key] }"
          >mdi-chevron-down</v-icon
        >
      </div>

      <transition name="slide">
        <div v-show="openSections[s.key]" class="section-body">
          <component :is="sectionRenderers[s.key]" :data="answers[s.key]" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, h } from 'vue'

const props = defineProps({ response: { type: Object, required: true } })
const answers = computed(() => props.response?.answers || {})

// ── Helpers ───────────────────────────────────────────
const val = (v) => (v === null || v === undefined || v === '' || v === false ? null : v)
const arr = (v) => (Array.isArray(v) && v.length ? v : null)
const bool = (v) =>
  v === true || v === 'Yes'
    ? 'Yes'
    : v === false || v === 'No'
      ? 'No'
      : typeof v === 'string' && v
        ? v
        : null

// ── Render helpers (return VNodes) ───────────────────
const FieldRow = (label, value) => {
  if (value === null || value === undefined) return null
  return h('div', { class: 'field-row' }, [
    h('div', { class: 'field-label' }, label),
    h('div', { class: 'field-value' }, value),
  ])
}

const ChipRow = (label, items) => {
  if (!arr(items)) return null
  return h('div', { class: 'field-row' }, [
    h('div', { class: 'field-label' }, label),
    h(
      'div',
      { class: 'field-value' },
      h(
        'div',
        { class: 'chip-list' },
        items.map((i) => h('span', { class: 'chip' }, i)),
      ),
    ),
  ])
}

const BoolRow = (label, value) => {
  const display = bool(value)
  if (!display) return null
  const isYes = display === 'Yes'
  return h('div', { class: 'field-row' }, [
    h('div', { class: 'field-label' }, label),
    h(
      'div',
      { class: 'field-value' },
      h('span', { class: ['chip', isYes ? 'chip-yes' : 'chip-no'] }, display),
    ),
  ])
}

const SigRow = (label, src) => {
  if (!src) return null
  return h('div', { class: 'field-row' }, [
    h('div', { class: 'field-label' }, label),
    h(
      'div',
      { class: 'field-value' },
      h(
        'div',
        { class: 'signature-preview-wrap' },
        h('img', { src, class: 'signature-preview', alt: label }),
      ),
    ),
  ])
}

const NoData = () =>
  h('div', { class: 'no-data' }, [
    h('span', { style: 'margin-right:6px;color:#9ca3af' }, '⚠'),
    'No data recorded for this section.',
  ])

const Section = (rows) => {
  const filtered = rows.filter(Boolean)
  return filtered.length ? h('div', {}, filtered) : NoData()
}

// ── Per-section renderers ─────────────────────────────
const sectionRenderers = {
  // I — General Information
  general: {
    props: ['data'],
    render() {
      const d = this.data || {}
      return Section([
        FieldRow('Date of Interview', val(d.dateOfInterview)),
        FieldRow('Time of Interview', val(d.timeOfInterview)),
        FieldRow('Enumerator / Interviewer', val(d.enumeratorName)),
        FieldRow('Barangay', val(d.barangay)),
        FieldRow('Municipality / City', val(d.municipalityCity)),
        FieldRow('Province / Region', val(d.provinceRegion)),
        FieldRow('Household Control No.', val(d.householdControlNumber)),
        FieldRow(
          'Type of Respondent',
          val(d.typeOfRespondent) +
            (d.typeOfRespondentOther ? ` — ${d.typeOfRespondentOther}` : ''),
        ),
        FieldRow(
          'GPS Coordinates',
          d.latitude ? `${Number(d.latitude).toFixed(6)}, ${Number(d.longitude).toFixed(6)}` : null,
        ),
      ])
    },
  },

  // II — Respondent Identification
  respondent: {
    props: ['data'],
    render() {
      const d = this.data || {}
      const rel = Array.isArray(d.relationshipToOFW)
        ? d.relationshipToOFW.join(', ')
        : val(d.relationshipToOFW)
      return Section([
        FieldRow('Name', val(d.name)),
        FieldRow('Relationship to OFW', rel),
        FieldRow('Sex', val(d.sex)),
        FieldRow('Age', val(d.age)),
        FieldRow('Date of Birth', val(d.dateOfBirth)),
        FieldRow('Contact Number', val(d.contactNumber)),
        FieldRow('Alternative Contact', val(d.alternativeContact)),
        FieldRow('Email', val(d.email)),
        FieldRow('Religion', val(d.religion)),
        FieldRow('Civil Status', val(d.civilStatus)),
        FieldRow('Complete Home Address', val(d.completeHomeAddress)),
      ])
    },
  },

  // III — Household Demographic Profile
  household: {
    props: ['data'],
    render() {
      const d = this.data || {}
      const rosterRows =
        Array.isArray(d.roster) && d.roster.filter((r) => r.name).length
          ? h(
              'div',
              { class: 'field-row', style: 'flex-direction:column;align-items:flex-start' },
              [
                h('div', { class: 'field-label', style: 'margin-bottom:8px' }, 'Household Roster'),
                h(
                  'div',
                  { style: 'overflow-x:auto;width:100%' },
                  h('table', { class: 'roster-table' }, [
                    h(
                      'thead',
                      {},
                      h(
                        'tr',
                        {},
                        [
                          'Name',
                          'Sex',
                          'Age',
                          'Civil Status',
                          'Rel. to OFW',
                          'Education',
                          'Occupation',
                          'Income',
                          'Remarks',
                        ].map((t) => h('th', {}, t)),
                      ),
                    ),
                    h(
                      'tbody',
                      {},
                      d.roster
                        .filter((r) => r.name)
                        .map((r) =>
                          h('tr', {}, [
                            h('td', {}, r.name || '—'),
                            h('td', {}, r.sex || '—'),
                            h('td', {}, r.age ?? '—'),
                            h('td', {}, r.civilStatus || '—'),
                            h('td', {}, r.relationshipToOFW || '—'),
                            h('td', {}, r.educationalAttainment || '—'),
                            h('td', {}, r.occupation || '—'),
                            h('td', {}, r.monthlyIncome || '—'),
                            h('td', {}, r.remarks || '—'),
                          ]),
                        ),
                    ),
                  ]),
                ),
              ],
            )
          : null
      return Section([
        FieldRow('Household Head Name', val(d.householdHeadName || d.headName)),
        FieldRow(
          'Respondent Relation to Head',
          val(d.relationshipToHead || d.respondentRelationToHead),
        ),
        FieldRow('Total Household Members', val(d.totalHouseholdMembers ?? d.totalMembers)),
        FieldRow('Total Dependents', val(d.totalDependents)),
        FieldRow('Children (0–17 yrs)', val(d.children017 ?? d.numChildren)),
        FieldRow('Senior Citizens (60+)', val(d.seniorCitizens ?? d.numSenior)),
        FieldRow('Persons with Disability', val(d.personsWithDisability ?? d.numPWD)),
        FieldRow('Pregnant / Lactating', val(d.pregnantLactating ?? d.numPregnant)),
        rosterRows,
      ])
    },
  },

  // IV — OFW Profile
  ofwProfile: {
    props: ['data'],
    render() {
      const d = this.data || {}
      return Section([
        FieldRow('Name of OFW', val(d.nameOfOFW || d.name)),
        FieldRow('Sex', val(d.sex)),
        FieldRow('Age', val(d.age)),
        FieldRow('Civil Status', val(d.civilStatus)),
        FieldRow('Educational Attainment', val(d.educationalAttainment || d.education)),
        FieldRow('Technical Skills', val(d.technicalSkills)),
        FieldRow('Passport Number', val(d.passportNumber)),
        FieldRow('DMW Registration No.', val(d.dmwRegistrationNumber || d.dmwRegistration)),
        FieldRow('OWWA Status', val(d.owwaStatus || d.owaStatus)),
        FieldRow('PhilHealth Status', val(d.philhealthStatus || d.philHealthStatus)),
        FieldRow('SSS Status', val(d.sssStatus)),
        FieldRow('Pag-IBIG Status', val(d.pagibigStatus || d.pagIbigStatus)),
      ])
    },
  },

  // V — Migration History
  migration: {
    props: ['data'],
    render() {
      const d = this.data || {}
      return Section([
        FieldRow('Current OFW Status', val(d.currentStatus)),
        FieldRow('Country of Destination', val(d.countryDestination || d.country)),
        FieldRow('City / Area of Work', val(d.cityArea || d.city)),
        FieldRow('Job Title / Occupation', val(d.jobTitle)),
        ChipRow('Industry / Sector', arr(d.industrySector)),
        FieldRow('Other Industry', val(d.otherIndustry)),
        FieldRow('Deployment Type', val(d.deploymentType)),
        FieldRow('Documentation Status', val(d.documentationStatus)),
        FieldRow('Recruitment Channel', val(d.recruitmentChannel)),
        FieldRow('Recruitment Agency', val(d.recruitmentAgency)),
        FieldRow('Date of First Deployment', val(d.firstDeploymentDate || d.dateFirstDeployment)),
        FieldRow(
          'Date of Latest Deployment',
          val(d.latestDeploymentDate || d.dateLatestDeployment),
        ),
        FieldRow('Years Worked Abroad', val(d.yearsWorkedAbroad)),
        FieldRow('Contracts Completed', val(d.contractsCompleted)),
        FieldRow('Avg. Contract Duration', val(d.averageContractDuration)),
        ChipRow('Reason for Going Abroad', arr(d.reasonForGoing)),
      ])
    },
  },

  // VI — Present Status
  presentStatus: {
    props: ['data'],
    render() {
      const d = this.data || {}
      return Section([
        FieldRow('Present Location of OFW', val(d.presentLocation)),
        ChipRow('Abroad Employment Status', arr(d.abroadEmploymentStatus)),
        ChipRow('Reason for Return', arr(d.reasonForReturn)),
        FieldRow('Date of Return', val(d.dateOfReturn)),
        ChipRow('Current Livelihood / Income', arr(d.currentLivelihood)),
        FieldRow(
          'Planning to Go Abroad Again',
          val(d.planningToGoAbroad || d.planningToGoAbroadAgain),
        ),
      ])
    },
  },

  // VII — Socio-Economic Profile
  socioEconomic: {
    props: ['data'],
    render() {
      const d = this.data || {}
      return Section([
        FieldRow('Type of Housing Unit', val(d.housingUnit || d.housingType)),
        ChipRow(
          'Type of House Construction',
          arr(d.houseConstruction) || (d.houseConstruction ? [d.houseConstruction] : null),
        ),
        FieldRow(
          'Electricity',
          val(d.electricity === true ? 'Yes' : d.electricity === false ? 'No' : d.electricity),
        ),
        ChipRow('Water Source', arr(d.waterSource) || (d.waterSource ? [d.waterSource] : null)),
        ChipRow(
          'Toilet Facility',
          arr(d.toiletFacility) || (d.toiletFacility ? [d.toiletFacility] : null),
        ),
        ChipRow(
          'Primary Income Source',
          arr(d.primaryIncomeSource) || (d.primaryIncomeSource ? [d.primaryIncomeSource] : null),
        ),
        FieldRow(
          'Avg. Monthly Household Income',
          val(d.averageMonthlyIncome || d.avgMonthlyIncome),
        ),
        ChipRow(
          'Monthly OFW Remittance',
          arr(d.monthlyRemittance) || (d.monthlyRemittance ? [d.monthlyRemittance] : null),
        ),
        ChipRow(
          'Remittance Frequency',
          arr(d.remittanceFrequency) || (d.remittanceFrequency ? [d.remittanceFrequency] : null),
        ),
        ChipRow('Main Uses of Remittances', arr(d.remittanceUses)),
        FieldRow(
          'Has Savings',
          val(d.hasSavings === false ? 'No' : d.hasSavings === true ? 'Yes' : d.hasSavings),
        ),
        FieldRow(
          'Has Debts / Loans',
          val(d.hasDebts === false ? 'No' : d.hasDebts === true ? 'Yes' : d.hasDebts),
        ),
        ChipRow('Estimated Total Debt', arr(d.totalDebt) || (d.totalDebt ? [d.totalDebt] : null)),
        ChipRow('Reason for Debt', arr(d.debtReason)),
      ])
    },
  },

  // VIII — Livelihood Status
  livelihood: {
    props: ['data'],
    render() {
      const d = this.data || {}
      return Section([
        FieldRow('Employed Members', val(d.employedMembers)),
        FieldRow('Unemployed Members', val(d.unemployedMembers)),
        FieldRow('Underemployed Members', val(d.underemployedMembers)),
        ChipRow('Main Occupations', arr(d.mainOccupations)),
        FieldRow(
          'Interested in Livelihood',
          val(
            d.interestedInLivelihood ||
              (d.interestedInLocalLivelihood === true
                ? 'Yes'
                : d.interestedInLocalLivelihood === false
                  ? 'No'
                  : d.interestedInLocalLivelihood),
          ),
        ),
        ChipRow('Preferred Livelihood', arr(d.preferredLivelihood)),
        FieldRow('Skills Training Needed', val(d.skillsTrainingNeeded)),
      ])
    },
  },

  // IX — Education Status
  education: {
    props: ['data'],
    render() {
      const d = this.data || {}
      return Section([
        FieldRow(
          'All Children Enrolled',
          val(
            d.allChildrenEnrolled === false
              ? 'No'
              : d.allChildrenEnrolled === true
                ? 'Yes'
                : d.allChildrenEnrolled,
          ),
        ),
        FieldRow('Number Out of School', val(d.numberOutOfSchool ?? d.outOfSchoolCount)),
        ChipRow('Non-Enrollment Reasons', arr(d.nonEnrollmentReasons || d.reasonsForDropout)),
        ChipRow('Educational Needs', arr(d.educationalNeeds)),
        BoolRow('Not Applicable (no school-age children)', d.notApplicable),
      ])
    },
  },

  // X — Health & Psychosocial Status
  health: {
    props: ['data'],
    render() {
      const d = this.data || {}
      return Section([
        FieldRow(
          'Chronic Illness',
          val(
            d.hasChronicIllness ||
              (d.chronicIllness === true ? 'Yes' : d.chronicIllness === false ? 'No' : null),
          ),
        ),
        FieldRow('Illness Specify', val(d.chronicIllnessSpecify || d.illnessSpecify)),
        FieldRow(
          'Disability',
          val(
            d.hasDisability ||
              (d.disability === true ? 'Yes' : d.disability === false ? 'No' : null),
          ),
        ),
        FieldRow(
          'Psychosocial Concerns',
          val(
            d.hasPsychosocialConcerns ||
              (d.psychosocialConcerns === true
                ? 'Yes'
                : d.psychosocialConcerns === false
                  ? 'No'
                  : null),
          ),
        ),
        ChipRow('Concerns List', arr(d.psychosocialConcerns) || arr(d.concernsList)),
        FieldRow(
          'Willing for Counseling',
          val(d.willingForPsychosocialSupport || d.willingForCounseling),
        ),
        ChipRow(
          'Access to Health Services',
          arr(d.healthAccess) || (d.healthAccess ? [d.healthAccess] : null),
        ),
      ])
    },
  },

  // XI — Social Protection & Assistance
  assistance: {
    props: ['data'],
    render() {
      const d = this.data || {}
      return Section([
        ChipRow('Received Assistance From', arr(d.receivedAssistanceFrom || d.receivedFrom)),
        ChipRow('Type of Assistance Received', arr(d.typeOfAssistance)),
        FieldRow('Assistance Sufficient', val(d.assistanceSufficient || d.sufficient)),
        FieldRow(
          'Aware of Reintegration Programs',
          val(
            d.awareOfReintegrationPrograms ||
              (d.awareOfReintegration === true
                ? 'Yes'
                : d.awareOfReintegration === false
                  ? 'No'
                  : null),
          ),
        ),
      ])
    },
  },

  // XII — Problems & Issues
  problems: {
    props: ['data'],
    render() {
      const d = this.data || {}
      return Section([
        ChipRow('Major Problems', arr(d.majorProblems)),
        FieldRow('Most Urgent Concern', val(d.mostUrgentConcern || d.mostUrgent)),
        ChipRow('Issues Due to Migration', arr(d.migrationIssues || d.migrationRelatedIssues)),
      ])
    },
  },

  // XIII — Reintegration Status
  reintegration: {
    props: ['data'],
    render() {
      const d = this.data || {}
      return Section([
        FieldRow('Has Reintegration Plan', val(d.hasReintegrationPlan || d.hasPlan)),
        ChipRow(
          'Preferred Reintegration Type',
          arr(d.preferredReintegrationType) || (d.preferredType ? [d.preferredType] : null),
        ),
        FieldRow(
          'Started Livelihood/Business',
          val(
            d.hasStartedLivelihood ||
              (d.startedBusiness === true ? 'Yes' : d.startedBusiness === false ? 'No' : null),
          ),
        ),
        FieldRow('Type of Livelihood/Business', val(d.livelihoodType || d.businessType)),
        FieldRow('Livelihood/Business Status', val(d.livelihoodStatus || d.businessStatus)),
        ChipRow('Main Barriers', arr(d.mainBarriers || d.barriers)),
      ])
    },
  },

  // XIV — Training, Employment & Needs
  needs: {
    props: ['data'],
    render() {
      const d = this.data || {}
      return Section([
        ChipRow('Immediate Assistance Needed', arr(d.immediateAssistance)),
        ChipRow('Preferred Skills Training', arr(d.preferredSkillsTraining)),
        FieldRow(
          'Preferred Employment Sector',
          val(d.preferredLocalEmployment || d.preferredEmploymentSector),
        ),
        FieldRow(
          'Willing to Join Cooperative',
          val(d.willingToJoinCooperative || d.willingCooperative),
        ),
        FieldRow('Interested in Family Circle', val(d.interestedInFamilyCircle)),
      ])
    },
  },

  // XV — Risk Screening
  risk: {
    props: ['data'],
    render() {
      const d = this.data || {}
      return Section([
        ChipRow('Ongoing Cases', arr(d.ongoingCase)),
        FieldRow(
          'Needs Urgent Referral',
          val(
            d.needsUrgentReferral === false
              ? 'No'
              : d.needsUrgentReferral === true
                ? 'Yes'
                : d.needsUrgentReferral,
          ),
        ),
        ChipRow('Referred To', arr(d.referredTo || d.referralTo)),
        FieldRow('Priority Level', val(d.priorityLevel)),
      ])
    },
  },

  // XVI — Community Participation
  community: {
    props: ['data'],
    render() {
      const d = this.data || {}
      return Section([
        ChipRow('Community Groups', arr(d.communityGroups || d.memberOfGroups)),
        ChipRow('Willing to Participate In', arr(d.willingToParticipate)),
        FieldRow('Other Participation', val(d.otherParticipation)),
      ])
    },
  },

  // XVII — Financial Literacy
  financial: {
    props: ['data'],
    render() {
      const d = this.data || {}
      return Section([
        FieldRow(
          'Keeps Family Budget',
          val(
            d.keepsFamilyBudget ||
              (d.keepsBudget === true ? 'Yes' : d.keepsBudget === false ? 'No' : null),
          ),
        ),
        ChipRow('Savings / Investment Products', arr(d.savingsProducts || d.hasSavingsProduct)),
        FieldRow(
          'Attended Financial Literacy',
          val(
            d.attendedFinancialLiteracy ||
              (d.attendedLiteracySessions === true
                ? 'Yes'
                : d.attendedLiteracySessions === false
                  ? 'No'
                  : null),
          ),
        ),
        FieldRow(
          'Wants Financial Coaching',
          val(
            d.wantsFinancialCoaching ||
              (d.wantsCoaching === true ? 'Yes' : d.wantsCoaching === false ? 'No' : null),
          ),
        ),
      ])
    },
  },

  // XVIII — Open-Ended Questions
  openEnded: {
    props: ['data'],
    render() {
      const d = this.data || {}
      return Section([
        FieldRow('Changes from Migration', val(d.changesFromMigration)),
        FieldRow('Biggest Challenges', val(d.biggestChallenges)),
        FieldRow('Support Most Needed', val(d.mostNeededSupport || d.supportNeeded)),
        FieldRow('Future Plans', val(d.futurePlans)),
        FieldRow('Other Comments', val(d.otherComments)),
      ])
    },
  },

  // XIX — Enumerator's Assessment
  enumerator: {
    props: ['data'],
    render() {
      const d = this.data || {}
      return Section([
        FieldRow('Socio-Economic Status', val(d.socioEconomicStatus)),
        FieldRow('Housing / Environment', val(d.housingCondition)),
        FieldRow('Family Functioning', val(d.familyFunctioning)),
        ChipRow('Recommended Interventions', arr(d.recommendedInterventions)),
        BoolRow('Needs Follow-up Visit', d.needsFollowUp),
        FieldRow('Narrative Remarks', val(d.narrativeRemarks)),
      ])
    },
  },

  // XX — Consent & Data Privacy
  consent: {
    props: ['data'],
    render() {
      const d = this.data || {}
      if (!d || !Object.keys(d).length) return NoData()
      const consentDisplay =
        d.consentAgreement === 'agree'
          ? 'Voluntarily Agreed'
          : d.consentAgreement === 'disagree'
            ? 'Did Not Agree'
            : val(d.consentAgreement)
      return Section([
        FieldRow('Consent Agreement', consentDisplay),
        FieldRow('Respondent Name', val(d.respondentName)),
        FieldRow('Respondent Date', val(d.respondentDate)),
        SigRow('Respondent Signature', d.respondentSignature),
        FieldRow('Enumerator Name', val(d.enumeratorName)),
        FieldRow('Enumerator Date', val(d.enumeratorDate)),
        SigRow('Enumerator Signature', d.enumeratorSignature),
      ])
    },
  },
}

// ── Section order ─────────────────────────────────────
const sectionOrder = [
  { key: 'general', num: 'I', title: 'General Information', icon: 'mdi-home-outline' },
  { key: 'respondent', num: 'II', title: 'Respondent Identification', icon: 'mdi-account-outline' },
  { key: 'household', num: 'III', title: 'Household Demographic Profile', icon: 'mdi-home-group' },
  { key: 'ofwProfile', num: 'IV', title: 'OFW Profile', icon: 'mdi-airplane' },
  { key: 'migration', num: 'V', title: 'Migration History', icon: 'mdi-map-outline' },
  { key: 'presentStatus', num: 'VI', title: 'Present Status', icon: 'mdi-refresh-circle' },
  { key: 'socioEconomic', num: 'VII', title: 'Socio-Economic Profile', icon: 'mdi-currency-usd' },
  { key: 'livelihood', num: 'VIII', title: 'Livelihood Status', icon: 'mdi-briefcase-outline' },
  { key: 'education', num: 'IX', title: 'Education Status', icon: 'mdi-school-outline' },
  { key: 'health', num: 'X', title: 'Health & Psychosocial Status', icon: 'mdi-heart-outline' },
  {
    key: 'assistance',
    num: 'XI',
    title: 'Social Protection & Assistance',
    icon: 'mdi-shield-outline',
  },
  { key: 'problems', num: 'XII', title: 'Problems & Issues', icon: 'mdi-alert-circle-outline' },
  {
    key: 'reintegration',
    num: 'XIII',
    title: 'Reintegration Status',
    icon: 'mdi-rocket-launch-outline',
  },
  {
    key: 'needs',
    num: 'XIV',
    title: 'Training, Employment & Needs',
    icon: 'mdi-handshake-outline',
  },
  { key: 'risk', num: 'XV', title: 'Risk Screening', icon: 'mdi-magnify' },
  {
    key: 'community',
    num: 'XVI',
    title: 'Community Participation',
    icon: 'mdi-account-group-outline',
  },
  { key: 'financial', num: 'XVII', title: 'Financial Literacy', icon: 'mdi-chart-line' },
  {
    key: 'openEnded',
    num: 'XVIII',
    title: 'Open-Ended Questions',
    icon: 'mdi-comment-text-outline',
  },
  {
    key: 'enumerator',
    num: 'XIX',
    title: "Enumerator's Assessment",
    icon: 'mdi-clipboard-text-outline',
  },
  { key: 'consent', num: 'XX', title: 'Consent & Data Privacy', icon: 'mdi-shield-lock-outline' },
]

const openSections = reactive(Object.fromEntries(sectionOrder.map((s) => [s.key, false])))

const hasData = (key) => {
  const d = answers.value[key]
  if (!d) return false
  return Object.values(d).some(
    (v) =>
      v !== null &&
      v !== undefined &&
      v !== '' &&
      v !== false &&
      !(Array.isArray(v) && v.length === 0),
  )
}

const filledSections = computed(() => sectionOrder.filter((s) => hasData(s.key)).length)

const toggle = (key) => {
  openSections[key] = !openSections[key]
}
const scrollTo = (key) => {
  openSections[key] = true
  const el = document.getElementById('sec-' + key)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
const formatDate = (date) =>
  new Date(date).toLocaleString('en-PH', { dateStyle: 'medium', timeStyle: 'short' })
</script>

<style scoped>
.hero-card {
  background: #ffffff;
  border-radius: 20px;
  margin-bottom: 20px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 12px rgba(10, 31, 78, 0.08);
  overflow: hidden;
}
.hero-meta-panel {
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.hero-name {
  font-size: clamp(16px, 3vw, 22px);
  font-weight: 800;
  color: #0f2a5e;
  line-height: 1.2;
}
.hero-meta-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 5px;
  font-size: 12.5px;
  color: #374151;
}
.meta-icon {
  color: #3b82f6 !important;
  flex-shrink: 0;
}
.meta-sep {
  color: #d1d5db;
  margin: 0 2px;
}
.hero-gps {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11.5px;
  color: #6b7280;
}
.hero-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 6px;
}
.hero-chip {
  display: inline-flex;
  align-items: center;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 11px;
  color: #374151;
  font-weight: 600;
}
.hero-chip--blue {
  background: #eff6ff;
  border-color: #bfdbfe;
  color: #1d4ed8;
}

.section-toc {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
}
.toc-pill {
  border: 1.5px solid #e2e8f0;
  background: #f8faff;
  border-radius: 20px;
  padding: 4px 11px;
  font-size: 11px;
  font-weight: 700;
  color: #6b7fa8;
  cursor: pointer;
  transition: all 0.14s;
  font-family: inherit;
}
.toc-pill:hover {
  border-color: #1d4ed8;
  color: #1d4ed8;
  background: #eff6ff;
}
.toc-pill.has-data {
  border-color: #bfdbfe;
  color: #1d4ed8;
  background: #eff6ff;
}
.toc-pill.has-data:hover {
  border-color: #1d4ed8;
  background: #dbeafe;
}

.section-block {
  background: white;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
  margin-bottom: 10px;
  box-shadow: 0 2px 8px rgba(10, 31, 78, 0.06);
}
.section-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 20px;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  cursor: pointer;
  user-select: none;
  transition: background 0.15s;
}
.section-header:hover {
  background: #f8faff;
}
.section-icon-wrap {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: #eff6ff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.section-num {
  font-size: 9.5px;
  font-weight: 800;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: #1d4ed8;
  background: #dbeafe;
  border-radius: 5px;
  padding: 3px 8px;
  flex-shrink: 0;
  line-height: 1.4;
}
.section-title-text {
  font-size: 13px;
  font-weight: 700;
  color: #0f2a5e;
  flex: 1;
}
.chevron {
  color: #9ca3af !important;
  transition: transform 0.22s ease;
  flex-shrink: 0;
}
.chevron.open {
  transform: rotate(180deg);
  color: #3b82f6 !important;
}

.section-body {
  padding: 16px 20px 20px;
  background: white;
}

/* field-row, label, value */
:deep(.field-row) {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 10px 0;
  border-bottom: 1px solid #f5f7fb;
}
:deep(.field-row:last-child) {
  border-bottom: none;
}
:deep(.field-label) {
  font-size: 11.5px;
  font-weight: 700;
  color: #6b7fa8;
  min-width: 200px;
  flex-shrink: 0;
  padding-top: 2px;
  line-height: 1.5;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}
:deep(.field-value) {
  font-size: 13.5px;
  color: #111827;
  flex: 1;
  line-height: 1.6;
}
:deep(.field-value.empty) {
  color: #d1daea;
  font-style: italic;
}

:deep(.chip-list) {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
:deep(.chip) {
  display: inline-flex;
  align-items: center;
  background: #eff6ff;
  color: #0f2a5e;
  border: 1px solid #bfdbfe;
  border-radius: 20px;
  padding: 3px 10px;
  font-size: 12px;
  font-weight: 600;
}
:deep(.chip-yes) {
  background: #eff6ff;
  color: #1d4ed8;
  border-color: #bfdbfe;
}
:deep(.chip-no) {
  background: #fef2f2;
  color: #b91c1c;
  border-color: #fecaca;
}

:deep(.no-data) {
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #9ca3af;
  font-style: italic;
  padding: 8px 0;
}

:deep(.signature-preview-wrap) {
  background: #f8faff;
  border: 1.5px solid #bfdbfe;
  border-radius: 10px;
  padding: 10px 14px;
  display: inline-block;
  max-width: 320px;
}
:deep(.signature-preview) {
  display: block;
  max-width: 100%;
  height: auto;
  max-height: 100px;
}

/* Roster table */
:deep(.roster-table) {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}
:deep(.roster-table th) {
  padding: 8px;
  text-align: left;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #6b7fa8;
  background: #f8faff;
  border-bottom: 2px solid #e2e8f0;
  white-space: nowrap;
}
:deep(.roster-table td) {
  padding: 6px 8px;
  border-bottom: 1px solid #f3f4f6;
  color: #111827;
}
:deep(.roster-table tr:last-child td) {
  border-bottom: none;
}

/* Slide transition */
.slide-enter-active,
.slide-leave-active {
  transition:
    opacity 0.2s,
    max-height 0.3s ease;
  overflow: hidden;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  max-height: 0;
}
.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  max-height: 2000px;
}

@media (max-width: 480px) {
  .hero-meta-panel {
    padding: 14px 16px;
  }
  :deep(.field-row) {
    flex-direction: column;
    gap: 4px;
  }
  :deep(.field-label) {
    min-width: unset;
    width: 100%;
    font-size: 10.5px;
  }
  :deep(.field-value) {
    font-size: 13px;
  }
  .section-header {
    padding: 12px 14px;
  }
  .section-body {
    padding: 12px 14px 16px;
  }
  .toc-pill {
    font-size: 10px;
    padding: 3px 9px;
  }
  :deep(.signature-preview-wrap) {
    max-width: 100%;
  }
}
@media (max-width: 768px) {
  .hero-meta-panel {
    padding: 16px 18px;
  }
  :deep(.field-label) {
    min-width: 140px;
  }
}
</style>
