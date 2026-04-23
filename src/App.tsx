import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Wishlist from './pages/Wishlist'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import { Toaster } from 'sonner'

export default function App() {
  return (
    <div className="min-h-screen bg-black text-neutral-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
      <Footer />
      <WhatsAppButton />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#0A0A0A',
            color: '#F4F4F4',
            border: '1px solid #1A1A1A',
            borderLeft: '3px solid #C9A94E',
          },
        }}
      />
    </div>
  )
}
