export const scrollToSection = (sectionId) => (event) => {
  event?.preventDefault();
  document.getElementById(sectionId)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

export const telHref = (phone) => `tel:${phone.replace(/\s/g, "")}`;
