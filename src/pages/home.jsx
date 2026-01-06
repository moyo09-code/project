import { useEffect, useState } from "react";
import { getProperties } from "../api/api";
import Section from "../components/section";

const PER_PAGE = 32;

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      const res = await getProperties();
      setProperties(res.data || []);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = properties.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  const currentData = filtered.slice(
    page * PER_PAGE,
    (page + 1) * PER_PAGE
  );

  const group = (type) => currentData.filter((p) => p.type === type);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-14 h-14 border-4 border-green-900 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="pb-12">
      
      <Section title="Bungalows" items={group("bungalow")} />
      <Section title="Duplexes" items={group("duplex")} />
      <Section title="Villas" items={group("villa")} />
      <Section title="Penthouses" items={group("penthouse")} />
      <Section title="Apartments" items={group("apartment")} />

      <div className="flex justify-center items-center gap-6 mt-10">
        <button
          disabled={page === 0}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-green-900 text-white rounded disabled:opacity-40"
        >
          ← 
        </button>

        <span>
          Page {page + 1} of {totalPages}
        </span>

        <button
          disabled={page === totalPages - 1}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-green-900 text-white rounded disabled:opacity-40"
        >
          →
        </button>
      </div>
    </div>
  );
}
