import Card from "./card";

export default function Section({ title, items }) {
  return (
    <section className="mb-12 mt-6">
      <h2 className="text-center text-2xl font-semibold mb-6">{title}</h2>

      <div className="flex gap-4 px-4 overflow-x-auto hide-scrollbar">
        {items.map((item) => (
          <Card key={item.id} property={item} />
        ))}
      </div>
    </section>
  );
}
