"use client";

import {
  Car,
  CheckCircle2,
  XCircle,
  Activity,
  ParkingCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import useParking from "@/hooks/useParking";

export default function ParkingDashboard() {
  const { spots, availableCount } = useParking();

  const occupiedCount = spots.length - availableCount;
  const occupancyRate =
    spots.length > 0 ? Math.round((occupiedCount / spots.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <ParkingCircle className="h-9 w-9" />
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Smart Parking Dashboard
                </h1>
                <p className="text-sm text-slate-500">
                  Real-time parking monitoring system
                </p>
              </div>
            </div>
          </div>

          {/* Live Status */}
          <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-500" />
            <span className="text-sm font-medium text-slate-600">
              Live Monitoring
            </span>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <Card className="border-0 shadow-md rounded-3xl">
            <CardContent className="p-6">
              <p className="text-sm text-slate-500">Available Spots</p>
              <div className="mt-2 flex items-center justify-between">
                <h2 className="text-3xl font-bold">{availableCount}</h2>
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md rounded-3xl">
            <CardContent className="p-6">
              <p className="text-sm text-slate-500">Occupied Spots</p>
              <div className="mt-2 flex items-center justify-between">
                <h2 className="text-3xl font-bold">{occupiedCount}</h2>
                <XCircle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md rounded-3xl">
            <CardContent className="p-6">
              <p className="text-sm text-slate-500">Occupancy Rate</p>
              <div className="mt-2 flex items-center justify-between">
                <h2 className="text-3xl font-bold">{occupancyRate}%</h2>
                <Activity className="h-8 w-8 text-slate-700" />
              </div>

              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${occupancyRate}%` }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Parking Grid */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Parking Spots</h2>
            <p className="text-sm text-slate-500">{spots.length} total spots</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {spots.map((spot) => {
              const available = spot.status === "available";

              return (
                <Card
                  key={spot.id}
                  className="group rounded-3xl border-0 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <CardContent className="p-6">
                    {/* Top */}
                    <div className="mb-5 flex items-center justify-between">
                      <div
                        className={`rounded-2xl p-3 ${
                          available ? "bg-green-100" : "bg-red-100"
                        }`}
                      >
                        <Car
                          className={`h-6 w-6 ${
                            available ? "text-green-600" : "text-red-600"
                          }`}
                        />
                      </div>

                      {available ? (
                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                      ) : (
                        <XCircle className="h-6 w-6 text-red-500" />
                      )}
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-lg font-semibold">
                        Spot {spot.spotNumber}
                      </h3>

                      <div className="mt-3 flex items-center gap-2">
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${
                            available ? "bg-green-500" : "bg-red-500"
                          }`}
                        />

                        <p
                          className={`text-sm font-medium ${
                            available ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {available ? "Available" : "Occupied"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
