import { Search, Calendar, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function SearchBar() {
  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="flex items-center gap-3 p-3 border border-border rounded-xl bg-white hover:border-primary/50 transition-colors">
          <Search className="w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Destination"
            className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        <div className="flex items-center gap-3 p-3 border border-border rounded-xl bg-white hover:border-primary/50 transition-colors">
          <Calendar className="w-5 h-5 text-muted-foreground" />
          <Input
            type="date"
            className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        <div className="flex items-center gap-3 p-3 border border-border rounded-xl bg-white hover:border-primary/50 transition-colors">
          <DollarSign className="w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Budget"
            type="number"
            className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        <Button className="bg-primary hover:bg-primary/90 text-white h-full rounded-xl">
          <Search className="w-5 h-5 mr-2" />
          Search Trips
        </Button>
      </div>
    </div>
  );
}
