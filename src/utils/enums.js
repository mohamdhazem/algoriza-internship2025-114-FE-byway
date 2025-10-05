
export const JobTitleEnum = {
  0: "Fullstack Developer",
  1: "Backend Developer",
  2: "Frontend Developer",
  3: "UX/UI Designer",
};

export const LevelEnum = {
  0: "All Levels",
  1: "Beginner",
  2: "Intermediate",
  3: "Expert",
};

export const SortingTypesEnum = {
  0: "Highest Price",
  1: "Lowest Price",
  2: "Latest",
  3: "Oldest",
};

export const getEnumLabel = (enumObj, value) => enumObj[value] || "Unknown";
