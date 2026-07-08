export const scrollToSection = (sectionId) => (event) => {
  event?.preventDefault();
  document.getElementById(sectionId)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

export const telHref = (phone) => `tel:${phone.replace(/\s/g, "")}`;

export const whatsappHref = (phone, message) => {
  const digits = phone.replace(/[^\d]/g, "");
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${text}`;
};
