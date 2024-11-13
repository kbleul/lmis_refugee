export interface FormInputs {
  first_name: string;
  last_name: string;
  gender_id: string;
  date_of_birth: string;
  nationality_id: string;
  marital_status_id: string;
  service_issued_id_number: string;
  service_issued_id_date_of_issue: string;
  service_issued_id_date_of_expiry: string;
  start_date: string;
  duration_requested_years: number;
  highest_level_of_education: string;
  year_completed: string;
  professional_skill: string;
  is_spouse_or_child_citizen_et: boolean;
  preferred_job_title: string;
  middle_name?: string;
  date_received: string;
  field_of_study: string;
  institute_name: string;
  level_of_education: string;
  document_type_id: string;
  files: string;
  properties: string; // You might want to parse this JSON string if it’s always structured
  title: string;
  skills: string[];
  is_child_citizen: boolean;
  is_spouse: boolean;
  spouse_or_child_name: string;
}
