import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Users, 
  Building, 
  Calendar, 
  Star,
  MessageCircle,
  ChevronRight,
  Mail,
  Globe,
  Award,
  TrendingUp,
  Shield,
  Zap,
  Heart,
  Home,
  Image,
  FileText,
  Settings
} from 'lucide-react';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  // Sample data
  const villageStats = {
    population: 5420,
    families: 1680,
    umkm: 45,
    area: 12.5
  };

  const news = [
    {
      id: 1,
      title: "Peluncuran Program Smart Village 2025",
      category: "Teknologi",
      date: "15 Januari 2025",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400",
      excerpt: "Desa Maju meluncurkan program digitalisasi layanan publik untuk meningkatkan pelayanan kepada masyarakat."
    },
    {
      id: 2,
      title: "Festival Budaya Desa Maju Sukses Digelar",
      category: "Budaya",
      date: "10 Januari 2025",
      image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400",
      excerpt: "Festival budaya tahunan menampilkan kesenian tradisional dan produk UMKM lokal."
    },
    {
      id: 3,
      title: "Pembangunan Jalan Akses Baru Dimulai",
      category: "Pembangunan",
      date: "8 Januari 2025",
      image: "https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=400",
      excerpt: "Proyek jalan baru sepanjang 2km akan meningkatkan akses transportasi ke kawasan wisata."
    }
  ];

  const umkmList = [
    {
      id: 1,
      name: "Warung Nasi Bu Sari",
      category: "Kuliner",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.8,
      phone: "628123456789",
      location: "Jl. Raya Desa No. 15",
      openTime: "06:00",
      closeTime: "21:00",
      description: "Warung nasi dengan menu tradisional dan modern"
    },
    {
      id: 2,
      name: "Toko Kerajinan Bambu Kreatif",
      category: "Kerajinan",
      image: "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.9,
      phone: "628234567890",
      location: "Jl. Kerajinan No. 8",
      openTime: "08:00",
      closeTime: "17:00",
      description: "Kerajinan bambu berkualitas tinggi dan ramah lingkungan"
    },
    {
      id: 3,
      name: "Fresh Market Organik",
      category: "Pertanian",
      image: "https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.7,
      phone: "628345678901",
      location: "Pasar Desa Blok A-5",
      openTime: "05:00",
      closeTime: "18:00",
      description: "Sayuran organik segar langsung dari petani lokal"
    },
    {
      id: 4,
      name: "Kopi Robusta Desa",
      category: "Minuman",
      image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.9,
      phone: "628456789012",
      location: "Jl. Perkebunan No. 12",
      openTime: "07:00",
      closeTime: "22:00",
      description: "Kopi robusta premium dengan cita rasa khas daerah"
    }
  ];

  const services = [
    { name: "Surat Keterangan", icon: FileText, color: "text-blue-500" },
    { name: "Pelayanan KTP", icon: Users, color: "text-green-500" },
    { name: "Administrasi Desa", icon: Settings, color: "text-purple-500" },
    { name: "Pengaduan Online", icon: MessageCircle, color: "text-red-500" }
  ];

  const gallery = [
    "https://images.pexels.com/photos/247600/pexels-photo-247600.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/1642125/pexels-photo-1642125.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/1933316/pexels-photo-1933316.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/2531709/pexels-photo-2531709.jpeg?auto=compress&cs=tinysrgb&w=400"
  ];

  // Auto-rotate news
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % news.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [news.length]);

  const StatCard = ({ icon: Icon, value, label, color = "text-blue-400" }) => (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`w-8 h-8 ${color}`} />
        </div>
        <div>
          <div className="text-2xl font-bold text-white">{value.toLocaleString()}</div>
          <div className="text-gray-300 text-sm">{label}</div>
        </div>
      </div>
    </div>
  );

  const NewsCard = ({ news: newsItem, isActive }) => (
    <div className={`transition-all duration-500 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute'}`}>
      <div className="bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden border border-white/20 hover:bg-white/15 transition-all duration-300 group">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={newsItem.image} 
            alt={newsItem.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">
              {newsItem.category}
            </span>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center text-gray-400 text-sm mb-2">
            <Calendar className="w-4 h-4 mr-2" />
            {newsItem.date}
          </div>
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
            {newsItem.title}
          </h3>
          <p className="text-gray-300 leading-relaxed">{newsItem.excerpt}</p>
          <button className="mt-4 flex items-center text-blue-400 hover:text-blue-300 transition-colors font-medium">
            Baca Selengkapnya <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );

  const UMKMCard = ({ umkm }) => (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden border border-white/20 hover:bg-white/15 transition-all duration-300 group hover:scale-105">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={umkm.image} 
          alt={umkm.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4">
          <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-1 fill-current" />
            <span className="text-white text-sm font-medium">{umkm.rating}</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{umkm.name}</h3>
            <span className="bg-gradient-to-r from-green-400 to-blue-400 text-white px-2 py-1 rounded-full text-xs font-medium">
              {umkm.category}
            </span>
          </div>
        </div>
        
        <p className="text-gray-300 text-sm mb-4">{umkm.description}</p>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-gray-300 text-sm">
            <MapPin className="w-4 h-4 mr-2 text-red-400" />
            {umkm.location}
          </div>
          <div className="flex items-center text-gray-300 text-sm">
            <Clock className="w-4 h-4 mr-2 text-green-400" />
            {umkm.openTime} - {umkm.closeTime} WIB
          </div>
        </div>
        
        <div className="flex space-x-2">
          <a 
            href={`https://wa.me/${umkm.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center group"
          >
            <MessageCircle className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            WhatsApp
          </a>
          <button className="flex-1 bg-white/20 text-white px-4 py-2 rounded-xl font-medium hover:bg-white/30 transition-all duration-300 flex items-center justify-center group">
            <MapPin className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            Lokasi
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold text-xl">Desa Maju</span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              {[
                { id: 'home', label: 'Beranda' },
                { id: 'news', label: 'Berita' },
                { id: 'umkm', label: 'UMKM' },
                { id: 'services', label: 'Layanan' },
                { id: 'gallery', label: 'Galeri' },
                { id: 'contact', label: 'Kontak' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`text-sm font-medium transition-colors duration-300 ${
                    activeSection === item.id ? 'text-blue-400' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {activeSection === 'home' && (
        <section className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Desa Maju
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Desa Inovatif dengan Teknologi Smart Village untuk Pelayanan Terbaik Masyarakat
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => setActiveSection('services')}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-2xl font-medium hover:scale-105 transition-all duration-300 flex items-center justify-center group"
                >
                  <Zap className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Layanan Digital
                </button>
                <button 
                  onClick={() => setActiveSection('umkm')}
                  className="bg-white/20 text-white px-8 py-4 rounded-2xl font-medium hover:bg-white/30 transition-all duration-300 flex items-center justify-center group"
                >
                  <Building className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Explore UMKM
                </button>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              <StatCard icon={Users} value={villageStats.population} label="Penduduk" color="text-blue-400" />
              <StatCard icon={Home} value={villageStats.families} label="Kepala Keluarga" color="text-green-400" />
              <StatCard icon={Building} value={villageStats.umkm} label="UMKM Aktif" color="text-purple-400" />
              <StatCard icon={MapPin} value={villageStats.area} label="Luas (km²)" color="text-red-400" />
            </div>

            {/* Mission Vision */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20">
                    <TrendingUp className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white ml-4">Visi</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Menjadi desa mandiri, maju, dan sejahtera berbasis teknologi digital yang berpedoman pada nilai-nilai kearifan lokal dan pemberdayaan masyarakat berkelanjutan.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-green-500/20 to-blue-500/20">
                    <Award className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white ml-4">Misi</h3>
                </div>
                <ul className="text-gray-300 leading-relaxed space-y-2">
                  <li>• Mengembangkan pelayanan publik digital</li>
                  <li>• Memberdayakan ekonomi lokal melalui UMKM</li>
                  <li>• Melestarikan budaya dan kearifan lokal</li>
                  <li>• Menciptakan lingkungan yang berkelanjutan</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* News Section */}
      {activeSection === 'news' && (
        <section className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Berita Terkini
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Ikuti perkembangan terbaru dan kegiatan menarik di Desa Maju
              </p>
            </div>

            {/* Featured News */}
            <div className="relative h-96 mb-12">
              {news.map((newsItem, index) => (
                <NewsCard 
                  key={newsItem.id} 
                  news={newsItem} 
                  isActive={index === currentNewsIndex} 
                />
              ))}
              
              {/* News Navigation */}
              <div className="flex justify-center mt-8 space-x-3">
                {news.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentNewsIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentNewsIndex ? 'bg-blue-400 scale-125' : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* All News Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {news.map((newsItem) => (
                <div key={newsItem.id} className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                  <div className="relative h-40 overflow-hidden">
                    <img 
                      src={newsItem.image} 
                      alt={newsItem.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {newsItem.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center text-gray-400 text-xs mb-2">
                      <Calendar className="w-3 h-3 mr-1" />
                      {newsItem.date}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                      {newsItem.title}
                    </h3>
                    <p className="text-gray-300 text-sm">{newsItem.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* UMKM Section */}
      {activeSection === 'umkm' && (
        <section className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  UMKM Desa Maju
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Dukung ekonomi lokal dengan berbelanja di UMKM terpercaya di desa kami
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {umkmList.map((umkm) => (
                <UMKMCard key={umkm.id} umkm={umkm} />
              ))}
            </div>

            {/* CTA Section */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-4">Ingin Bergabung dengan UMKM Kami?</h3>
                <p className="text-gray-300 mb-6">Daftarkan usaha Anda dan jadilah bagian dari komunitas UMKM Desa Maju</p>
                <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-xl font-medium hover:scale-105 transition-all duration-300">
                  Daftar UMKM
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Services Section */}
      {activeSection === 'services' && (
        <section className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Layanan Digital
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Nikmati kemudahan layanan administrasi desa yang cepat dan efisien
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {services.map((service, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group text-center hover:scale-105">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 group-hover:scale-110 transition-transform duration-300">
                      <service.icon className={`w-8 h-8 ${service.color}`} />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{service.name}</h3>
                  <p className="text-gray-300 text-sm mb-4">Layanan cepat dan mudah</p>
                  <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-xl font-medium hover:scale-105 transition-all duration-300 w-full">
                    Akses Layanan
                  </button>
                </div>
              ))}
            </div>

            {/* Digital Transformation Info */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20">
                  <Shield className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white ml-4">Transformasi Digital</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
                  <div className="text-gray-300">Layanan Online</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">5 Menit</div>
                  <div className="text-gray-300">Proses Cepat</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">100%</div>
                  <div className="text-gray-300">Paperless</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {activeSection === 'gallery' && (
        <section className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">
                  Galeri Desa
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Lihat keindahan dan aktivitas menarik di Desa Maju
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {gallery.map((image, index) => (
                <div key={index} className="group relative overflow-hidden rounded-2xl aspect-square">
                  <img 
                    src={image} 
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 text-white">
                      <Image className="w-6 h-6 mb-2" />
                      <p className="text-sm font-medium">Foto Desa</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <button className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-3 rounded-xl font-medium hover:scale-105 transition-all duration-300">
                Lihat Semua Foto
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {activeSection === 'contact' && (
        <section className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Hubungi Kami
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Kami siap melayani dan mendengar aspirasi Anda
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20">
                      <MapPin className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-bold text-white">Alamat</h3>
                      <p className="text-gray-300">Jl. Raya Desa Maju No. 1, Kecamatan Maju, Kabupaten Maju 12345</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-green-500/20 to-blue-500/20">
                      <Phone className="w-6 h-6 text-green-400" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-bold text-white">Telepon</h3>
                      <p className="text-gray-300">(021) 123-456-789</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                      <Mail className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-bold text-white">Email</h3>
                      <p className="text-gray-300">info@desamaju.go.id</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-red-500/20 to-orange-500/20">
                      <Globe className="w-6 h-6 text-red-400" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-bold text-white">Website</h3>
                      <p className="text-gray-300">www.desamaju.go.id</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6">Kirim Pesan</h3>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Nama Lengkap</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input 
                      type="email" 
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                      placeholder="nama@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Subjek</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                      placeholder="Subjek pesan"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Pesan</label>
                    <textarea 
                      rows={5}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Tuliskan pesan Anda di sini..."
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-medium hover:scale-105 transition-all duration-300 flex items-center justify-center group"
                  >
                    <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Kirim Pesan
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-md border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-bold text-xl">Desa Maju</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Desa inovatif dengan teknologi smart village untuk pelayanan terbaik masyarakat.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Layanan</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Administrasi Desa</li>
                <li>Pelayanan KTP</li>
                <li>Surat Keterangan</li>
                <li>Pengaduan Online</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Informasi</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Berita Desa</li>
                <li>UMKM Lokal</li>
                <li>Galeri Foto</li>
                <li>Profil Desa</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Kontak</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  (021) 123-456-789
                </li>
                <li className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  info@desamaju.go.id
                </li>
                <li className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Desa Maju, Kab. Maju
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm flex items-center justify-center">
              Made with <Heart className="w-4 h-4 mx-1 text-red-400 fill-current" /> for Desa Maju © 2025
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;