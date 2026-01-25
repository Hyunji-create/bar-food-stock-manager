export default function DebugPage() {
  return (
    <div style={{ padding: '50px', fontFamily: 'sans-serif' }}>
      <h1>✅ Router is Working!</h1>
      <p>Current Time: {new Date().toLocaleTimeString()}</p>
    </div>
  );
}
