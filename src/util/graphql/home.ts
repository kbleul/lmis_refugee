import { gql } from "graphql-request";

export const AddRefugeeMutation = gql`
  mutation InsertApplications(
    $first_name: String
    $last_name: String
    $gender_id: String
    $date_of_birth: String
    $nationality_id: String
    $marital_status_id: String
    $service_issued_id_number: String
    $service_issued_id_date_of_issue: String
    $service_issued_id_date_of_expiry: String
    $start_date: String
    $duration_requested_years: Float
    $highest_level_of_education: String
    $year_completed: String
    $professional_skill: String
    $is_spouse_or_child_citizen_et: Boolean
    $preferred_job_title: String
    $created_by: String
  ) {
    insert_refugee_applications(
      objects: {
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
        created_by: $created_by
      }
    ) {
      affected_rows
      returning {
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
      }
    }
  }
`;
