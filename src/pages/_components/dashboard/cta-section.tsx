import { Button } from "@/ui/button";

export function CTASection() {
  return (
    <div className="py-16 bg-white">
      <div className="px-4 mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Have a property to sell?
        </h2>

        <div
          className="relative w-full bg-cover bg-center rounded-2xl p-10 shadow-md flex flex-col items-center justify-center text-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1500&h=500&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "250px",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-2xl"></div>

          <div className="relative z-10 flex flex-col items-center">
            <p className="text-xl font-medium text-white">
              List your property & connect with clients faster!
            </p>
            <Button
              variant="outline"
              className="mt-4 border-white px-6 py-2 mx-auto"
            >
              Sell your property
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
