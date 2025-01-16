"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDarkMode } from "@/app/context/DarkModeContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase/client";
import { Star, MapPin, Clock, Calendar } from "lucide-react";

interface Coach {
  id: string;
  name: string;
  sports: string[];
  location: string;
  rating: number;
  hourlyRate: number;
  imageUrl: string;
  experience: number;
  bio: string;
}

export default function CoachSearch() {
  const searchParams = useSearchParams();
  const { darkMode } = useDarkMode();
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSport, setSelectedSport] = useState(
    searchParams.get("sport") || ""
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  const location = searchParams.get("location");
  const distance = searchParams.get("distance");
  const date = searchParams.get("date");
  const time = searchParams.get("time");

  useEffect(() => {
    fetchCoaches();
  }, [location, distance, selectedSport, priceRange]);

  const fetchCoaches = async () => {
    try {
      const coachesRef = collection(db, "coaches");

      const q = query(coachesRef);
      const querySnapshot = await getDocs(q);

      const coachesData: Coach[] = [];
      querySnapshot.forEach((doc) => {
        coachesData.push({ id: doc.id, ...doc.data() } as Coach);
      });

      setCoaches(coachesData);
    } catch (error) {
      console.error("Error fetching coaches:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <main
        className={`min-h-screen ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Coaches near {location}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                Within {distance} miles
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(date || "").toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {time}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-6">
              <div
                className={`p-6 rounded-lg ${
                  darkMode ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <h2 className="font-semibold mb-4">Filters</h2>

                <div className="mb-4">
                  <label className="block text-sm mb-2">Sport</label>
                  <select
                    value={selectedSport}
                    onChange={(e) => setSelectedSport(e.target.value)}
                    className={`w-full rounded-md ${
                      darkMode ? "bg-gray-700 text-white" : "bg-white"
                    }`}
                  >
                    <option value="">All Sports</option>
                    <option value="football">Football</option>
                    <option value="basketball">Basketball</option>
                    <option value="tennis">Tennis</option>
                    <option value="swimming">Swimming</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm mb-2">Price Range</label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([+e.target.value, priceRange[1]])
                      }
                      className="w-24"
                      min="0"
                    />
                    <span>to</span>
                    <Input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], +e.target.value])
                      }
                      className="w-24"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-3">
              {loading ? (
                <div className="text-center py-12">Loading...</div>
              ) : coaches.length === 0 ? (
                <div className="text-center py-12">
                  No coaches found matching your criteria
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {coaches.map((coach) => (
                    <div
                      key={coach.id}
                      className={`rounded-lg overflow-hidden shadow-lg ${
                        darkMode ? "bg-gray-800" : "bg-white"
                      }`}
                    >
                      <div className="relative h-48">
                        <Image
                          src={coach.imageUrl || "/default-coach.jpg"}
                          alt={coach.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2">
                          {coach.name}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span>{coach.rating.toFixed(1)}</span>
                        </div>
                        <p className="text-sm mb-4">
                          {coach.bio.substring(0, 100)}...
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">
                            ${coach.hourlyRate}/hr
                          </span>
                          <Button className="bg-[#042C64] hover:bg-[#042C64]/90">
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
