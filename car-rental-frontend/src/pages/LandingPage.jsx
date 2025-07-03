import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center max-w-7xl mx-auto px-6 py-20 gap-12">
        <div className="flex-1">
          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            Shfrytëzo qiranë me <span className="text-blue-600">Illyrian Car Rental</span>
          </h1>
          <p className="text-lg text-gray-700 mb-8 max-w-xl">
            Vetura premium, lehtë për t’u rezervuar dhe me çmimet më të mira në vend. Eksperienca juaj e udhëtimit fillon këtu.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/login"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Hyr
            </Link>
            <Link
              to="/register"
              className="inline-block border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Regjistrohu
            </Link>
          </div>
        </div>

        <div className="flex-1">
          <img
            src="/Assets/Ferrari (2).png"
            alt="Vetura moderne"
            className="w-full rounded-3xl shadow-lg"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-12">Pse të na zgjidhni ne?</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="text-blue-600 text-5xl mb-2">🚗</div>
              <h3 className="text-2xl font-semibold">Flotë Moderne</h3>
              <p className="text-gray-600">
                Vetura më të reja dhe më të sigurta, të gjitha në dispozicion për ty.
              </p>
            </div>

            <div className="space-y-4">
              <div className="text-blue-600 text-5xl mb-2">⚡</div>
              <h3 className="text-2xl font-semibold">Rezervim i Shpejtë</h3>
              <p className="text-gray-600">
                Rezervo në pak klikime dhe nis udhëtimin pa stres.
              </p>
            </div>

            <div className="space-y-4">
              <div className="text-blue-600 text-5xl mb-2">💰</div>
              <h3 className="text-2xl font-semibold">Çmime Konkurruese</h3>
              <p className="text-gray-600">
                Oferta transparente dhe pa tarifa të fshehura.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20 px-6 text-white text-center">
        <h2 className="text-4xl font-extrabold mb-6">Gati për të nisur udhëtimin?</h2>
        <p className="mb-8 max-w-xl mx-auto text-lg">
          Bashkohuni me mijëra përdorues që kanë zgjedhur Illyrian Car Rental për qiranë e veturave të tyre.
        </p>
        <Link
          to="/register"
          className="inline-block bg-white text-blue-600 px-10 py-4 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Regjistrohu Tani
        </Link>
      </section>
    </div>
  );
}
