import React, { useEffect, useRef, useState } from "react";
import {
  MapPin,
  Phone,
  Clock,
  Users,
  Building,
  Calendar,
  MessageCircle,
  ChevronRight,
  Mail,
  Award,
  TrendingUp,
  Zap,
  Home,
  Image,
  FileText,
  Settings,
  X,
  User,
  CheckSquare,
  Briefcase, // Ikon baru untuk UMKM
} from "lucide-react";

/** =================================================================================================
 * BAGIAN 1: TYPE & INTERFACES
 * ================================================================================================= */
interface StatCardProps { icon: React.ComponentType<{ className?: string }>; value: number | string; label: string; color?: string; }
interface NewsItem { id: number; title: string; category: string; date: string; image: string; excerpt: string; fullContent: string; }
interface NewsCardProps { news: NewsItem; onReadMore: (n: NewsItem) => void; }
interface UmkmItem { id: number; name: string; owner: string; category: string; description: string; images: string[]; address: string; phone: string; whatsapp: string; hours: string; lat: number; lng: number; }
interface UMKMCardProps { umkm: UmkmItem; }
interface Service { name: string; icon: React.ComponentType<{ className?: string }>; color: string; }
interface NewsModalProps { news: NewsItem; onClose: () => void; }
interface JabatanCardProps { jabatan: string; nama: string; className?: string; }
interface PotensiPekon { kategori: string; nilai: string; }
interface DataPenduduk { wilayah: string; jiwa: number; laki: number; perempuan: number; kk: number; rumah: number; }
interface InfoTableProps<T> { title: string; headers: (keyof T)[]; data: T[]; }


/** =================================================================================================
 * BAGIAN 2: HOOK & HELPER
 * ================================================================================================= */
const useIntersectionObserver = (options: IntersectionObserverInit) => { const containerRef = useRef<HTMLDivElement | null>(null); const [isVisible, setIsVisible] = useState(false); useEffect(() => { const el = containerRef.current; if (!el) return; const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setIsVisible(true); obs.unobserve(entry.target); } }, options); obs.observe(el); return () => obs.disconnect(); }, [containerRef, options]); return [containerRef, isVisible] as const; };
const getTokoStatus = (hoursString: string) => { if (!hoursString) return { status: "N/A", color: "bg-gray-700/20 text-gray-300" }; if (hoursString.toLowerCase() === "24 jam") { return { status: "Buka", color: "bg-green-700/20 text-green-300" }; } const normalized = hoursString.replace(/\s/g, ""); const parts = normalized.split("-"); if (parts.length !== 2) return { status: "N/A", color: "bg-gray-700/20 text-gray-300" }; const parseTime = (t: string) => { const delim = t.includes(".") ? "." : ":"; const [h, m = "0"] = t.split(delim); return { hour: Number(h), minute: Number(m) }; }; const { hour: oh, minute: om } = parseTime(parts[0]); const { hour: ch, minute: cm } = parseTime(parts[1]); const now = new Date(); const cur = now.getHours() * 60 + now.getMinutes(); const open = oh * 60 + om; const close = ch * 60 + cm; let isOpen = false; if (close <= open) { if (cur >= open || cur < close) isOpen = true; } else { if (cur >= open && cur < close) isOpen = true; } return isOpen ? { status: "Buka", color: "bg-green-700/20 text-green-300" } : { status: "Tutup", color: "bg-red-700/20 text-red-300" }; };


/** =================================================================================================
 * BAGIAN 3: MODAL COMPONENTS
 * ================================================================================================= */
