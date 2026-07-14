import Image from "next/image";

export default function Poster() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-green-950 to-black text-white">
      <div className="max-w-7xl mx-auto p-8">

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          <div>

            <Image
              src="/poster/assets/logo.png"
              alt="Kampus Konnect SA"
              width={130}
              height={130}
              className="mb-6 rounded-3xl"
            />

            <h1 className="text-7xl font-black leading-none">
              ONE APP.
            </h1>

            <h1 className="text-7xl font-black text-yellow-400 leading-none">
              EVERY STUDENT
            </h1>

            <h1 className="text-7xl font-black leading-none">
              OPPORTUNITY.
            </h1>

            <p className="mt-8 text-2xl text-slate-300">
              South Africa's AI-powered student platform.
            </p>

          </div>

          <div className="flex justify-center">

            <div className="relative">

              <div className="absolute -inset-6 rounded-[55px] bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 blur-3xl opacity-40"></div>

              <div className="relative rounded-[55px] border-[10px] border-black bg-black overflow-hidden shadow-2xl">

                <Image
                  src="/poster/assets/phone.jpg"
                  alt="Kampus Konnect SA"
                  width={380}
                  height={760}
                />

              </div>

            </div>

          </div>

        </div>

        <div className="lg:col-span-2 mt-14">

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

            {[
              "🎓 Universities",
              "🏫 TVET Colleges",
              "🏢 Private Colleges",
              "💰 Bursaries",
              "📚 NSFAS",
              "💼 Jobs",
              "🚀 Learnerships",
              "🧑‍💻 Internships",
              "🤖 AI Career Advisor",
              "📄 AI CV Builder",
              "📋 Qualification Checker",
              "🏪 Business Support",
            ].map((feature) => (
              <div
                key={feature}
                className="rounded-2xl bg-white/10 border border-white/10 p-6 text-center hover:bg-white/15 transition"
              >
                <p className="text-xl font-bold">{feature}</p>
              </div>
            ))}

          </div>

        </div>

        <section className="mt-16 rounded-3xl bg-white/10 border border-white/10 p-8">

          <h2 className="text-4xl font-black mb-6">
            Why does Android show a warning?
          </h2>

          <p className="text-xl text-slate-300 mb-6">
            Kampus Konnect SA is distributed directly from our official website
            while awaiting Google Play publication.
          </p>

          <div className="rounded-2xl bg-yellow-500/20 border border-yellow-400 p-6 mb-8">

            <p className="text-2xl font-bold">
              This does NOT mean the app is unsafe.
            </p>

            <p className="mt-3 text-lg">
              Google Play Protect warns users whenever an Android app has not
              yet been published on the Google Play Store.
            </p>

          </div>

          <div className="rounded-2xl bg-emerald-500/20 border border-emerald-400 p-6">

            <h3 className="text-3xl font-bold mb-4">
              How to Install
            </h3>

            <ol className="space-y-3 text-xl list-decimal list-inside">
              <li>Tap <strong>More details</strong>.</li>
              <li>Tap <strong>Install anyway</strong>.</li>
              <li>Open Kampus Konnect SA.</li>
            </ol>

          </div>

        </section>

        <section className="mt-16 text-center">

          <div className="rounded-3xl bg-gradient-to-r from-green-600 via-emerald-500 to-blue-700 p-10 shadow-2xl">

            <h2 className="text-4xl font-black mb-4">
              Download Kampus Konnect SA Today
            </h2>

            <p className="text-xl mb-6">
              Universities • TVET Colleges • NSFAS • Bursaries • Jobs •
              Learnerships • Internships • AI CV Builder • Business Support
            </p>

            <div className="inline-flex items-center rounded-full bg-white text-blue-700 px-8 py-3 text-xl font-bold mb-8">
              🤖 AI Powered • Live Now
            </div>

            <p className="text-2xl font-bold">
              🌐 kampus.kandktechsolutions.co.za
            </p>

            <p className="text-xl mt-3">
              📥 Download:
            </p>

            <p className="text-2xl font-black text-yellow-300">
              kampus.kandktechsolutions.co.za/download
            </p>

          </div>

          <a
            href="/poster"
            download="Kampus-KonnectSA-Poster"
            className="inline-block mt-8 rounded-full bg-yellow-400 text-black px-8 py-4 text-xl font-black"
          >
            📥 Download Poster
          </a>

          <p className="mt-10 text-slate-400 text-lg">
            🇿🇦 Made by KandK Tech Solutions
          </p>

        </section>

      </div>
    </main>
  );
}
