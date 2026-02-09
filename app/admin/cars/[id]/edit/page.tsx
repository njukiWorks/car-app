"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type FormState = {
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  currency: string;
  mileageKm: number;
  location: string;
  description: string;
  images: string; // comma-separated URLs in the form
};

const emptyForm = (): FormState => ({
  title: "",
  make: "",
  model: "",
  year: new Date().getFullYear(),
  price: 0,
  currency: "KES",
  mileageKm: 0,
  location: "",
  description: "",
  images: "",
});

export default function EditCarPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  // Convex Ids are strings at runtime; we type-cast for TS safety
  const carId = useMemo(() => params.id as Id<"cars">, [params.id]);

  // You can replace adminList+find with a dedicated getById query later
  const cars = useQuery(api.cars.adminList);
  const car = cars?.find((c) => c._id === carId);

  const update = useMutation(api.cars.update);

  // No null form → no “form possibly null” errors
  const [form, setForm] = useState<FormState>(() => emptyForm());
  const [hydrated, setHydrated] = useState(false);

  // Hydrate form once car loads
  useEffect(() => {
    if (!car || hydrated) return;

    setForm({
      title: car.title ?? "",
      make: car.make ?? "",
      model: car.model ?? "",
      year: Number(car.year ?? new Date().getFullYear()),
      price: Number(car.price ?? 0),
      currency: car.currency ?? "KES",
      mileageKm: Number(car.mileageKm ?? 0),
      location: car.location ?? "",
      description: car.description ?? "",
      images: (car.images ?? []).join(", "),
    });
    setHydrated(true);
  }, [car, hydrated]);

  if (cars === undefined) return <div className="p-6">Loading...</div>;
  if (!car) return <div className="p-6">Car not found.</div>;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    await update({
      id: carId,
      title: form.title,
      make: form.make,
      model: form.model,
      year: Number(form.year),
      price: Number(form.price),
      currency: form.currency,
      mileageKm: Number(form.mileageKm),
      location: form.location,
      description: form.description,
      images: form.images
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    });

    router.push("/admin/cars");
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-bold">Edit car</h1>

        <Button variant="outline" onClick={() => router.push("/admin/cars")}>
          Back
        </Button>
      </div>

      <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
        <Input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Title"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            value={form.make}
            onChange={(e) => setForm({ ...form, make: e.target.value })}
            placeholder="Make (e.g. Toyota)"
          />
          <Input
            value={form.model}
            onChange={(e) => setForm({ ...form, model: e.target.value })}
            placeholder="Model (e.g. Premio)"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Input
            type="number"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
            placeholder="Year"
          />
          <Input
            type="number"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: Number(e.target.value) })
            }
            placeholder="Price"
          />
          <Input
            value={form.currency}
            onChange={(e) => setForm({ ...form, currency: e.target.value })}
            placeholder="Currency (e.g. KES)"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            type="number"
            value={form.mileageKm}
            onChange={(e) =>
              setForm({ ...form, mileageKm: Number(e.target.value) })
            }
            placeholder="Mileage (km)"
          />
          <Input
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="Location (e.g. Nairobi)"
          />
        </div>

        <Textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Description"
          rows={6}
        />

        <Input
          value={form.images}
          onChange={(e) => setForm({ ...form, images: e.target.value })}
          placeholder="Image URLs (comma separated)"
        />

        <div className="flex gap-3">
          <Button type="submit">Save</Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/cars")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
