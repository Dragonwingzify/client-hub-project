import chartSimple from "../assets/logos/chart-simple.svg";
import lightBulb from "../assets/logos/lightbulb-on.svg";
import presentationScreen from "../assets/logos/presentation-screen.svg";
import calculater from "../assets/logos/calculator.svg";
import coins from "../assets/logos/coins.svg";
import arrowRotateLeft from "../assets/logos/arrow-rotate-left.svg";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ToolList({ data }) {
  const actions = [
    {
      title: "Dashboard med dine nøgletal",
      href: data && data.UF_CRM_1631609793128,
      icon: presentationScreen,
      iconForeground: "text-teal-700",
      iconBackground: "bg-teal-50",
      description:
        "Vi har samlet data fra dine marketingkanaler ét sted, så du ikke skal klikke dig rundt i de forskellige platforme for at få det fulde overblik.",
    },
    {
      title: "ROAS beregner",
      href: "https://docs.google.com/spreadsheets/d/1zVYNsmZIA3VurKJ8cKVX-QJEG0M6N1U_yFRnT-J1Eqk/edit?usp=sharing",
      icon: calculater,
      iconForeground: "text-purple-700",
      iconBackground: "bg-purple-50",
      description:
        "Er du i tvivl om, hvad din ROAS præcist skal være for at dine marketingindsatser er profitable? Prøv vores ROAS beregner, som besvarer netop dette.",
    },
    {
      title: "Afrapportering (Google Sheets)",
      href: data && data.UF_CRM_1673947323586,
      icon: chartSimple,
      iconForeground: "text-sky-700",
      iconBackground: "bg-sky-50",
      description:
        "Afrapporteringen indeholder data i et format, som du kender fra Excel eller Google Sheets.",
    },
    {
      title: "Profit Ratio beregner",
      href: "https://docs.google.com/spreadsheets/d/1LctAXzLMiTLYQJ0ijmJ54rcIawf0CrwRtbYnuiPpKKg/edit?usp=sharing",
      icon: coins,
      iconForeground: "text-yellow-700",
      iconBackground: "bg-yellow-50",
      description:
        "Hvordan afspejler din toplinje sig i forhold til din bundlinje? Indsæt forskellige variabler, så du kan se, hvordan din forretning kan udvikle sig, hvis du er i stand til at optimere enkelte steder.",
    },
    {
      title: "Keyword Insights",
      href: "https://keyword-insights.conversio.dk/",
      icon: lightBulb,
      iconForeground: "text-rose-700",
      iconBackground: "bg-rose-50",
      description:
        "Mangler du inspiration til hvilke søgeord, der kan være relevante for din forretning? Vi har udviklet Keyword Insights, som netop løser dette problem.",
    },
    {
      title: "Customer Retention analyse",
      href: "https://docs.google.com/spreadsheets/d/18yusqVliAYCoWbgWM4gyZiVDBrOto5XtrYd1T49i7O4/edit?usp=sharing",
      icon: arrowRotateLeft,
      iconForeground: "text-indigo-700",
      iconBackground: "bg-indigo-50",
      description:
        "Ved du hvor stor en andel af din omsætning, som bliver genereret af dine 10% bedste kunder? Få svaret ved at bruge Customer Retention analysen.",
    },
  ];

  return (
    <div className="mx-auto max-w-8xl items-center justify-between px-6 sm:px-8 py-11">
      <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
        {actions.map((action, actionIdx) => (
          <div
            key={action.title}
            className={classNames(
              actionIdx === 0
                ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none"
                : "",
              actionIdx === 1 ? "sm:rounded-tr-lg" : "",
              actionIdx === actions.length - 2 ? "sm:rounded-bl-lg" : "",
              actionIdx === actions.length - 1
                ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
                : "",
              "group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
            )}
          >
            <div>
              <span
                className={classNames(
                  "border inline-flex rounded-lg p-3 ring-4 ring-white "
                )}
              >
                <img src={action.icon} alt="icon" />
              </span>
            </div>
            <div className="mt-8">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                <a
                  href={action.href}
                  rel="noreferrer"
                  target="_blank"
                  className="focus:outline-none"
                >
                  {/* Extend touch target to entire panel */}
                  <span className="absolute inset-0" aria-hidden="true" />
                  {action.title}
                </a>
              </h3>
              <p className="mt-2 text-sm text-gray-500">{action.description}</p>
            </div>
            <span
              className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
              aria-hidden="true"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
              </svg>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
