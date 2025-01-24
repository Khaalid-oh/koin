"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";

interface LocationAutocompleteProps {
  onLocationSelect: (location: {
    address: string;
    lat: number;
    lng: number;
  }) => void;
  className?: string;
}

export function LocationAutocomplete({
  onLocationSelect,
  className,
}: LocationAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!inputRef.current || !window.google) return;

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
      types: ["geocode"],
      componentRestrictions: { country: "us" },
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry?.location) return;

      const location = {
        address: place.formatted_address || "",
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };

      onLocationSelect(location);
      setValue(location.address);
    });

    return () => {
      google.maps.event.clearInstanceListeners(autocomplete);
    };
  }, [onLocationSelect]);

  return (
    <Input
      ref={inputRef}
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Enter your location"
      className={className}
    />
  );
}
