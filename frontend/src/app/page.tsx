import Link from "next/link";

const FEATURES = [
  { title: "מהיר להקמה", desc: "ממלאים טופס קצר ואנחנו דואגים לשאר. הדף שלכם באוויר תוך ימים ספורים.", icon: "⚡" },
  { title: "עיצוב מותאם אישית", desc: "בוחרים צבעים, מקטעים וסדר — הדף נראה בדיוק כמו שאתם רוצים.", icon: "🎨" },
  { title: "מחיר נגיש", desc: "בלי התחייבות לחודשים ובלי הפתעות. תשלום פשוט וברור.", icon: "💸" },
];

const STEPS = [
  { n: "1", title: "ממלאים פרטים", desc: "שם העסק, תיאור קצר ופרטי התקשרות." },
  { n: "2", title: "בוחרים עיצוב", desc: "צבעים ומקטעים, בסדר שמתאים לכם." },
  { n: "3", title: "מקבלים אתר", desc: "אנחנו בונים ומעלים את הדף שלכם לאוויר." },
];

export default function Home() {
  return (
    <main className="flex-1">
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 to-white px-4 pb-20 pt-16 sm:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
            חדש: בונים לכם דף נחיתה תוך ימים
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
            דף הנחיתה שלכם, מוכן ומקצועי — בלי כאב ראש
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-neutral-600">
            ספרו לנו על העסק שלכם, בחרו צבעים ומקטעים, ואנחנו נבנה עבורכם דף נחיתה שממיר — במחיר נגיש ובזמן קצר.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/create"
              className="w-full rounded-lg bg-indigo-600 px-8 py-3 text-center text-base font-semibold text-white shadow-sm transition-opacity hover:opacity-90 sm:w-auto"
            >
              בואו נתחיל
            </Link>
            <a
              href="#how-it-works"
              className="w-full rounded-lg border border-neutral-300 px-8 py-3 text-center text-base font-semibold text-neutral-700 hover:bg-neutral-50 sm:w-auto"
            >
              איך זה עובד?
            </a>
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-bold text-neutral-900 sm:text-3xl">למה לבחור בנו</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl border border-neutral-200 p-6 text-center">
                <div className="text-3xl">{f.icon}</div>
                <h3 className="mt-3 text-lg font-semibold text-neutral-800">{f.title}</h3>
                <p className="mt-2 text-sm text-neutral-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-neutral-50 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold text-neutral-900 sm:text-3xl">איך זה עובד</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                  {s.n}
                </div>
                <h3 className="mt-3 text-base font-semibold text-neutral-800">{s.title}</h3>
                <p className="mt-1 text-sm text-neutral-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-2xl rounded-2xl bg-indigo-600 px-6 py-12 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">מוכנים להתחיל?</h2>
          <p className="mt-3 text-indigo-100">ההרשמה לוקחת פחות מ-5 דקות</p>
          <Link
            href="/create"
            className="mt-6 inline-block rounded-lg bg-white px-8 py-3 text-base font-semibold text-indigo-700 shadow-sm hover:opacity-90"
          >
            צרו את דף הנחיתה שלי
          </Link>
        </div>
      </section>

      <footer className="border-t border-neutral-200 px-4 py-8 text-center text-sm text-neutral-400">
        © 2026 השם שלנו. כל הזכויות שמורות.
      </footer>
    </main>
  );
}
