"use client";

import Link from "next/link";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function AdminCarsPage() {
  const cars = useQuery(api.cars.adminList);
  const remove = useMutation(api.cars.remove);
  const setStatus = useMutation(api.cars.setStatus);

  if (!cars) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold">Cars</h1>
          <p className="text-sm text-muted-foreground">
            Manage listings (create/edit/delete/publish).
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/cars/new">New car</Link>
        </Button>
      </div>

      <div className="mt-6 border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cars.map((car) => (
              <TableRow key={car._id}>
                <TableCell className="font-medium">
                  <div>{car.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {car.make} {car.model} • {car.year}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      car.status === "published" ? "default" : "secondary"
                    }
                  >
                    {car.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {car.currency} {car.price.toLocaleString()}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/admin/cars/${car._id}/edit`}>Edit</Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      setStatus({
                        id: car._id,
                        status:
                          car.status === "published" ? "draft" : "published",
                      })
                    }
                  >
                    {car.status === "published" ? "Unpublish" : "Publish"}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => remove({ id: car._id })}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {cars.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-sm py-10">
                  No cars yet. Create one.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
