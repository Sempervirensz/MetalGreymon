export default function TestRoutePage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4">Test Route</h1>
      <p className="text-gray-600">This is a development test route.</p>
      <pre className="mt-4 p-4 bg-white rounded-lg border">
        {JSON.stringify({ route: '/test-route', status: 'ok' }, null, 2)}
      </pre>
    </div>
  );
}


