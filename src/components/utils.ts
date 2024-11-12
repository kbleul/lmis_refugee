import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { IoClose } from "react-icons/io5";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(inputDate: string) {
  const date = new Date(inputDate);

  // Extract the date components
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed in JavaScript
  const year = date.getFullYear();

  // Format the date in DD-MM-YYYY
  return `${day}-${month}-${year}`;
}

//write one that truncates the string
export function truncateString(str: string, num: number) {
  if (str?.length <= num) {
    return str;
  }
  return str?.slice(0, num) + "...";
}

//readmore button

// calculate progress
export function calculateProgress(data: any) {
  let total = 16.6;
  data.idea_fundings.length !== 0 && (total += 16.6);
  data.idea_stories.length !== 0 && (total += 16.6);
  data.idea_peoples.length !== 0 && (total += 16.6);
  data.idea_payments.length !== 0 && (total += 16.6);
  data.idea_documents.length !== 0 && (total += 16.6);

  return total;
}

export function parseJwt(token: string | undefined) {
  if (!token) {
    return;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}
// //rating
// export function renderSelectedStars(rating, maxRating) {
//   const yellowStars = rating;
//   const grayStars = maxRating - rating;

//   const selectedStars = [];

//   for (let i = 0; i < maxRating; i++) {
//     const isStarSelected = i < rating;

//     selectedStars.push(
//       <IoStar
//         key={i}
//         onClick={() => {
//           setSelectedStar(i + 1);
//         }}
//         className={isStarSelected ? 'text-[#FFB800]' : 'text-[#D7D7D7]'}
//       />
//     );
//   }

//   return selectedStars;
// }
