"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { CarCard } from "@/components/CarCard";

export default function HomePage() {
  const cars = useQuery(api.cars.listPublished);

  if (!cars) return <div className="p-6">Loading...</div>;

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold">Cars</h1>
      <p className="text-sm text-muted-foreground mt-1">
        Browse available cars (published listings only).
      </p>

      <div className="grid gap-4 mt-6 sm:grid-cols-2">
        {cars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>

      {cars.length === 0 && <div className="mt-8 text-sm">No cars yet.</div>}
    </main>
  );
}
