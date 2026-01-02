const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
         
        <div>
          <h3 className="text-xl font-bold text-white">BookStore</h3>
          <p className="mt-2 text-sm">
            Your one-stop online bookstore for learning & growth.
          </p>
        </div>
 
        <div>
          <h4 className="font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>Home</li>
            <li>Books</li>
            <li>Cart</li>
            <li>Admin</li>
          </ul>
        </div>
 
        <div>
          <h4 className="font-semibold text-white mb-3">Contact</h4>
          <p className="text-sm">support@bookstore.com</p>
          <p className="text-sm mt-1">© {new Date().getFullYear()} BookStore</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
