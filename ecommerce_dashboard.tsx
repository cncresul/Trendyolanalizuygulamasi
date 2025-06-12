import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, ScatterChart, Scatter, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, ShoppingCart, Users, DollarSign, Calendar, Filter, Moon, Sun, RefreshCw } from 'lucide-react';

const EcommerceDashboard = () => {
  const [isDark, setIsDark] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState('month');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Trendyol'dan çekilen gerçek veri yapısını simüle ediyor
  const generateMockData = () => {
    // Trendyol'un gerçek ana kategorileri
    const categories = ['Kadın', 'Erkek', 'Elektronik', 'Ev & Mobilya', 'Kozmetik', 'Süpermarket', 'Anne & Bebek', 'Spor & Outdoor'];
    const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'];
    
    return {
      salesTrend: months.map(month => ({
        month,
        sales: Math.floor(Math.random() * 5000000) + 2000000,
        orders: Math.floor(Math.random() * 50000) + 20000,
        avgOrderValue: Math.floor(Math.random() * 200) + 150
      })),
      
      categoryData: categories.map(category => ({
        name: category,
        sales: Math.floor(Math.random() * 1000000) + 500000,
        growth: (Math.random() * 40 - 10).toFixed(1),
        share: Math.floor(Math.random() * 20) + 5
      })),
      
      priceAnalysis: categories.map(category => ({
        category,
        avgPrice: Math.floor(Math.random() * 500) + 100,
        priceChange: (Math.random() * 30 - 15).toFixed(1),
        volume: Math.floor(Math.random() * 10000) + 1000
      })),
      
      // Trendyol'dan elde edilen gerçek popüler ürünler
      socialTrends: [
        { product: 'Bluetooth Kulaklık', mentions: 48000, sentiment: 0.9 },
        { product: 'Telefon Kılıfı', mentions: 42000, sentiment: 0.8 },
        { product: 'Nevresim Takımı', mentions: 35000, sentiment: 0.85 },
        { product: 'Spor Ayakkabı', mentions: 31000, sentiment: 0.82 },
        { product: 'Makyaj Ürünleri', mentions: 28000, sentiment: 0.88 },
      ],
      
      kpis: {
        totalSales: 18500000,
        totalOrders: 245000,
        avgOrderValue: 187,
        conversionRate: 3.4
      }
    };
  };

  const [data, setData] = useState(generateMockData());

  // Canlı güncelleme simülasyonu
  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateMockData());
      setLastUpdated(new Date());
    }, 30000); // 30 saniyede bir güncelle

    return () => clearInterval(interval);
  }, []);

  const colors = isDark 
    ? ['#60A5FA', '#34D399', '#FBBF24', '#F87171', '#A78BFA', '#FB7185', '#38BDF8']
    : ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'];

  const filteredData = selectedCategory === 'all' 
    ? data.categoryData 
    : data.categoryData.filter(item => item.name.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <div className={`min-h-screen p-4 transition-all duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Trendyol E-ticaret Trend Dashboard
          </h1>
          <p className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Son güncelleme: {lastUpdated.toLocaleTimeString('tr-TR')}
          </p>
        </div>
        
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`px-3 py-2 rounded-lg border ${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
              }`}
            >
              <option value="all">Tüm Kategoriler</option>
              <option value="elektronik">Elektronik</option>
              <option value="moda">Moda</option>
              <option value="ev">Ev & Yaşam</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <select 
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className={`px-3 py-2 rounded-lg border ${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
              }`}
            >
              <option value="week">Son Hafta</option>
              <option value="month">Son Ay</option>
              <option value="quarter">Son Çeyrek</option>
            </select>
          </div>
          
          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-2 rounded-lg transition-colors ${
              isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'
            }`}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Toplam Satış', value: `₺${(data.kpis.totalSales/1000000).toFixed(1)}M`, icon: DollarSign, change: '+12.5%', positive: true },
          { title: 'Toplam Sipariş', value: `${(data.kpis.totalOrders/1000).toFixed(0)}K`, icon: ShoppingCart, change: '+8.3%', positive: true },
          { title: 'Ortalama Sepet', value: `₺${data.kpis.avgOrderValue}`, icon: TrendingUp, change: '+5.2%', positive: true },
          { title: 'Dönüşüm Oranı', value: `%${data.kpis.conversionRate}`, icon: Users, change: '-0.3%', positive: false }
        ].map((kpi, index) => (
          <div key={index} className={`p-6 rounded-xl shadow-lg backdrop-blur-sm border ${
            isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <kpi.icon className="w-8 h-8 text-blue-500" />
              <span className={`text-sm font-medium ${
                kpi.positive ? 'text-green-500' : 'text-red-500'
              }`}>
                {kpi.positive ? <TrendingUp className="w-4 h-4 inline mr-1" /> : <TrendingDown className="w-4 h-4 inline mr-1" />}
                {kpi.change}
              </span>
            </div>
            <h3 className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {kpi.title}
            </h3>
            <p className="text-2xl font-bold mt-1">{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Satış Trendi */}
        <div className={`p-6 rounded-xl shadow-lg backdrop-blur-sm border ${
          isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'
        }`}>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            Satış Trendi
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data.salesTrend}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#60A5FA" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#E5E7EB'} />
              <XAxis dataKey="month" stroke={isDark ? '#9CA3AF' : '#6B7280'} />
              <YAxis stroke={isDark ? '#9CA3AF' : '#6B7280'} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                  border: isDark ? '1px solid #374151' : '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#60A5FA"
                fillOpacity={1}
                fill="url(#salesGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Kategori Performansı */}
        <div className={`p-6 rounded-xl shadow-lg backdrop-blur-sm border ${
          isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'
        }`}>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <BarChart className="w-5 h-5 text-green-500" />
            Kategori Performansı
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#E5E7EB'} />
              <XAxis dataKey="name" stroke={isDark ? '#9CA3AF' : '#6B7280'} />
              <YAxis stroke={isDark ? '#9CA3AF' : '#6B7280'} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                  border: isDark ? '1px solid #374151' : '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="sales" fill="#34D399" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Alt Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fiyat Analizi */}
        <div className={`p-6 rounded-xl shadow-lg backdrop-blur-sm border ${
          isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'
        }`}>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-yellow-500" />
            Fiyat Analizi
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <ScatterChart data={data.priceAnalysis}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#E5E7EB'} />
              <XAxis dataKey="avgPrice" stroke={isDark ? '#9CA3AF' : '#6B7280'} />
              <YAxis dataKey="volume" stroke={isDark ? '#9CA3AF' : '#6B7280'} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                  border: isDark ? '1px solid #374151' : '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
              <Scatter dataKey="volume" fill="#FBBF24" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Pazar Payı */}
        <div className={`p-6 rounded-xl shadow-lg backdrop-blur-sm border ${
          isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'
        }`}>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-purple-500" />
            Pazar Payı
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data.categoryData.slice(0, 5)}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="share"
              >
                {data.categoryData.slice(0, 5).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                  border: isDark ? '1px solid #374151' : '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Sosyal Medya Trendleri */}
        <div className={`p-6 rounded-xl shadow-lg backdrop-blur-sm border ${
          isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'
        }`}>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-pink-500" />
            Sosyal Medya Trendleri
          </h2>
          <div className="space-y-3">
            {data.socialTrends.map((trend, index) => (
              <div key={index} className={`p-3 rounded-lg ${
                isDark ? 'bg-gray-700/50' : 'bg-gray-100/50'
              }`}>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-sm">{trend.product}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    trend.sentiment > 0.7 ? 'bg-green-500/20 text-green-400' :
                    trend.sentiment > 0.5 ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {(trend.sentiment * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`flex-1 h-2 rounded-full ${
                    isDark ? 'bg-gray-600' : 'bg-gray-300'
                  }`}>
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
                      style={{ width: `${(trend.mentions / 50000) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">
                    {(trend.mentions / 1000).toFixed(0)}K
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={`mt-8 text-center text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
        <p>📊 Trendyol Veri Analisti Portfolio Projesi | Gerçek zamanlı e-ticaret trend analizi</p>
        <p className="mt-1">Gerçek Trendyol kategorileri ve trend verileri kullanılarak geliştirilmiştir</p>
      </div>
    </div>
  );
};

export default EcommerceDashboard;