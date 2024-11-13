import { gql } from "graphql-request";

export const AddRefugeeMutation = gql`
  mutation InsertApplications(
    $first_name: String
    $last_name: String
    $gender_id: uuid
    $date_of_birth: timestamptz
    $nationality_id: uuid
    $marital_status_id: uuid
    $service_issued_id_number: String
    $service_issued_id_date_of_issue: timestamptz
    $service_issued_id_date_of_expiry: timestamptz
    $start_date: timestamptz
    $duration_requested_years: numeric
    $highest_level_of_education: String
    $year_completed: timestamptz
    $professional_skill: String
    $is_spouse_or_child_citizen_et: Boolean
    $preferred_job_title: String
    $middle_name: String
    $educations: [refugee_applicant_education_insert_input!]!
    $documents: [refugee_applicant_documents_insert_input!]!
    $skills: refugee_applicant_skills_insert_input!
    $spouse_child_citizenships: [refugee_applicant_spouse_child_citizenship_insert_input!]!
  ) {
    insert_refugee_applications_one(
      object: {
        first_name: $first_name
        last_name: $last_name
        gender_id: $gender_id
        date_of_birth: $date_of_birth
        nationality_id: $nationality_id
        marital_status_id: $marital_status_id
        service_issued_id_number: $service_issued_id_number
        service_issued_id_date_of_issue: $service_issued_id_date_of_issue
        service_issued_id_date_of_expiry: $service_issued_id_date_of_expiry
        start_date: $start_date
        duration_requested_years: $duration_requested_years
        highest_level_of_education: $highest_level_of_education
        year_completed: $year_completed
        professional_skill: $professional_skill
        is_spouse_or_child_citizen_et: $is_spouse_or_child_citizen_et
        preferred_job_title: $preferred_job_title
        middle_name: $middle_name
        educations: { data: $educations }
        documents: { data: $documents }
        applicant_skill: { data: $skills }
        spouse_child_citizenships: { data: $spouse_child_citizenships }
      }
    ) {
      id
      first_name
      last_name
      gender_id
      date_of_birth
      nationality_id
      marital_status_id
      service_issued_id_number
      service_issued_id_date_of_issue
      service_issued_id_date_of_expiry
      start_date
      duration_requested_years
      highest_level_of_education
      year_completed
      professional_skill
      is_spouse_or_child_citizen_et
      preferred_job_title
      created_by
      created_at
      updated_at
      middle_name
      educations {
        date_received
        field_of_study
        institute_name
        level_of_education
      }
      documents {
        files
        title
      }
      applicant_skill {
        skills
      }
      spouse_child_citizenships {
        is_child_citizen
        is_spouse
        spouse_or_child_name
      }
    }
  }
`;

export const UPLOAD_FILE = gql`
  mutation UPLOAD_FILE(
    $extension: String!
    $file: String!
    $FolderId: String!
  ) {
    uploadFile(extension: $extension, file: $file, FolderId: $FolderId) {
      msg
      info {
        Bucket
        Key
      }
    }
  }
`;
