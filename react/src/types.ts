export type OurJob = {
    company_id: string
    job_title: string
    job_description: string
    job_category: string
    job_hours: string
    job_locations: [
        {
            address_1: string
            address_2: string
            city: string
            country: string
            postal_code: string
        },
    ]
    job_urls: [
        {
            job_details_url: string
            apply_url: string
        },
    ]
    recruiter_company: string
    recruiter_company_logo_url: string
    recruiters: [
        {
            email: string
            first_name: string
            last_name: string
            user_id: string
            user_name: string
        },
    ]
}
