import { useEffect, useState } from "react";
import { getProperties } from "../api/api";
import Section from "../components/section";
import Footer from "../components/footer";

const PER_PAGE = 8;

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProperties() {
      setLoading(true);
      const res = await getProperties();
      setProperties(res.data || []);
      setLoading(false);
    }
    loadProperties();
  }, []);


  const filtered = properties.filter((p) => {
    const titleMatch = p.title.toLowerCase().includes(search.toLowerCase());
    const locationMatch =
      p.location.address.toLowerCase().includes(search.toLowerCase()) ||
      p.location.city.toLowerCase().includes(search.toLowerCase()) ||
      p.location.state.toLowerCase().includes(search.toLowerCase());
    return titleMatch || locationMatch;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const currentData = filtered.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <div className="w-14 h-14 border-4 border-blue-900 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-5 pt-28 pb-10">
        <h1 className="text-3xl lg:text-4xl font-semibold text-blue-900 text-center mb-4">
          Explore Our Properties
        </h1>
        <p className="text-center text-slate-600 mb-8">
          Browse verified listings across prime locations
        </p>

        <div className="flex justify-center mb-12">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            placeholder="Search by title or location"
            className="w-full max-w-md px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
          />
        </div>

      
        <Section title="Properties" items={currentData} />

        <div className="flex justify-center items-center gap-6 mt-12">
          <button
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-40"
          >
            ← Prev
          </button>

          <span className="text-slate-700 font-medium">
            Page {page + 1} of {totalPages}
          </span>

          <button
            disabled={page === totalPages - 1 || totalPages === 0}
            onClick={() => setPage((p) => p + 1)}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
