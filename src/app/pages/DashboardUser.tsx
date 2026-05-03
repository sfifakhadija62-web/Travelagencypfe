import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { bookings } from '../data/bookings';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { User, MapPin, Calendar, DollarSign, LogOut, Home, Settings } from 'lucide-react';

export function DashboardUser() {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bookings');
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  const userBookings = bookings.filter(b => b.userId === user?.id);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSaveProfile = () => {
    updateProfile(profileData);
    setEditMode(false);
  };

  const handleCancelBooking = (bookingId: number) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      alert(`Booking #${bookingId} has been cancelled`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-semibold text-xl text-primary">VoyageVert</span>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate('/')}>
                <Home className="w-5 h-5 mr-2" />
                Home
              </Button>
              <div className="flex items-center gap-3">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-sm">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">User Account</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <aside className="md:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
                    activeTab === 'bookings' ? 'bg-primary text-white' : 'hover:bg-muted'
                  }`}
                >
                  <Calendar className="w-5 h-5" />
                  <span>My Bookings</span>
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
                    activeTab === 'profile' ? 'bg-primary text-white' : 'hover:bg-muted'
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  <span>Profile Settings</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 text-red-600 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </aside>

          <main className="md:col-span-3">
            {activeTab === 'bookings' && (
              <div>
                <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
                  <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-primary/10 rounded-xl p-4">
                      <p className="text-sm text-muted-foreground mb-1">Total Bookings</p>
                      <p className="text-3xl font-bold text-primary">{userBookings.length}</p>
                    </div>
                    <div className="bg-secondary/10 rounded-xl p-4">
                      <p className="text-sm text-muted-foreground mb-1">Confirmed</p>
                      <p className="text-3xl font-bold text-secondary">
                        {userBookings.filter(b => b.status === 'confirmed').length}
                      </p>
                    </div>
                    <div className="bg-muted rounded-xl p-4">
                      <p className="text-sm text-muted-foreground mb-1">Pending</p>
                      <p className="text-3xl font-bold text-foreground">
                        {userBookings.filter(b => b.status === 'pending').length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {userBookings.map((booking) => (
                    <div key={booking.id} className="bg-white rounded-2xl p-6 shadow-md">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{booking.tripName}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{booking.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              <span>{booking.numberOfPeople} people</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">${booking.totalPrice}</p>
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-2 ${
                              booking.status === 'confirmed'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {booking.status}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            Payment: {booking.paymentMethod === 'credit_card' ? 'Credit Card' : 'Cash'}
                          </span>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleCancelBooking(booking.id)}
                          className="rounded-xl"
                        >
                          Cancel Booking
                        </Button>
                      </div>
                    </div>
                  ))}

                  {userBookings.length === 0 && (
                    <div className="bg-white rounded-2xl p-12 text-center shadow-md">
                      <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No bookings yet</h3>
                      <p className="text-muted-foreground mb-6">Start exploring our amazing destinations!</p>
                      <Button
                        onClick={() => navigate('/trips')}
                        className="bg-primary hover:bg-primary/90 text-white"
                      >
                        Browse Trips
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Profile Settings</h2>
                  {!editMode && (
                    <Button
                      onClick={() => setEditMode(true)}
                      className="bg-primary hover:bg-primary/90 text-white"
                    >
                      Edit Profile
                    </Button>
                  )}
                </div>

                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border">
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-bold">{user?.name}</h3>
                    <p className="text-muted-foreground">{user?.email}</p>
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mt-2">
                      {user?.role}
                    </span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      disabled={!editMode}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      disabled={!editMode}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      disabled={!editMode}
                      className="mt-2"
                    />
                  </div>

                  {editMode && (
                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={handleSaveProfile}
                        className="bg-primary hover:bg-primary/90 text-white flex-1"
                      >
                        Save Changes
                      </Button>
                      <Button
                        onClick={() => {
                          setEditMode(false);
                          setProfileData({
                            name: user?.name || '',
                            email: user?.email || '',
                            phone: user?.phone || ''
                          });
                        }}
                        variant="outline"
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