const NewsModal = ({ news, onClose }: NewsModalProps) => { return ( <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4"> <div className="bg-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-yellow-400/10 text-white"> <div className="relative"> <button onClick={onClose} className="absolute top-4 right-4 text-gray-300 hover:text-white p-2 rounded-full"> <X className="w-5 h-5" /> </button> <img src={news.image} alt={news.title} className="w-full h-56 object-cover rounded-t-2xl" /> </div> <div className="p-6"> <div className="flex items-center justify-between mb-4"> <span className="bg-yellow-500/10 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium">{news.category}</span> <div className="flex items-center text-gray-400 text-sm"> <Calendar className="w-4 h-4 mr-2" /> {news.date} </div> </div> <h2 className="text-2xl font-semibold mb-4">{news.title}</h2> <div className="prose prose-invert text-gray-200 whitespace-pre-line">{news.fullContent}</div> </div> </div> </div> ); };


/** =================================================================================================
 * BAGIAN 4: CHILD COMPONENTS
 * ================================================================================================= */
const StatCard = ({ icon: Icon, value, label, color = "text-yellow-400" }: StatCardProps) => ( <div className="bg-slate-900/40 rounded-2xl p-5 border border-yellow-400/5"> <div className="flex items-center space-x-4"> <div className="p-3 rounded-lg bg-slate-800/40"> <Icon className={`w-7 h-7 ${color}`} /> </div> <div> <div className="text-2xl font-semibold text-white">{typeof value === "number" ? value.toLocaleString("id-ID") : value}</div> <div className="text-gray-300 text-sm">{label}</div> </div> </div> </div> );
const NewsCard = ({ news, onReadMore }: NewsCardProps) => { return ( <div className="bg-slate-900/40 rounded-2xl overflow-hidden border border-yellow-400/5 flex flex-col"> <div className="relative h-44 overflow-hidden"> <img src={news.image} alt={news.title} className="w-full h-full object-cover" /> </div> <div className="p-4 flex flex-col flex-grow"> <div className="flex items-center text-gray-400 text-sm mb-2"> <Calendar className="w-4 h-4 mr-2" /> {news.date} </div> <h3 className="text-lg font-semibold text-white mb-2">{news.title}</h3> <p className="text-gray-300 text-sm flex-grow">{news.excerpt}</p> <div className="mt-4 flex items-center justify-between"> <button onClick={() => onReadMore(news)} className="text-yellow-400 font-medium hover:text-yellow-300 flex items-center"> Baca Selengkapnya <ChevronRight className="w-4 h-4 ml-1" /> </button> <span className="text-gray-400 text-xs">{news.category}</span> </div> </div> </div> ); };
const UMKMCard = ({ umkm }: UMKMCardProps) => { const tokoStatus = getTokoStatus(umkm.hours); return ( <div className="bg-slate-900/40 rounded-2xl overflow-hidden border border-yellow-400/5 flex flex-col"> <div className="relative h-44 overflow-hidden"> <img src={umkm.images[0]} alt={umkm.name} className="w-full h-full object-cover" /> </div> <div className="p-4 flex flex-col flex-grow"> <div className="flex justify-between items-start mb-2"> <div> <h3 className="text-lg font-semibold text-white capitalize">{umkm.name.toLowerCase()}</h3> <span className="text-gray-300 text-sm">{umkm.category}</span> </div> </div> <div className="flex items-center text-gray-400 text-sm mb-3"> <User className="w-4 h-4 mr-2 text-yellow-400" /> Pemilik: {umkm.owner} </div> <p className="text-gray-300 text-sm mb-4 flex-grow">{umkm.description}</p> <div className="text-gray-300 text-sm space-y-2 mb-4"> <div className="flex items-start"> <MapPin className="w-4 h-4 mr-2 text-gray-400" /> {umkm.address} </div> <div className="flex items-center"> <Clock className="w-4 h-4 mr-2 text-gray-400" /> {umkm.hours} <span className={`ml-3 px-2 py-0.5 text-xs rounded-full font-medium ${tokoStatus.color}`}>{tokoStatus.status}</span> </div> </div> <div className="flex gap-2 mt-auto"> {umkm.whatsapp ? ( <a href={`https://wa.me/${umkm.whatsapp}`} target="_blank" rel="noreferrer" className="flex-1 bg-yellow-500 text-slate-900 py-2 rounded-xl text-center font-medium">WhatsApp</a> ) : ( <button disabled className="flex-1 bg-slate-700 text-gray-400 py-2 rounded-xl">WhatsApp</button> )} <a href={`https://www.google.com/maps/search/?api=1&query=${umkm.lat},${umkm.lng}`} target="_blank" rel="noreferrer" className="flex-1 border border-yellow-400/10 text-white py-2 rounded-xl text-center">Lokasi</a> </div> </div> </div> ); };
const AnimatedSection: React.FC<{ children: React.ReactNode; id: string }> = ({ children, id }) => { const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 }); return ( <section ref={ref} id={id} className={`py-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}> <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div> </section> ); };
const JabatanCard = ({ jabatan, nama, className }: JabatanCardProps) => ( <div className={`bg-slate-800/60 rounded-xl p-4 text-center border border-yellow-400/10 ${className}`}> <p className="text-sm text-yellow-400 font-semibold uppercase tracking-wider">{jabatan}</p> <p className="text-lg text-white font-medium">{nama}</p> </div> );
const InfoTable = <T extends object>({ title, headers, data }: InfoTableProps<T>) => (
  <div>
    <h3 className="text-2xl font-semibold text-white mb-4 text-center">{title}</h3>
    <div className="overflow-x-auto rounded-lg border border-slate-700">
      <table className="min-w-full divide-y divide-slate-700">
        <thead className="bg-slate-800">
          <tr>
            {headers.map((header) => (
              <th key={String(header)} scope="col" className="px-6 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider">
                {String(header).replace(/([A-Z])/g, ' $1').trim()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-slate-900/50 divide-y divide-slate-800">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-slate-800/40">
              {headers.map((header, colIndex) => (
                <td key={`${String(header)}-${colIndex}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {String(row[header])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);


/** =================================================================================================
 * BAGIAN 5: KOMPONEN UTAMA (App)
 * ================================================================================================= */
const App: React.FC = () => {
  // --- state utama ---
  const [activeSection, setActiveSection] = useState("home");
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [showAllNews, setShowAllNews] = useState(false);

  // --- data ---
  const villageInfo = { name: "Pekon Payung", whatsapp: "6285142373305", email: "info@PekonPayung.go.id" };
  const strukturOrganisasi = { kepalaPekon: { jabatan: "Kepala Pekon", nama: "Tabrani" }, bhp: { jabatan: "BHP", nama: "Khuproni" }, sekretaris: { jabatan: "Sekretaris", nama: "Sakrani" }, bendahara: { jabatan: "Bendahara", nama: "Setiawansyah" }, kaur: [ { jabatan: "Kaur Tata Usaha", nama: "Uswati" }, { jabatan: "Kaur Keuangan", nama: "Setiawansyah" }, { jabatan: "Kaur Perencanaan", nama: "Ariyansah" }, ], kasi: [ { jabatan: "Kasi Pemerintahan", nama: "Yunada Mahendra" }, { jabatan: "Kasi Kesra", nama: "Elyana" }, { jabatan: "Kasi Pelayanan", nama: "Rozenni" }, ], kadus: [ { jabatan: "Kadus Way Gelang", nama: "Selpiyana" }, { jabatan: "Kadus Payung", nama: "Pahrurrozi" }, { jabatan: "Kadus Proyek", nama: "Badri" }, { jabatan: "Kadus Timbul", nama: "Rizapalupi" }, ], };
  const dataPotensi: PotensiPekon[] = [
    { kategori: "Luas Wilayah", nilai: "2,800 ha" }, { kategori: "Jumlah KK", nilai: "397 KK" },
    { kategori: "Jumlah Laki-Laki", nilai: "789 jiwa" }, { kategori: "Jumlah Perempuan", nilai: "735 jiwa" },
    { kategori: "Luas Lahan Sawah", nilai: "60 ha" }, { kategori: "Luas Perkebunan", nilai: "800 ha" },
    { kategori: "Luas Hutan", nilai: "1,890 ha" }, { kategori: "Lahan Kas Pekon", nilai: "50 ha" },
  ];
  const dataKependudukan: DataPenduduk[] = [
    { wilayah: "Total Pekon", jiwa: 1524, laki: 789, perempuan: 735, kk: 397, rumah: 294 },
    { wilayah: "Payung Induk", jiwa: 613, laki: 321, perempuan: 292, kk: 169, rumah: 116 },
    { wilayah: "Dusun Timbul", jiwa: 551, laki: 272, perempuan: 279, kk: 142, rumah: 100 },
    { wilayah: "Dusun Proyek", jiwa: 235, laki: 118, perempuan: 117, kk: 56, rumah: 52 },
    { wilayah: "Dusun Way Gelang", jiwa: 125, laki: 78, perempuan: 47, kk: 30, rumah: 26 },
  ];
  // -- UPDATE STATS SESUAI PERMINTAAN --
  const villageStats = { 
    population: dataKependudukan.find(d => d.wilayah === "Total Pekon")?.jiwa || 0, 
    umkm: 11 
  };
  const news: NewsItem[] = [ { id: 1, title: "PEKON PAYUNG", category: "Wisata", date: "15 Agustus 2025", image: "/Screenshot_20250803-065235.png", excerpt: "Pekon Payung adalah salah satu desa yang berada di Kecamatan Kotaagung Barat, Kabupaten Tanggamus, Provinsi...", fullContent: `Pekon Payung adalah salah satu desa yang berada di Kecamatan Kotaagung Barat, Kabupaten Tanggamus, Provinsi Lampung. Desa ini dikenal memiliki lingkungan yang asri, udara sejuk, dan pemandangan alam yang indah. Sebagian besar wilayah Pekon Payung didominasi oleh lahan pertanian dan perkebunan, menjadikannya kawasan yang kaya akan sumber daya alam. Masyarakat di desa ini hidup dengan menjunjung tinggi nilai kebersamaan, gotong royong, dan kearifan lokal yang diwariskan turun-temurun. Letaknya yang strategis, tidak terlalu jauh dari pusat kecamatan, membuat akses menuju Pekon Payung cukup mudah baik bagi penduduk lokal maupun wisatawan.\n\nPekon Payung memiliki sejarah yang erat kaitannya dengan perkembangan pertanian di wilayah Tanggamus. Awalnya, desa ini dibuka oleh sekelompok keluarga petani yang mencari lahan subur untuk bercocok tanam. Seiring waktu, desa berkembang dan menjadi salah satu sentra penghasil berbagai komoditas pertanian, khususnya padi dan kakao. Nama “Pekon Payung” dipercaya memiliki makna filosofis yang berkaitan dengan perlindungan dan kebersamaan, layaknya sebuah payung yang menaungi seluruh warganya.\n\nSecara geografis, Pekon Payung berada di daerah perbukitan dengan ketinggian sedang, sehingga memiliki udara yang sejuk dan tanah yang subur. Curah hujan yang cukup tinggi membuat wilayah ini sangat cocok untuk pertanian dan perkebunan. Selain itu, keberadaan aliran sungai dan cekdam menjadikan desa ini memiliki pasokan air yang melimpah, baik untuk kebutuhan rumah tangga maupun untuk mengairi lahan pertanian.\n\nJumlah penduduk Pekon Payung terdiri dari berbagai kelompok usia, dengan mayoritas berada pada usia produktif. Hal ini menjadi modal penting bagi pengembangan potensi desa di berbagai sektor. Sebagian besar masyarakat bekerja sebagai petani, pekebun, dan peternak. Selain itu, terdapat juga warga yang menjalankan usaha kecil menengah (UMKM), seperti pengolahan hasil pertanian, kerajinan tangan, dan kuliner khas daerah.\n\nSalah satu aset unggulan Pekon Payung adalah Wisata Cekdam Pekon Payung. Awalnya dibangun sebagai bendungan kecil untuk menampung air pertanian, cekdam ini kini berkembang menjadi destinasi wisata alam yang memikat. Dikelilingi pepohonan rindang dan panorama perbukitan, cekdam menawarkan suasana tenang yang cocok untuk rekreasi keluarga, memancing, atau sekadar bersantai menikmati alam. Keindahan tempat ini semakin lengkap dengan spot-spot foto alami yang digemari pengunjung, menjadikannya tujuan favorit wisatawan lokal.\n\nSelain wisata, Pekon Payung memiliki komoditas unggulan berupa coklat. Kakao yang dihasilkan petani setempat terkenal memiliki kualitas biji yang baik berkat kondisi tanah dan iklim yang mendukung. Saat ini, sebagian besar hasil panen dijual dalam bentuk biji kering, namun potensi pengolahan lebih lanjut sangat besar. Produk turunan seperti bubuk coklat, minuman coklat, dan olahan coklat lainnya memiliki peluang pasar yang luas, baik di tingkat lokal maupun
nasional. Dengan pendampingan teknologi dan promosi yang tepat, coklat Pekon Payung dapat menjadi brand tersendiri yang mengharumkan nama desa.
Selain wisata dan kakao, Pekon Payung juga memiliki potensi di sektor perikanan air tawar, peternakan, serta kerajinan berbasis bahan lokal. Usaha budidaya ikan air tawar memanfaatkan aliran air dari cekdam, sedangkan peternakan ayam, kambing, dan sapi mendukung kebutuhan protein hewani masyarakat. Potensi ini, jika dikembangkan secara berkelanjutan, dapat menjadi penopang ekonomi desa yang kuat.\n\nDengan perpaduan antara keindahan alam, potensi wisata Cekdam, dan kekayaan pertanian terutama kakao, Pekon Payung memiliki modal yang sangat besar untuk berkembang menjadi desa wisata sekaligus sentra pertanian yang berdaya saing. Dukungan dari pemerintah, masyarakat, dan pihak swasta akan menjadi kunci keberhasilan pengelolaan potensi ini. Harapannya, Pekon Payung tidak hanya dikenal di tingkat kabupaten, tetapi juga dapat menjadi ikon wisata dan pertanian unggulan di Provinsi Lampung..`, }, { id: 2, title: "Festival Budaya Pekon Payung Sukses Digelar", category: "Budaya", date: "10 Juli 2025", image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400", excerpt: "Festival budaya tahunan menampilkan kesenian tradisional dan produk UMKM lokal.", fullContent: `Pekon Payung kembali menunjukkan kekayaan budayanya melalui "Festival Budaya Pekon Payung" yang sukses digelar akhir pekan lalu. Acara ini menarik ratusan pengunjung yang antusias menyaksikan berbagai pertunjukan seni tradisional, mulai dari tari-tarian daerah hingga musik khas Lampung.\n\nSelain pertunjukan seni, festival ini juga menjadi ajang bagi para pelaku UMKM lokal untuk memamerkan dan menjual produk unggulan mereka. Berbagai produk kerajinan tangan, kuliner khas, dan hasil pertanian organik menjadi daya tarik tersendiri bagi para pengunjung. Kepala Pekon menyatakan bahwa acara ini bertujuan untuk melestarikan budaya sekaligus menggerakkan roda perekonomian lokal.`, }, ];
  const umkmList: UmkmItem[] = [ { id: 1, name: "Warung Resti", owner: "Resti", category: "Warung Klontong", description: "Menjual berbagai kebutuhan pokok dan jajanan harian.", images: ["WhatsApp Image 2025-08-07 at 19.58.31_4d04da97.jpg"], address: "Pekon Payung", phone: "085950282703", whatsapp: "6285950282703", hours: "05.00 - 20.00", lat: -5.466629, lng: 104.596183, }, { id: 2, name: "Warung Aprilia", owner: "Aprilia", category: "Warung Klontong & Sayur", description: "Menyediakan kebutuhan pokok, sayur-mayur segar, dan berbagai keperluan dapur lainnya.", images: ["WhatsApp Image 2025-08-07 at 19.58.31_f4176208.jpg"], address: "Pekon Payung", phone: "087701679388", whatsapp: "6287701679388", hours: "05.00 - 17.00", lat: -5.467319, lng: 104.596585, }, { id: 3, name: "Warung Andika", owner: "Aprizal", category: "Warung Klontong", description: "Menjual berbagai macam kebutuhan sehari-hari dan jajanan.", images: ["WhatsApp Image 2025-08-07 at 19.58.32_a485d9f2.jpg"], address: "Pekon Payung", phone: "085209292708", whatsapp: "6285209292708", hours: "06.00 - 12.00", lat: -5.467517, lng: 104.596572, }, { id: 4, name: "Warung Junaidi", owner: "Junaidi", category: "Warung Klontong", description: "Menyediakan kebutuhan pokok dan berbagai barang harian lainnya.", images: ["WhatsApp Image 2025-08-07 at 23.14.06_ad9a8bba.jpg"], address: "Pekon Payung", phone: "Tidak Ada", whatsapp: "", hours: "05.00 - 21.00", lat: -5.467518, lng: 104.596587, }, { id: 5, name: "Warung Efrizal", owner: "Efrizal", category: "Warung Klontong", description: "Menjual berbagai kebutuhan pokok dan harian.", images: ["WhatsApp Image 2025-08-07 at 23.19.41_99c647a1.jpg"], address: "Pekon Payung", phone: "085921746626", whatsapp: "6285921746626", hours: "05.00 - 21.00", lat: -5.467518, lng: 104.596587, }, { id: 6, name: "Warung Pina", owner: "Basariah", category: "Warung Klontong", description: "Menyediakan kebutuhan sehari-hari untuk warga sekitar.", images: ["WhatsApp Image 2025-08-07 at 23.19.41_175f5ea8.jpg"], address: "Pekon Payung", phone: "Tidak Ada", whatsapp: "", hours: "24 Jam", lat: -5.467518, lng: 104.596587, }, { id: 7, name: "WARUNG AURA", owner: "Aura", category: "Sembako", description: "Warung Aura merupakan usaha ritel yang menyediakan kebutuhan pokok sehari-hari bagi masyarakat sekitar.", images: ["/WhatsApp Image 2025-07-29 at 15.38.05_0d0b11db.jpg"], address: "Dusun I Payung", phone: "0821-7700-5518", whatsapp: "6282177005518", hours: "07:00 - 22:00", lat: -5.463556, lng: 104.592581, }, { id: 8, name: "Warung Azwar", owner: "Azwar", category: "Sembako", description: "Menyediakan beragam produk kebutuhan rumah tangga dengan pelayanan yang ramah dan harga bersaing.", images: ["/WhatsApp Image 2025-07-29 at 15.49.44_01af0f2f.jpg"], address: "Dusun I Payung", phone: "0877-3014-0065", whatsapp: "6287730140065", hours: "07:00 - 22:00", lat: -5.468406, lng: 104.594477, }, { id: 9, name: "Warung Zaipur", owner: "Zaipul", category: "Sembako & Bensin", description: "Menjual berbagai jenis kebutuhan rumah tangga, bensin, gas LPG 3kg, Kartu Paket, dan lain-lain.", images: ["/WhatsApp Image 2025-07-29 at 16.11.10_2c4f8349.jpg"], address: "Dusun I Payung", phone: "0811-5206-0256", whatsapp: "6281152060256", hours: "07:00 - 22:00", lat: -5.465297, lng: 104.591567, }, { id: 10, name: "Warung Santy", owner: "Santy", category: "Sembako & Jajanan", description: "Menjual berbagai jenis sembako dan jajanan. Warung memiliki banyak pilihan produk dengan harga terjangkau.", images: ["/WhatsApp Image 2025-07-29 at 16.37.19_ab380f45.jpg"], address: "Dusun III Proyek", phone: "0877-1462-1073", whatsapp: "6287714621073", hours: "07:00 - 22:00", lat: -5.463556, lng: 104.592581, }, { id: 11, name: "Warung Pak RIO", owner: "Rio", category: "Sembako & Jajanan", description: "Menjual berbagai jenis sembako dan jajanan. Warung memiliki banyak pilihan produk dengan harga terjangkau.", images: ["/WhatsApp Image 2025-07-29 at 16.43.02_f444686e.jpg"], address: "Dusun III Proyek", phone: "0877-1462-1073", whatsapp: "6287714621073", hours: "07:00 - 22:00", lat: -5.47377, lng: 104.596301, }, ];
  const services: Service[] = [ { name: "Surat Keterangan", icon: FileText, color: "text-yellow-400" }, { name: "Pelayanan KTP", icon: Users, color: "text-yellow-400" }, { name: "Administrasi Pekon", icon: Settings, color: "text-yellow-400" }, { name: "Pengaduan Online", icon: MessageCircle, color: "text-yellow-400" }, ];
  const gallery = [ "IMG-20250802-WA0044.jpg", "IMG_1996.HEIC.jpg", "IMG_2096.HEIC.jpg", "IMG-20250802-WA0044.jpg", "IMG_1567.jpg", "IMG_1675.jpg", "IMG_1713.jpg", "IMG_1785.jpg", "IMG_1785.jpg", "IMG_1848.jpg", "IMG_1989.jpg",  ];

  // --- HERO SLIDER ---
  const heroImages = [gallery[0], gallery[1], gallery[2]];
  const [heroIndex, setHeroIndex] = useState(0);
  useEffect(() => { const id = setInterval(() => { setHeroIndex((p) => (p + 1) % heroImages.length); }, 5000); return () => clearInterval(id); }, [heroImages.length]);

  // --- NEWS CAROUSEL ---
  useEffect(() => { const id = setInterval(() => { setCurrentNewsIndex((p) => (p + 1) % news.length); }, 7000); return () => clearInterval(id); }, [news.length]);

  // --- HANDLERS ---
  const handleNav = (id: string) => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: "smooth" }); setActiveSection(id); };
  const handleServiceRequestViaWhatsApp = (serviceName: string) => { const message = `Halo, saya ingin mengajukan layanan: *${serviceName}*. Mohon informasinya. Terima kasih.`; const whatsappUrl = `https://wa.me/${villageInfo.whatsapp}?text=${encodeURIComponent(message)}`; window.open(whatsappUrl, '_blank'); };

  return (
    <>
      <style>{`
        .site-bg { background: linear-gradient(180deg, #0b1220 0%, #0f1724 100%); }
        .hero-overlay { background: linear-gradient(180deg, rgba(2,6,23,0.55), rgba(2,6,23,0.75)); }
        .card-hover:hover { transform: translateY(-6px); box-shadow: 0 12px 30px rgba(2,6,23,0.6); }
      `}</style>

      <div className="min-h-screen text-white site-bg relative">
        <nav className="fixed top-0 w-full z-50 bg-slate-900/60 backdrop-blur border-b border-yellow-400/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-yellow-400 rounded-md flex items-center justify-center">
                  <Home className="w-5 h-5 text-slate-900" />
                </div>
                <span className="text-white font-semibold text-lg">{villageInfo.name}</span>
              </div>
              <div className="hidden md:flex space-x-2">
                {[ { id: "home", label: "Beranda" }, { id: "news", label: "Berita" }, { id: "umkm", label: "UMKM" }, { id: "services", label: "Layanan" }, { id: "gallery", label: "Galeri" }, { id: "contact", label: "Kontak" }, ].map((item) => ( <button key={item.id} onClick={() => handleNav(item.id)} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeSection === item.id ? "bg-yellow-500/10 text-yellow-300" : "text-gray-300 hover:text-white hover:bg-white/5"}`} > {item.label} </button> ))}
              </div>
            </div>
          </div>
        </nav>

        <main className="relative z-10">
          <section id="home" className="pt-16">
            <div className="relative">
              <div className="w-full h-[550px] md:h-[500px] rounded-b-3xl overflow-hidden relative">
                <img src={heroImages[0]} alt={`Hero 1`} className="w-full h-full object-cover transition-opacity duration-700" />
                <div className="absolute inset-0 hero-overlay"></div>
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div className="max-w-4xl text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">{villageInfo.name}</h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6"> Pekon Inovatif mendukung UMKM & pariwisata lokal untuk mempercepat pelayanan masyarakat. </p>
                    <div className="flex gap-4 justify-center">
                      <button onClick={() => handleNav("services")} className="bg-yellow-500 text-slate-900 px-6 py-3 rounded-xl font-semibold">Layanan Digital</button>
                      <button onClick={() => handleNav("umkm")} className="bg-transparent border border-yellow-400 text-white px-6 py-3 rounded-xl">Jelajahi UMKM</button>
                    </div>
                    <div className="mt-6 flex items-center justify-center gap-2">
                      {heroImages.map((_, i) => ( <button key={i} onClick={() => setHeroIndex(i)} className={`w-3 h-3 rounded-full ${i === heroIndex ? "bg-yellow-400" : "bg-white/30"}`} /> ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PERUBAHAN BAGIAN STATS DI SINI */}
            <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <StatCard icon={Users} value={`${villageStats.population} Jiwa`} label="Jumlah Penduduk" />
                <StatCard icon={Briefcase} value={villageStats.umkm} label="UMKM Aktif" />
              </div>
            </div>
          </section>
          
         

          <section className="py-16 bg-slate-900/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12"> <h2 className="text-3xl md:text-4xl font-semibold text-white">Struktur Organisasi</h2> <p className="text-gray-300 mt-2">Pemerintahan Pekon Payung, Kec. Kotaagung Barat</p> </div>
              <div className="space-y-8">
                <div className="flex justify-center gap-8 flex-wrap">
                  <JabatanCard jabatan={strukturOrganisasi.kepalaPekon.jabatan} nama={strukturOrganisasi.kepalaPekon.nama} className="border-2 border-yellow-400" />
                  <JabatanCard jabatan={strukturOrganisasi.bhp.jabatan} nama={strukturOrganisasi.bhp.nama} />
                </div>
                <div className="flex justify-center gap-8 flex-wrap">
                  <JabatanCard jabatan={strukturOrganisasi.sekretaris.jabatan} nama={strukturOrganisasi.sekretaris.nama} />
                  <JabatanCard jabatan={strukturOrganisasi.bendahara.jabatan} nama={strukturOrganisasi.bendahara.nama} />
                </div>
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
                    <div className="space-y-4"> <h4 className="text-center text-xl font-semibold text-white">Kepala Seksi (Kasi)</h4> <div className="grid grid-cols-1 sm:grid-cols-3 gap-4"> {strukturOrganisasi.kasi.map(p => <JabatanCard key={p.nama} jabatan={p.jabatan} nama={p.nama} />)} </div> </div>
                    <div className="space-y-4"> <h4 className="text-center text-xl font-semibold text-white">Kepala Urusan (Kaur)</h4> <div className="grid grid-cols-1 sm:grid-cols-3 gap-4"> {strukturOrganisasi.kaur.map(p => <JabatanCard key={p.nama} jabatan={p.jabatan} nama={p.nama} />)} </div> </div>
                </div>
                 <div className="space-y-4 pt-8">
                    <h4 className="text-center text-xl font-semibold text-white">Kepala Dusun (Kadus)</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {strukturOrganisasi.kadus.map(p => <JabatanCard key={p.nama} jabatan={p.jabatan} nama={p.nama} />)}
                    </div>
                </div>
              </div>
            </div>
          </section>
          
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
              <InfoTable 
                title="Data Potensi Pekon"
                headers={['kategori', 'nilai']}
                data={dataPotensi}
              />
              <InfoTable 
                title="Data Kependudukan per Wilayah"
                headers={['wilayah', 'jiwa', 'laki', 'perempuan', 'kk', 'rumah']}
                data={dataKependudukan}
              />
            </div>
          </section>

          <AnimatedSection id="news">
            <div className="text-center mb-10"> <h2 className="text-3xl md:text-4xl font-semibold text-white">Berita Terkini</h2> <p className="text-gray-300 mt-2">Ikuti perkembangan terbaru dan kegiatan menarik di Pekon Payung</p> </div>
            <div className="max-w-5xl mx-auto mb-8 relative">
              <div className="h-72">
                {news.length > 0 && (
                  <div className="h-full">
                    <div className="h-full rounded-2xl overflow-hidden border border-yellow-400/5 bg-slate-900/30">
                      <div className="relative h-full flex">
                        <div className="hidden md:block md:w-1/2 relative"> <img src={news[currentNewsIndex].image} alt={news[currentNewsIndex].title} className="w-full h-full object-cover" /> </div>
                        <div className="p-6 md:w-1/2 flex flex-col justify-between">
                          <div> <span className="inline-block bg-yellow-500/10 text-yellow-300 px-3 py-1 rounded-full text-sm">{news[currentNewsIndex].category}</span> <div className="text-gray-400 text-sm mt-2 flex items-center"><Calendar className="w-4 h-4 mr-2" />{news[currentNewsIndex].date}</div> <h3 className="text-2xl font-semibold text-white mt-4">{news[currentNewsIndex].title}</h3> <p className="text-gray-300 mt-3">{news[currentNewsIndex].excerpt}</p> </div>
                          <div className="flex items-center justify-between mt-6">
                            <div className="flex items-center gap-3"> {news.map((_, idx) => ( <button key={idx} onClick={() => setCurrentNewsIndex(idx)} className={`w-3 h-3 rounded-full ${idx === currentNewsIndex ? "bg-yellow-400" : "bg-white/30"}`} /> ))} </div>
                            <div className="flex gap-3"> <button onClick={() => setSelectedNews(news[currentNewsIndex])} className="bg-yellow-500 text-slate-900 px-4 py-2 rounded-lg">Baca Selengkapnya</button> </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center mb-6"> <h4 className="text-white font-semibold">Ringkasan Berita</h4> <div className="flex items-center gap-3"> <button onClick={() => setShowAllNews((s) => !s)} className="text-sm px-3 py-1 rounded-md border border-yellow-400/10 text-yellow-300"> {showAllNews ? "Tutup Daftar" : "Lihat Semua Berita"} </button> </div> </div>
              {!showAllNews ? ( <div className="grid md:grid-cols-2 gap-6"> {news.map((n) => ( <NewsCard key={n.id} news={n} onReadMore={(item) => setSelectedNews(item)} /> ))} </div> ) : ( <div className="space-y-4"> {news.map((n) => ( <div key={n.id} className="bg-slate-900/40 rounded-lg p-4 flex items-start gap-4 border border-yellow-400/5 card-hover"> <img src={n.image} alt={n.title} className="w-28 h-20 object-cover rounded-md flex-shrink-0" /> <div className="flex-1"> <div className="flex justify-between items-start"> <div> <h5 className="text-white font-semibold">{n.title}</h5> <div className="text-gray-400 text-sm">{n.date} • {n.category}</div> </div> <div> <button onClick={() => setSelectedNews(n)} className="text-yellow-300 px-3 py-1 rounded-md border border-yellow-400/10">Baca</button> </div> </div> <p className="text-gray-300 mt-2 text-sm">{n.excerpt}</p> </div> </div> ))} </div> )}
            </div>
          </AnimatedSection>

          <AnimatedSection id="umkm">
            <div className="text-center mb-8"> <h2 className="text-3xl font-semibold">UMKM Pekon Payung</h2> <p className="text-gray-300 mt-2">Dukung ekonomi lokal dengan berbelanja di UMKM terpercaya kami</p> </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"> {umkmList.map((u) => ( <UMKMCard key={u.id} umkm={u} /> ))} </div>
            <div className="mt-10 text-center"> <div className="bg-slate-900/30 rounded-2xl p-6 border border-yellow-400/5"> <h3 className="text-lg font-semibold text-white">Ingin Bergabung dengan UMKM Kami?</h3> <p className="text-gray-300 mt-2">Daftarkan usaha Anda dan jadilah bagian dari komunitas UMKM Pekon Payung</p> <a href={`https://wa.me/${villageInfo.whatsapp}?text=${encodeURIComponent("Halo, saya tertarik untuk mendaftarkan UMKM saya.")}`} target="_blank" rel="noreferrer" className="inline-block mt-4 bg-yellow-500 text-slate-900 px-6 py-2 rounded-xl">Daftar UMKM via WhatsApp</a> </div> </div>
          </AnimatedSection>

          <AnimatedSection id="services">
            <div className="text-center mb-8"> <h2 className="text-3xl font-semibold">Layanan Digital</h2> <p className="text-gray-300 mt-2">Nikmati kemudahan layanan administrasi Pekon yang cepat dan efisien</p> </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((s, idx) => (
                <div key={idx} className="bg-slate-900/40 rounded-2xl p-6 border border-yellow-400/5 flex flex-col items-center text-center">
                  <div className="p-3 rounded-lg bg-slate-800/20 mb-3">{React.createElement(s.icon, { className: `w-7 h-7 ${s.color}` })}</div>
                  <h4 className="text-white font-medium mb-2">{s.name}</h4>
                  <p className="text-gray-300 text-sm mb-4">Ajukan permohonan online</p>
                  <button onClick={() => handleServiceRequestViaWhatsApp(s.name)} className="mt-auto bg-yellow-500 text-slate-900 px-4 py-2 rounded-lg"> Akses Layanan </button>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection id="gallery">
            <div className="text-center mb-8"> <h2 className="text-3xl font-semibold">Galeri Pekon</h2> <p className="text-gray-300 mt-2">Lihat keindahan dan aktivitas menarik di Pekon Payung</p> </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {(showAllPhotos ? gallery : gallery.slice(0, 8)).map((img, idx) => ( <div key={idx} className="rounded-2xl overflow-hidden"> <img src={img} alt={`Galeri ${idx + 1}`} className="w-full h-56 object-cover" /> </div> ))}
            </div>
            {!showAllPhotos && gallery.length > 8 && ( <div className="mt-8 text-center"> <button onClick={() => setShowAllPhotos(true)} className="bg-yellow-500 text-slate-900 px-6 py-2 rounded-xl">Lihat Semua Foto</button> </div> )}
          </AnimatedSection>

          <AnimatedSection id="contact">
            <div className="text-center mb-8"> <h2 className="text-3xl font-semibold">Hubungi Kami</h2> <p className="text-gray-300 mt-2">Kami siap melayani dan mendengar aspirasi Anda</p> </div>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                {[ { icon: MapPin, title: "Alamat", content: "Jl. Raya Pekon Payung No. 1, Kec. Kotaagung, Kab. Tanggamus" }, { icon: Phone, title: "Telepon", content: villageInfo.whatsapp }, { icon: Mail, title: "Email", content: villageInfo.email }, ].map((item, i) => ( <div key={i} className="bg-slate-900/40 rounded-2xl p-6 border border-yellow-400/5"> <div className="flex items-center"> <div className="p-3 rounded-lg bg-slate-800/20">{React.createElement(item.icon, { className: "w-6 h-6 text-yellow-400" })}</div> <div className="ml-4"> <h4 className="text-white font-medium">{item.title}</h4> <p className="text-gray-300 text-sm">{item.content}</p> </div> </div> </div> ))}
              </div>
              <div className="bg-slate-900/40 rounded-3xl p-6 border border-yellow-400/5">
                <h3 className="text-xl font-semibold text-white mb-4">Kirim Pesan</h3>
                <form onSubmit={(e) => { e.preventDefault(); const form = e.target as HTMLFormElement; const fd = new FormData(form); const name = fd.get("name") as string; const email = fd.get("email") as string; const subject = fd.get("subject") as string; const message = fd.get("message") as string; const body = `Pesan dari: ${name} (${email})\n\n${message}`; window.location.href = `mailto:${villageInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`; }} className="space-y-4" >
                  <div> <label className="block text-sm text-gray-300 mb-1">Nama Lengkap</label> <input name="name" required className="w-full rounded-xl px-3 py-2 bg-slate-900 border border-slate-700 text-white" /> </div>
                  <div> <label className="block text-sm text-gray-300 mb-1">Email</label> <input name="email" type="email" required className="w-full rounded-xl px-3 py-2 bg-slate-900 border border-slate-700 text-white" /> </div>
                  <div> <label className="block text-sm text-gray-300 mb-1">Subjek</label> <input name="subject" required className="w-full rounded-xl px-3 py-2 bg-slate-900 border border-slate-700 text-white" /> </div>
                  <div> <label className="block text-sm text-gray-300 mb-1">Pesan</label> <textarea name="message" rows={4} required className="w-full rounded-xl px-3 py-2 bg-slate-900 border border-slate-700 text-white" /> </div>
                  <button type="submit" className="w-full bg-yellow-500 text-slate-900 py-2 rounded-xl">Kirim Pesan</button>
                </form>
              </div>
            </div>
          </AnimatedSection>

          <footer className="bg-slate-900/50 border-t border-yellow-400/5 py-10 mt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-300">
              <p>© {new Date().getFullYear()} KKNT Pekon Payung. All rights reserved.</p>
              <p className="mt-2 text-sm">Tim: Desman, Nevin, Randi, Martin, Berenta, Desi, Yunita, Discha, Aulia, Fareel, Damar, Cantika</p>
            </div>
          </footer>
        </main>

        {selectedNews && <NewsModal news={selectedNews} onClose={() => setSelectedNews(null)} />}
      </div>
    </>
  );
};

export default App;