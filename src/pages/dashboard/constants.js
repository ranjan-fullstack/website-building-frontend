export const orderStatusOptions = [
  "New Lead",
  "Contacted",
  "Requirements Collected",
  "Design Started",
  "Design Ready",
  "Client Review",
  "Changes Requested",
  "Finalizing",
  "Website Live",
  "Delivered",
];

export const defaultWebsiteProject = {
  status: "not-started",
  selectedTemplate: "",
  adminNote: "",
  websiteUrl: "",
};

export const projectStatusOptions = [
  ["not-started", "Not started"],
  ["in-progress", "In progress"],
  ["done", "Done"],
];

export const subscriptionPlans = [
  ["Current plan", "Free"],
  ["Included pages", "3 pages"],
  ["Branding", "Appzet Web Solution branding visible"],
  ["Upgrade path", "Launch plan at Rs 249/month"],
];

export const formatDateTime = (value) => {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
};
