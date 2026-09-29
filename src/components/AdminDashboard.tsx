import React, { useState, useEffect, useMemo } from 'react';
import { productService } from '@/services/productService';
import { orderService, Order } from '@/services/orderService';
import { Product } from '@/data/products';
import {
  TrendingUp,
  Package,
  ShoppingBag,
  AlertTriangle,
  Plus,
  Trash2,
  Edit3,
  Search,
  CheckCircle,
  Clock,
  RotateCcw,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Link } from 'react-router-dom';

interface AdminDashboardProps {
  activeTab?: 'overview' | 'products' | 'orders';
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ activeTab: initialTab = 'overview' }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders'>(initialTab);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Modal States for Add / Edit Product
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Men' as 'Men' | 'Women' | 'Children',
    subcategory: '',
    price: '',
    originalPrice: '',
    stock: '',
    image: '',
    description: '',
    isNewArrival: false,
    isOnSale: false,
    isBestSeller: false
  });

  const loadData = () => {
    setProducts(productService.getProducts());
    setOrders(orderService.getOrders());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('products_updated', loadData);
    window.addEventListener('orders_updated', loadData);
    return () => {
      window.removeEventListener('products_updated', loadData);
      window.removeEventListener('orders_updated', loadData);
    };
  }, []);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subcategory.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, categoryFilter]);

  // Key KPI metrics
  const totalRevenue = useMemo(() => {
    return orders.reduce((acc, order) => acc + order.total, 0);
  }, [orders]);

  const lowStockCount = useMemo(() => {
    return products.filter((p) => p.stock < 10).length;
  }, [products]);

  // Chart data: revenue & product breakdown by category
  const categoryAnalytics = useMemo(() => {
    const cats = ['Men', 'Women', 'Children'];
    return cats.map((cat) => {
      const catProducts = products.filter((p) => p.category === cat);
      const inventoryVal = catProducts.reduce((sum, p) => sum + p.price * p.stock, 0);
      return {
        category: cat,
        products: catProducts.length,
        stockUnits: catProducts.reduce((sum, p) => sum + p.stock, 0),
        inventoryValue: Math.round(inventoryVal / 1000) // in thousands (k)
      };
    });
  }, [products]);

  // Handlers for Products CRUD
  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'Men',
      subcategory: 'Tailoring',
      price: '',
      originalPrice: '',
      stock: '15',
      image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&fit=crop',
      description: 'Handcrafted luxury piece constructed with uncompromising attention to detail.',
      isNewArrival: true,
      isOnSale: false,
      isBestSeller: false
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prod: Product) => {
    setEditingProduct(prod);
    setFormData({
      name: prod.name,
      category: prod.category,
      subcategory: prod.subcategory,
      price: prod.price.toString(),
      originalPrice: prod.originalPrice ? prod.originalPrice.toString() : '',
      stock: prod.stock.toString(),
      image: prod.image,
      description: prod.description,
      isNewArrival: !!prod.isNewArrival,
      isOnSale: !!prod.isOnSale,
      isBestSeller: !!prod.isBestSeller
    });
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price) return;

    const priceNum = Number(formData.price);
    const origPriceNum = formData.originalPrice ? Number(formData.originalPrice) : undefined;
    const stockNum = Number(formData.stock) || 10;

    if (editingProduct) {
      productService.updateProduct(editingProduct.id, {
        name: formData.name,
        category: formData.category,
        subcategory: formData.subcategory,
        price: priceNum,
        originalPrice: origPriceNum,
        stock: stockNum,
        image: formData.image,
        images: [formData.image],
        description: formData.description,
        isNewArrival: formData.isNewArrival,
        isOnSale: formData.isOnSale,
        isBestSeller: formData.isBestSeller
      });
    } else {
      productService.createProduct({
        name: formData.name,
        category: formData.category,
        subcategory: formData.subcategory,
        price: priceNum,
        originalPrice: origPriceNum,
        stock: stockNum,
        image: formData.image,
        images: [formData.image],
        description: formData.description,
        isNewArrival: formData.isNewArrival,
        isOnSale: formData.isOnSale,
        isBestSeller: formData.isBestSeller,
        details: ['Tailored bespoke craftsmanship'],
        care: ['Dry clean only'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: [{ name: 'Default', hex: '#000000' }],
        rating: 5.0,
        reviewCount: 1,
        reviews: []
      });
    }

    setIsModalOpen(false);
  };

  const handleDeleteProduct = (id: number) => {
    if (window.confirm('Are you certain you want to remove this piece from the luxury catalog?')) {
      productService.deleteProduct(id);
    }
  };

  const handleQuickStock = (id: number, delta: number) => {
    const p = products.find((prod) => prod.id === id);
    if (!p) return;
    const newStock = Math.max(0, p.stock + delta);
    productService.updateProduct(id, { stock: newStock });
  };

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    orderService.updateOrderStatus(orderId, newStatus);
  };

  const handleResetCatalog = () => {
    if (window.confirm('Reset catalog back to initial curated luxury collections?')) {
      productService.resetToDefault();
    }
  };

  return (
    <div className="space-y-8 font-inter select-none">
      {/* Top Banner & Tab Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-4">
        <div>
          <h1 className="font-syne font-black text-xl sm:text-2xl text-black tracking-[0.15em] uppercase flex items-center gap-2">
            ATELIER OPERATIONS
            <span className="text-[10px] bg-black text-white font-mono px-2 py-0.5 uppercase tracking-widest">
              CONSOLE
            </span>
          </h1>
          <p className="text-xs text-neutral-500 mt-1 uppercase tracking-wider">
            Real-time catalog oversight, live order fulfillment, and revenue metrics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={activeTab === 'overview' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('overview')}
            className={activeTab === 'overview' ? 'bg-black text-white text-xs uppercase tracking-wider rounded-none' : 'text-xs uppercase tracking-wider rounded-none border-neutral-300'}
          >
            Overview
          </Button>
          <Button
            variant={activeTab === 'products' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('products')}
            className={activeTab === 'products' ? 'bg-black text-white text-xs uppercase tracking-wider rounded-none' : 'text-xs uppercase tracking-wider rounded-none border-neutral-300'}
          >
            Products ({products.length})
          </Button>
          <Button
            variant={activeTab === 'orders' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('orders')}
            className={activeTab === 'orders' ? 'bg-black text-white text-xs uppercase tracking-wider rounded-none' : 'text-xs uppercase tracking-wider rounded-none border-neutral-300'}
          >
            Orders ({orders.length})
          </Button>
        </div>
      </div>

      {/* TAB 1: OVERVIEW & ANALYTICS */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-white border border-neutral-200 shadow-xs space-y-2">
              <div className="flex justify-between items-center text-xs text-neutral-500">
                <span className="font-semibold uppercase tracking-wider">Gross Sales</span>
                <TrendingUp className="w-4 h-4 text-black" />
              </div>
              <div className="text-2xl font-bold text-black font-syne tracking-wide">
                ₹{totalRevenue.toLocaleString()}
              </div>
              <p className="text-[10px] text-neutral-600 font-semibold tracking-wider uppercase">+18.4% FROM PREVIOUS RUNWAY</p>
            </div>

            <div className="p-5 bg-white border border-neutral-200 shadow-xs space-y-2">
              <div className="flex justify-between items-center text-xs text-neutral-500">
                <span className="font-semibold uppercase tracking-wider">Total Orders</span>
                <ShoppingBag className="w-4 h-4 text-black" />
              </div>
              <div className="text-2xl font-bold text-black font-syne tracking-wide">
                {orders.length}
              </div>
              <p className="text-[10px] text-neutral-500 font-medium uppercase tracking-wider">Active customer purchases</p>
            </div>

            <div className="p-5 bg-white border border-neutral-200 shadow-xs space-y-2">
              <div className="flex justify-between items-center text-xs text-neutral-500">
                <span className="font-semibold uppercase tracking-wider">Atelier Inventory</span>
                <Package className="w-4 h-4 text-black" />
              </div>
              <div className="text-2xl font-bold text-black font-syne tracking-wide">
                {products.length}
              </div>
              <p className="text-[10px] text-neutral-500 font-medium uppercase tracking-wider">Active garment pieces</p>
            </div>

            <div className="p-5 bg-white border border-neutral-200 shadow-xs space-y-2">
              <div className="flex justify-between items-center text-xs text-neutral-500">
                <span className="font-semibold uppercase tracking-wider">Low Stock Warning</span>
                <AlertTriangle className="w-4 h-4 text-black" />
              </div>
              <div className="text-2xl font-bold text-black font-syne tracking-wide">
                {lowStockCount}
              </div>
              <p className="text-[10px] text-neutral-600 font-medium uppercase tracking-wider">Styles with &lt; 10 units</p>
            </div>
          </div>

          {/* Analytics Chart */}
          <div className="bg-white border border-neutral-200 p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-syne text-sm font-bold text-black uppercase tracking-wider">
                  Inventory Valuation by Department (₹ in Thousands)
                </h3>
                <p className="text-xs text-neutral-500 uppercase tracking-wide mt-0.5">
                  Total capital invested across Men's, Women's, and Children's ateliers
                </p>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryAnalytics}>
                  <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#e5e5e5" />
                  <XAxis dataKey="category" tick={{ fill: '#737373', fontSize: 11 }} />
                  <YAxis tick={{ fill: '#737373', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#000000', borderRadius: '0px', border: 'none', color: '#fff', fontSize: '12px' }}
                  />
                  <Bar dataKey="inventoryValue" name="Inventory Value (₹k)" fill="#171717" />
                  <Bar dataKey="stockUnits" name="Stock Count (Pieces)" fill="#a3a3a3" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Orders Preview */}
          <div className="bg-white border border-neutral-200 p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-syne text-sm font-bold text-black uppercase tracking-wider">Recent Customer Orders</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab('orders')}
                className="text-xs uppercase tracking-wider text-black hover:bg-neutral-100 rounded-none"
              >
                View All Orders &rarr;
              </Button>
            </div>

            <div className="border border-neutral-200 overflow-hidden">
              <Table>
                <TableHeader className="bg-neutral-50">
                  <TableRow className="border-b border-neutral-200">
                    <TableHead className="text-xs font-semibold text-black uppercase tracking-wider">Order ID</TableHead>
                    <TableHead className="text-xs font-semibold text-black uppercase tracking-wider">Customer</TableHead>
                    <TableHead className="text-xs font-semibold text-black uppercase tracking-wider">Date</TableHead>
                    <TableHead className="text-xs font-semibold text-black uppercase tracking-wider">Items</TableHead>
                    <TableHead className="text-xs font-semibold text-black uppercase tracking-wider">Total</TableHead>
                    <TableHead className="text-xs font-semibold text-black uppercase tracking-wider">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.slice(0, 3).map((o) => (
                    <TableRow key={o.id} className="border-b border-neutral-200">
                      <TableCell className="font-mono text-xs text-black font-semibold">{o.id}</TableCell>
                      <TableCell className="text-xs">
                        {o.shippingAddress.firstName} {o.shippingAddress.lastName}
                      </TableCell>
                      <TableCell className="text-xs text-neutral-500">{o.date}</TableCell>
                      <TableCell className="text-xs">{o.items.length} pieces</TableCell>
                      <TableCell className="text-xs font-semibold text-black">₹{o.total.toLocaleString()}</TableCell>
                      <TableCell>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-black text-white">
                          {o.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCTS MANAGEMENT (CRUD) */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          {/* Action Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 max-w-md">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search products by title or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 text-xs h-9 bg-white"
                />
              </div>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-32 h-9 text-xs bg-white">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-white text-xs">
                  <SelectItem value="All">All Categories</SelectItem>
                  <SelectItem value="Men">Men</SelectItem>
                  <SelectItem value="Women">Women</SelectItem>
                  <SelectItem value="Children">Children</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetCatalog}
                className="text-xs uppercase tracking-wider text-neutral-600 border-neutral-300 rounded-none gap-1.5 hover:bg-neutral-100"
                title="Reset to default seeded products"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Defaults
              </Button>

              <Button
                onClick={handleOpenAdd}
                className="bg-black hover:bg-neutral-800 text-white text-xs uppercase tracking-wider rounded-none h-9 gap-1.5 shadow-none"
              >
                <Plus className="w-4 h-4" />
                Add New Garment
              </Button>
            </div>
          </div>

          {/* Products Table */}
          <div className="border border-neutral-200 overflow-hidden bg-white">
            <Table>
              <TableHeader className="bg-neutral-50">
                <TableRow className="border-b border-neutral-200">
                  <TableHead className="text-xs font-semibold text-black uppercase tracking-wider w-16">Image</TableHead>
                  <TableHead className="text-xs font-semibold text-black uppercase tracking-wider">Name & Department</TableHead>
                  <TableHead className="text-xs font-semibold text-black uppercase tracking-wider">Price</TableHead>
                  <TableHead className="text-xs font-semibold text-black uppercase tracking-wider">Stock</TableHead>
                  <TableHead className="text-xs font-semibold text-black uppercase tracking-wider">Tags</TableHead>
                  <TableHead className="text-xs font-semibold text-black uppercase tracking-wider text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((p) => (
                  <TableRow key={p.id} className="border-b border-neutral-200">
                    <TableCell>
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-12 h-14 object-cover bg-neutral-100"
                      />
                    </TableCell>
                    <TableCell>
                      <Link
                        to={`/product/${p.id}`}
                        className="font-medium text-black hover:text-neutral-500 transition-colors text-xs flex items-center gap-1"
                      >
                        {p.name}
                        <ExternalLink className="w-3 h-3 text-neutral-400" />
                      </Link>
                      <span className="text-[11px] text-neutral-500 uppercase tracking-wider">
                        {p.category} &bull; {p.subcategory}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs">
                      <span className="font-semibold text-black">₹{p.price.toLocaleString()}</span>
                      {p.originalPrice && (
                        <span className="text-neutral-400 line-through text-[11px] ml-1.5">
                          ₹{p.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQuickStock(p.id, -1)}
                          className="w-6 h-6 border border-neutral-200 flex items-center justify-center text-xs hover:bg-neutral-100"
                        >
                          -
                        </button>
                        <span
                          className={`text-xs font-bold px-2 py-0.5 ${
                            p.stock < 10 ? 'bg-neutral-200 text-black' : 'bg-neutral-100 text-neutral-800'
                          }`}
                        >
                          {p.stock}
                        </span>
                        <button
                          onClick={() => handleQuickStock(p.id, 1)}
                          className="w-6 h-6 border border-neutral-200 flex items-center justify-center text-xs hover:bg-neutral-100"
                        >
                          +
                        </button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {p.isNewArrival && (
                          <span className="text-[9px] bg-black text-white px-1.5 py-0.5 uppercase tracking-wider font-semibold">
                            New
                          </span>
                        )}
                        {p.isOnSale && (
                          <span className="text-[9px] border border-black text-black px-1.5 py-0.5 uppercase tracking-wider font-semibold">
                            Sale
                          </span>
                        )}
                        {p.isBestSeller && (
                          <span className="text-[9px] bg-neutral-200 text-black px-1.5 py-0.5 uppercase tracking-wider font-semibold">
                            Best
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 text-black hover:text-neutral-500 hover:bg-neutral-100 transition-colors"
                          title="Edit product"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-1.5 text-neutral-500 hover:text-black hover:bg-neutral-100 transition-colors"
                          title="Delete product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* TAB 3: ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-syne text-sm font-bold text-black uppercase tracking-wider">
                Order Fulfillment Pipeline
              </h3>
              <p className="text-xs text-neutral-500 uppercase tracking-wide mt-0.5">
                Update customer order progress, mark as dispatched, or review shipping destinations.
              </p>
            </div>
          </div>

          <div className="border border-neutral-200 overflow-hidden bg-white">
            <Table>
              <TableHeader className="bg-neutral-50">
                <TableRow className="border-b border-neutral-200">
                  <TableHead className="text-xs font-semibold text-black uppercase tracking-wider">Reference</TableHead>
                  <TableHead className="text-xs font-semibold text-black uppercase tracking-wider">Client</TableHead>
                  <TableHead className="text-xs font-semibold text-black uppercase tracking-wider">Destination</TableHead>
                  <TableHead className="text-xs font-semibold text-black uppercase tracking-wider">Items Purchased</TableHead>
                  <TableHead className="text-xs font-semibold text-black uppercase tracking-wider">Total</TableHead>
                  <TableHead className="text-xs font-semibold text-black uppercase tracking-wider">Payment</TableHead>
                  <TableHead className="text-xs font-semibold text-black uppercase tracking-wider">Update Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((o) => (
                  <TableRow key={o.id} className="border-b border-neutral-200">
                    <TableCell className="font-mono text-xs text-black font-semibold">
                      <Link
                        to={`/payment?orderId=${encodeURIComponent(o.id)}`}
                        className="hover:underline"
                      >
                        {o.id}
                      </Link>
                    </TableCell>
                    <TableCell className="text-xs text-black">
                      <div className="font-medium">{o.shippingAddress.firstName} {o.shippingAddress.lastName}</div>
                      <div className="text-[11px] text-neutral-500">{o.shippingAddress.phone}</div>
                    </TableCell>
                    <TableCell className="text-xs text-neutral-600 max-w-[160px] truncate">
                      {o.shippingAddress.city}, {o.shippingAddress.state}
                    </TableCell>
                    <TableCell className="text-xs">
                      {o.items.map((i, idx) => (
                        <div key={idx} className="truncate max-w-[180px]">
                          {i.quantity}x {i.name} ({i.size})
                        </div>
                      ))}
                    </TableCell>
                    <TableCell className="text-xs font-semibold text-black">
                      ₹{o.total.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-xs text-neutral-600 uppercase tracking-wider text-[11px]">
                      {o.paymentMethod}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={o.status}
                        onValueChange={(val: any) => handleStatusChange(o.id, val)}
                      >
                        <SelectTrigger className="w-36 h-8 text-xs bg-white rounded-none border-neutral-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-xs rounded-none">
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Processing">Processing</SelectItem>
                          <SelectItem value="Shipped">Shipped</SelectItem>
                          <SelectItem value="Out for Delivery">Out for Delivery</SelectItem>
                          <SelectItem value="Delivered">Delivered</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* Product Add / Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-xl bg-white p-6 rounded-none border border-neutral-200">
          <DialogHeader>
            <DialogTitle className="font-syne text-sm font-bold text-black uppercase tracking-wider">
              {editingProduct ? 'Edit Atelier Garment' : 'Add New Luxury Garment'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSaveProduct} className="space-y-4 text-xs font-inter pt-2">
            <div>
              <Label className="text-xs font-semibold text-black uppercase tracking-wider">Garment Name</Label>
              <Input
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Cashmere Chesterfield Overcoat"
                className="mt-1 h-9 bg-white rounded-none border-neutral-300"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-semibold text-black uppercase tracking-wider">Department</Label>
                <Select
                  value={formData.category}
                  onValueChange={(val: any) => setFormData({ ...formData, category: val })}
                >
                  <SelectTrigger className="mt-1 h-9 bg-white rounded-none border-neutral-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-xs rounded-none">
                    <SelectItem value="Men">Men</SelectItem>
                    <SelectItem value="Women">Women</SelectItem>
                    <SelectItem value="Children">Children</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs font-semibold text-black uppercase tracking-wider">Subcategory</Label>
                <Input
                  required
                  value={formData.subcategory}
                  onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                  placeholder="e.g. Outerwear, Dresses, Tops"
                  className="mt-1 h-9 bg-white rounded-none border-neutral-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-xs font-semibold text-black uppercase tracking-wider">Price (₹)</Label>
                <Input
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="14999"
                  className="mt-1 h-9 bg-white rounded-none border-neutral-300"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold text-black uppercase tracking-wider">Original Price (₹)</Label>
                <Input
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                  placeholder="Optional"
                  className="mt-1 h-9 bg-white rounded-none border-neutral-300"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold text-black uppercase tracking-wider">Stock Count</Label>
                <Input
                  type="number"
                  required
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  placeholder="15"
                  className="mt-1 h-9 bg-white rounded-none border-neutral-300"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs font-semibold text-black uppercase tracking-wider">High-Res Image URL</Label>
              <Input
                required
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="mt-1 h-9 bg-white rounded-none border-neutral-300"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold text-black uppercase tracking-wider">Editorial Description</Label>
              <Textarea
                rows={3}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the fabric, cut, and silhouettes..."
                className="mt-1 bg-white text-xs rounded-none border-neutral-300"
              />
            </div>

            <div className="flex gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isNewArrival}
                  onChange={(e) => setFormData({ ...formData, isNewArrival: e.target.checked })}
                  className="rounded-none text-black accent-black"
                />
                <span className="text-xs text-neutral-700 uppercase tracking-wider">New Arrival</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isOnSale}
                  onChange={(e) => setFormData({ ...formData, isOnSale: e.target.checked })}
                  className="rounded-none text-black accent-black"
                />
                <span className="text-xs text-neutral-700 uppercase tracking-wider">On Sale</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isBestSeller}
                  onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                  className="rounded-none text-black accent-black"
                />
                <span className="text-xs text-neutral-700 uppercase tracking-wider">Bestseller</span>
              </label>
            </div>

            <DialogFooter className="pt-4 border-t border-neutral-200 flex gap-2 justify-end">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)} className="rounded-none uppercase tracking-wider text-xs border-neutral-300">
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-black hover:bg-neutral-800 text-white rounded-none uppercase tracking-wider text-xs">
                {editingProduct ? 'Save Updates' : 'Publish Product'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
