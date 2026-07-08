import { whatsappHref } from "./utils";

const WhatsAppFloat = ({ academy }) => {
  return (
    <a
      href={whatsappHref(academy.whatsapp, `Hi ${academy.name}, I'd like to know more.`)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-5 bottom-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] py-3 pr-5 pl-3 text-sm font-bold text-white! shadow-lg shadow-black/25 transition hover:-translate-y-0.5 hover:bg-[#1ebe5a]"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="flex-none">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.2h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.51 2 12.04 2zm5.8 14.08c-.24.68-1.4 1.32-1.93 1.4-.5.08-1.12.11-1.8-.12-.42-.13-.95-.31-1.64-.6-2.9-1.25-4.79-4.17-4.94-4.36-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.58.81 2 .88 2.15.07.15.12.32.02.52-.1.2-.15.32-.29.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.35 1.46.29.15.46.13.63-.08.17-.2.72-.84.92-1.13.19-.29.39-.24.65-.14.27.1 1.68.79 1.97.93.29.15.48.22.55.34.07.13.07.73-.17 1.41z" />
      </svg>
      <span className="hidden sm:inline">Chat with us</span>
    </a>
  );
};

export default WhatsAppFloat;
