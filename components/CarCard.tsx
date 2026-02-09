import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function CarCard({ car }: { car: any }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-lg">{car.title}</CardTitle>
          <Badge variant={car.status === "published" ? "default" : "secondary"}>
            {car.status}
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground">
          {car.make} {car.model} • {car.year} • {car.mileageKm.toLocaleString()}{" "}
          km
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm">{car.location}</div>
        <div className="mt-2 font-semibold">
          {car.currency} {car.price.toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
}
