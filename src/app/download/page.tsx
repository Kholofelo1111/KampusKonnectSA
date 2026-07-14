export default function DownloadPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-900 to-emerald-800 text-white flex items-center justify-center p-6">
      <div className="max-w-3xl w-full rounded-3xl bg-white/10 backdrop-blur-xl p-8 shadow-2xl">

        <h1 className="text-5xl font-extrabold mb-4">
          Kampus Konnect SA
        </h1>

        <p className="text-xl text-gray-200 mb-8">
          South Africa's AI-powered student platform.
        </p>

        <a
          href="/KampusKonnectSA.apk"
          className="block w-full rounded-xl bg-white text-blue-700 text-center py-4 text-xl font-bold hover:bg-gray-100 transition"
        >
          📥 Download Android APK
        </a>

        <div className="mt-8 space-y-4">

          <h2 className="text-2xl font-bold">
            Why do I see a Play Protect warning?
          </h2>

          <p>
            Kampus Konnect SA is currently distributed from our official
            website while we prepare for Google Play publication.
          </p>

          <p>
            Google Play Protect warns users whenever an app has not yet
            been published on Google Play. This does <strong>NOT</strong>
            mean the app is unsafe.
          </p>

          <p className="font-semibold text-green-300">
            ✔ Download only from the official website:
          </p>

          <p className="text-blue-300">
            https://kandktechsolutions.co.za/download
          </p>

        </div>

      </div>
    </main>
  );
}
