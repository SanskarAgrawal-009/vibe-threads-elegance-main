import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <nav className="bg-white shadow-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/admin" className="text-2xl font-bold text-gray-900">
              Admin Dashboard
            </Link>
            <div className="flex items-center space-x-6">
              <Link 
                href="/admin"
                className="text-gray-600 hover:text-gray-900"
              >
                Dashboard
              </Link>
              <Link 
                href="/admin/products" 
                className="text-gray-600 hover:text-gray-900"
              >
                Products
              </Link>
              <Link 
                href="/admin/orders" 
                className="text-gray-600 hover:text-gray-900"
              >
                Orders
              </Link>
              <button 
                onClick={() => {
                  // Add logout logic here
                  document.cookie = "admin-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
                  window.location.href = "/login";
                }}
                className="text-red-600 hover:text-red-800"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}
