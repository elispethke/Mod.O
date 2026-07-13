import { cn } from '@/utils/cn'
import { t } from '@/lib/i18n'
import { SITE } from '@/constants/site'
import { useCookieConsent } from '@/features/cookie-consent'

export default function WhatsAppButton() {
  const href = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(t.whatsapp.message)}`
  const { isBannerVisible } = useCookieConsent()

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsapp.label}
      tabIndex={isBannerVisible ? -1 : 0}
      className={cn(
        'fixed bottom-8 right-8 z-[40]',
        'w-14 h-14',
        'flex items-center justify-center',
        'bg-primary text-white rounded-full',
        'shadow-red',
        'transition-all duration-400 ease-reveal',
        'hover:scale-110 hover:shadow-red-lg',
        'focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2',
        'group',
        isBannerVisible && 'opacity-0 translate-y-4 pointer-events-none sm:opacity-100 sm:translate-y-0 sm:pointer-events-auto',
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.526 5.847L.057 23.547a.75.75 0 00.906.94l5.878-1.542A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.655-.49-5.19-1.348l-.37-.214-3.49.915.93-3.4-.234-.38A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
      </svg>
    </a>
  )
}
