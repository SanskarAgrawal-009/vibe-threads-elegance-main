import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productService } from '@/services/productService';
import { Product, ProductReview } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { SizeGuideModal } from '@/components/SizeGuideModal';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import {
  Star,
  Plus,
  Minus,
  Heart,
  Truck,
  RotateCcw,
  ShieldCheck,
  Ruler,
  Check,
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { motion } from 'framer-motion';
import { triggerGoldConfetti } from '@/lib/confetti';
import { StickyAddToCartBar } from '@/components/StickyAddToCartBar';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  // Review Form States
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');

  useEffect(() => {
    if (!id) return;
    const currentId = parseInt(id, 10);
    const p = productService.getProductById(currentId);
    if (p) {
      setProduct(p);
      setSelectedImageIndex(0);
      setSelectedSize(p.sizes?.[0] || 'M');
      setSelectedColor(p.colors?.[0]?.name || 'Default');
      setQuantity(1);

      // Find related products in same category excluding self
      const all = productService.getProducts();
      const related = all
        .filter((item) => item.category === p.category && item.id !== p.id)
        .slice(0, 4);
      setRelatedProducts(related);
    } else {
      setProduct(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-white font-inter">
        <Header />
        <div className="container mx-auto px-6 py-32 text-center">
          <h2 className="font-syne font-black text-2xl text-black tracking-[0.15em] uppercase mb-4">
            PIECE NOT FOUND
          </h2>
          <p className="text-xs text-neutral-500 mb-8 tracking-wide">
            The requested garment may no longer be available in current edition.
          </p>
          <Link to="/new-arrivals">
            <button className="bg-black hover:bg-neutral-800 text-white font-medium text-[11px] tracking-[0.2em] px-8 py-3.5 uppercase transition-all">
              EXPLORE COLLECTION
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const gallery = product.images && product.images.length > 0 ? product.images : [product.image];
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: gallery[selectedImageIndex] || product.image,
        size: selectedSize,
        color: selectedColor,
        category: product.category,
        isNewArrival: product.isNewArrival,
        isOnSale: product.isOnSale,
        originalPrice: product.originalPrice
      },
      quantity
    );
    triggerGoldConfetti();
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        isNewArrival: product.isNewArrival,
        isOnSale: product.isOnSale,
        originalPrice: product.originalPrice
      });
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev: ProductReview = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor.trim(),
      rating: newReviewRating,
      date: 'Just now',
      comment: newReviewComment.trim(),
      verified: true
    };

    const updatedReviews = [newRev, ...(product.reviews || [])];
    const newRating = Number(
      (updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1)
    );

    const updated = productService.updateProduct(product.id, {
      reviews: updatedReviews,
      rating: newRating,
      reviewCount: updatedReviews.length
    });

    setProduct(updated);
    setNewReviewAuthor('');
    setNewReviewComment('');
    setShowReviewForm(false);
  };

  return (
    <div className="min-h-screen bg-white font-inter select-none">
      <Header />

      <main className="container mx-auto px-6 sm:px-12 py-8">
        {/* Minimal Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-neutral-400 mb-8 uppercase">
          <Link to="/" className="hover:text-black transition-colors">HOME</Link>
          <span>/</span>
          <Link to={`/${product.category.toLowerCase()}`} className="hover:text-black transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-black font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Zara Editorial Layout: 7 cols Gallery, 5 cols Sticky Product Rail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-24">
          {/* Left: Gallery (Thumbnails + Main Stage) in Full Natural Color */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails Row/Column */}
            {gallery.length > 1 && (
              <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto max-h-[700px] scrollbar-none flex-shrink-0">
                {gallery.map((imgUrl, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-16 h-22 sm:w-20 sm:h-28 overflow-hidden border transition-all flex-shrink-0 bg-neutral-50 ${
                      selectedImageIndex === index
                        ? 'border-black opacity-100'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Stage Image in Full Color & Clean Transparency / Studio Background */}
            <motion.div
              key={selectedImageIndex}
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex-1 aspect-[3/4] bg-neutral-50 overflow-hidden relative"
            >
              <img
                src={gallery[selectedImageIndex] || product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-102 cursor-zoom-in"
              />

              {/* Minimal Clean Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none">
                {product.isNewArrival && (
                  <span className="bg-black text-white text-[9px] font-bold tracking-[0.2em] px-2.5 py-1 uppercase">
                    NEW
                  </span>
                )}
                {product.isOnSale && (
                  <span className="bg-neutral-900 text-white text-[9px] font-bold tracking-[0.2em] px-2.5 py-1 uppercase">
                    SPECIAL PRICE
                  </span>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Rail: Minimalist Zara Product Details & Actions */}
          <div className="lg:col-span-5 flex flex-col justify-start space-y-6">
            <div>
              <div className="flex items-center justify-between text-[10px] tracking-[0.25em] text-neutral-400 mb-2 uppercase font-medium">
                <span>{product.category} &bull; {product.subcategory}</span>
                <span>REF: ET-{product.id.toString().padStart(4, '0')}</span>
              </div>

              <h1 className="font-syne font-black text-2xl sm:text-3xl text-black tracking-[0.08em] uppercase leading-tight mb-3">
                {product.name}
              </h1>

              {/* Pricing in Clean Minimal Style */}
              <div className="flex items-baseline gap-3 pb-6 border-b border-neutral-100">
                <span className="text-xl sm:text-2xl font-bold text-black tracking-wide">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-neutral-400 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-[10px] text-neutral-500 uppercase tracking-widest ml-auto">
                  INCL. OF ALL TAXES
                </span>
              </div>
            </div>

            {/* Color Selection (Full Color Swatches) */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <label className="text-[11px] font-semibold text-black uppercase tracking-[0.2em] block mb-2.5">
                  COLOR: <span className="font-normal text-neutral-600">{selectedColor}</span>
                </label>
                <div className="flex gap-2.5">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-7 h-7 rounded-full border p-0.5 flex items-center justify-center transition-all ${
                        selectedColor === color.name
                          ? 'border-black scale-110'
                          : 'border-neutral-300 hover:border-neutral-500'
                      }`}
                      title={color.name}
                    >
                      <span
                        className="w-full h-full rounded-full flex items-center justify-center border border-black/10"
                        style={{ backgroundColor: color.hex }}
                      >
                        {selectedColor === color.name && (
                          <Check className={`w-3 h-3 ${color.hex === '#FFFFFF' ? 'text-black' : 'text-white'}`} />
                        )}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection in Sharp Minimal Boxes */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <label className="text-[11px] font-semibold text-black uppercase tracking-[0.2em]">
                    SIZE
                  </label>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-[10px] text-neutral-500 hover:text-black tracking-[0.15em] uppercase border-b border-neutral-300 pb-0.5 flex items-center gap-1 font-medium transition-colors"
                  >
                    <Ruler className="w-3 h-3" />
                    SIZE GUIDE
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-12 h-10 px-3 text-[11px] font-semibold border transition-all uppercase ${
                        selectedSize === size
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-black border-neutral-200 hover:border-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Clean Add to Bag & Wishlist Actions */}
            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-neutral-200 bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-neutral-500 hover:text-black transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-2 text-xs font-semibold text-black min-w-[1.5rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-3 py-2 text-neutral-500 hover:text-black transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Primary Add to Bag CTA */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-black hover:bg-neutral-800 text-white font-medium text-[11px] tracking-[0.2em] py-3.5 uppercase transition-all shadow-xs flex items-center justify-center gap-2"
                >
                  <Plus className="w-3.5 h-3.5" />
                  ADD TO BAG
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={handleWishlistToggle}
                  className={`w-11 h-11 border border-neutral-200 flex items-center justify-center transition-colors ${
                    inWishlist ? 'bg-black text-white border-black' : 'text-black hover:border-black'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-white' : 'stroke-[1.5]'}`} />
                </button>
              </div>

              {/* Express Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="w-full bg-neutral-100 hover:bg-neutral-200 text-black font-semibold text-[11px] tracking-[0.2em] py-3 uppercase transition-colors"
              >
                BUY NOW
              </button>
            </div>

            {/* Editorial Description & Clean Accordions */}
            <div className="pt-4 border-t border-neutral-100 space-y-4">
              <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                {product.description}
              </p>

              <Accordion type="single" collapsible defaultValue="materials" className="w-full">
                <AccordionItem value="materials" className="border-b border-neutral-100">
                  <AccordionTrigger className="text-[11px] font-semibold tracking-[0.2em] text-black uppercase hover:no-underline py-3">
                    COMPOSITION & CARE
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-neutral-500 leading-relaxed font-normal pb-3">
                    <ul className="space-y-1 list-disc pl-4">
                      {product.details?.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                      {product.care?.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="shipping" className="border-b border-neutral-100">
                  <AccordionTrigger className="text-[11px] font-semibold tracking-[0.2em] text-black uppercase hover:no-underline py-3">
                    SHIPPING & EXCHANGES
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-neutral-500 leading-relaxed font-normal pb-3 space-y-1">
                    <p>&bull; Complimentary standard delivery on orders over ₹999.</p>
                    <p>&bull; 30-day complimentary exchanges and returns at home.</p>
                    <p>&bull; Packaged in signature Elegance Threads recyclable box.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>

        {/* Minimal "COMPLETE THE LOOK" Gallery */}
        {relatedProducts.length > 0 && (
          <section className="my-20 pt-10 border-t border-neutral-100">
            <div className="flex items-baseline justify-between mb-8 pb-3 border-b border-neutral-100">
              <h3 className="font-syne font-black text-lg text-black tracking-[0.15em] uppercase">
                MATCH WITH
              </h3>
              <span className="text-[10px] tracking-[0.2em] text-neutral-400 uppercase">
                COORDINATED PIECES
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {relatedProducts.map((relProduct, idx) => (
                <ProductCard key={relProduct.id} product={relProduct} index={idx} />
              ))}
            </div>
          </section>
        )}

        {/* Clean Customer Reviews Section */}
        <section id="reviews" className="py-12 border-t border-neutral-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h3 className="font-syne font-black text-lg text-black tracking-[0.15em] uppercase">
                VERIFIED OPINIONS
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex text-black">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.round(product.rating) ? 'fill-black text-black' : 'text-neutral-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-xs text-black">{product.rating} / 5</span>
                <span className="text-neutral-400 text-[11px] tracking-wide">
                  ({product.reviewCount} customer reviews)
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="text-[11px] font-semibold tracking-[0.2em] text-black border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors uppercase"
            >
              WRITE A REVIEW
            </button>
          </div>

          {/* Review Submission Form */}
          {showReviewForm && (
            <motion.form
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleAddReview}
              className="bg-neutral-50 p-6 sm:p-8 mb-10 max-w-xl space-y-4"
            >
              <h4 className="font-syne font-bold text-xs tracking-[0.2em] uppercase text-black">
                LEAVE YOUR FEEDBACK
              </h4>

              <div>
                <label className="text-[10px] font-semibold tracking-wider uppercase text-neutral-500 block mb-1">
                  YOUR NAME
                </label>
                <input
                  type="text"
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  placeholder="e.g. Priya M."
                  required
                  className="w-full bg-white border border-neutral-200 px-3 py-2 text-xs text-black focus:outline-none focus:border-black uppercase"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold tracking-wider uppercase text-neutral-500 block mb-1">
                  RATING
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewReviewRating(star)}
                      className="p-1"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= newReviewRating ? 'fill-black text-black' : 'text-neutral-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-semibold tracking-wider uppercase text-neutral-500 block mb-1">
                  YOUR OPINION
                </label>
                <textarea
                  rows={3}
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="Share details regarding fit, fabric quality, and comfort..."
                  required
                  className="w-full bg-white border border-neutral-200 p-3 text-xs text-black focus:outline-none focus:border-black"
                />
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  type="submit"
                  className="bg-black hover:bg-neutral-800 text-white font-medium text-[11px] tracking-[0.2em] px-6 py-2.5 uppercase transition-colors"
                >
                  SUBMIT OPINION
                </button>
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="text-neutral-500 hover:text-black text-[11px] tracking-[0.2em] px-4 py-2.5 uppercase transition-colors"
                >
                  CANCEL
                </button>
              </div>
            </motion.form>
          )}

          {/* Reviews List */}
          <div className="space-y-6">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((rev) => (
                <div key={rev.id} className="border-b border-neutral-100 pb-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-xs text-black tracking-wide uppercase">
                        {rev.author}
                      </span>
                      {rev.verified && (
                        <span className="text-[9px] tracking-widest text-neutral-400 uppercase font-medium">
                          &bull; VERIFIED PURCHASE
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-neutral-400 uppercase">{rev.date}</span>
                  </div>
                  <div className="flex text-black mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < rev.rating ? 'fill-black text-black' : 'text-neutral-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                    {rev.comment}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-xs text-neutral-400">Be the first to review this piece.</p>
            )}
          </div>
        </section>
      </main>

      {/* Sticky Quick Add Bar on Scroll */}
      <StickyAddToCartBar
        product={product}
        selectedSize={selectedSize}
        onSizeChange={setSelectedSize}
        selectedColor={selectedColor}
      />

      {/* Sizing Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={product.category}
      />

      <Footer />
    </div>
  );
};

export default ProductDetail;
