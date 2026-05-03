import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { TripCard } from '../components/TripCard';
import { popularTrips } from '../data/trips';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Slider } from '../components/ui/slider';

export function Trips() {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCity, setSelectedCity] = useState('all');

  const cities = ['all', 'Chefchaouen', 'Sahara', 'Atlas Mountains', 'Merzouga', 'Rif'];

  const filteredTrips = popularTrips.filter(trip => {
    const matchesSearch = trip.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          trip.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = trip.price >= priceRange[0] && trip.price <= priceRange[1];
    const matchesCity = selectedCity === 'all' || trip.destination.includes(selectedCity);

    return matchesSearch && matchesPrice && matchesCity;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Explore All Destinations</h1>
          <p className="text-xl text-white/90">Find your perfect Moroccan adventure</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-md sticky top-24">
              <h3 className="font-semibold text-lg mb-6">Filters</h3>

              <div className="mb-6">
                <Label className="mb-3 block">Search Destination</Label>
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-xl"
                />
              </div>

              <div className="mb-6">
                <Label className="mb-3 block">City</Label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full border border-border rounded-xl p-3 bg-white"
                >
                  {cities.map(city => (
                    <option key={city} value={city}>
                      {city === 'all' ? 'All Cities' : city}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <Label className="mb-3 block">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </Label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  min={0}
                  max={1000}
                  step={50}
                  className="mt-4"
                />
              </div>

              <button
                onClick={() => {
                  setSearchQuery('');
                  setPriceRange([0, 1000]);
                  setSelectedCity('all');
                }}
                className="w-full bg-muted text-foreground py-3 rounded-xl hover:bg-muted/80 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </aside>

          <div className="lg:col-span-3">
            <div className="mb-6">
              <p className="text-muted-foreground">
                Found {filteredTrips.length} {filteredTrips.length === 1 ? 'trip' : 'trips'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredTrips.map((trip) => (
                <TripCard key={trip.id} {...trip} />
              ))}
            </div>

            {filteredTrips.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No trips found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setPriceRange([0, 1000]);
                    setSelectedCity('all');
                  }}
                  className="mt-4 text-primary hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
