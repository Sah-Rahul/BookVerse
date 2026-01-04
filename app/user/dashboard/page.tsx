import Layout from '@/components/user/Layout'
 
const dashboardRoute = () => {
  return (
    <Layout>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold">Welcome to your Dashboard</h1>
        <p className="mt-2 text-gray-600">Yahan aapka main content aayega.</p>
      </div>
    </Layout>
  )
}

export default dashboardRoute