/**
 * The words the Site* components say themselves (table headers, the form, the
 * header and footer),
 * so a site gets them in any of these languages without adding locale files.
 * A site's own messages under the same keys (wedanceSite.schedule.day …) win —
 * see useSiteText. Unknown languages fall back to English.
 */
export const siteCopy: Record<string, { schedule: Record<string, string>; form: Record<string, string>; site: Record<string, string> }> = {
  "en": {
    "schedule": {
      "day": "Day",
      "time": "Time",
      "class": "Event",
      "instructor": "Teacher",
      "free": "FREE",
      "signUp": "Sign up",
      "empty": "No dates published for the next weeks yet.",
      "followOnWeDance": "Follow us on WeDance",
      "registerNote": "Sign-up for every event runs on WeDance."
    },
    "form": {
      "namePlaceholder": "Your full name",
      "emailPlaceholder": "Your email address",
      "phonePlaceholder": "Phone (+49...)",
      "promoCodePlaceholder": "Promo code (optional)",
      "submit": "Sign up",
      "submitting": "Joining...",
      "success": "You're in! Check your inbox.",
      "error": "Something went wrong. Please try again.",
      "privacy": "We respect your privacy. Unsubscribe anytime."
    },
    "site": {
      "menu": "Menu",
      "close": "Close",
      "language": "Language",
      "madeWith": "Made with WeDance",
      "impressum": "Imprint",
      "privacy": "Privacy",
      "followUs": "Follow us",
      "home": "Home"
    }
  },
  "de": {
    "schedule": {
      "day": "Tag",
      "time": "Uhrzeit",
      "class": "Termin",
      "instructor": "Lehrer",
      "free": "GRATIS",
      "signUp": "Anmelden",
      "empty": "Für die nächsten Wochen sind noch keine Termine veröffentlicht.",
      "followOnWeDance": "Folge uns auf WeDance",
      "registerNote": "Die Anmeldung zu allen Terminen läuft über WeDance."
    },
    "form": {
      "namePlaceholder": "Dein vollständiger Name",
      "emailPlaceholder": "Deine E-Mail-Adresse",
      "phonePlaceholder": "Telefon (+49...)",
      "promoCodePlaceholder": "Aktionscode (optional)",
      "submit": "Anmelden",
      "submitting": "Wird gesendet...",
      "success": "Du bist dabei! Schau in dein Postfach.",
      "error": "Etwas ist schiefgelaufen. Bitte versuche es erneut.",
      "privacy": "Wir respektieren deine Privatsphäre. Jederzeit abmeldbar."
    },
    "site": {
      "menu": "Menü",
      "close": "Schließen",
      "language": "Sprache",
      "madeWith": "Erstellt mit WeDance",
      "impressum": "Impressum",
      "privacy": "Datenschutz",
      "followUs": "Folge uns",
      "home": "Start"
    }
  },
  "es": {
    "schedule": {
      "day": "Día",
      "time": "Hora",
      "class": "Evento",
      "instructor": "Profesor",
      "free": "GRATIS",
      "signUp": "Inscribirme",
      "empty": "Aún no hay fechas publicadas para las próximas semanas.",
      "followOnWeDance": "Síguenos en WeDance",
      "registerNote": "La inscripción a todos los eventos es en WeDance."
    },
    "form": {
      "namePlaceholder": "Tu nombre completo",
      "emailPlaceholder": "Tu correo electrónico",
      "phonePlaceholder": "Teléfono (+49...)",
      "promoCodePlaceholder": "Código promocional (opcional)",
      "submit": "Inscribirme",
      "submitting": "Enviando...",
      "success": "¡Estás dentro! Revisa tu bandeja de entrada.",
      "error": "Algo salió mal. Inténtalo de nuevo.",
      "privacy": "Respetamos tu privacidad. Cancela en cualquier momento."
    },
    "site": {
      "menu": "Menú",
      "close": "Cerrar",
      "language": "Idioma",
      "madeWith": "Hecho con WeDance",
      "impressum": "Aviso legal",
      "privacy": "Privacidad",
      "followUs": "Síguenos",
      "home": "Inicio"
    }
  },
  "ru": {
    "schedule": {
      "day": "День",
      "time": "Время",
      "class": "Событие",
      "instructor": "Преподаватель",
      "free": "БЕСПЛАТНО",
      "signUp": "Записаться",
      "empty": "На ближайшие недели даты пока не опубликованы.",
      "followOnWeDance": "Подпишитесь на нас в WeDance",
      "registerNote": "Запись на все события — через WeDance."
    },
    "form": {
      "namePlaceholder": "Твоё полное имя",
      "emailPlaceholder": "Твой email",
      "phonePlaceholder": "Телефон (+49...)",
      "promoCodePlaceholder": "Промокод (необязательно)",
      "submit": "Записаться",
      "submitting": "Отправляем...",
      "success": "Ты в деле! Проверь почту.",
      "error": "Что-то пошло не так. Попробуй ещё раз.",
      "privacy": "Мы уважаем твою конфиденциальность. Отписаться можно в любой момент."
    },
    "site": {
      "menu": "Меню",
      "close": "Закрыть",
      "language": "Язык",
      "madeWith": "Сделано на WeDance",
      "impressum": "Выходные данные",
      "privacy": "Конфиденциальность",
      "followUs": "Мы в соцсетях",
      "home": "Главная"
    }
  },
  "uk": {
    "schedule": {
      "day": "День",
      "time": "Час",
      "class": "Подія",
      "instructor": "Викладач",
      "free": "БЕЗКОШТОВНО",
      "signUp": "Записатися",
      "empty": "На найближчі тижні дати ще не опубліковані.",
      "followOnWeDance": "Стежте за нами у WeDance",
      "registerNote": "Запис на всі події — через WeDance."
    },
    "form": {
      "namePlaceholder": "Твоє повне ім'я",
      "emailPlaceholder": "Твій email",
      "phonePlaceholder": "Телефон (+49...)",
      "promoCodePlaceholder": "Промокод (необов'язково)",
      "submit": "Записатися",
      "submitting": "Надсилаємо...",
      "success": "Ти з нами! Перевір пошту.",
      "error": "Щось пішло не так. Спробуй ще раз.",
      "privacy": "Ми поважаємо твою конфіденційність. Відписатися можна будь-коли."
    },
    "site": {
      "menu": "Меню",
      "close": "Закрити",
      "language": "Мова",
      "madeWith": "Зроблено на WeDance",
      "impressum": "Вихідні дані",
      "privacy": "Конфіденційність",
      "followUs": "Ми в соцмережах",
      "home": "Головна"
    }
  },
  "it": {
    "schedule": {
      "day": "Giorno",
      "time": "Ora",
      "class": "Evento",
      "instructor": "Insegnante",
      "free": "GRATIS",
      "signUp": "Iscriviti",
      "empty": "Nessuna data pubblicata per le prossime settimane.",
      "followOnWeDance": "Seguici su WeDance",
      "registerNote": "Le iscrizioni a tutti gli eventi sono su WeDance."
    },
    "form": {
      "namePlaceholder": "Il tuo nome e cognome",
      "emailPlaceholder": "La tua email",
      "phonePlaceholder": "Telefono (+49...)",
      "promoCodePlaceholder": "Codice promozionale (facoltativo)",
      "submit": "Iscriviti",
      "submitting": "Invio in corso...",
      "success": "Ci sei! Controlla la tua casella di posta.",
      "error": "Qualcosa è andato storto. Riprova.",
      "privacy": "Rispettiamo la tua privacy. Puoi annullare l'iscrizione in qualsiasi momento."
    },
    "site": {
      "menu": "Menu",
      "close": "Chiudi",
      "language": "Lingua",
      "madeWith": "Fatto con WeDance",
      "impressum": "Note legali",
      "privacy": "Privacy",
      "followUs": "Seguici",
      "home": "Home"
    }
  },
  "fr": {
    "schedule": {
      "day": "Jour",
      "time": "Heure",
      "class": "Événement",
      "instructor": "Professeur",
      "free": "GRATUIT",
      "signUp": "S'inscrire",
      "empty": "Aucune date publiée pour les prochaines semaines.",
      "followOnWeDance": "Suivez-nous sur WeDance",
      "registerNote": "Les inscriptions à tous les événements se font sur WeDance."
    },
    "form": {
      "namePlaceholder": "Votre nom complet",
      "emailPlaceholder": "Votre adresse e-mail",
      "phonePlaceholder": "Téléphone (+49...)",
      "promoCodePlaceholder": "Code promo (facultatif)",
      "submit": "S'inscrire",
      "submitting": "Envoi...",
      "success": "C'est fait ! Vérifiez votre boîte mail.",
      "error": "Une erreur s'est produite. Veuillez réessayer.",
      "privacy": "Nous respectons votre vie privée. Désinscription à tout moment."
    },
    "site": {
      "menu": "Menu",
      "close": "Fermer",
      "language": "Langue",
      "madeWith": "Créé avec WeDance",
      "impressum": "Mentions légales",
      "privacy": "Confidentialité",
      "followUs": "Suivez-nous",
      "home": "Accueil"
    }
  },
  "pt": {
    "schedule": {
      "day": "Dia",
      "time": "Hora",
      "class": "Evento",
      "instructor": "Professor",
      "free": "GRÁTIS",
      "signUp": "Inscrever-me",
      "empty": "Ainda não há datas publicadas para as próximas semanas.",
      "followOnWeDance": "Siga-nos no WeDance",
      "registerNote": "As inscrições em todos os eventos são feitas no WeDance."
    },
    "form": {
      "namePlaceholder": "O seu nome completo",
      "emailPlaceholder": "O seu e-mail",
      "phonePlaceholder": "Telefone (+49...)",
      "promoCodePlaceholder": "Código promocional (opcional)",
      "submit": "Inscrever-me",
      "submitting": "A enviar...",
      "success": "Está dentro! Verifique a sua caixa de entrada.",
      "error": "Algo correu mal. Tente novamente.",
      "privacy": "Respeitamos a sua privacidade. Cancele a qualquer momento."
    },
    "site": {
      "menu": "Menu",
      "close": "Fechar",
      "language": "Idioma",
      "madeWith": "Feito com WeDance",
      "impressum": "Aviso legal",
      "privacy": "Privacidade",
      "followUs": "Siga-nos",
      "home": "Início"
    }
  }
}
