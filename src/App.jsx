import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProductsPage from './features/products/ProductsPage'
import CartPage from './cart/CartPage'

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        {/* Main content with routes */}
        <main>
          <Routes>
            {/* Home page - redirects to products */}
            <Route path="/" element={<Navigate to="/products" replace />} />
            
            {/* Products page */}
            <Route path="/products" element={<ProductsPage />} />
            
            {/* Cart page */}
            <Route path="/cart" element={<CartPage />} />
            
            {/* 404 Not Found - redirect to products */}
            <Route path="*" element={<Navigate to="/products" replace />} />
          </Routes>
        </main>
        
        {/* Footer */}
        <footer className="bg-white border-t mt-16 py-8">
          <div className="container mx-auto px-4 text-center text-gray-600">
            <p>© 2024 E-Shop. All rights reserved.</p>
            <p className="text-sm mt-2">
              Data provided by{' '}
              <a 
                href="https://dummyjson.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                DummyJSON
              </a>
            </p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App