import { getClientTwo } from "../client";
import { AddRefugeeMutation } from "../graphql/home";

export const addRefugeeRequest = async ({
  first_name,
  last_name,
  gender_id,
  date_of_birth,
  nationality_id,
  marital_status_id,
  service_issued_id_number,
  service_issued_id_date_of_issue,
  service_issued_id_date_of_expiry,
  start_date,
  duration_requested_years,
  highest_level_of_education,
  year_completed,
  professional_skill,
  is_spouse_or_child_citizen_et,
  preferred_job_title,
  created_by,
}: any) => {
  try {
    await getClientTwo().request(AddRefugeeMutation, {
      first_name,
      last_name,
      gender_id,
      date_of_birth,
      nationality_id,
      marital_status_id,
      service_issued_id_number,
      service_issued_id_date_of_issue,
      service_issued_id_date_of_expiry,
      start_date,
      duration_requested_years,
      highest_level_of_education,
      year_completed,
      professional_skill,
      is_spouse_or_child_citizen_et,
      preferred_job_title,
      created_by,
    });

    return { success: "success" };
  } catch (error: any) {
    return { error: error?.message };
  }
};
