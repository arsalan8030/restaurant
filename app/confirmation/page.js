export default function ConfirmationPage() {
  return (
    <div className="h-screen flex items-center justify-center text-center">
      <div className="border p-8 rounded">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Booking Confirmed 🎉
        </h1>
        <p className="mb-2">Seats: T1-S1, T1-S2</p>
        <p className="mb-6">Thank you for your payment.</p>
        <a
          href="/"
          className="bg-black text-white px-6 py-3 rounded"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}
