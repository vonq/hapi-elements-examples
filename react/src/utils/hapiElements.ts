import {OurJob} from "../types"
import {
    CampaignCreateForm,
    CampaignCreateFormPostingDetails,
    CampaignPostingDetailsSalaryIndication,
    EmploymentType,
    RecursivePartial,
    SalaryPeriod,
} from "@vonq/hapi-elements-types"

export const mapPostingDetailsEmploymentType = (
    job: OurJob,
): EmploymentType => {
    switch (job.job_hours) {
        case "Full-Time":
            return EmploymentType.permanent
        default:
            return EmploymentType.permanent
    }
}
export const mapPostingDetailsWeeklyWorkingHoursFrom = (job: OurJob) => {
    switch (job.job_hours) {
        case "Full-Time":
            return 40
        default:
            return 0
    }
}

export const mapPostingDetailsWeeklyWorkingHoursTo = (job: OurJob) => {
    switch (job.job_hours) {
        case "Full-Time":
            return 40
        default:
            return 0
    }
}

export const mapTargetGroupJobCategory = (job: OurJob) => {
    switch (job.job_category) {
        case "Customer Service":
            return [{ value: 11, label: "Customer Service" }]
        default:
            return []
    }
}

export const mapTargetGroup = (job: OurJob) => {
    return {
        educationLevel: [],
        seniority: [],
        industry: [],
        jobCategory: mapTargetGroupJobCategory(job),
    }
}

export const mapRecruiterInfo = (job: OurJob) => {
    return {
        name: `${job.recruiters[0].first_name} ${job.recruiters[0].last_name}`,
        emailAddress: job.recruiters[0].email,
    }
}

export const mapPostingDetailsWeeklyWorkingHours = (job: OurJob) => {
    return {
        from: mapPostingDetailsWeeklyWorkingHoursFrom(job),
        to: mapPostingDetailsWeeklyWorkingHoursTo(job),
    }
}

export const mapPostingDetailsSalaryIndication = (
    job: OurJob,
): CampaignPostingDetailsSalaryIndication => {
    return {
        period: SalaryPeriod.YEARLY,
        range: {
            from: 0,
            to: 0,
            currency: "USD",
        },
    }
}

export const mapPostingDetailsOrganization = (job: OurJob) => {
    return {
        name: job.recruiter_company,
        companyLogo: job.recruiter_company_logo_url,
    }
}

export const mapPostingDetailsWorkingLocation = (job: OurJob) => {
    return {
        addressLine1: job.job_locations[0].address_1,
        addressLine2: job.job_locations[0].address_2,
        city: job.job_locations[0].city,
        country: job.job_locations[0].country,
        postcode: job.job_locations[0].postal_code,
    }
}

export const mapPostingDetails = (
    job: OurJob,
): Partial<CampaignCreateFormPostingDetails> => {
    return {
        title: job.job_title,
        description: job.job_description,
        yearsOfExperience: 0,
        employmentType: mapPostingDetailsEmploymentType(job),
        weeklyWorkingHours: mapPostingDetailsWeeklyWorkingHours(job),
        salaryIndication: mapPostingDetailsSalaryIndication(job),
        organization: mapPostingDetailsOrganization(job),
        workingLocation: mapPostingDetailsWorkingLocation(job),
        jobPageUrl: job.job_urls[0].job_details_url,
        applicationUrl: job.job_urls[0].apply_url,
    }
}

export const getMappedJobToHapiElementsCampaignForm = (
    job: OurJob,
): RecursivePartial<CampaignCreateForm> => {
    return {
        companyId: job.company_id,
        targetGroup: mapTargetGroup(job),
        recruiterInfo: mapRecruiterInfo(job),
        postingDetails: mapPostingDetails(job),
        orderedProductsSpecs: {},
        orderedProducts: [],
    }
}
